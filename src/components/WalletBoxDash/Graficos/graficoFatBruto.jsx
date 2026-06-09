import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import formatDateTotvs from '../../../utils/formatDataTotvs';

export default function GraficoFatBruto({ dadosGrafico, color }) {
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
      stroke: { width: 2 },
    },
  });

  function ConverterStringParaFloat(numeroString) {
    const converterStringParaFloat = (numeroString) => {
      const numeroSemPontos = numeroString.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return numeroFloat;
    };

    const numeroFloat = converterStringParaFloat(numeroString);

    return numeroFloat;
  }

  const dadosGraficoValorBruto = () => {
    const vlrBrutoFat = [];
    const diasFatura = [];

    for (const obj of dadosGrafico) {
      vlrBrutoFat.push(ConverterStringParaFloat(obj.vlR_BRUTO_FAT));
      diasFatura.push(formatDateTotvs(obj.dT_TOTVS));
    }

    setGrafico({
      series: [
        {
          name: 'Valor Bruto',
          data: vlrBrutoFat,
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
          formatter: function (value) {
            return `R$ ${value.toLocaleString('pt-BR')}`;
          },
        },
        formatter: function (value) {
          return `R$ ${value.toLocaleString('pt-BR')}`;
        },
        xaxis: {
          type: 'date',
          categories: diasFatura,
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
        stroke: { width: 2 },
      },
    });
  };

  useEffect(() => {
    dadosGraficoValorBruto();
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
