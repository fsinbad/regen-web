import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Title from 'web-components/lib/components/title';
import { pluralize } from 'web-components/lib/components/credits/pluralize';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TRANSFER_CREDITS = gql`
  mutation TransferCredits($input: TransferCreditsInput!) {
    transferCredits(input: $input) {
      accountBalance {
        id
        walletId
        liquidBalance
        creditVintageByCreditVintageId {
          createdAt
          creditClassByCreditClassId {
            creditClassVersionsById {
              nodes {
                name
              }
            }
          }
          projectByProjectId {
            name
          }
        }
      }
    }
  }
`;

const AVAILABLE_CREDITS = gql`
  query GetAvailableCredits($vintageId: UUID) {
    getAvailableCredits(vintageId: $vintageId)
  }
`;

const ALL_CREDIT_VINTAGES = gql`
  {
    allCreditVintages {
      nodes {
        id
        createdAt
        projectByProjectId {
          name
        }
        accountBalancesByCreditVintageId {
          nodes {
            id
            walletId
            liquidBalance
          }
        }
      }
    }
  }
`;

const ALL_PARTIES = gql`
  {
    allParties {
      nodes {
        id
        type
        name
        walletId
      }
    }
  }
`;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(5),
  },
  input: {
    padding: theme.spacing(1),
  },
  form: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  button: {
    marginTop: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

interface Balance {
  liquidBalance: string;
  id: string;
  walletId: string;
}

interface Result {
  oldBalance: string;
  newBalance: string;
  name: string;
  walletId: string;
}

export default function CreditsTransfer(): JSX.Element {
  const classes = useStyles();

  const [transferCredits, { data, loading, error }] = useMutation(TRANSFER_CREDITS, {
    errorPolicy: 'ignore',
  });
  const {
    data: vintagesData,
    loading: vintagesLoading,
    error: vintagesError,
    refetch: refetchVintages,
  } = useQuery(ALL_CREDIT_VINTAGES, {
    errorPolicy: 'ignore',
  });

  const { data: partiesData, loading: partiesLoading, error: partiesError } = useQuery(ALL_PARTIES, {
    errorPolicy: 'ignore',
  });

  const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'numeric', day: '2-digit' });

  const [vintageId, setVintageId] = useState('');
  const [oldBalances, setOldBalances] = useState<Balance[]>([]);
  const [buyerWalletId, setBuyerWalletId] = useState('');
  const [units, setUnits] = useState(1);
  const [creditPrice, setCreditPrice] = useState(1);

  const { data: availableCreditsData, refetch: refetchAvailableCredits } = useQuery(AVAILABLE_CREDITS, {
    errorPolicy: 'ignore',
    variables: { vintageId },
  });

  const handleVintageChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    setVintageId(event.target.value as string);
    setOldBalances(
      vintagesData.allCreditVintages.nodes.find((node: any) => node.id === event.target.value)
        .accountBalancesByCreditVintageId.nodes,
    );
  };

  const handleBuyerWalletChange = (event: React.ChangeEvent<{ value: any }>): void => {
    setBuyerWalletId(event.target.value as string);
  };

  if (vintagesLoading || partiesLoading) return <div>Loading...</div>;
  if (vintagesError) return <div>Error! ${vintagesError.message}</div>;
  if (partiesError) return <div>Error! ${partiesError.message}</div>;

  let newBalances: Balance[];
  let sendersBalances: Result[] = [];
  let receiverBalance: Result | undefined;
  if (partiesData && partiesData.allParties && vintagesData && vintagesData.allCreditVintages && vintageId) {
    newBalances = vintagesData.allCreditVintages.nodes.find((node: any) => node.id === vintageId)
      .accountBalancesByCreditVintageId.nodes;

    const findOldBalance = (i: number): any =>
      oldBalances.find((oldBalance: any) => oldBalance.id === newBalances[i].id);
    const findParty = (i: number): any =>
      partiesData.allParties.nodes.find((party: any) => party.walletId === newBalances[i].walletId);

    for (var i: number = 0; i < newBalances.length; i++) {
      const oldBalance = findOldBalance(i);
      const party = findParty(i);
      if (party) {
        if (oldBalance && parseFloat(oldBalance.liquidBalance) > parseFloat(newBalances[i].liquidBalance)) {
          // sender
          sendersBalances.push({
            walletId: party.walletId,
            name: party.name,
            oldBalance: oldBalance.liquidBalance,
            newBalance: newBalances[i].liquidBalance,
          });
        } else {
          // buyer
          receiverBalance = {
            walletId: party.walletId,
            name: party.name,
            oldBalance: oldBalance && oldBalance.liquidBalance ? oldBalance.liquidBalance : '0',
            newBalance: newBalances[i].liquidBalance,
          };
        }
      }
    }
  }

  return (
    <div className={classes.root}>
      <Title variant="h1">Transfer Credits</Title>
      <form
        className={classes.form}
        onSubmit={async e => {
          e.preventDefault();
          const confirmAlert = window.confirm('Are you sure you want to transfer credits?');
          if (confirmAlert) {
            try {
              await transferCredits({
                variables: {
                  input: {
                    vintageId,
                    buyerWalletId,
                    units,
                    creditPrice,
                    txState: 'SUCCEEDED',
                  },
                },
              });
              await refetchVintages();
              await refetchAvailableCredits();
            } catch (e) {}
          }
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl className={classes.formControl}>
          <InputLabel required id="credit-vintage-select-label">
            Credit Vintage
          </InputLabel>
          <Select
            required
            labelId="credit-vintage-select-label"
            id="credit-vintage-select"
            value={vintageId}
            onChange={handleVintageChange}
          >
            {vintagesData &&
              vintagesData.allCreditVintages &&
              vintagesData.allCreditVintages.nodes.map((node: any) => (
                <MenuItem key={node.id} value={node.id}>
                  {node.projectByProjectId.name} - {dateFormat.format(new Date(node.createdAt))}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel required id="buyer-wallet-select-label">
            Buyer
          </InputLabel>
          <Select
            required
            labelId="buyer-wallet-select-label"
            id="buyer-wallet-select"
            value={buyerWalletId}
            onChange={handleBuyerWalletChange}
          >
            {partiesData &&
              partiesData.allParties &&
              partiesData.allParties.nodes.map(
                (node: any) =>
                  node.walletId && (
                    <MenuItem key={node.id} value={node.walletId}>
                      {node.name} ({node.type.toLowerCase()}){' '}
                    </MenuItem>
                  ),
              )}
          </Select>
        </FormControl>
        <TextField
          className={classes.input}
          required
          type="number"
          value={units}
          onChange={e => setUnits(Math.max(0.01, parseInt(e.target.value)))}
          label="Units"
        />
        <TextField
          className={classes.input}
          required
          type="number"
          value={creditPrice}
          onChange={e => setCreditPrice(Math.max(0.01, parseInt(e.target.value)))}
          label="Credit price"
        />
        <Button className={classes.button} variant="contained" type="submit">
          Transfer
        </Button>
      </form>
      {loading && <div>Loading...</div>}
      {availableCreditsData && availableCreditsData.getAvailableCredits && (
        <div>Available credits to transfer: {availableCreditsData.getAvailableCredits}</div>
      )}
      {data && receiverBalance && (
        <div>
          <p>
            {units} {pluralize(units, 'credit')} successfully transfered.
          </p>
          <Title variant="h3">Senders:</Title>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet id</TableCell>
                  <TableCell align="right">Old balance</TableCell>
                  <TableCell align="right">New balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sendersBalances.map(row => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.walletId}</TableCell>
                    <TableCell align="right">{row.oldBalance}</TableCell>
                    <TableCell align="right">{row.newBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Title variant="h3">Buyer:</Title>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Wallet id</TableCell>
                  <TableCell align="right">Old balance</TableCell>
                  <TableCell align="right">New balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={receiverBalance.name}>
                  <TableCell component="th" scope="row">
                    {receiverBalance.name}
                  </TableCell>
                  <TableCell>{receiverBalance.walletId}</TableCell>
                  <TableCell align="right">{receiverBalance.oldBalance}</TableCell>
                  <TableCell align="right">{receiverBalance.newBalance}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {error && (
        <div>
          Error:
          {error.graphQLErrors.map(({ message }, i) => (
            <span key={i}> {message}</span>
          ))}
        </div>
      )}
    </div>
  );
}
