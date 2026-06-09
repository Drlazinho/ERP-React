import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const GraficoBarTopUsers = ({ data, onClienteClick }) => {
  const limitedData = data.slice(0, 20);

  const maxValue = Math.max(...limitedData.map((item) => item.valorBruto));

  return (
    <Box
      sx={(theme) => ({
        width: '100%',
        height: '830px',
        [theme.breakpoints.down(1420)]: {
          height: '390px',
        },
        [theme.breakpoints.down('sm')]: {
          height: '400px',
        },
      })}
    >
      {limitedData.length === 0 ? (
        <Typography variant="body1">Nenhum dado disponível...</Typography>
      ) : (
        limitedData.map((cliente) => (
          <Box
            key={cliente.codigo}
            display="flex"
            mb={2}
            sx={{ flexDirection: 'column', cursor: 'pointer' }}
            onClick={() => onClienteClick(cliente.codigo)}
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
                R$ {cliente.valorBruto.toLocaleString('pt-BR')}
              </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
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
                value={(cliente.valorBruto / maxValue) * 100}
              />
            </Box>
          </Box>
        ))
      )}
    </Box>
  );
};

export default GraficoBarTopUsers;
