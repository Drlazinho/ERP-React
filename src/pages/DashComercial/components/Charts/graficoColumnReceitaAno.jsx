import React, { useEffect, useMemo, useState } from 'react';
import Chart from 'react-apexcharts';

export default function GraficoColumnReceitaAno({ data }) {
//   const totalDash = useMemo(() => {
//     let totalLinha = 0;

//     data.forEach((item) => (totalLinha += item.soma));

//     return {
//       totalProducao: totalLinha,
//     };
//   }, [data]);
  
  const [produtosGraficos, setProdutosGraficos] = useState({
    series: [{
        data: [2378154, 5679432, 8912651, 4167899, 6321487, 7592360]
      }],
    noData: {
      text: "Dado não disponível",
      align: "center",
      verticalAlign: "middle",
    },
    options: {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: false,
            dataLabels: {
              position: 'bottom'
            },
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e',
          '#f48024', '#69d2e7'
        ],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return val
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [2023, 2022, 2021, 2020, 2019, 2018, 2017]
          ,
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
            text: 'Receita Total Por Ano - R$',
            align: 'center',
            floating: true
        },
        legend: {
            show: false,
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return ''
              }
            }
          }
        }
      },
  });

//   const dadosGraficos = () => {
//     const produtos = [];
//     const qtdProdutosProduzidos = [];

//     for (const obj of data) {
//       produtos.push(obj.apelido);
//       qtdProdutosProduzidos.push(obj.soma);
//     }

//     setProdutosGraficos({
//       series: [
//         {
//           data: qtdProdutosProduzidos,
//         },
//       ],
//       options: {
//         title: {
//           text: 'Gráfico Total Produzido/Dia - ' +
//             String(totalDash.totalProducao),

//           align: 'left',
//           style: {
//             fontSize: '14px',
//           },
//         },
//         chart: {
//           type: 'bar',
//           height: 350,
//         },
//         fill: {
//           colors: ['#800000'],
//         },
//         plotOptions: {
//           bar: {
//             borderRadius: 4,
//             vertical: true,
//           },
//         },
//         dataLabels: {
//           enabled: true,
//           enabledOnSeries: undefined,
//           // formatter: function (val, opts) {
//           //   return val;
//           // },
//           textAnchor: 'middle',
//           distributed: false,
//           offsetX: 0,
//           offsetY: 0,
//           style: {
//             fontSize: '16px',
//             fontFamily: 'Helvetica, Arial, sans-serif',
//             fontWeight: 'bold',
//             colors: ['#000', '#999'],
//           },
//           background: {
//             enabled: true,
//             foreColor: '#fff',
//             padding: 4,
//             borderRadius: 2,
//             borderWidth: 1,
//             borderColor: '#fff',
//             opacity: 0.9,
//             dropShadow: {
//               enabled: false,
//               top: 1,
//               left: 1,
//               blur: 1,
//               color: '#000',
//               opacity: 0.45,
//             },
//             formatter: function (value) {
//               return `R$ ${value.toLocaleString('pt-BR')}`;
//             },
//           },
//           dropShadow: {
//             enabled: false,
//             top: 1,
//             left: 1,
//             blur: 1,
//             color: '#000',
//             opacity: 0.45,
//           },
//         },

//         xaxis: {
//           categories: produtos,
//           labels: {
//             style: {
//               fontWeight: 'bold',
//             },
//           },
//         },
//         yaxis: {
//           labels: {
//             style: {
//               fontSize: '20px',
//               fontWeight: 'bold',
//             },
//             // formatter: function (value) {
//             //   return `R$ ${value.toLocaleString('pt-BR')}`;
//             // },
//           },
//         },
//       },
//     });
//   };

//   useEffect(() => {
//     dadosGraficos();
//   }, [data]);

  return (
    <Chart
      options={produtosGraficos.options}
      series={produtosGraficos.series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
}
