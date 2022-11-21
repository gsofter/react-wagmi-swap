import React, { useEffect } from 'react';

import {
  Paper, Container, Typography, Button,
} from '@mui/material';
import axios from 'axios';
import TokenInput from './TokenInput';
import TokenSelectionDialog from '../dialogs/TokenSelectionDialog';
import { UNI_LIST } from '../../constants';
import useAppContext from '../../lib/hooks/useAppContext';

const SwapCard: React.FC = () => {
  const { setTokens } = useAppContext();
  const fetchTokens = async () => {
    const response = await axios.get(UNI_LIST);
    setTokens(response.data.tokens);
  };

  useEffect(() => {
    fetchTokens();
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
