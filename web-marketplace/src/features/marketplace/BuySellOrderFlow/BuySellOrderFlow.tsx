import { useEffect, useMemo, useRef, useState } from 'react';
import { Location, useNavigate } from 'react-router-dom';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { msg } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useQuery } from '@tanstack/react-query';
import { errorsMapping, findErrorByCodeEnum } from 'config/errors';
import { useSetAtom } from 'jotai';
import { getSocialItems } from 'utils/components/ShareSection/getSocialItems';
import { REGEN_APP_PROJECT_URL } from 'utils/components/ShareSection/getSocialItems.constants';

import { CelebrateIcon } from 'web-components/src/components/icons/CelebrateIcon';
import { ProcessingModal } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModal } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModal } from 'web-components/src/components/modal/TxSuccessfulModal';

import { UseStateSetter } from 'types/react/use-state';
import { switchWalletModalAtom } from 'lib/atoms/modals.atoms';
import { getHashUrl } from 'lib/block-explorer';
import { client } from 'lib/clients/sanity';
import {
  BLOCKCHAIN_RECORD,
  CLOSE_BUTTON_TEXT,
  PROCESSING_MODAL_BODY,
  PROCESSING_MODAL_TITLE,
  SEE_LESS,
  SEE_MORE,
  SHARE_TITLE,
  TX_ERROR_MODAL_TITLE,
  TX_MODAL_TITLE,
} from 'lib/constants/shared.constants';
import { getBuyModalOptionsQuery } from 'lib/queries/react-query/sanity/getBuyModalOptionsQuery/getBuyModalOptionsQuery';
import { Track } from 'lib/tracker/types';
import { useWallet } from 'lib/wallet/wallet';

import useBuySellOrderSubmit from 'pages/Marketplace/Storefront/hooks/useBuySellOrderSubmit';
import { useCheckSellOrderAvailabilty } from 'pages/Marketplace/Storefront/hooks/useCheckSellOrderAvailabilty';
import { VIEW_ECOCREDITS } from 'pages/Projects/AllProjects/AllProjects.config';
import { ProjectWithOrderData } from 'pages/Projects/AllProjects/AllProjects.types';
import { normalizeToUISellOrderInfo } from 'pages/Projects/hooks/useProjectsSellOrders.utils';
import { Link } from 'components/atoms';
import { BuyCreditsModal, BuyCreditsValues } from 'components/organisms';
import { BuyModalOptions } from 'components/organisms/BuyModalOptions/BuyModalOptions';
import { useMsgClient } from 'hooks';

import { BUY_FLOW_TWITTER_TEXT } from './BuySellOrderFlow.constants';
import { useFetchSellOrders } from './hooks/useFetchSellOrders';
import { useSelectedProject } from './hooks/useSelectedProject';

type Props = {
  isFlowStarted: boolean;
  isCommunityCredit?: boolean;
  setIsFlowStarted: UseStateSetter<boolean>;
  projects?: ProjectWithOrderData[] | null | undefined;
  track?: Track;
  location?: Location;
};

