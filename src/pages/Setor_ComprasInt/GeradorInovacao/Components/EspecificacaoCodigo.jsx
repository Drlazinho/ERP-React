import React from 'react';
import { Box, Typography } from '@mui/material';

const EspecificacaoCodigo = () => {
  const meses = [
    'JANEIRO',
    'FEVEREIRO',
    'MARÇO',
    'ABRIL',
    'MAIO',
    'JUNHO',
    'JULHO',
    'AGOSTO',
    'SETEMBRO',
    'OUTUBRO',
    'NOVEMBRO',
    'DEZEMBRO',
  ];
  const codigos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const nacionalidades = ['NACIONAL', 'INTERNACIONAL'];
  const nacionalidadesCodigos = ['N', 'I'];

  const voltagem = ['127V', '220V', 'BIVOLT', 'Não se aplica'];
  const voltagemCodigos = ['A', 'B', 'C', 'D'];

  return (
    <>
      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: '#fafafa',
          padding: '20px',
          borderRadius: '8px',
          color: '#333333',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
            mb: 2,
          }}
        >
          Codificações dos meses:
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              borderBottom: '1px solid #F0F0F0',
              pb: 1,
              mb: 1,
            }}
          >
            <Box sx={{ width: '50%' }}>
              <Typography fontWeight="bold">Mês</Typography>
            </Box>
            <Box sx={{ width: '50%', textAlign: 'center' }}>
              <Typography fontWeight="bold">Código</Typography>
            </Box>
          </Box>

          {meses.map((mes, index) => (
            <Box
              key={mes}
              sx={{
                display: 'flex',
                borderBottom: '1px solid #F0F0F0',
                pb: 1,
                pt: 1,
              }}
            >
              <Box sx={{ width: '50%' }}>
                <Typography fontSize="12px">{mes}</Typography>
              </Box>
              <Box sx={{ width: '50%', textAlign: 'center' }}>
                <Typography fontSize="12px">{codigos[index]}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: '#fafafa',
          padding: '20px',
          borderRadius: '8px',
          color: '#333333',
          width: '100%',
          mt: 2,
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
            mb: 2,
          }}
        >
          Codificação da nacionalidade:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {nacionalidades.map((mes, index) => (
            <Box
              key={mes}
              sx={{
                display: 'flex',
                borderBottom: '1px solid #F0F0F0',
                pb: 1,
                pt: 1,
              }}
            >
              <Box sx={{ width: '50%' }}>
                <Typography fontSize="12px">{mes}</Typography>
              </Box>
              <Box sx={{ width: '50%', textAlign: 'center' }}>
                <Typography fontSize="12px">
                  {nacionalidadesCodigos[index]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          borderBottom: '1px solid #ccc',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: '#fafafa',
          padding: '20px',
          borderRadius: '8px',
          color: '#333333',
          width: '100%',
        }}
      >
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
            mb: 2,
          }}
        >
          Codificação da voltagem:
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          {voltagem.map((mes, index) => (
            <Box
              key={mes}
              sx={{
                display: 'flex',
                borderBottom: '1px solid #F0F0F0',
                pb: 1,
                pt: 1,
              }}
            >
              <Box sx={{ width: '50%' }}>
                <Typography fontSize="12px">{mes}</Typography>
              </Box>
              <Box sx={{ width: '50%', textAlign: 'center' }}>
                <Typography fontSize="12px">
                  {voltagemCodigos[index]}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default EspecificacaoCodigo;
