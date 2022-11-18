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
  setOpen: (open: boolean) => void;
}

const BasicDialog: React.FC<IBasicDialogProps> = ({
  title, content, open, setOpen,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  return (

    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
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
        <Button autoFocus onClick={handleClose}>
          Disagree
        </Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default BasicDialog;
