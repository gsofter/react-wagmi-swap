import React from 'react';

import {
  Paper, Container, Typography, Button,
} from '@mui/material';
import TokenInput from './TokenInput';
import TokenSelectionDialog from '../dialogs/TokenSelectionDialog';

const SwapCard: React.FC = () => (
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

export default SwapCard;
