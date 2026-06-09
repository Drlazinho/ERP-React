import React, { useEffect, useMemo, useState } from 'react';
import { getEficienciaMensal } from '../eficienciaWeb.service';
import ReactApexChart from 'react-apexcharts';

const InterfaceEficienciaMensal = {
  mes: '',
  metaProducao: 0,
  qtdProducao: 0,
  porcetagemEficiencia: 0,
  porcetagemMeta: 0,
};

export default function GraficoEficienciaMensal() {
  const [dataEficiencia, setDataEficiencia] = useState([
    InterfaceEficienciaMensal,
  ]);
  const [mes, setMes] = useState([]);
  const [metaProducao, setMetaProducao] = useState([]);
  const [porcetagemEficiencia, setPorcetagemEficiencia] = useState([]);
  const [porcetagemMeta, setPorcetagemMeta] = useState([]);
  const [qtdProducao, setQtdProducao] = useState([]);

  function handleData() {
    getEficienciaMensal(`${new Date().getFullYear()}-01-01`, `${new Date().getFullYear()}-12-01`).then((res) => {
      setDataEficiencia(res);
    });
  }

  function convertHandleData() {
    const vlrMes = [];
    const vlrMetaProducao = [];
    const vlrPorcetagemEficiencia = [];
    const vlrPorcetagemMeta = [];
    const vlrQtdProducao = [];

    for (const obj of dataEficiencia) {
      vlrMes.push(obj.mes);
      vlrMetaProducao.push(obj.metaProducao);
      vlrPorcetagemEficiencia.push(obj.porcetagemEficiencia);
      vlrPorcetagemMeta.push(obj.porcetagemMeta);
      vlrQtdProducao.push(obj.qtdProducao);
    }

    setMes(vlrMes);
    setMetaProducao(vlrMetaProducao);
    setPorcetagemEficiencia(vlrPorcetagemEficiencia);
    setPorcetagemMeta(vlrPorcetagemMeta);
    setQtdProducao(vlrQtdProducao);
  }

  const [eficienciaMensal, setEficienciaMensal] = useState({
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
        name: 'Eficiência',
        type: 'line',
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      // dataLabels: {
      //   enabled: false,
      // },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        text: 'Eficiência Mensal',
        align: 'center',
      },
      xaxis: {
        categories: [],
      },
      yaxis: [
        {
          seriesName: 'Meta Produção',
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: 'grey',
          },
          labels: {
            style: {
              colors: 'grey',
            },
          },
          title: {
            text: 'Meta Produção',
            style: {
              color: 'grey',
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: 'Qtde Produzida',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#F9BB83',
          },
          labels: {
            style: {
              colors: '#F9BB83',
            },
          },
          title: {
            text: 'Qtde Produzida',
            style: {
              color: '#F9BB83',
            },
          },
        },
        {
          seriesName: 'Eficiência',
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#089981',
          },
          labels: {
            style: {
              colors: '#089981',
            },
            formatter: (val) => {
              return val + ' %';
            },
          },
          title: {
            text: 'Eficiência',
            style: {
              color: '#089981',
            },
          },
        },
      ],
      dataLabels: {
        enabled: true,
        enabledOnSeries: [2],
        formatter: (val) => {
          return val + ' %';
        },
      },
      colors: ['grey', '#F9BB83', '#089981'],
    },
  });

  useEffect(() => {
    handleData();
  }, []);

  useEffect(() => {
    convertHandleData();
  }, [dataEficiencia.length]);

  useEffect(() => {
    setEficienciaMensal({
      series: [
        {
          name: 'Meta Produção',
          type: 'column',
          data: metaProducao,
        },
        {
          name: 'Qtde Produzida',
          type: 'column',
          data: qtdProducao,
        },
        {
          name: 'Eficiência',
          type: 'line',
          data: porcetagemEficiencia,
        },
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        // dataLabels: {
        //   enabled: false,
        // },
        stroke: {
          width: [1, 1, 4],
        },
        title: {
          text: 'Eficiência Mensal',
          align: 'center',
        },
        xaxis: {
          categories: mes,
        },
        yaxis: [
          {
            seriesName: 'Meta Produção',
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: 'grey',
            },
            labels: {
              style: {
                colors: 'grey',
              },
            },
            title: {
              text: 'Meta Produção',
              style: {
                color: 'grey',
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: 'Qtde Produzida',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#F9BB83',
            },
            labels: {
              style: {
                colors: '#F9BB83',
              },
            },
            title: {
              text: 'Qtde Produzida',
              style: {
                color: '#F9BB83',
              },
            },
          },
          {
            seriesName: 'Eficiência',
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: '#089981',
            },
            labels: {
              style: {
                colors: '#089981',
              },
              formatter: (val) => {
                return val + ' %';
              },
            },
            title: {
              text: 'Eficiência',
              style: {
                color: '#089981',
              },
            },
          },
        ],
        dataLabels: {
          enabled: true,
          enabledOnSeries: [2],
          formatter: (val) => {
            return val + ' %';
          },
        },
        colors: ['grey', '#F9BB83', '#089981'],
      },
    });
  }, [mes]);

  return (
    <div>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart
            options={eficienciaMensal.options}
            series={eficienciaMensal.series}
            type="line"
            height={300}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
