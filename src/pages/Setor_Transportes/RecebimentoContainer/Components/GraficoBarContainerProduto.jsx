import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

export default function GraficoBarraTotalProdutos(props) {

  const data = props.apiContainer

  const [containerProdutosGraficos, setContainerProdutosGraficos] = useState({
    series: [
      {
        data: [1],
      },
    ],
    noData: {
      text: 'Dado não disponível',
      align: 'center',
      verticalAlign: 'middle',
    },
    options: {
      title: {
        text: 'Obtendo dados - Total de Produtos',
        align: 'right',
      },
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter: function (val, opts) {
          return val;
        },
      },
      xaxis: {
        categories: ['CARREGANDO'],
      },
    },
  });

  const dadosGraficos = () => {
    const produtos = [];
    const qtdProdutos = [];

    for (const obj of data) {
      qtdProdutos.push(obj.quantidade);
      produtos.push(obj.descricao);
    }

    setContainerProdutosGraficos({
      series: [
        {
          data: qtdProdutos,
        },
      ],
      noData: {
        text: 'Dado não disponível',
        align: 'center',
        verticalAlign: 'middle',
      },
      options: {
        title: {
          text: 'Obtendo dados - Total de Produtos',
          align: 'right',
        },
        chart: {
          type: 'bar',
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: undefined,
          formatter: function (val, opts) {
            return val;
          },
            style: {
              fontSize: '12px',
              fontWeight: '400',
            },
        },
        xaxis: {
          categories: produtos,
          labels: {
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
          title: {
            text: 'Qtd de Produtos',
          },
        },
  
      },
    });
  };

  useEffect(() => {
    dadosGraficos();
  }, [data]);

  return (
    <Chart
      type="bar"
      width="100%"
      options={containerProdutosGraficos.options}
      series={containerProdutosGraficos.series}
      height={200}
    />
  );
}
