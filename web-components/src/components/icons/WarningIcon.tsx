import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

interface IconProps {
  className?: string;
}

export default function WarningIcon({
  className,
}: IconProps): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <g id="Icon / Warning">
        <path id="!" d="M12.51 7.96899V11.973C12.51 12.183 12.5053 12.3883 12.496 12.589C12.4913 12.7897 12.482 12.9927 12.468 13.198C12.454 13.3987 12.4353 13.6063 12.412 13.821C12.3933 14.031 12.37 14.2573 12.342 14.5H11.495C11.467 14.2573 11.4413 14.031 11.418 13.821C11.3993 13.6063 11.383 13.3987 11.369 13.198C11.355 12.9927 11.3433 12.7897 11.334 12.589C11.3293 12.3883 11.327 12.183 11.327 11.973V7.96899H12.51ZM11.026 17.23C11.026 17.1087 11.047 16.9943 11.089 16.887C11.1357 16.7797 11.1963 16.6863 11.271 16.607C11.3503 16.5277 11.4437 16.4647 11.551 16.418C11.6583 16.3713 11.7727 16.348 11.894 16.348C12.0153 16.348 12.1297 16.3713 12.237 16.418C12.3443 16.4647 12.4377 16.5277 12.517 16.607C12.5963 16.6863 12.657 16.7797 12.699 16.887C12.7457 16.9943 12.769 17.1087 12.769 17.23C12.769 17.356 12.7457 17.4727 12.699 17.58C12.657 17.6827 12.5963 17.7737 12.517 17.853C12.4377 17.9323 12.3443 17.993 12.237 18.035C12.1297 18.0817 12.0153 18.105 11.894 18.105C11.7727 18.105 11.6583 18.0817 11.551 18.035C11.4437 17.993 11.3503 17.9323 11.271 17.853C11.1963 17.7737 11.1357 17.6827 11.089 17.58C11.047 17.4727 11.026 17.356 11.026 17.23Z" fill="#864A13"/>
        <path id="! (Stroke)" fill-rule="evenodd" clip-rule="evenodd" d="M12.91 7.56897V11.973C12.91 12.1873 12.9053 12.3973 12.8958 12.6029C12.8909 12.8082 12.8813 13.0156 12.8671 13.2252C12.8528 13.4301 12.8337 13.6423 12.8101 13.8603C12.7911 14.0732 12.7675 14.3017 12.7393 14.5458L12.6985 14.9H11.1385L11.0976 14.5458C11.0696 14.3027 11.0438 14.0758 11.0204 13.8651L11.0194 13.8556C11.0005 13.6389 10.9841 13.4289 10.9699 13.2258C10.9558 13.0177 10.9439 12.8112 10.9344 12.6076L10.934 12.5983C10.9292 12.3944 10.927 12.1859 10.927 11.973V7.56897H12.91ZM12.496 12.589C12.5053 12.3883 12.51 12.183 12.51 11.973V7.96897H11.327V11.973C11.327 12.183 11.3293 12.3883 11.334 12.589C11.3433 12.7896 11.355 12.9926 11.369 13.198C11.383 13.3986 11.3993 13.6063 11.418 13.821C11.4413 14.031 11.467 14.2573 11.495 14.5H12.342C12.37 14.2573 12.3933 14.031 12.412 13.821C12.4353 13.6063 12.454 13.3986 12.468 13.198C12.482 12.9926 12.4913 12.7896 12.496 12.589ZM10.7192 16.7343L10.7221 16.7275C10.7858 16.581 10.8712 16.4482 10.9797 16.3328L10.988 16.324C11.1043 16.2077 11.2402 16.1169 11.3915 16.0511C11.551 15.9818 11.7198 15.948 11.894 15.948C12.0681 15.948 12.237 15.9818 12.3965 16.0511C12.5478 16.1169 12.6835 16.2078 12.7998 16.3241C12.9175 16.4418 13.0073 16.5798 13.0688 16.7343C13.1361 16.8918 13.169 17.0583 13.169 17.23C13.169 17.4051 13.1365 17.5752 13.0675 17.7355C13.0052 17.8862 12.9152 18.0204 12.7998 18.1358C12.6821 18.2535 12.5441 18.3433 12.3896 18.4047C12.2321 18.4721 12.0656 18.505 11.894 18.505C11.7223 18.505 11.5558 18.4721 11.3983 18.4047C11.2438 18.3433 11.1058 18.2535 10.9881 18.1358L10.9796 18.1272C10.8738 18.0148 10.789 17.8867 10.7248 17.7455L10.7204 17.7357L10.7165 17.7257C10.6547 17.5678 10.626 17.4012 10.626 17.23C10.626 17.0614 10.6554 16.8974 10.7165 16.7412L10.7192 16.7343ZM11.551 18.035C11.6583 18.0816 11.7726 18.105 11.894 18.105C12.0153 18.105 12.1296 18.0816 12.237 18.035C12.3443 17.993 12.4376 17.9323 12.517 17.853C12.5963 17.7736 12.657 17.6826 12.699 17.58C12.7456 17.4726 12.769 17.356 12.769 17.23C12.769 17.1086 12.7456 16.9943 12.699 16.887C12.657 16.7796 12.5963 16.6863 12.517 16.607C12.4376 16.5276 12.3443 16.4646 12.237 16.418C12.1296 16.3713 12.0153 16.348 11.894 16.348C11.7726 16.348 11.6583 16.3713 11.551 16.418C11.4436 16.4646 11.3503 16.5276 11.271 16.607C11.1963 16.6863 11.1356 16.7796 11.089 16.887C11.047 16.9943 11.026 17.1086 11.026 17.23C11.026 17.356 11.047 17.4726 11.089 17.58C11.1356 17.6826 11.1963 17.7736 11.271 17.853C11.3503 17.9323 11.4436 17.993 11.551 18.035Z" fill="#864A13"/>
        <path id="Polygon 47" d="M8.5359 4C10.0755 1.33333 13.9245 1.33333 15.4641 4L22.3923 16C23.9319 18.6667 22.0074 22 18.9282 22H5.07179C1.99259 22 0.0680928 18.6667 1.6077 16L8.5359 4Z" stroke="#864A13" stroke-width="2"/>
      </g>
    </svg>
  );
}
