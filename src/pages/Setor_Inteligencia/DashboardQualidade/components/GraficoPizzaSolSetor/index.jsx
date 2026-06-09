import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function GraficoPizzaSolSetor() {
  const [options, setOptions] = useState({
    chart: {
      type: 'pie',
    },
    labels: [
      'Estoque',
      'Produção',
      'Segurança do Trabalho',
      'Inteligência',
      'Contábil',
      'Gente e Gestão',
      'Facilities',
    ],
    colors: [
      '#A7C18E',
      '#78C89B',
      '#A7B9C9',
      '#B59ED4',
      '#F6C371',
      '#76A9D0',
      '#69B7E4',
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
    },
  });
  const series = [20, 10, 10, 10, 6, 5, 10];

  return (
    <div className="app">
      <ReactApexChart
        options={options}
        series={series}
        type="pie"
        width={500}
        height={200}
      />
    </div>
  );
}

export default GraficoPizzaSolSetor;
