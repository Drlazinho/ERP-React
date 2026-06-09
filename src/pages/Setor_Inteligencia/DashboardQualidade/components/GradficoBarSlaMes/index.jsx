import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const GraficoBarSlaMes = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'SLA',
        type: 'column',
        data: [23, 35, 27, 42, 43, 22, 17, 31, 22, 22, 12, 16],
      },
      {
        name: 'Acumulativo',
        type: 'line',
        data: [23, 42, 35, 43, 43, 22, 17, 31, 22, 22, 12, 16],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
      },
      stroke: {
        width: [0, 3],
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [
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
      yaxis: [
        {
          title: {
            text: '',
          },
        },
        {
          opposite: true,
          title: {
            text: '',
          },
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
      },
      legend: {
        horizontalAlign: 'center',
        offsetX: 40,
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
        type="line"
        height={555}
      />
    </div>
  );
};

export default GraficoBarSlaMes;
