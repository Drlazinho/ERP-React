import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const GraficoBarTopUsers = ({ data, onClienteClick }) => {
  const limitedData = data.slice(0, 20);
  const maxValue = Math.max(...limitedData.map((item) => item.valorBruto));

  return (
    <Box sx={{ width: '100%' }}>
      {limitedData.length === 0 ? (
        <Typography variant="body1">Nenhum dado disponível...</Typography>
      ) : (
        limitedData.map((cliente) => (
          <Box
            key={cliente.codigoGrupoDeVenda}
            display="flex"
            mb={2}
            sx={{ flexDirection: 'column', cursor: 'pointer' }}
            onClick={() => onClienteClick(cliente.codigoGrupoDeVenda)}
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
