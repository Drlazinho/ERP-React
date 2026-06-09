import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography, Box } from '@mui/material';

const GraficoAbertoCategoria = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      >
        <Typography variant="body1" sx={{ textAlign: 'center' }}>
          Nenhum chamado em aberto para o período informado.
        </Typography>
      </Box>
    );
  }
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const categories = [...new Set(data.map((item) => item.categoria))];

      const emDiaData = categories.map(
        (cat) =>
          data.find(
            (item) => item.categoria === cat && item.status === 'EM DIA'
          )?.quantidade || 0
      );

      const atrasadoData = categories.map(
        (cat) =>
          data.find(
            (item) => item.categoria === cat && item.status === 'ATRASADO'
          )?.quantidade || 0
      );

      setChartData({
        categories,
        series: [
          { name: 'Em dia', data: emDiaData },
          { name: 'Atrasado', data: atrasadoData },
        ],
      });
    }
  }, [data]);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    colors: ['#00D28B', '#FF4560'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        columnWidth: '30%',
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: '#000',
          fontSize: '9px',
          fontWeight: 'bold',
        },
      },
    },
    yaxis: {
      labels: { show: true },
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      offsetY: 40,
    },
    grid: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
    // dataLabels: {
    //   enabled: true,
    //   style: {
    //     colors: ['#000'],
    //   },
    // },
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1000px',
        margin: 'auto',
      }}
    >
      <div id="chart">
        <ReactApexChart
          options={options}
          series={chartData.series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
};

export default GraficoAbertoCategoria;
