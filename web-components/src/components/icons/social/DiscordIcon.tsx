import React from 'react';
import { Theme } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import { makeStyles } from 'tss-react/mui';

import withHoverColor, { Props } from '../withHoverColor';

const useStyles = makeStyles()((theme: Theme) => ({
  root: {
    width: theme.spacing(9.25),
    height: theme.spacing(9.25),
  },
}));

function DiscordIcon({
  className,
  color,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element {
  const { classes, cx } = useStyles();

  return (
    <SvgIcon
      className={cx(classes.root, className)}
      viewBox="0 0 61 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <g clipPath="url(#discordIcon)">
        <path
          d="M36.4881 29.6018C34.535 29.6018 32.993 31.3217 32.993 33.4627C32.993 35.6036 34.5692 37.3235 36.4881 37.3235C38.4413 37.3235 39.9833 35.6036 39.9833 33.4627C39.9833 31.3217 38.407 29.6018 36.4881 29.6018ZM23.981 29.6018C22.0278 29.6018 20.4858 31.3217 20.4858 33.4627C20.4858 35.6036 22.0621 37.3235 23.981 37.3235C25.9342 37.3235 27.4761 35.6036 27.4761 33.4627C27.5104 31.3217 25.9342 29.6018 23.981 29.6018Z"
          fill={color}
        />
        <path
          d="M53.1414 0.399994H7.22475C3.35268 0.399994 0.200195 3.62904 0.200195 7.59515V54.6269C0.200195 58.593 3.35268 61.8221 7.22475 61.8221H46.0825L44.2664 55.3991L48.6525 59.5407L52.7987 63.4366L60.2002 70V7.59515C60.1659 3.62904 57.0134 0.399994 53.1414 0.399994ZM39.9146 45.8523C39.9146 45.8523 38.6811 44.3431 37.6531 43.0445C42.1419 41.7458 43.8552 38.9029 43.8552 38.9029C42.4503 39.8505 41.114 40.5174 39.9146 40.9737C38.2013 41.7107 36.5566 42.167 34.9461 42.4829C31.6565 43.1147 28.6411 42.9392 26.0711 42.4478C24.118 42.0617 22.4389 41.5352 21.034 40.9386C20.2459 40.6227 19.3892 40.2366 18.5326 39.7452C18.4298 39.675 18.327 39.6399 18.2242 39.5697C18.1556 39.5346 18.1214 39.4995 18.0871 39.4995C17.4703 39.1486 17.1277 38.9029 17.1277 38.9029C17.1277 38.9029 18.7724 41.6756 23.1242 43.0094C22.0963 44.3431 20.8284 45.8874 20.8284 45.8874C13.2556 45.6418 10.3772 40.5876 10.3772 40.5876C10.3772 29.3912 15.3116 20.3008 15.3116 20.3008C20.2459 16.5452 24.9061 16.6505 24.9061 16.6505L25.2487 17.0717C19.0808 18.8617 16.271 21.6345 16.271 21.6345C16.271 21.6345 17.0249 21.2133 18.2927 20.6517C21.9592 19.0021 24.8718 18.5809 26.0711 18.4405C26.2767 18.4054 26.4481 18.3703 26.6536 18.3703C28.7439 18.0896 31.1082 18.0194 33.5754 18.3001C36.8307 18.6862 40.3258 19.669 43.8895 21.6345C43.8895 21.6345 41.1825 19.0021 35.3572 17.2121L35.837 16.6505C35.837 16.6505 40.5314 16.5452 45.4315 20.3008C45.4315 20.3008 50.3658 29.3912 50.3658 40.5876C50.3658 40.5525 47.4875 45.6067 39.9146 45.8523Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="discordIcon">
          <rect
            width="60"
            height="69.6"
            fill={color}
            transform="translate(0.200195 0.399994)"
          />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default withHoverColor(DiscordIcon);
