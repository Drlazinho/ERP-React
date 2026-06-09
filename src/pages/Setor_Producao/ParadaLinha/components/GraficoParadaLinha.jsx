import { Box, LinearProgress, Typography } from '@mui/material';
import { Block } from '@mui/icons-material';

const GraficoParadaLinha = ({ data, loading }) => {
  if (loading) {
    return <Typography>Carregando dados...</Typography>;
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Typography>
        <Block htmlColor="#F00" /> Não tem registros
      </Typography>
    );
  }

  const maxValue = Math.max(...Object.values(data)) * 1.2;

  return (
    <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          mt: 2,
          gap: 5,
          minWidth: 800,
          [theme.breakpoints.down('md')]: {
            gap: 3,
          },
        })}
      >
        {Object.entries(data).map(([motivo, valor]) => (
          <Box
            key={motivo}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body1" fontWeight="bold">
              {valor}
            </Typography>
            <Box
              sx={{
                transform: 'rotate(270deg)',
                width: 50,
              }}
            >
              <LinearProgress
                variant="determinate"
                value={(valor / maxValue) * 100}
                sx={{
                  height: 50,
                  width: 40,
                  borderRadius: 1,
                  backgroundColor: '#f0f0f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 1,
                    backgroundColor: '#AA0000',
                  },
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#333',
                fontWeight: '500',
                textAlign: 'center',
                fontSize: '10px',
              }}
            >
              {motivo}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GraficoParadaLinha;
