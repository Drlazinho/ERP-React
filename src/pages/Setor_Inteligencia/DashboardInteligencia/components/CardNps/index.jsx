import React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { Block } from '@mui/icons-material';
import Loading from '@/components/Loading';
import CircularProgressWithColorX from '@/components/CircularProgressWithColorX';
import TabelaIndicadoresNPS from '../TabelaIndicadoresNPS';
import GraficoCsat from './components/GraficoCsat';

const CardNps = ({ indicadores, isLoading, filtro, dataUr }) => {
  const [data, setData] = useState({});
  return (
    <>
      <Grid
        size={{ xs: 12, sm: 6, lg: 4 }}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: '#ffff',
          minHeight: 800,
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <Box
            sx={{
              padding: 2,
              borderRadius: 2,
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                padding: 2,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: 18, fontWeight: 600 }}>
                Satisfação Geral
              </Typography>

              <GraficoCsat filtroData={filtro} />
            </Box>
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                padding: 2,
              }}
            >
              <Typography
                align="left"
                sx={{ mb: 2, fontSize: 16, fontWeight: 600 }}
              >
                Net Promoter Score (NPS)
              </Typography>
              <CircularProgressWithColorX
                cor={'#02C875'}
                value={indicadores?.indicadorNPS || 0}
                size={200}
              />
            </Box>
            <Box
              sx={{
                backgroundColor: '#F9FAFB',
                padding: 1,
              }}
            >
              <TabelaIndicadoresNPS dataFetch={dataUr} />
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default CardNps;
