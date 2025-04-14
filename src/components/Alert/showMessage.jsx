import React from 'react';
import ReactDOM from 'react-dom/client';
import { Snackbar, Alert } from '@mui/material';

export const showMessage = (message, severity = 'success') => {
  const div = document.createElement('div');
  document.body.appendChild(div);

  const root = ReactDOM.createRoot(div);

  const handleClose = () => {
    root.unmount();
    div.remove();
  };

  root.render(
    <Snackbar
      open
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
