import { Box, LinearProgress, Typography } from '@mui/material';
import { IResultadoEstoqueInventario } from '../types'
import { Block } from '@mui/icons-material'

interface IGraficoProps {
  data: IResultadoEstoqueInventario[]
}

const GraficoInventarioArmazem = ({ data } : IGraficoProps) => {
  const dadosTransformados = data?.map((item) => {
    const acuracidadeNumero = parseFloat(
      item.acuracidade.replace('%', '').replace(',', '.')
    );
    const cor = acuracidadeNumero >= 80.0 ? 'vermelho' : 'verde';
    return {
      armazem: item.armazem,
      acuracidade: acuracidadeNumero,
      cor: cor,
    };
  });
  
  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Typography variant="body2" align="left">
        Inventário por armazém
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          mt: 2,
        }}
      >
        {!data && <Typography><Block htmlColor='#F00'/> Não tem registros</Typography>}
        {dadosTransformados?.map((dado) => (
          <Box
            key={dado.armazem}
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              gap: 6,
              p: 0,
              m: 0,
            }}
          >
            <Typography variant="body2">{dado.acuracidade}</Typography>
            <Box
              sx={{
                transform: 'rotate(270deg)',
                width: 50,
                marginTop: 2,
                marginBottom: -4,
              }}
            >
              <LinearProgress
                variant="determinate"
                sx={{
                  height: 30,
                  width: 100,
                  borderRadius: 2,
                  backgroundColor: '#f0f0f0',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 2,
                    background: dado.acuracidade > 80 ?
                     '#FF6161' : '#02C875',
                  },
                }}
                value={dado.acuracidade}
              />
            </Box>
            <Typography variant="body2">{dado.armazem}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default GraficoInventarioArmazem;
