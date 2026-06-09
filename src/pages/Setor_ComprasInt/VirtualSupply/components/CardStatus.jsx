import { Box, Typography, CircularProgress } from '@mui/material';
import React from 'react';
import '../styles.css';

export default function CardStatus({
  titulo,
  quantidade,
  simbolo,
  cor = '#333',
  loading = false,
  icon: IconComponent,
}) {
  return (
    <Box
      className="cardQtd"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          color: cor, 
          fontStyle: 'normal',
        }}
      >
        {titulo}
      </Typography>
      {IconComponent && <IconComponent style={{ marginBottom: 8 }} />} {}
      <Typography
        sx={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: '20px',
          color: cor,
          fontStyle: 'normal',
          letterSpacing: '0.2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading || quantidade === undefined || quantidade === null ? (
          <CircularProgress size={24} />
        ) : (
          simbolo + quantidade
        )}
      </Typography>
    </Box>
  );
}
