import { apiUri } from 'lib/apiUri';

export const mobileWalletsName = ['WalletConnect'];

export const socialProviders = [
  {
    name: 'Google',
    imageUrl: '/png/google.png',
    onClick: () => {
      window.location.href = `${apiUri}/marketplace/v1/auth/google`;
    },
  },
];

export const RESEND_TEXT = 'Don’t see anything?';
export const RESEND_SUCCES = 'New confirmation code sent';
export const RESEND_BUTTON_TEXT = 'Resend email';
export const EMAIL_CONFIRMATION_CANCEL = 'cancel';
export const EMAIL_CONFIRMATION_SUBMIT = 'log in';
export const EMAIL_CONFIRMATION_SUCCES = 'Sign in successful';
export const DEFAULT_VALIDATE_ERROR =
  'Incorrect code! Double-check the code and try again.';
export const CODE_EXPIRED_ERROR = 'This code has expired!';
export const DEFAULT_RESEND_ERROR = 'Failed to resend passcode';
