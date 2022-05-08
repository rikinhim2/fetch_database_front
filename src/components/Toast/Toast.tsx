import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

interface ToastInterface {
  message: string;
  open: boolean;
  callback: (openOrClose: boolean) => void;
  severity: any;
}

const Toast: React.FC<ToastInterface> = ({
  message,
  open,
  callback,
  severity,
}) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => callback(false)}
    >
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Toast;
