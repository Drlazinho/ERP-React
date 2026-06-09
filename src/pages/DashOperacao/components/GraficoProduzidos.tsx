import { Box, LinearProgress, Typography } from '@mui/material';
import { Block } from '@mui/icons-material';
import { IProducaoProduzidos } from '../types';

interface IGraficoProps {
  data: IProducaoProduzidos;
}

const GraficoProduzidos = ({ data }: IGraficoProps) => {
  if (!data) {
    return (
      <Typography>
        <Block htmlColor="#F00" /> Não tem registros
      </Typography>
    );
  }

  const maxValue =
    Math.max(
      data.metaProducaoTotal || 0,
      data.quantidadeProduzidaTotal || 0,
      data.quantidadePendenteTotal || 0
    ) * 1.2;

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          mt: 2,
          gap: 5,
          [theme.breakpoints.down('md')]: {
            gap: 5,
          },
        })}
      >
        {/* Meta Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {(data.metaProducaoTotal || 0).toLocaleString('pt-BR')}
          </Typography>
          <Box
            sx={{
              transform: 'rotate(270deg)',
              width: 50,
              marginTop: 10,
              marginBottom: 2,
            }}
          >
            <LinearProgress
              variant="determinate"
              sx={{
                height: 50,
                width: 150,
                borderRadius: 2,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: '#1976D2',
                },
              }}
              value={(data.metaProducaoTotal / maxValue) * 100 || 0}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            Meta
          </Typography>
        </Box>

        {/* Produzido Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            {(data.quantidadeProduzidaTotal || 0).toLocaleString('pt-BR')}
          </Typography>
          <Box
            sx={{
              transform: 'rotate(270deg)',
              width: 50,
              marginTop: 10,
              marginBottom: 2,
            }}
          >
            <LinearProgress
              variant="determinate"
              sx={{
                height: 50,
                width: 150,
                borderRadius: 2,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: '#02C875',
                },
              }}
              value={(data.quantidadeProduzidaTotal / maxValue) * 100 || 0}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            Produzido
          </Typography>
        </Box>

        {/* Pendente */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography
            variant="body1"
            fontWeight="bold"
            sx={{
              color: data.quantidadePendenteTotal >= 0 ? '#000' : '#F00',
            }}
          >
            {(data.quantidadePendenteTotal || 0).toLocaleString('pt-BR')}
          </Typography>
          <Box
            sx={{
              transform: 'rotate(270deg)',
              width: 50,
              marginTop: 10,
              marginBottom: 2,
            }}
          >
            <LinearProgress
              variant="determinate"
              sx={{
                height: 50,
                width: 150,
                borderRadius: 2,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 2,
                  backgroundColor: '#FFA500',
                },
              }}
              value={(data.quantidadePendenteTotal / maxValue) * 100 || 0}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{ color: '#333', fontWeight: 'bold' }}
          >
            Saldo
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GraficoProduzidos;
