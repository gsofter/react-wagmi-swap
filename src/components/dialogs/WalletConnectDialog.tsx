import React from 'react';
import BasicDialog from './BasicDialog';

interface IWalletConnectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const WalletConnectDialog: React.FC<IWalletConnectDialogProps> = ({ open, setOpen }) => {
  const renderDlgContent = () => (
    <div>
      <p>WalletConnectDialog</p>
    </div>
  );

  return (
    <BasicDialog
      title="Wallet Connect"
      content={renderDlgContent()}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default WalletConnectDialog;
