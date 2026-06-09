import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const GraficoBarChamados = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Abertos fora do prazo',
        data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1],
        color: '#FF6F61',
      },
      {
        name: 'Abertos no prazo',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        color: '#6EC4E8',
      },
      {
        name: 'Fechados dentro do SLA',
        data: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 4, 1],
        color: '#8BC34A',
      },
      {
        name: 'Fechados fora do SLA',
        data: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1],
        color: '#B0BEC5',
      },
    ],
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          columnWidth: '70%',
          endingShape: 'rounded',
        },
      },
      xaxis: {
        categories: [
          'Jan',
          'Fev',
          'Mar',
          'Abr',
          'Mai',
          'Jun',
          'Jul',
          'Ago',
          'Set',
          'Out',
          'Nov',
          'Dez',
        ],
      },
      yaxis: {
        title: {
          text: '',
        },
        labels: {
          formatter: function (value) {
            return value;
          },
        },
      },
      legend: {
        position: 'bottom',
        markers: {
          shape: 'circle',
          width: 10,
          height: 10,
          radius: 12,
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
      grid: {
        show: false,
      },
    },
  });

  return (
    <div>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="bar"
        height={555}
      />
    </div>
  );
};

export default GraficoBarChamados;
