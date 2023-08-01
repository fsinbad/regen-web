import React from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

export const NoProjectIcon: React.FC<React.PropsWithChildren<SvgIconProps>> =
  props => {
    return (
      <SvgIcon
        {...props}
        width="101"
        height="101"
        viewBox="0 0 101 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.8389 28.164V19.5H82.8389V28.164L17.8389 28.164ZM13.8389 31.4859V28.414V18.5C13.8389 16.8431 15.182 15.5 16.8389 15.5H83.8389C85.4957 15.5 86.8389 16.8431 86.8389 18.5V28.414V31.4859V45.9222C85.6002 44.7266 84.2573 43.6952 82.8389 42.8282V31.7359L17.8389 31.7359V68.9752H48.5749C49.0378 70.3503 49.6402 71.6906 50.382 72.9752H16.8389C15.182 72.9752 13.8389 71.632 13.8389 69.9752V31.4859ZM48.3889 55.4699C47.648 57.889 47.3328 60.4055 47.4432 62.9074C47.4252 62.9084 47.4071 62.9089 47.3889 62.9089H44.5545C44.3831 62.9428 44.206 62.9606 44.0246 62.9606H27.2034C27.0221 62.9606 26.8449 62.9428 26.6735 62.9089H23.8389C23.2866 62.9089 22.8389 62.4612 22.8389 61.9089V38.9056C22.8389 38.3533 23.2866 37.9056 23.8389 37.9056H47.3889C47.9412 37.9056 48.3889 38.3533 48.3889 38.9056V55.4699ZM54.5096 45.6988C54.405 45.797 54.3011 45.8964 54.1979 45.9969C54.1276 46.0654 54.0579 46.1341 53.9888 46.2032V45.9488C53.9888 45.8107 54.1007 45.6988 54.2388 45.6988H54.5096ZM75.8888 39.9994C70.64 38.7937 65.0429 39.3946 60.1415 41.8022H54.2388C54.1007 41.8022 53.9888 41.6903 53.9888 41.5522V38.1556C53.9888 38.0175 54.1007 37.9056 54.2388 37.9056L75.6388 37.9056C75.7768 37.9056 75.8888 38.0175 75.8888 38.1556V39.9994ZM26.9361 60.9089H44.2919C44.5541 60.8031 44.739 60.5462 44.739 60.2462C44.739 58.668 43.4597 57.3887 41.8815 57.3887H29.3465C27.7684 57.3887 26.489 58.668 26.489 60.2462C26.489 60.5462 26.674 60.8031 26.9361 60.9089ZM46.3889 39.9056V58.4319C45.6701 56.6479 43.9228 55.3887 41.8815 55.3887H41.0889V48.7821C41.0889 48.7015 41.0501 48.6259 40.9847 48.5789L35.7597 44.8293C35.6726 44.7667 35.5553 44.7667 35.4682 44.8293L30.2432 48.5789C30.1777 48.6259 30.1389 48.7015 30.1389 48.7821V55.3887H29.3465C27.3049 55.3887 25.5575 56.6482 24.8389 58.4326V39.9056H46.3889ZM39.0889 49.6802L35.6139 47.1864L32.1389 49.6802V55.2263H39.0889V49.6802ZM21.8389 25.5C22.9434 25.5 23.8389 24.6046 23.8389 23.5C23.8389 22.3954 22.9434 21.5 21.8389 21.5C20.7343 21.5 19.8389 22.3954 19.8389 23.5C19.8389 24.6046 20.7343 25.5 21.8389 25.5ZM29.8389 23.5C29.8389 24.6046 28.9434 25.5 27.8389 25.5C26.7343 25.5 25.8389 24.6046 25.8389 23.5C25.8389 22.3954 26.7343 21.5 27.8389 21.5C28.9434 21.5 29.8389 22.3954 29.8389 23.5ZM33.8389 25.5C34.9434 25.5 35.8389 24.6046 35.8389 23.5C35.8389 22.3954 34.9434 21.5 33.8389 21.5C32.7343 21.5 31.8389 22.3954 31.8389 23.5C31.8389 24.6046 32.7343 25.5 33.8389 25.5Z"
          fill="#8F8F8F"
        />
        <mask id="path-2-inside-1_11169_17843" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M79.4137 51.5833L60.11 70.388C55.568 65.1448 55.8324 57.2958 60.9033 52.356C65.9742 47.4161 74.0314 47.1586 79.4137 51.5833ZM82.0703 54.506L63.1103 72.976C68.4221 76.3548 75.6127 75.7724 80.2768 71.2288C84.9409 66.6852 85.5387 59.6805 82.0703 54.506ZM83.142 49.5648C89.6467 55.9015 90.0479 65.9325 84.3453 72.7247C84.4251 72.7821 84.5014 72.8459 84.5736 72.9163L95.6434 83.6998C96.4245 84.4607 96.4245 85.6943 95.6434 86.4552C94.8624 87.216 93.596 87.216 92.815 86.4552L81.7452 75.6716C81.663 75.5915 81.5895 75.5062 81.5246 75.4167C74.5591 80.7356 64.4539 80.27 58.0381 74.02C51.1058 67.2669 51.1058 56.3179 58.0381 49.5648C64.9703 42.8117 76.2097 42.8117 83.142 49.5648Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M79.4137 51.5833L60.11 70.388C55.568 65.1448 55.8324 57.2958 60.9033 52.356C65.9742 47.4161 74.0314 47.1586 79.4137 51.5833ZM82.0703 54.506L63.1103 72.976C68.4221 76.3548 75.6127 75.7724 80.2768 71.2288C84.9409 66.6852 85.5387 59.6805 82.0703 54.506ZM83.142 49.5648C89.6467 55.9015 90.0479 65.9325 84.3453 72.7247C84.4251 72.7821 84.5014 72.8459 84.5736 72.9163L95.6434 83.6998C96.4245 84.4607 96.4245 85.6943 95.6434 86.4552C94.8624 87.216 93.596 87.216 92.815 86.4552L81.7452 75.6716C81.663 75.5915 81.5895 75.5062 81.5246 75.4167C74.5591 80.7356 64.4539 80.27 58.0381 74.02C51.1058 67.2669 51.1058 56.3179 58.0381 49.5648C64.9703 42.8117 76.2097 42.8117 83.142 49.5648Z"
          fill="#8F8F8F"
        />
        <path
          d="M60.11 70.388L59.3542 71.0428L60.0484 71.8442L60.8078 71.1044L60.11 70.388ZM79.4137 51.5833L80.1115 52.2996L80.9116 51.5201L80.0488 50.8108L79.4137 51.5833ZM60.9033 52.356L60.2055 51.6397L60.9033 52.356ZM82.0703 54.506L82.9009 53.9492L82.2325 52.9519L81.3725 53.7897L82.0703 54.506ZM63.1103 72.976L62.4125 72.2597L61.5073 73.1415L62.5736 73.8197L63.1103 72.976ZM80.2768 71.2288L79.579 70.5125L80.2768 71.2288ZM84.3453 72.7247L83.5795 72.0817L82.8864 72.9073L83.7615 73.5366L84.3453 72.7247ZM83.142 49.5648L82.4442 50.2811L83.142 49.5648ZM84.5736 72.9163L83.8758 73.6326L83.8759 73.6326L84.5736 72.9163ZM95.6434 83.6998L96.3412 82.9835L95.6434 83.6998ZM92.815 86.4552L93.5128 85.7389L92.815 86.4552ZM81.7452 75.6716L81.0474 76.3879L81.0474 76.3879L81.7452 75.6716ZM81.5246 75.4167L82.334 74.8295L81.7321 74L80.9177 74.622L81.5246 75.4167ZM58.0381 74.02L57.3403 74.7363L58.0381 74.02ZM58.0381 49.5648L58.7358 50.2811L58.0381 49.5648ZM60.8078 71.1044L80.1115 52.2996L78.7159 50.867L59.4122 69.6717L60.8078 71.1044ZM60.8659 69.7333C56.6688 64.8883 56.9115 57.6407 61.6011 53.0723L60.2055 51.6397C54.7533 56.9509 54.4671 65.4013 59.3542 71.0428L60.8659 69.7333ZM61.6011 53.0723C66.3026 48.4923 73.7854 48.2509 78.7787 52.3557L80.0488 50.8108C74.2774 46.0663 65.6457 46.34 60.2055 51.6397L61.6011 53.0723ZM81.3725 53.7897L62.4125 72.2597L63.8081 73.6923L82.7681 55.2223L81.3725 53.7897ZM79.579 70.5125C75.2562 74.7236 68.5784 75.269 63.647 72.1322L62.5736 73.8197C68.2658 77.4405 75.9691 76.8211 80.9746 71.9451L79.579 70.5125ZM81.2396 55.0628C84.4428 59.8416 83.893 66.3099 79.579 70.5125L80.9746 71.9451C85.9887 67.0605 86.6346 59.5194 82.9009 53.9492L81.2396 55.0628ZM85.1112 73.3677C91.1484 66.1768 90.7219 55.5528 83.8398 48.8485L82.4442 50.2811C88.5716 56.2502 88.9473 65.6881 83.5795 72.0817L85.1112 73.3677ZM85.2714 72.2C85.1634 72.0947 85.0489 71.9989 84.9291 71.9128L83.7615 73.5366C83.8013 73.5652 83.8395 73.5971 83.8758 73.6326L85.2714 72.2ZM96.3412 82.9835L85.2714 72.1999L83.8759 73.6326L94.9456 84.4162L96.3412 82.9835ZM96.3412 87.1715C97.5252 86.0181 97.5252 84.1369 96.3412 82.9835L94.9456 84.4162C95.3237 84.7845 95.3237 85.3705 94.9456 85.7389L96.3412 87.1715ZM92.1172 87.1715C93.2865 88.3106 95.1719 88.3106 96.3412 87.1715L94.9456 85.7389C94.5529 86.1215 93.9055 86.1215 93.5128 85.7389L92.1172 87.1715ZM81.0474 76.3879L92.1172 87.1715L93.5128 85.7389L82.443 74.9553L81.0474 76.3879ZM80.7152 76.004C80.8135 76.1396 80.9244 76.2681 81.0474 76.3879L82.443 74.9553C82.4016 74.9149 82.3654 74.8728 82.334 74.8295L80.7152 76.004ZM57.3403 74.7363C64.1173 81.3381 74.7784 81.8263 82.1315 76.2115L80.9177 74.622C74.3398 79.6448 64.7905 79.2018 58.7358 73.3037L57.3403 74.7363ZM57.3403 48.8485C50.0051 55.9942 50.0051 67.5906 57.3403 74.7363L58.7358 73.3037C52.2065 66.9431 52.2065 56.6417 58.7358 50.2811L57.3403 48.8485ZM83.8398 48.8485C76.5192 41.7172 64.6608 41.7172 57.3403 48.8485L58.7358 50.2811C65.2798 43.9063 75.9002 43.9063 82.4442 50.2811L83.8398 48.8485Z"
          fill="#8F8F8F"
          mask="url(#path-2-inside-1_11169_17843)"
        />
      </SvgIcon>
    );
  };
