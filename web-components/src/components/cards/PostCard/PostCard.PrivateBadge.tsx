import React from 'react';
import { Box } from '@mui/material';

import { LockIcon } from '../../icons/LockIcon';
import { Subtitle } from '../../typography';

const PrivateBadge = ({
  hasImageBlock,
  label,
}: {
  hasImageBlock?: boolean;
  label: string;
}) => (
  <Box
    className=""
    sx={theme => ({
      borderRadius: 1,
      backgroundColor: theme.palette.error.dark,
      position: 'absolute',
      left: hasImageBlock ? 12 : undefined,
      right: hasImageBlock ? undefined : { xs: undefined, md: 90 },
      top: hasImageBlock
        ? 12
        : { xs: theme.spacing(4.5), md: theme.spacing(6.5) },
      display: 'flex',
      alignItems: 'center',
      p: 0.75,
      zIndex: 1,
    })}
  >
    <LockIcon className="h-[18px] w-[18px]" />
    <Subtitle size="sm" sx={{ pl: 1 }}>
      {label}
    </Subtitle>
  </Box>
);

export default PrivateBadge;
