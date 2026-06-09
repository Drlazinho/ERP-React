import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import './styles.css';

const GraficoPizza = ({
  valor1,
  valor2,
  label1,
  label2,
  title,
  color1,
  color2,
  color3,
  redirectTo,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

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
        colors: ['#000000'],
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        border: 1,
        borderColor: `${color3}`,
        p: 2,
        background: '#fff',
        height: '100%',
      }}
    >
      <Link
        to={redirectTo}
        style={{ textDecoration: 'none', color: '#333333' }}
      >
        <Typography
          variant="h7"
          sx={{ mb: 1, width: '100%', fontWeight: 'bold' }}
        >
          {title}
        </Typography>
      </Link>

      <Box
        id="GraficoPizza"
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ReactApexChart options={options} series={series} type="donut" />
        )}
      </Box>
    </Paper>
  );
};

export default GraficoPizza;