export const BuySellOrderFlow = ({
  projects,
  isFlowStarted,
  isCommunityCredit = false,
  setIsFlowStarted,
  track,
  location,
}: Props): JSX.Element => {
  /**
   * ui management
   */
  const { _ } = useLingui();
  const navigate = useNavigate();

  // persistence for Tx details (orderId and amount)
  const selectedSellOrderIdRef = useRef<number>();
  const submittedQuantityRef = useRef<number>();

  // modals and display
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isBuyModalOptionsOpen, setIsBuyModalOptionsOpen] = useState(false);
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false);
  const [txModalTitle, setTxModalTitle] = useState<string>('');
  const [txButtonTitle, setTxButtonTitle] = useState<string>('');
  const [txModalHeader, setTxModalHeader] = useState<string>('');
  const [cardItems, setCardItems] = useState<Item[] | undefined>(undefined);
  const { sellOrders, refetchSellOrders } = useFetchSellOrders();
  const { isConnected, wallet, activeWalletAddr } = useWallet();
  const { data: buyModalOptionsContent } = useQuery(
    getBuyModalOptionsQuery({ sanityClient: client }),
  );
  const setSwitchWalletModalAtom = useSetAtom(switchWalletModalAtom);
  const buyModalOptions = buyModalOptionsContent?.allBuyModalOptions[0];
  const buyModalOptionsFiltered = isCommunityCredit
    ? {
        ...buyModalOptions,
        cards: buyModalOptions?.cards?.slice(1, buyModalOptions?.cards?.length),
      }
    : buyModalOptions;

  const closeBuyModal = (): void => {
    setIsBuyModalOpen(false);
    setIsFlowStarted(false);
  };
  const closeProcessingModal = (): void => setIsProcessingModalOpen(false);
  const handleTxModalClose = (): void => {
    setCardItems(undefined);
    setTxModalTitle('');
    setTxModalHeader('');
    setDeliverTxResponse(undefined);
    setError(undefined);
    setIsFlowStarted(false);
    selectedSellOrderIdRef.current = undefined;
    setSelectedProject(undefined);
  };
  const onTxSuccessButtonClick = (): void => {
    handleTxModalClose();
    navigate('/profile/portfolio');
  };

  /**
   * ledger msg hook setup
   */
  const handleTxQueued = (): void => {
    setIsProcessingModalOpen(true);
  };
  const handleTxDelivered = async (
    _deliverTxResponse: DeliverTxResponse,
  ): Promise<void> => {
    closeProcessingModal();
    closeBuyModal();
    selectedSellOrderIdRef.current = undefined;
  };
  const handleError = (): void => {
    closeProcessingModal();
    setTxModalTitle(_(msg`Buy Credits Error`));
  };

  const {
    signAndBroadcast,
    setDeliverTxResponse,
    deliverTxResponse,
    error,
    setError,
  } = useMsgClient(handleTxQueued, handleTxDelivered, handleError);

  const accountAddress = wallet?.address;
  const txHash = deliverTxResponse?.transactionHash;
  const txHashUrl = getHashUrl(txHash);
  const errorEnum = findErrorByCodeEnum({ errorCode: error });
  const ErrorIcon = errorsMapping[errorEnum].icon;

  /**
   * data processing
   */
  const { selectedProject, setSelectedProject, setSelectedProjectById } =
    useSelectedProject({ projects });

  const projectsSellOrdersIds = useMemo(
    () =>
      projects &&
      projects
        .map(project => project.sellOrders)
        .flat()
        .map(sellOrder => sellOrder.id),
    [projects],
  );

  const _sellOrders = useMemo(
    () =>
      sellOrders
        ?.map(normalizeToUISellOrderInfo)
        .filter(sellOrder => projectsSellOrdersIds?.includes(sellOrder.id))
        .filter(sellOrder => sellOrder.seller !== accountAddress),
    [sellOrders, projectsSellOrdersIds, accountAddress],
  );

  const _project = useMemo(
    () =>
      selectedProject && {
        id: selectedProject?.id.toString() ?? '',
      },
    [selectedProject],
  );

  /**
   * Check the selected order availability on sellOrders refresh
   */
  useCheckSellOrderAvailabilty({
    selectedSellOrderIdRef,
    submittedQuantityRef,
    setError,
    sellOrders: _sellOrders,
    setCardItems,
    setTxModalHeader,
    setTxModalTitle,
  });

  /**
   * Submit hook setup
   */
  const onSubmitCallback = ({
    creditCount,
    sellOrderId,
  }: BuyCreditsValues): void => {
    selectedSellOrderIdRef.current = Number(sellOrderId);
    submittedQuantityRef.current = creditCount;
  };

  const projectDisplayData = useMemo(() => {
    if (!selectedProject || !selectedProject.id) return;
    const projectId = selectedProject.id;
    return {
      id: projectId,
      name: selectedProject.name ?? projectId,
    };
  }, [selectedProject]);

  const shareUrl = REGEN_APP_PROJECT_URL + (selectedProject?.id ?? '');

  const buySellOrderSubmit = useBuySellOrderSubmit({
    accountAddress,
    project: projectDisplayData,
    signAndBroadcast,
    setCardItems,
    setTxButtonTitle,
    setTxModalHeader,
    setTxModalTitle,
    onBroadcast: () => setIsBuyModalOpen(false),
    buttonTitle: VIEW_ECOCREDITS,
    refetchSellOrders,
    onSubmitCallback,
  });

  /**
   * ui update effect
   */
  useEffect(() => {
    if (isFlowStarted && isConnected) {
      refetchSellOrders();
      setIsBuyModalOpen(true);
    } else if (isFlowStarted && !activeWalletAddr) {
      setIsBuyModalOptionsOpen(true);
    } else if (isFlowStarted && !isConnected) {
      setSwitchWalletModalAtom(atom => {
        atom.open = true;
        atom.onClose = () => setIsFlowStarted(false);
      });
    }
  }, [
    isFlowStarted,
    isConnected,
    refetchSellOrders,
    setSwitchWalletModalAtom,
    setIsFlowStarted,
    activeWalletAddr,
  ]);

  return (
    <>
      <BuyCreditsModal
        open={isBuyModalOpen}
        onClose={closeBuyModal}
        onSubmit={buySellOrderSubmit}
        project={_project}
        sellOrders={_sellOrders}
        setSelectedProjectById={
          projects && projects?.length > 1 ? setSelectedProjectById : undefined
        }
        isCommunityCredit={isCommunityCredit}
      />
      <BuyModalOptions
        content={buyModalOptionsFiltered}
        open={isBuyModalOptionsOpen}
        onClose={() => {
          setIsFlowStarted(false);
          setIsBuyModalOptionsOpen(false);
        }}
        selectedProject={selectedProject}
        track={track}
        location={location}
      />
      <ProcessingModal
        open={isProcessingModalOpen}
        onClose={closeProcessingModal}
        title={_(PROCESSING_MODAL_TITLE)}
        bodyText={_(PROCESSING_MODAL_BODY)}
      />
      <TxSuccessfulModal
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        open={!!txHash && !error}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader}
        cardTitle={txModalTitle}
        buttonTitle={txButtonTitle ?? _(TX_MODAL_TITLE)}
        cardItems={cardItems}
        linkComponent={Link}
        onButtonClick={onTxSuccessButtonClick}
        icon={<CelebrateIcon sx={{ width: '85px', height: '106px' }} />}
        socialItems={getSocialItems({
          twitter: { text: _(BUY_FLOW_TWITTER_TEXT), url: shareUrl },
          linkedIn: { url: shareUrl },
        })}
        shareTitle={_(SHARE_TITLE)}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
      <TxErrorModal
        seeMoreText={_(SEE_MORE)}
        seeLessText={_(SEE_LESS)}
        error={error ?? ''}
        open={!!error && (!!txModalTitle || !!deliverTxResponse)}
        onClose={handleTxModalClose}
        txHash={txHash ?? ''}
        txHashUrl={txHashUrl}
        title={txModalHeader ?? _(TX_ERROR_MODAL_TITLE)}
        cardTitle={txModalTitle}
        linkComponent={Link}
        onButtonClick={handleTxModalClose}
        buttonTitle={_(CLOSE_BUTTON_TEXT)}
        cardItems={cardItems}
        icon={<ErrorIcon sx={{ fontSize: 100 }} />}
        blockchainRecordText={_(BLOCKCHAIN_RECORD)}
      />
    </>
  );
};
