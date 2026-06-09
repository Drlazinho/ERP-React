import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Typography } from '@mui/material';

const ChamadosPorColaborador = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível...</Typography>;
  }
  const [chartData, setChartData] = useState({
    categories: [],
    series: [],
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const categories = data.map((item) => item.nome);

      const series = [
        {
          name: 'Concluído',
          data: data.map((item) => item.concluido || 0),
        },
        {
          name: 'Em andamento',
          data: data.map((item) => item.emAndamento || 0),
        },
        {
          name: 'Atrasado',
          data: data.map((item) => item.atrasado || 0),
        },
      ];

      setChartData({ categories, series });
    }
  }, [data]);

  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: true },
    },
    colors: ['#00D28B', '#ADADAD', '#FF4560'],
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
        columnWidth: '30%',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    xaxis: {
      categories: chartData.categories,
    },
    yaxis: {
      labels: { show: true },
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      markers: {
        width: 12,
        height: 12,
        radius: 12,
      },
    },
    grid: {
      show: true,
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '1000px',
        margin: 'auto',
      }}
    >
      <div id="chart">
        <ReactApexChart
          options={options}
          series={chartData.series}
          type="bar"
        />
      </div>
    </div>
  );
};

export default ChamadosPorColaborador;
