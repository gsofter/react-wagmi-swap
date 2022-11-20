import React from 'react';

import { Container } from '@mui/material';

interface ITokenSelectButtonProps {
  position: 'from' | 'to';
}

const TokenSelectButton: React.FC<ITokenSelectButtonProps> = ({
  position,
}) => (
  <Container maxWidth="lg" sx={{ pt: 5, pb: 2 }}>
    {position}
  </Container>
);

export default TokenSelectButton;
