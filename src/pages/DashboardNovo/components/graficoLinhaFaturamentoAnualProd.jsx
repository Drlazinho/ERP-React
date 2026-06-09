import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function GraficoLinhaFaturamentoAnualProd({
  apiFaturamentoAnual,
  apiFaturamentoAnualEntregue,
}) {
  const [quantProduzida, setQuantProduzida] = useState([]);
  const [produtosEntregar, setProdutosEntregar] = useState([]);
  const [datasCompletas, setDatasCompletas] = useState([]);

  const padDate = (dateString) => {
    const [day, month] = dateString.split('/');
    return `${day.padStart(2, '0')}/${month}`;
  };

  const handleAray = () => {
    const quantidadeProduzidaUltimoAno =
      apiFaturamentoAnual?.quantidadeProduzidaUltimosDozeMeses || [];
    const quantidadeEntregueUltimoAno =
      apiFaturamentoAnualEntregue?.entregasUltimosDozeMeses || [];

    const datasProduzida = quantidadeProduzidaUltimoAno.map((obj) =>
      padDate(obj.mes)
    );
    const datasEntregue = quantidadeEntregueUltimoAno.map((obj) =>
      padDate(obj.data)
    );

    const datasUnificadas = Array.from(
      new Set([...datasProduzida, ...datasEntregue])
    );

    datasUnificadas.sort((a, b) => {
      const [mesA, anoA] = a.split('/').map(Number);
      const [mesB, anoB] = b.split('/').map(Number);
      return anoA === anoB ? mesA - mesB : anoA - anoB;
    });

    setDatasCompletas(datasUnificadas);

    const produzidaDataMap = Object.fromEntries(
      quantidadeProduzidaUltimoAno.map((obj) => [
        padDate(obj.mes),
        obj.quantidadeProduzida,
      ])
    );

    const entregueDataMap = Object.fromEntries(
      quantidadeEntregueUltimoAno.map((obj) => [
        padDate(obj.data),
        obj.quantidadeEntregas,
      ])
    );

    const dadosProduzida = datasUnificadas.map(
      (data) => produzidaDataMap[data] || 0
    );
    const dadosEntregue = datasUnificadas.map(
      (data) => entregueDataMap[data] || 0
    );

    setQuantProduzida(dadosProduzida);
    setProdutosEntregar(dadosEntregue);
  };

  useEffect(() => {
    handleAray();
  }, [apiFaturamentoAnual, apiFaturamentoAnualEntregue]);

  const [faturamentos, setFaturamentos] = useState({
    series: [
      {
        name: 'Quantidade Produzida',
        data: [],
      },
      {
        name: 'Quantidade Entregar',
        data: [],
      },
    ],
    options: {
      theme: {
        mode: 'dark',
      },
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: true,
        },
      },
      colors: ['#089981', '#F7931B'],
    },
  });

  useEffect(() => {
    setFaturamentos({
      series: [
        {
          name: 'Produzido',
          data: quantProduzida,
        },
        {
          name: 'Produtos a Entregar',
          data: produtosEntregar,
        },
      ],
      options: {
        theme: {
          mode: 'dark',
        },
        chart: {
          type: 'area',
          height: 350,
          zoom: {
            enabled: true,
          },
          background: '#FFFFFF',
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        xaxis: {
          categories: datasCompletas,
          labels: {
            style: {
              colors: '#000000',
            },
          },
        },
        yaxis: {
          min: 0,
          tickAmount: 5,
          labels: {
            style: {
              colors: '#000000',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          position: 'bottom',
          horizontalAlign: 'center',
          labels: {
            colors: '#000000',
          },
        },
      },
    });
  }, [quantProduzida, produtosEntregar, datasCompletas]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={faturamentos.options}
          series={faturamentos.series}
          type="area"
          height={320}
        />
      </div>
    </div>
  );
}
