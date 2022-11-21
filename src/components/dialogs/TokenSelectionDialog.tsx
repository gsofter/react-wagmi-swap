import React from 'react';
import useAppContext from '../../lib/hooks/useAppContext';
import BasicDialog from './BasicDialog';

const TokenSelectionDialog: React.FC = () => {
  const appContext = useAppContext();
  const { tokenSelectionDialog, closeTokenSelectionDialog } = appContext;
  const { open } = tokenSelectionDialog;

  const renderDlgContent = () => (
    <div>
      <h1>Token Selection Dialog</h1>
    </div>
  );

  return (
    <BasicDialog
      title="Select Token"
      open={open}
      onClose={closeTokenSelectionDialog}
      content={renderDlgContent()}
    />
  );
};

export default TokenSelectionDialog;
