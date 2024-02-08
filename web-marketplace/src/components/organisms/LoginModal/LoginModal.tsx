import { Box } from '@mui/system';

import Modal, { RegenModalProps } from 'web-components/src/components/modal';

import { LoginModalMobile } from './components/LoginModal.Mobile';
import { LoginModalSelect } from './components/LoginModal.Select';
import { EmailFormSchemaType } from './LoginModal.schema';
import { LoginModalState, LoginProvider } from './LoginModal.types';

export interface Props extends RegenModalProps {
  state?: LoginModalState;
  wallets: LoginProvider[];
  socialProviders: LoginProvider[];
  qrCodeUri?: string;
  onEmailSubmit: (values: EmailFormSchemaType) => Promise<void>;
}

const LoginModal = ({
  open,
  onClose,
  state = 'select',
  wallets,
  socialProviders,
  qrCodeUri,
  onEmailSubmit,
}: Props): JSX.Element => {
  const isSelectState = state === 'select';
  return (
    <Modal open={open} onClose={onClose}>
      <Box>
        {isSelectState && (
          <LoginModalSelect
            wallets={wallets}
            socialProviders={socialProviders}
            onEmailSubmit={onEmailSubmit}
          />
        )}
      </Box>
    </Modal>
  );
};

export { LoginModal };
