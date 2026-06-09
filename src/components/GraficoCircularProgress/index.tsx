import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface CircularProgressXProps {
  value: number | string;
  cor?: string;
  tamanho?: number;
  espessura?: number;
}

const GraficoCircularProgress: React.FC<CircularProgressXProps> = ({
  value,
  cor = '#1976d2',
  tamanho = 200,
  espessura = 5,
}) => {
  let valorFormatado = 0;
  if (typeof value === 'string') {
    valorFormatado = parseFloat(value.replace(',', '.')) || 0;
  } else {
    valorFormatado = value;
  }

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={tamanho}
        thickness={espessura}
        sx={{
          color: '#f2f2f2',
          position: 'absolute',
        }}
      />

      <CircularProgress
        variant="determinate"
        value={valorFormatado}
        size={tamanho}
        thickness={espessura}
        sx={{
          color: cor,
          strokeLinecap: 'round',
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" component="div" color="text.secondary">
          {`${Math.round(valorFormatado)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default GraficoCircularProgress;
