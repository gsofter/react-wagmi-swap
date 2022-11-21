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
  content: React.ReactNode | string;
  open: boolean;
  onClose: () => void;
}

const BasicDialog: React.FC<IBasicDialogProps> = ({
  title, content, open, onClose,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default BasicDialog;
