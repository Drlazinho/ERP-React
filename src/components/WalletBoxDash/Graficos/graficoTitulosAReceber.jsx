import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import formatDateTotvs from '../../../utils/formatDataTotvs';

export default function GraficoTitulosAReceber({ dadosGrafico, color }) {
  const [grafico, setGrafico] = useState({
    series: [
      {
        name: 'Valor Bruto: ',
        data: [0],
      },
    ],
    options: {
      chart: {
        animations: { enabled: true },
        sparkline: { enabled: true },
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      colors: [color],
      dataLabels: {
        enabled: false,
      },
      formatter: function (value) {
        return `R$ ${value.toLocaleString('pt-BR')}`;
      },
      stroke: {
        curve: 'straight',
        width: 2
      },
      xaxis: {
        type: 'date',
        categories: ['01/01/2010', '31/12/2031'],
        labels: {
          style: {
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
          },
        },
      },
      tooltip: {
        style: {
          fontSize: '12px',
        },
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      legend: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
      yaxis: {
        enabled: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
        },
      },
    },
  });

  const dadosGraficoTitulosAReceber = () => {
    const avencer = [];
    const ano = [];

    for (const obj of dadosGrafico) {
      avencer.push(obj.avencer);
      ano.push(obj.ano)
    }

    setGrafico({
      series: [
        {
          name: 'A Receber',
          data: avencer,
        },
      ],
      options: {
        chart: {
          animations: { enabled: true },
          sparkline: { enabled: true },
          height: 350,
          type: 'line',
          zoom: {
            enabled: false,
          },
        },
        colors: [color],
        dataLabels: {
          enabled: false,
        },
        formatter: function (value) {
          return `R$ ${value.toLocaleString('pt-BR')}`;
        },
        stroke: {
          curve: 'straight',
          width: 2,
        },
        xaxis: {
          type: 'date',
          categories: ano,
          labels: {
            style: {
              fontSize: '16px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
            },
          },
        },
        tooltip: {
          style: {
            fontSize: '12px',
          },
          x: {
            format: 'dd/MM/yy HH:mm',
          },
          y:{
            formatter: function (value) {
              return `R$ ${value.toLocaleString('pt-BR')}`;
            },
          }
        },
        legend: {
          fontSize: '16px',
          fontWeight: 'bold',
        },
        yaxis: {
          enabled: false,
        },
        plotOptions: {
          pie: {
            expandOnClick: false,
          },
        },
      },
    });
  };

  useEffect(() => {
    dadosGraficoTitulosAReceber();
  }, [dadosGrafico]);

  return (
    <ReactApexChart
      type="line"
      series={grafico.series}
      options={grafico.options}
      width={'100%'}
      height={80}
    />
  );
}
