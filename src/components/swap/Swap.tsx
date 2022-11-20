import React from 'react';

import { Paper } from '@mui/material';
import TokenInput from './TokenInput';

const SwapCard: React.FC = () => (
  <Paper elevation={3}>
    <h1>SwapCard</h1>
    <TokenInput position="from" />
    <TokenInput position="to" />
  </Paper>

);

export default SwapCard;
