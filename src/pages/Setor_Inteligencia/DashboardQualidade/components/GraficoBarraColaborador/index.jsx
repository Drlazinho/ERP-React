import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

function GraficoBarraColaborador() {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: ['John Doe', 'Jane Doe', 'John Smith'],
    },
    yaxis: {
      title: {
        text: '',
      },
    },
    colors: ['#78C89B', '#F6C371', '#76A9D0', '#A7B9C9'],
    legend: {
      position: 'right',
      offsetY: 0,
    },
    grid: {
      show: false,
    },
  });

  const series = [
    {
      name: 'Concluído',
      data: [3, 6, 10],
    },
    {
      name: 'Em progresso',
      data: [0, 1, 0],
    },
    {
      name: 'A iniciar',
      data: [0, 0, 2],
    },
    {
      name: 'Parado',
      data: [0, 0, 2],
    },
  ];

  return (
    <div className="app">
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={200}
      />
    </div>
  );
}

export default GraficoBarraColaborador;
