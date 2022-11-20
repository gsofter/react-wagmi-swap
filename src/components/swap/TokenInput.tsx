import React from 'react';

import { Box, TextField } from '@mui/material';
import TokenSelectButton from './TokenSelectButton';

interface ITokenInputProps {
  position: 'from' | 'to';
}

const TokenInput: React.FC<ITokenInputProps> = ({
  position,
}) => (
  <Box maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
    <h1>TokenInput</h1>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    <TokenSelectButton position={position} />
  </Box>
);

export default TokenInput;
