import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ControllersGrafico({}) {
  const [graficoColuna, setGraficoColuna] = useState({
    series: [
      {
        data: [21, 22, 10,],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart, w, e) {
          },
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['Usuários'],
          ['Produção'],
          ['Dashboard'],
        ],
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={graficoColuna.options}
          series={graficoColuna.series}
          type="bar"
          height={190}
          width={250}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
