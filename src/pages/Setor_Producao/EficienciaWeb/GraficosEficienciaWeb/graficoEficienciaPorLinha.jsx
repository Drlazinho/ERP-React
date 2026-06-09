import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getEficienciaPorLinha } from '../eficienciaWeb.service';

const InterfaceEficienciaMensal = {
  linha: 0,
  metaDiaria: 0,
  qtdProduzida: 0,
  eficiencia: 0,
};

export default function GraficoEficienciaPorLinha({filtro, reload}) {
  const [dataEficiencia, setDataEficiencia] = useState([
    InterfaceEficienciaMensal,
  ]);
  const [linha, setLinha] = useState([]);
  const [metaDiaria, setMetaDiaria] = useState([]);
  const [qtdProduzida, setQtdProduzida] = useState([]);
  const [eficiencia, setEficiencia] = useState([]);

  const [eficienciaPorLinha, setEficienciaPorLinha] = useState({
    series: [
      {
        name: 'Meta Produção',
        type: 'column',
        data: [],
      },
      {
        name: 'Qtde Produzida',
        type: 'column',
        data: [],
      },
      {
        name: 'Qtde Produzida',
        type: 'line',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'line',
        height: 350,
      },
      colors: ['#F9BB83', '#089981'],
      stroke: {
        width: [0, 4],
      },
      title: {
        text: 'Eficiência Por Linha',
      },
      xaxis: {
        categories: [],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
        formatter: (val) => {
          return val + ' %';
        },
      },
      labels: [],
    },
  });

  function convertHandleData() {
    const linhas = [];
    const metaDiaria = [];
    const qtdProduzida = [];
    const eficiencia = [];

    for (const obj of dataEficiencia) {
      linhas.push(obj.linha);
      metaDiaria.push(obj.metaDiaria);
      qtdProduzida.push(obj.qtdProduzida);
      eficiencia.push(obj.eficiencia);
    }

    setLinha(linhas);
    setMetaDiaria(metaDiaria);
    setQtdProduzida(qtdProduzida);
    setEficiencia(eficiencia);
  }

  function handleData() {
    getEficienciaPorLinha(filtro).then((res) => {
      setDataEficiencia(res[0].linhas);
    });
  }

  useEffect(() => {
    handleData();
  }, [filtro, reload]);

  useEffect(() => {
    convertHandleData();
  }, [dataEficiencia.length]);

  useEffect(() => {
    setEficienciaPorLinha({
      series: [
        {
          name: 'Meta Produção',
          type: 'column',
          data: metaDiaria,
        },
        {
          name: 'Qtde Produzida',
          type: 'column',
          data: qtdProduzida,
        },
        {
          name: 'Eficiência',
          type: 'line',
          data: eficiencia,
        },
      ],
      options: {
        chart: {
          type: 'line',
          height: 350,
        },
        colors: ['grey', '#F9BB83', '#089981'],
        stroke: {
          width: [0, 4],
        },
        title: {
          text: 'Eficiência Por Linha',
        },
        xaxis: {
          categories: linha,
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [2],
          formatter: (val) => {
            return val + ' %';
          },
        },
      },
    });
  }, [linha]);

  return (
    <div>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart
            options={eficienciaPorLinha.options}
            series={eficienciaPorLinha.series}
            type="line"
            height={200}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
