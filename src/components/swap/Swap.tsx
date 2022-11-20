import React from 'react';

import { Paper, Container } from '@mui/material';
import TokenInput from './TokenInput';

const SwapCard: React.FC = () => (
  <Container maxWidth="md">
    <Paper elevation={3} sx={{ px: 5, py: 5 }}>
      <h1>SwapCard</h1>
      <TokenInput position="from" />
      <TokenInput position="to" />
    </Paper>
  </Container>
);

export default SwapCard;
