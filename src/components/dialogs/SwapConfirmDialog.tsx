import React from 'react';

import {
  Box,
} from '@mui/material';

import BasicDialog from './BasicDialog';
import TokenInput from '../swap/TokenInput';

interface ISwapConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onOk: () => void;
}

const SwapConfirmDialog: React.FC<ISwapConfirmDialogProps> = ({ open, onClose, onOk }) => {
  const renderDlgContent = () => (
    <Box sx={{ width: '400px' }}>
      <TokenInput position="from" disableEditing showBalanceInfo={false} />
      <TokenInput position="to" disableEditing showBalanceInfo={false} />
    </Box>
  );

  return (
    <BasicDialog
      title="Select Token"
      open={open}
      onClose={onClose}
      onOk={onOk}
      okButtonTitle="Confirm"
      content={renderDlgContent()}
    />
  );
};

export default SwapConfirmDialog;
