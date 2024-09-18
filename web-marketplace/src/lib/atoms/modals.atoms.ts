import { atomWithImmer } from 'jotai-immer';

import { RegenModalProps } from 'web-components/src/components/modal';
import { ProcessingModalProps } from 'web-components/src/components/modal/ProcessingModal';
import { TxErrorModalProps } from 'web-components/src/components/modal/TxErrorModal';
import { Item } from 'web-components/src/components/modal/TxModal';
import { TxSuccessfulModalProps } from 'web-components/src/components/modal/TxSuccessfulModal';

import { AccountSwitchModalProps } from 'components/organisms/AccountSwitchModal/AccountSwitchModal';

export const errorModalAtom = atomWithImmer({
  title: '',
  description: '',
  txHash: '',
  txError: '',
  cardTitle: '',
  cardItems: [] as Item[],
  buttonLink: '',
  buttonTitle: '',
} as Partial<TxErrorModalProps>);

export const txSuccessfulModalAtom = atomWithImmer({
  cardItems: [],
  title: '',
  cardTitle: '',
} as Partial<TxSuccessfulModalProps>);

export const processingModalAtom = atomWithImmer({
  open: false,
} as Partial<ProcessingModalProps>);

export const connectWalletModalAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const switchWalletModalAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const addWalletModalSwitchAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const addWalletModalSwitchWarningAtom = atomWithImmer({
  open: false,
} as Partial<RegenModalProps>);

export const accountSwitchModalAtom = atomWithImmer({
  open: false,
  prevAddr: '',
} as Partial<AccountSwitchModalProps>);
