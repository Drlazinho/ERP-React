import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const GraficoBarTopUsersPorcentagem = ({ data }) => {
  const limitedData = Array.isArray(data) ? data.slice(0, 20) : [];

  const maxValue =
    limitedData.length > 0
      ? Math.max(...limitedData.map((item) => item.porcentagem))
      : 1;
  return (
    <div>
      {limitedData.length === 0 ? (
        <Typography variant="body1">Nenhum dado disponível...</Typography>
      ) : (
        limitedData.map((cliente) => (
          <Box
            key={cliente.codigo}
            display="flex"
            mb={2}
            sx={{ flexDirection: 'column' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="body2">{cliente.clienteNome}</Typography>
              <Typography variant="body2">
                {cliente.porcentagem.toFixed(2)}%
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <LinearProgress
                variant="determinate"
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#f0f0f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 5,
                    background: 'linear-gradient(90deg, #A00 0%, #EC1515 100%)',
                  },
                }}
                value={(cliente.porcentagem / maxValue) * 100}
              />
            </Box>
          </Box>
        ))
      )}
    </div>
  );
};

export default GraficoBarTopUsersPorcentagem;
