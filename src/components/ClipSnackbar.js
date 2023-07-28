import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const ClipSnackbar = ({ open, onClose, severity, message, top = false }) => {
  const anchor = top ? { vertical: 'buttom', horizontal: 'center' } : { vertical: 'bottom', horizontal: 'left' };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={anchor}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ClipSnackbar;
