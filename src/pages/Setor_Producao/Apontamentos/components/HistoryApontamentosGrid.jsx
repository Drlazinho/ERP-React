import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';

export default function HistoryApontamentosGrid({
  codigo,
  apelido,
  dataProducao,
  linha,
  imagem,
  qtd,
}) {
  return (
    <Paper elevation={8} sx={{ m: 1 }}>
      <Card
        sx={{
          display: 'flex',
          background: '#1b1b1b',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ py: 1, px: 2 }}>
          <Chip
            label={apelido}
            color="warning"
            sx={{ fontSize: '1rem' }}
            variant="outlined"
          />
          <Divider variant="middle" sx={{ background: '#fff' }} />
          <Typography
            component={'div'}
            variant="body2"
            textAlign={'center'}
            color={'#29b6f6'}
          >
            {codigo}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mt: 2,
              mb: 1,
            }}
          >
            <Typography
              component={'div'}
              variant="body2"
              textAlign={'center'}
              color={'#fff'}
            >
              Linha: <Chip label={linha} color="error" size="small" />
            </Typography>
            <Typography
              component={'div'}
              variant="body2"
              textAlign={'center'}
              color={'#fff'}
            >
              {qtd}
            </Typography>
          </Box>
          <Divider variant="middle" sx={{ background: '#fff' }} />
          <Typography
            component={'p'}
            variant="body2"
            textAlign={'center'}
            color={'#fff'}
          >
            Data:{' '}
            <Typography component={'span'} color={'#66bb6a'}>
              {dataProducao}
            </Typography>
          </Typography>
        </Box>
        <CardMedia
          component={'img'}
          sx={{ width: 120 }}
          image={imagem}
          alt="imagem do produto"
        />
      </Card>
    </Paper>
  );
}
