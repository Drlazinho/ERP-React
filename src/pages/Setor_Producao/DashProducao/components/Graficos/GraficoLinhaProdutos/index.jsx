import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import './styles.css';
import { Box, CircularProgress } from '@mui/material';

const GraficoLinhasProduto = ({ data = [], isLoading }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      setIsLoaded(true);
    } else if (data.length === 0) {
      const timer = setTimeout(() => {
        setIsLoaded(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {isLoading ? (
          <>
            <svg width={0} height={0}>
              <defs>
                <linearGradient
                  id="my_gradient"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#e01cd5" />
                  <stop offset="100%" stopColor="#1CB5E0" />
                </linearGradient>
              </defs>
            </svg>
            <CircularProgress
              sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
            />
            <Box>Carregando dados...</Box>
          </>
        ) : (
          <Box>Nenhuma informação disponível no momento.</Box>
        )}
      </Box>
    );
  }

  const linhasOrdenadas = [...data].sort((a, b) => a.linha - b.linha);
  const categories = linhasOrdenadas.map((item) => `${item.linha}`);
  const series = [
    {
      name: 'Produção',
      data: linhasOrdenadas.map((item) => item.quantidade),
    },
  ];

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
    },
    colors: ['#43AA8B'],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 8,
      },
    },
    xaxis: {
      categories: categories,
    },
    legend: {
      position: 'top',
    },
  };

  return (
    <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default GraficoLinhasProduto;
