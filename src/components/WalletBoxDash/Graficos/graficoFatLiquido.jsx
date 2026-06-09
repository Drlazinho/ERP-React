import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import formatDateTotvs from '../../../utils/formatDataTotvs';

export default function GraficoFatLiquido({ dadosGrafico, color }) {
  const [grafico, setGrafico] = useState({
    series: [
      {
        name: 'Valor Líquido: ',
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
      formatter: function (value) {
        return `R$ ${value.toLocaleString('pt-BR')}`;
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
      colors: [color],
      dataLabels: {
        enabled: false,
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

  const dadosGraficoValorLiquido = () => {
    const vlrLiquidoFat = [];
    const diasFatura = [];

    for (const obj of dadosGrafico) {
      vlrLiquidoFat.push(ConverterStringParaFloat(obj.vlR_LIQUIDO));
      diasFatura.push(formatDateTotvs(obj.dT_TOTVS));
    }

    setGrafico({
      series: [
        {
          name: 'Valor Liquido',
          data: vlrLiquidoFat,
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
        formatter: function (value) {
          return `R$ ${value.toLocaleString('pt-BR')}`;
        },
        stroke: { width: 2 },
      },
    });
  };

  useEffect(() => {
    dadosGraficoValorLiquido();
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
