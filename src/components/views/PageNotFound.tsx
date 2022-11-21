import React from 'react';
import { Box, Typography } from '@mui/material';

export default function PageNotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1">404</Typography>
      <Typography variant="h3">Page Not Found</Typography>
    </Box>
  );
}
