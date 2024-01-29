import { isMobile as checkIsMobile } from '@walletconnect/browser-utils';

import { LoginProvider } from '../LoginModal/LoginModal.types';
import {
  getAllWalletsUiConfig,
  GetWalletsUiConfigParams,
} from './LoginButton.config';
import { mobileWalletsName } from './LoginButton.constants';

/* getWalletsUiConfig */

export const getWalletsUiConfig = ({
  connectToWallet,
}: GetWalletsUiConfigParams): LoginProvider[] => {
  const walletsUiConfig = getAllWalletsUiConfig({
    connectToWallet,
  });

  if (checkIsMobile()) {
    return walletsUiConfig.filter(wallet =>
      mobileWalletsName.includes(wallet.name),
    );
  }

  return walletsUiConfig;
};
