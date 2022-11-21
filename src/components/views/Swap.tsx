import React, { useEffect } from 'react';

import {
  Paper, Container, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import { useNetwork } from 'wagmi';
import TokenInput from '../swap/TokenInput';
import TokenSelectionDialog from '../dialogs/TokenSelectionDialog';
import { UNI_LIST } from '../../constants';
import useAppContext from '../../lib/hooks/useAppContext';
import { getNativeToken } from '../../lib/utils/getNativeToken';
import { TokenType } from '../../types';

const SwapCard: React.FC = () => {
  const { setTokens } = useAppContext();
  const { chain } = useNetwork();
  const initializeTokens = async () => {
    const response = await axios.get(UNI_LIST);

    const chainId = chain?.id || 1;

    const tokens = response.data.tokens.filter((token: TokenType) => token.chainId === chainId)
      .map((token: TokenType) => ({
        ...token,
        native: false,
      }));

    // add native token to first
    tokens.unshift(getNativeToken(chainId));
    setTokens(tokens);
  };

  useEffect(() => {
    initializeTokens();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={5} sx={{ px: 2, py: 2, borderRadius: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Swap
        </Typography>
        <TokenInput position="from" />
        <TokenInput position="to" />
        <Button variant="contained" sx={{ width: '100%', mt: 2 }}>Swap</Button>
      </Paper>
      <TokenSelectionDialog />
    </Container>
  );
};

export default SwapCard;
