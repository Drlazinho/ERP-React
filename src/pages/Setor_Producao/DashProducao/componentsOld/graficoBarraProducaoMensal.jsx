// import React, { useEffect, useMemo, useState } from 'react';
// import Chart from 'react-apexcharts';

// export default function GraficoColunaProducaoAnoMes({ dados = {
//     ano: 0,
//     total: 0,
//     mediaTotal: 0,
//     mes: [{
//         mes: 0,
//         total: 0
//     }]
// }, height = 600 }) {
//     //   const totalDash = useMemo(() => {
//     //     let totalLinha = 0;

//     //     data.forEach((item) => (totalLinha += item.soma));

//     //     return {
//     //       totalProducao: totalLinha,
//     //     };
//     //   }, [data]);

//     const [producaoGraficos, setProducaoGraficos] = useState({
//         series: [
//             {
//                 data: [],
//             },
//         ],
//         noData: {
//             text: "Dado não disponível",
//             align: "center",
//             verticalAlign: "middle",
//         },
//         options: {
//             colors: [
//                 '#800000', '#00E396'
//             ],
//             title: {
//                 text: 'Obtendo dados - Total Produzido',
//                 align: 'left',
//             },
//             chart: {
//                 type: 'bar',
//             },
//             plotOptions: {
//                 bar: {
//                     borderRadius: 4,
//                     horizontal: false,
//                 },
//             },
//             dataLabels: {
//                 enabled: true,
//                 enabledOnSeries: undefined,
//                 formatter: function (value) {
//                     return `${value.toLocaleString('pt-BR')}`;
//                 },
//                 textAnchor: 'middle',
//                 distributed: false,
//                 offsetX: 0,
//                 offsetY: 0,
//                 style: {
//                     fontSize: '14px',
//                     fontFamily: 'Helvetica, Arial, sans-serif',
//                     fontWeight: 'bold',
//                     colors: ['#333', '#999'],
//                 },
//                 background: {
//                     enabled: true,
//                     foreColor: '#fff',
//                     padding: 4,
//                     borderRadius: 2,
//                     borderWidth: 1,
//                     borderColor: '#fff',
//                     opacity: 0.9,
//                     dropShadow: {
//                         enabled: false,
//                         top: 1,
//                         left: 1,
//                         blur: 1,
//                         color: '#000',
//                         opacity: 0.45,
//                     },
//                 },
//                 dropShadow: {
//                     enabled: false,
//                     top: 1,
//                     left: 1,
//                     blur: 1,
//                     color: '#000',
//                     opacity: 0.45,
//                 },
//             },
//             xaxis: {
//                 categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//             },
//         },
//     });

//     const dadosGraficos = () => {
//         const produzidosMes = [];
//         const qtdProdutosProduzidos = [];
//         const mediasSequenciais = [];
//         const mediaExponenciais = []

//         for (const obj of dados.mes) {
//             produzidosMes.push(obj.total);
//             qtdProdutosProduzidos.push(obj.soma);
//             mediasSequenciais.push(obj.mediaMovel)
//             mediaExponenciais.push(obj.mediaMovelExponencial)
//         }

//         setProducaoGraficos({
//             series: [
//                 {
//                     data: produzidosMes,
//                     name: 'Produzido',
//                     type: "bar",
//                 },
//                 {
//                     name: 'Média Móvel Simples (MMS)',
//                     type: 'line',
//                     data: mediasSequenciais
//                 },
//                 {
//                     name: 'Média Móvel Exponencial (MME)',
//                     type: 'line',
//                     data: mediaExponenciais
//                 }
//             ],
//             options: {
//                 colors: [
//                     '#800000', '#00E396', '#fa7f72'
//                 ],
//                 title: {
//                     text: 'Gráfico Produção Mensal - (Total ' +
//                         String(dados?.total) + ')',
//                     align: 'center',
//                     style: {
//                         fontSize: '14px',
//                     },
//                 },
//                 stroke: {
//                     width: [0, 3, 3]
//                 },
//                 // fill: {
//                 //     colors: ['#800000'],
//                 // },
//                 plotOptions: {
//                     bar: {
//                         borderRadius: 4,
//                         vertical: true,
//                         borderColor: '#000',
//                         background: '#800000'
//                     },
//                 },
//                 dataLabels: {
//                     enabled: true,
//                     enabledOnSeries: [0],
//                     textAnchor: 'middle',
//                     distributed: false,
//                     offsetX: 0,
//                     offsetY: 0,
//                     style: {
//                         fontSize: '16px',
//                         fontFamily: 'Helvetica, Arial, sans-serif',
//                         fontWeight: 'bold',
//                         colors: ['#000', '#999'],
//                     },
//                     background: {
//                         enabled: true,
//                         foreColor: '#fff',
//                         padding: 4,
//                         borderRadius: 2,
//                         borderWidth: 1,
//                         borderColor: '#fff',
//                         opacity: 0.9,
//                         dropShadow: {
//                             enabled: false,
//                             top: 1,
//                             left: 1,
//                             blur: 1,
//                             color: '#000',
//                             opacity: 0.45,
//                         },
//                     },
//                     formatter: function (value) {
//                         return `${value.toLocaleString('pt-BR')}`;
//                     },
//                     dropShadow: {
//                         enabled: false,
//                         top: 1,
//                         left: 1,
//                         blur: 1,
//                         color: '#000',
//                         opacity: 0.45,
//                     },
//                 },
//                 annotations: {
//                     yaxis: [{
//                         y: dados.mediaTotal,
//                         borderColor: '#c24b06',
//                         label: {
//                             borderColor: '#c24b06',
//                             style: {
//                                 color: '#fff',
//                                 background: '#c24b06',
//                                 fontSize: '14px'
//                             },
//                             text: 'Média Total: ' + (dados.mediaTotal).toLocaleString('pt-BR'),
//                         }
//                     }],
//                 },
//                 xaxis: {
//                     categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//                     labels: {
//                         style: {
//                             fontWeight: 'bold',
//                         },
//                     },
//                 },
//                 yaxis: {
//                     labels: {
//                         style: {
//                             fontSize: '14px',
//                             fontFamily: 'Helvetica, Arial, sans-serif',
//                             fontWeight: 'bold',
//                         },
//                         formatter: function (value) {
//                             return `${value.toFixed(0)}`;
//                         },
//                     },
//                 },
//                 tooltip: {
//                     y: {
//                         formatter: function (value) {
//                             return `${value.toLocaleString('pt-BR')}`;
//                         },
//                     },
//                 }
//             },
//         });
//     };

//     useEffect(() => {
//         if (dados.mes) {
//             dadosGraficos();

//         }
//     }, [dados]);

//     return (
//         <Chart
//             options={producaoGraficos.options}
//             series={producaoGraficos.series}
//             type="line"
//             width="100%"
//             height={height}
//         />
//     );
// }
