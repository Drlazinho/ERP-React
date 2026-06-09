import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Typography } from '@mui/material';

const GraficoDesempenhoGeral = ({ data }) => {
  if (!data || data.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível...</Typography>;
  }
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const meses = Object.keys(data);
      const valores = Object.values(data);

      const valoresPercentuais = valores.map((valor) => valor * 100);

      const valorMock = 0.9;
      const valorMockPercentual = valorMock * 100;
      const valorMockArray = Array(meses.length).fill(valorMockPercentual);

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
          categories: meses,
        },
        yaxis: {
          labels: {
            formatter: (value) => `${value}%`,
          },
        },
        dataLabels: {
          enabled: true,
          formatter: (val) => `${val}%`,
        },
        tooltip: {
          y: {
            formatter: (val) => `${val}%`,
          },
        },
        grid: {
          borderColor: '#e7e7e7',
        },
        colors: ['#00B050', '#FFC000'],
        legend: {
          show: false,
        },
      });

      setSeries([
        {
          name: 'SLA de Atendimento',
          data: valoresPercentuais,
        },
        {
          name: 'Cumprimento de SLA de Atendimento',
          data: valorMockArray,
        },
      ]);
    }
  }, [data]);

  if (!data || Object.keys(data).length === 0) {
    return <p>Nenhum dado disponível para exibir o gráfico.</p>;
  }

  return (
    <div>
      <Chart options={options} series={series} type="line" height={350} />
    </div>
  );
};

export default GraficoDesempenhoGeral;
