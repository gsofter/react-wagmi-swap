import React from 'react';

import {
  Box, Typography, CircularProgress,
} from '@mui/material';

import BasicDialog from './BasicDialog';

interface IopenSwapProcessingDlgProps {
  open: boolean;
  onClose: () => void;
}

const openSwapProcessingDlg: React.FC<IopenSwapProcessingDlgProps> = ({ open, onClose }) => {
  const renderDlgContent = () => (
    <Box sx={{
      width: '400px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      <Typography variant="body1">Transaction In Progress</Typography>
      <CircularProgress />
    </Box>
  );

  return (
    <BasicDialog
      title="Progress"
      open={open}
      onClose={onClose}
      content={renderDlgContent()}
    />
  );
};

export default openSwapProcessingDlg;
