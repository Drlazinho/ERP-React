import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import formatDateTotvs from '../../../utils/formatDataTotvs';

export default function GraficoLinhaFaturamento30DiasProd({
  apiFaturamento30dias,
  apiFaturamentoEntrega30dias,
}) {
  const [quantProduzida, setQuantProduzida] = useState([]);
  const [produtosEntregar, setProdutosEntregar] = useState([]);
  const [datasCompletas, setDatasCompletas] = useState([]);

  const padDate = (dateString) => {
    const [day, month] = dateString.split('/');
    return `${day.padStart(2, '0')}/${month}`;
  };

  function handleAray() {
    const quantidadeProduzidaUltimosTrintaDias =
      apiFaturamento30dias?.quantidadeProduzidaUltimosTrintaDias || [];
    const quantidadeEntregueUltimosTrintaDias =
      apiFaturamentoEntrega30dias?.entregasUltimosTrintaDias || [];

    const datasProduzida = quantidadeProduzidaUltimosTrintaDias.map((obj) =>
      padDate(obj.data)
    );
    const datasEntregue = quantidadeEntregueUltimosTrintaDias.map((obj) =>
      padDate(obj.data)
    );

    const datasUnificadas = Array.from(
      new Set([...datasProduzida, ...datasEntregue])
    );

    datasUnificadas.sort((a, b) => {
      const [dayA, monthA] = a.split('/').map(Number);
      const [dayB, monthB] = b.split('/').map(Number);
      return monthA === monthB ? dayA - dayB : monthA - monthB;
    });

    setDatasCompletas(datasUnificadas);

    const produzidaDataMap = Object.fromEntries(
      quantidadeProduzidaUltimosTrintaDias.map((obj) => [
        padDate(obj.data),
        obj.quantidadeProduzida,
      ])
    );
    const entregueDataMap = Object.fromEntries(
      quantidadeEntregueUltimosTrintaDias.map((obj) => [
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
  }

  useEffect(() => {
    handleAray();
  }, [apiFaturamento30dias, apiFaturamentoEntrega30dias]);

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
      colors: ['#089981'],
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
        colors: ['#089981', '#F7931B'],
        markers: {
          size: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: 'light',
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
            formatter: (value) => value,
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
        <div id="chart-timeline">
          <ReactApexChart
            options={faturamentos.options}
            series={faturamentos.series}
            type="area"
            height={320}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
