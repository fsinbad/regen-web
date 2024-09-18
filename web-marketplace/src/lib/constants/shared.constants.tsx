import { msg, Trans } from '@lingui/macro';
import { Link } from '@mui/material';

import {
  MAX_FRACTION_DIGITS,
  MEMO_MAX_LENGTH,
} from 'web-components/src/components/inputs/validation';

import { TranslatorType } from 'lib/i18n/i18n.types';

export const COPY_SUCCESS = msg`Link copied!`;
export const EDIT_TEXT = msg`Edit`;
export const DRAFT_TEXT = msg`Draft`;
export const SAVE_TEXT = msg`Next`;
export const SAVE_EXIT_TEXT = msg`Save draft & exit`;
export const SUBMIT_TEXT = msg`submit`;
export const SUBMIT_ERRORS = msg`Please correct the errors above`;

export const BATCH_LABEL = msg`Choose ecocredits batch`;
export const BATCH_DESCRIPTION = (
  <Trans>
    Choose any ecocredits that are eligible for this basket.
    <Link
      href="https://guides.regen.network/guides/regen-marketplace/baskets/put-in-basket"
      target="_blank"
    >
      Learn more»
    </Link>
  </Trans>
);
export const BASKET_LABEL = msg`Choose basket`;
export const AMOUNT_LABEL = msg`Amount`;
export const BASKET_PUT_SUBMIT_LABEL = msg`Put in basket`;
export const SUBMIT_ERROR_TEXT = msg`Please correct the errors above`;
export const BASKET_TAKE_AMOUNT_ERROR_TEXT = msg`You don't have enough basket tokens`;
export const RETIRE_ON_TAKE_LABEL = msg`Retire credits upon transfer`;
export const RETIRE_ON_TAKE_TOOLTIP = msg`The creator of this basket has chosen that all credits must be retired upon take.`;
export const BASKET_TAKE_SUBMIT_LABEL = msg`take from basket`;
export const getBottomFieldsTextMapping = (_: TranslatorType) => ({
  title: _(msg`Retirement reason`),
  tooltip: _(
    msg`You can add the name of the organization or person you are retiring the credits on behalf of here (i.e. "Retired on behalf of ABC Organization")`,
  ),
  reasonLabel: _(msg`Explain the reason you are retiring these credits`),
  locationTitle: _(msg`Location of retirement`),
  locationTooltip: _(
    msg`The retirement location can be where you live or your business operates.`,
  ),
  locationDescription: _(
    msg`Please enter a location for the retirement of these credits. This prevents double counting of credits in different locations.`,
  ),
  countryLabel: _(msg`Country`),
  stateLabel: _(msg`State / Region`),
  postalCodeLabel: _(msg`Postal Code`),
});
export const STATE_PROVINCE_ERROR_TEXT = msg`Required with postal code`;
export const RETIREMENT_INFO_TEXT = msg`Retirement is permanent and non-reversible.`;
export const APPLY = msg`Apply`;
export const CANCEL = msg`Cancel`;
export const UPDATE = msg`Update`;
export const UPLOADING = msg`Uploading image`;
export const TITLE_IGNORE_CROP = msg`Update image details`;
export const TITLE_CROP = msg`Position and size your image`;
export const AVAILABLE_LABEL = msg`Available`;
export const AMOUNT_SELL_LABEL = msg`Amount to sell`;
export const MAX_LABEL = msg`Max`;
export const EMAIL_CONFIRMATION_ARIA_LABEL = msg`Character`;
export const FILE_UPLOADING_TITLE = msg`File is uploading`;
export const FILE_UPLOADING_DESCRIPTION = msg`This may take some time if your file size is large.`;
export const FILE_DROP_LOCATION_TEXT = msg`Location`;
export const FILE_DROP_MOVE_UP_TEXT = msg`Move up`;
export const FILE_DROP_MOVE_DOWN_TEXT = msg`Move down`;
export const FILE_DROP_BUTTON_TEXT = msg`+ add`;
export const EXAMPLE_TEXT = msg`See an example»`;
export const COUNTRY_LABEL = msg`Country`;
export const STATE_LABEL = msg`State / Region`;
export const RADIO_PREFERABLE = msg`(preferable)`;
export const RADIO_DEFAULT_OPTIONAL = msg`(optional)`;
export const EMPTY_OPTION_TEXT = msg`No options available`;
export const REQUIRED_MESSAGE = msg`This field is required`;
export const INVALID_EMAIL_MESSAGE = msg`Please enter a valid email address`;
export const INVALID_PASSWORD =
  'Your password must contain at least 1 letter, 1 number, 1 special character (!@#$%^&*) and at least 8 characters';
export const REQUIREMENT_AGREEMENT = msg`You must agree to continue`;
export const INVALID_AMOUNT = msg`Please enter a valid amount`;
export const INSUFFICIENT_CREDITS = "You don't have enough credits";
export const INVALID_DATE = msg`Invalid date`;
export const INVALID_PAST_DATE = msg`Must be a date in the past`;
export const INVALID_URL = msg`Please enter a valid URL`;
export const INVALID_VCS_RETIREMENT =
  'Please enter a valid VCS retirement serial number';
export const INVALID_VCS_ID = msg`Please enter a valid VCS Project ID`;
export const INVALID_JSON = msg`Please enter valid JSON-LD`;
export const INVALID_REGEN_ADDRESS = msg`Invalid regen address`;
export const INVALID_POLYGON_ADDRESS = msg`Invalid Polygon address`;
export const REQUIRED_DENOM = msg`Please choose a denom`;
export const INVALID_DECIMAL_COUNT = `More than ${MAX_FRACTION_DIGITS} decimal places not allowed`;
export const INVALID_MEMO_LENGTH = `Must be ${MEMO_MAX_LENGTH} characters or fewer`;
export const POSITIVE_NUMBER = msg`Must be positive`;

// Functions
type GetMaximumDecimalMessageProps = {
  _: TranslatorType;
  maximumFractionDigits: number;
};
export const getMaximumDecimalMessage = ({
  _,
  maximumFractionDigits,
}: GetMaximumDecimalMessageProps) =>
  _(msg`Maximum ${maximumFractionDigits} decimal places`);
