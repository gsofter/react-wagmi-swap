import React from 'react';

import { Container, TextField } from '@mui/material';

interface ITokenSelectButtonProps {
  position: 'from' | 'to';
}

const TokenSelectButton: React.FC<ITokenSelectButtonProps> = ({
  position,
}) => (
  <Container maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
    <h1>TokenSelectButton</h1>
    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
    {position}
  </Container>
);

export default TokenSelectButton;
