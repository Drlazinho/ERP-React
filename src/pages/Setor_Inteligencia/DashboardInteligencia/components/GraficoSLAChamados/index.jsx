import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Typography } from '@mui/material';

const GraficoSLAChamados = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível...</Typography>;
  }
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setOptions({
        chart: {
          type: 'line',
          toolbar: { show: false },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        xaxis: {
          categories: data.map((item) => item.categoria),
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value} dias`,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val} dias`,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val} dias`,
          },
        },
        grid: {
          borderColor: '#e7e7e7',
        },
        colors: ['#4BACC6', '#2C4D75'],
        legend: {
          show: false,
        },
      });

      setSeries([
        {
          name: 'Média em Dias',
          data: data.map((item) => item.mediaEmDIas),
        },
        {
          name: 'SLA Máximo',
          data: data.map((item) => item.maximoDeSLA),
        },
      ]);
    }
  }, [data]);

  return (
    <div>
      <Chart options={options} series={series} type="line" height={550} />
    </div>
  );
};

export default GraficoSLAChamados;
