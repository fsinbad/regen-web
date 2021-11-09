import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

interface IconProps {
  className?: string;
}

export default function CheckIcon({ className }: IconProps): JSX.Element {
  return (
    <SvgIcon
      className={className}
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
    >
      <mask
        id="path-1-outside-1"
        maskUnits="userSpaceOnUse"
        x="0.447266"
        y="3.1853"
        width="17"
        height="13"
        fill="black"
      >
        <rect fill="white" x="0.447266" y="3.1853" width="17" height="13" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.313 4.25853C15.2153 4.1609 15.057 4.16089 14.9594 4.25853L6.88587 12.3321L2.52222 7.96842C2.42459 7.87079 2.2663 7.87079 2.16867 7.96842L1.52049 8.6166C1.42286 8.71423 1.42286 8.87252 1.52049 8.97015L6.70534 14.155C6.75512 14.2048 6.82066 14.2292 6.88589 14.2282C6.95111 14.2292 7.01663 14.2048 7.06639 14.155L15.9611 5.26026C16.0588 5.16263 16.0588 5.00434 15.9611 4.90671L15.313 4.25853Z"
        />
      </mask>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.313 4.25853C15.2153 4.1609 15.057 4.16089 14.9594 4.25853L6.88587 12.3321L2.52222 7.96842C2.42459 7.87079 2.2663 7.87079 2.16867 7.96842L1.52049 8.6166C1.42286 8.71423 1.42286 8.87252 1.52049 8.97015L6.70534 14.155C6.75512 14.2048 6.82066 14.2292 6.88589 14.2282C6.95111 14.2292 7.01663 14.2048 7.06639 14.155L15.9611 5.26026C16.0588 5.16263 16.0588 5.00434 15.9611 4.90671L15.313 4.25853Z"
        fill="#4FB573"
      />
      <path
        d="M14.9594 4.25853L14.2523 3.55142L14.2523 3.55142L14.9594 4.25853ZM15.313 4.25853L16.0201 3.55142L16.0201 3.55142L15.313 4.25853ZM6.88587 12.3321L6.17876 13.0392L6.88587 13.7463L7.59297 13.0392L6.88587 12.3321ZM2.52222 7.96842L1.81512 8.67553L1.81512 8.67553L2.52222 7.96842ZM2.16867 7.96842L1.46156 7.26131L1.46156 7.26131L2.16867 7.96842ZM1.52049 8.6166L2.2276 9.32371L2.2276 9.32371L1.52049 8.6166ZM1.52049 8.97015L0.813382 9.67726L0.813382 9.67726L1.52049 8.97015ZM6.70534 14.155L7.41245 13.4479L6.70534 14.155ZM6.88589 14.2282L6.90069 13.2283L6.8858 13.2281L6.87091 13.2283L6.88589 14.2282ZM7.06639 14.155L7.77349 14.8621L7.7735 14.8621L7.06639 14.155ZM15.9611 5.26026L15.254 4.55315L15.254 4.55315L15.9611 5.26026ZM15.9611 4.90671L15.254 5.61381L15.254 5.61382L15.9611 4.90671ZM15.6665 4.96563C15.3736 5.25853 14.8987 5.25852 14.6058 4.96563L16.0201 3.55142C15.5319 3.06327 14.7405 3.06326 14.2523 3.55142L15.6665 4.96563ZM7.59297 13.0392L15.6665 4.96563L14.2523 3.55142L6.17876 11.625L7.59297 13.0392ZM7.59297 11.625L3.22933 7.26131L1.81512 8.67553L6.17876 13.0392L7.59297 11.625ZM3.22933 7.26131C2.74118 6.77316 1.94972 6.77316 1.46156 7.26131L2.87578 8.67553C2.58288 8.96842 2.10801 8.96842 1.81512 8.67553L3.22933 7.26131ZM1.46156 7.26131L0.813382 7.90949L2.2276 9.32371L2.87578 8.67553L1.46156 7.26131ZM0.813383 7.90949C0.325225 8.39765 0.325228 9.18911 0.813382 9.67726L2.2276 8.26305C2.52049 8.55594 2.52049 9.03081 2.2276 9.32371L0.813383 7.90949ZM0.813382 9.67726L5.99824 14.8621L7.41245 13.4479L2.2276 8.26305L0.813382 9.67726ZM5.99824 14.8621C6.24698 15.1109 6.57643 15.233 6.90087 15.2281L6.87091 13.2283C7.06488 13.2254 7.26325 13.2987 7.41245 13.4479L5.99824 14.8621ZM6.35929 13.4479C6.50844 13.2987 6.70675 13.2254 6.90069 13.2283L6.87109 15.2281C7.19546 15.2329 7.52481 15.1108 7.77349 14.8621L6.35929 13.4479ZM15.254 4.55315L6.35928 13.4479L7.7735 14.8621L16.6682 5.96737L15.254 4.55315ZM15.254 5.61382C14.9611 5.32092 14.9611 4.84605 15.254 4.55315L16.6682 5.96737C17.1564 5.47921 17.1564 4.68775 16.6682 4.1996L15.254 5.61382ZM14.6058 4.96563L15.254 5.61381L16.6682 4.1996L16.0201 3.55142L14.6058 4.96563Z"
        fill="#4FB573"
        mask="url(#path-1-outside-1)"
      />
    </SvgIcon>
  );
}
