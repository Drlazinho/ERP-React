import React, { useState } from 'react';
import { IconButton, Snackbar, SnackbarContent, Typography } from '@mui/material';
import { Close, Info as InfoIcon } from '@mui/icons-material';
import { amber, green, red, blue } from '@mui/material/colors';

interface ToastMessage {
  type: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  description: string;
  descriptionEnglish?: string;
  descriptionChinese?: string;
}

const ToastWarning: React.FC<{ message: ToastMessage }> = ({ message }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const getBackgroundColor = () => {
    switch (message.type) {
      case 'success':
        return green[900];
      case 'danger':
        return red[900];
      case 'warning':
        return amber[900];
      case 'info':
        return blue[900];
      default:
        return blue[900];
    }
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <SnackbarContent
        style={{ backgroundColor: getBackgroundColor(), maxWidth: 500 }}
        message={
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <InfoIcon style={{ marginRight: 8 }} />
              <Typography variant="subtitle1" style={{ fontWeight: 'bold', marginRight: 8 }}>
                {message.title}
              </Typography>
              <Typography variant="caption">agora</Typography>
            </div>
            <Typography variant="body2" style={{ color: message.type !== 'info' ? 'white' : 'inherit' }}>
              {message.description}
            </Typography>
            {message.descriptionEnglish && (
              <Typography variant="body2" style={{ color: message.type !== 'info' ? 'white' : 'inherit' }}>
                {message.descriptionEnglish}
              </Typography>
            )}
            {message.descriptionChinese && (
              <Typography variant="body2" style={{ color: message.type !== 'info' ? 'white' : 'inherit' }}>
                {message.descriptionChinese}
              </Typography>
            )}
          </div>
        }
        action={
          <IconButton size="small" color="inherit" onClick={handleClose}>
            <Close />
          </IconButton>
        }
        
      />
    </Snackbar>
  );
};

export default ToastWarning;