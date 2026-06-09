import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getEficienciaDiaria } from '../eficienciaWeb.service';

const InterfaceEficienciaDiaria = {
  data: "",
  metaProducao: 0,
  qtdProducao: 0,
  porcentagemEficiencia: 0,
};

export default function GraficoEficienciaDiaria({filtro, reload}) {
  const [dataEficiencia, setDataEficiencia] = useState([
    InterfaceEficienciaDiaria,
  ]);
  const [data, setData] = useState([]);
  const [metaProducao, setMetaProducao] = useState([]);
  const [qtdProducao, setQtdProducao] = useState([]);
  const [porcentagemEficiencia, setPorcentagemEficiencia] = useState([]);

  const [eficienciaDiaria, setEficienciaDiaria] = useState({
    series: [
      {
        name: 'Meta Produção',
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
        text: 'Eficiência Diaría',
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1],
      },
      labels: [],
    },
  });

  function handleData() {
    getEficienciaDiaria(filtro.de, filtro.ate).then((res) => {
      setDataEficiencia(res);
    });
  }

  function convertHandleData() {
    const data = [];
    const metaProducao = [];
    const qtdProducao = [];
    const porcentagemEficiencia = [];

    for (const obj of dataEficiencia) {
      data.push(obj.data);
      metaProducao.push(obj.metaProducao);
      qtdProducao.push(obj.qtdProducao);
      porcentagemEficiencia.push(obj.porcentagemEficiencia);
    }

    setData(data);
    setMetaProducao(metaProducao);
    setQtdProducao(qtdProducao);
    setPorcentagemEficiencia(porcentagemEficiencia);
  }

  useEffect(() => {
    handleData();
  }, [filtro, reload]);

  useEffect(() => {
    convertHandleData();
  }, [dataEficiencia]);

  useEffect(() => {
    setEficienciaDiaria({
      series: [
        {
          name: 'Meta Produção',
          type: 'column',
          data: metaProducao,
        },
        {
          name: 'Qtde Produzida',
          type: 'line',
          data: qtdProducao,
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
          text: 'Eficiência Diaría',
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: data,
      },
    });
  }, [data]);

  return (
    <div>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart
            options={eficienciaDiaria.options}
            series={eficienciaDiaria.series}
            type="line"
            height={300}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
