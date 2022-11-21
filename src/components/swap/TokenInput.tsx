import React from 'react';

import { Box, TextField, useTheme } from '@mui/material';
import TokenSelectButton from './TokenSelectButton';
import { TokenType } from '../../types';

interface ITokenInputProps {
  position: 'from' | 'to';
}

const TokenInput: React.FC<ITokenInputProps> = ({
  position,
}) => {
  const theme = useTheme();

  const defaultToken: TokenType = {
    name: 'Uniswap',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    decimals: 18,
    chainId: 5,
    logoURI: 'ipfs://QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg',
  };

  return (
    <Box
      maxWidth="lg"
      sx={{
        pt: 5,
        pb: 2,
        border: '1px solid',
        borderColor: theme.palette.text.disabled,
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
      }}
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ flexGrow: 1 }} />
      <TokenSelectButton position={position} token={defaultToken} />
    </Box>
  );
};

export default TokenInput;
