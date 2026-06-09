import React, { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

export default function GraficoBarraLinhas({ apiApontamentos = [], height }) {
  const data = apiApontamentos;

  const [totalProducaoLinhas, setTotalProducaoLinhas] = useState({
    series: [
      {
        data: [],
      },
    ],
    noData: {
      text: 'Dado não disponível',
      align: 'center',
      verticalAlign: 'middle',
    },
    options: {
      colors: ['#800000', '#00E396'],
      title: {
        text: 'Obtendo dados - Total Produzido',
        align: 'left',
      },
      chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (value) {
          return `${value.toLocaleString('pt-BR')}`;
        },
        textAnchor: 'middle',
        distributed: false,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '14px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ['#333', '#999'],
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 2,
          borderWidth: 1,
          borderColor: '#fff',
          opacity: 0.9,
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45,
          },
        },
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          color: '#000',
          opacity: 0.45,
        },
      },
      xaxis: {
        categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      },
    },
  });

  const totalProduzidopelaLinha = () => {
    const linhanumero = [];
    const qtdProduzidosLinha = [];

    for (const obj of data) {
      linhanumero.push(obj.linha);
      qtdProduzidosLinha.push(obj.quantidade);
    }

    setTotalProducaoLinhas({
      series: [
        {
          data: qtdProduzidosLinha,
          name: 'Produzidos',
          type: 'bar',
        },
        // {
        //     name: 'Média Móvel Simples (MMS)',
        //     type: 'line',
        //     data: qtdProduzidosLinha,
        // },
      ],
      options: {
        colors: ['#f76c1a', '#00E396', '#fa7f72'],
        chart: {
          background: '	#F8F8FF',
        },
        title: {
          text: 'LINHAS',
          //  +
          //     String(data?.listaLocal) + ')',
          align: 'center',
          style: {
            fontSize: '14px',
            padding: '16px',
            margin: '16px',
          },
        },
        stroke: {
          width: [0, 3, 3],
        },
        // fill: {
        //     colors: ['#800000'],
        // },
        plotOptions: {
          bar: {
            borderRadius: 4,
            vertical: true,
            borderColor: '#000',
            background: '#f76c1a',
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          textAnchor: 'middle',
          distributed: false,
          offsetX: 0,
          offsetY: 0,
          style: {
            fontSize: '16px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#000', '#999'],
          },
          background: {
            enabled: true,
            foreColor: '#fff',
            padding: 4,
            borderRadius: 2,
            borderWidth: 1,
            borderColor: '#fff',
            opacity: 0.9,
            dropShadow: {
              enabled: false,
              top: 1,
              left: 1,
              blur: 1,
              color: '#000',
              opacity: 0.45,
            },
          },
          // formatter: function (value) {
          //     return `${value.toLocaleString('pt-BR')}`;
          // },
          dropShadow: {
            enabled: false,
            top: 1,
            left: 1,
            blur: 1,
            color: '#000',
            opacity: 0.45,
          },
        },
        annotations: {
          yaxis: [
            {
              label: {
                borderColor: '#c24b06',
                style: {
                  color: '#fff',
                  background: '#c24b06',
                  fontSize: '14px',
                },
                // text: 'Média Total: ' + (data.quantidade),
              },
            },
          ],
        },
        xaxis: {
          categories: data.map((item) => `${item.local} Linha: ${item.linha} `),
          labels: {
            style: {
              fontWeight: 'bold',
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
            },
            formatter: function (value) {
              return `${value.toFixed(0)}`;
            },
          },
        },
        // tooltip: {
        //     y: {
        //         formatter: function (value) {
        //             return `${value.toLocaleString('pt-BR')}`;
        //         },
        //     },
        // }
      },
    });
  };

  useEffect(() => {
    totalProduzidopelaLinha();
  }, [data]);

  return (
    <Chart
      options={totalProducaoLinhas.options}
      series={totalProducaoLinhas.series}
      type="line"
      width="100%"
      height={height}
    />
  );
}
