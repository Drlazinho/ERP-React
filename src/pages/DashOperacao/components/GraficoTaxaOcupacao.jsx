import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, CircularProgress } from '@mui/material';

const GraficoTaxaOcupacao = ({
  valor1 = 0,
  valor2 = 0,
  label1 = 'label1',
  label2 = 'label2',
  color1 = 'primary',
  color2 = 'secondary',
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [valor1, valor2]);

  const series = [Number(valor1) || 1, Number(valor2) || 1];

  const options = {
    chart: {
      type: 'donut',
      width: '100%',
      height: '100%',
    },
    colors: [`${color1}`, `${color2}`],
    labels: [`${label1}: ${valor1 || 0}`, `${label2}: ${valor2 || 0}`],
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        textShadow: '1px 1px 2px black',
        fontSize: '20px'
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
            height: '150px',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
      <Box
        id="GraficoPizza"
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F9FAFB',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ReactApexChart options={options} series={series} type="donut" />
        )}
      </Box>
  );
};

export default GraficoTaxaOcupacao;
