import React from 'react';

import { Box, TextField, useTheme } from '@mui/material';
import TokenSelectButton from './TokenSelectButton';

interface ITokenInputProps {
  position: 'from' | 'to';
}

const TokenInput: React.FC<ITokenInputProps> = ({
  position,
}) => {
  const theme = useTheme();

  return (
    <Box
      maxWidth="lg"
      sx={{
        pt: 5,
        pb: 2,
        border: '1px solid',
        borderColor: theme.palette.text.disabled,
        borderRadius: 3,
      }}
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TokenSelectButton position={position} />
    </Box>
  );
};

export default TokenInput;
