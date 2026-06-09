import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function GraficoLinhaTotalContainerDia(props) {
  const data = props.apiContainer;

  const [containerGraficos, setContainerGraficos] = useState({
    series: [
      {
        name: 'High - 2013',
        data: [28, 29, 33, 36, 32, 32, 33],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#77B6EA', '#545454'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Quantidade de Container Por Dia',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Dia/Mês',
        },
      },
      yaxis: {
        title: {
          text: 'QTD',
        },
        min: 5,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  const dadosGraficos = () => {
    const listaContainer = [];
    const qtdDiasDoMês = [];

    for (const obj of data) {
      listaContainer.push(obj.quantidadeContainer);
    }

    for (let tamanho = 1; tamanho <= listaContainer.length; tamanho++) {
      qtdDiasDoMês.push(tamanho);
    }

    setContainerGraficos({
      series: [
        {
          name: 'qtd Containers',
          data: listaContainer,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ['#0061a9', '#545454'],
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
          },
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'Quantidade de Container Por Dia',
          align: 'left',
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          categories: qtdDiasDoMês,
          title: {
            text: 'Dia do Mês',
          },
        },
        yaxis: {
          title: {
            text: 'QTD',
          },
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    });
  };

  useEffect(() => {
    dadosGraficos();
  }, [data]);

  return (
    <Chart
      type="line"
      width="100%"
      options={containerGraficos.options}
      series={containerGraficos.series}
      height={250}
    />
  );
}
