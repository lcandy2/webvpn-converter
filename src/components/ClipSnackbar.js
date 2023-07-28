import React from 'react';
import { Snackbar, Alert, Typography } from '@mui/material';

const ClipSnackbar = ({ open, onClose, severity, message, top = false }) => {
  const anchor = top ? { vertical: 'buttom', horizontal: 'center' } : { vertical: 'bottom', horizontal: 'left' };

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={anchor}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
};

export default ClipSnackbar;
