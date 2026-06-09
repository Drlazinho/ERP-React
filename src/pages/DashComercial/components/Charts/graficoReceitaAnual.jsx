import { Box, LinearProgress, Typography, Chip, Stack } from '@mui/material';
import { Block } from '@mui/icons-material';

const GraficoReceitaAnual = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Typography>
        <Block htmlColor="#F00" /> Não há dados disponíveis
      </Typography>
    );
  }

  const dadosGrafico = data.map((item) => ({
    ano: item.ano.toString(),
    acumulado: item.receitaBruta,
  }));

  const maxValue =
    Math.max(...dadosGrafico.map((item) => item.acumulado)) * 1.2;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box
      sx={{
        width: '100%',
        p: 1,
      }}
    >
      <Typography
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333', fontSize: '12px' }}
      >
        Receita Total por Ano
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          mt: 10,
        }}
      >
        {dadosGrafico.map((item) => (
          <Box
            key={item.ano}
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            })}
          >
            <Box
              sx={{
                transform: 'rotate(270deg)',
                width: 60,
                marginTop: 24,
                marginBottom: 2,
                position: 'relative',
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(item.acumulado / maxValue) * 100}
                sx={{
                  height: 50,
                  width: 300,
                  borderRadius: 1,
                  backgroundColor: '#f0f0f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 1,
                    background: 'linear-gradient(90deg, #A00 0%, #EC1515 100%)',
                  },
                }}
              />

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '100%',
                  transform: 'translate(50%, -50%) rotate(360deg)',
                  alignItems: 'center',
                }}
              >
                <Chip
                  label={formatCurrency(item.acumulado)}
                  sx={{
                    backgroundColor: '#fff',
                    color: '#a00',
                    fontWeight: '700',
                    fontSize: '14px',
                    height: '28px',
                    '& .MuiChip-label': {
                      padding: '0 8px',
                    },
                  }}
                />
              </Stack>
            </Box>
            <Typography fontWeight="bold" sx={{ mt: 1, fontSize: '12px' }}>
              {item.ano}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GraficoReceitaAnual;
