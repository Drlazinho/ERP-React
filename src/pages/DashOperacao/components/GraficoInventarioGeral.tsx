import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import { IEstoqueInventarioCardResponse } from '../types';
import { Square } from '@mui/icons-material';

interface IGraficoProps {
  data?: IEstoqueInventarioCardResponse;
  year?: string | number;
}

export default function GraficoInvetarioGeral({ data, year }: IGraficoProps) {
  const Arr = [
    { name: 'Mês atual', value: data?.inventarioMes },
    { name: 'Ano ' + year, value: data?.inventarioAno },
  ];

  return (
    <Box sx={{ maxWidth: '100%', p: 1 }}>
      <Typography variant="body2" align="left" sx={{ mb: 2 }}>
        Inventário Geral em %
      </Typography>
      {Arr.map((item) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            mb: 2,
          }}
        >
          <Typography
            variant="body2"
            align="left"
            sx={{ whiteSpace: 'nowrap', width: 100 }}
          >
            {item.name}
          </Typography>
          <Box sx={{ position: 'relative', width: '100%' }}>
            <LinearProgress
              variant="determinate"
              sx={{
                height: 30,
                width: '100%',
                borderRadius: 1,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  borderRadius: 1,
                  background: '#02C875',
                },
              }}
              value={item.value}
            />
            <Typography
              variant="body1"
              sx={{
                position: 'absolute',
                top: 5,
                color: '#FFF',
                width: '100%',
                fontWeight: 'bold',
                textShadow: ' 1px 1px 2px black',
              }}
            >
              {item.value}/100
            </Typography>
            <Box
              sx={{
                width: 4,
                height: '100%',
                position: 'absolute',
                backgroundColor: '#787878',
                top: 0,
                right: 0,
              }}
            ></Box>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Stack direction={'row'}>
          <Square htmlColor="#02C875" />
          <Typography>Atual</Typography>
        </Stack>
        <Stack direction={'row'}>
          <Square htmlColor="#787878" />
          <Typography>Meta</Typography>
        </Stack>
      </Box>
    </Box>
  );
}
