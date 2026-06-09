import { Box, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import './styles.css';

const GraficoProduto = ({ data = [], isLoading }) => {
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

  const getTresUltimasPalavras = (descricao) => {
    const palavras = descricao.split(' ');
    if (palavras.length <= 4) {
      return descricao;
    }
    return palavras.slice(-4).join(' ');
  };

  const categorias = data.map((item) => getTresUltimasPalavras(item.descricao));
  const quantidades = data.map((item) => item.quantidade);

  const options = {
    chart: {
      type: 'bar',
      redrawOnParentResize: true,
      toolbar: {
        show: true,
      },
    },
    colors: ['#1F497D'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        endingShape: 'rounded',
        borderRadius: 8,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '12px',
        colors: ['#000'],
      },
      formatter: (val) => val.toLocaleString(),
      offsetY: 100,
    },
    xaxis: {
      categories: categorias,
      labels: {
        rotate: -45,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          whiteSpace: 'break-spaces',
        },
        textAnchor: 'middle',
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: (val) => val.toLocaleString(),
        style: {
          colors: '#000',
          fontSize: '12px',
          fontWeight: 500,
        },
      },
      axisBorder: {
        show: true,
        color: '#000',
      },
      axisTicks: {
        show: true,
        color: '#000',
      },
    },
    grid: {
      show: true,
      borderColor: '#ccc',
      strokeDashArray: 4,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val.toLocaleString()} unidades`,
      },
    },
  };

  const series = [
    {
      name: 'Quantidade',
      data: quantidades,
    },
  ];

  return (
    <div className={`fade-in ${isLoaded ? 'visible' : ''}`}>
      <Chart options={options} series={series} type="bar" height={350} />
    </div>
  );
};

export default GraficoProduto;
