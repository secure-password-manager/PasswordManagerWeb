import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function PasswordAlert(props) {
  const { anchorOrigin, duration, message, open, setOpen, severity } = props;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        open={open}
        anchorOrigin={anchorOrigin}
        autoHideDuration={duration}
        onClose={handleClose}>
        <Alert
          open={open}
          onClose={handleClose}
          severity={severity}
          sx={{width: '100%'}}>
          {message}
        </Alert>
      </Snackbar>

    </div>
  );
}