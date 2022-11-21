import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

interface IBasicDialogProps {
  title: string | undefined;
  okButtonTitle?: string | undefined;
  closeButtonTitle?: string | undefined;
  content: React.ReactNode | string;
  open: boolean;
  onClose?: () => void;
  onOk?: () => void | undefined;
}

const BasicDialog: React.FC<IBasicDialogProps> = ({
  title, content, open, onClose, closeButtonTitle, okButtonTitle, onOk,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const okTitle = okButtonTitle || 'OK';
  const closeTitle = closeButtonTitle || 'Close';

  const renderActions = () => (
    <DialogActions>
      {onOk !== undefined && <Button onClick={onOk}>{okTitle}</Button>}
      {onClose !== undefined && <Button onClick={onClose} autoFocus={onOk !== undefined}>{closeTitle}</Button>}
    </DialogActions>
  );
  return (

    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
    >
      {title && (
      <DialogTitle id="responsive-dialog-title">
        {title}
      </DialogTitle>
      )}
      <DialogContent>
        {content}
      </DialogContent>
      {renderActions()}
    </Dialog>

  );
};

export default BasicDialog;
