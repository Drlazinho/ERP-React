import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetDataUr } from '../KpisInteligencia.service'

const interfaceUR = {
  valorNPS:'',
  valorNPSDif: 0.0,
};

export default function GraficoNPS({filtroData}) {
  const [percent, setPercent] = useState([]);
  const [dataNPS, setDataNPS] = useState(interfaceUR);

  const [npsGraph, setNpsGraph] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['NPS','Negativo'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      colors: ['#00c875', '#f2f2f2'],
    },
  });

  function ConverterStringParaFloat(numeroString) {
    const converterStringParaFloat = (numeroString) => {
      const numeroSemPontos = numeroString.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return numeroFloat;
    };

    const numeroFloat = converterStringParaFloat(numeroString);
    return numeroFloat;
  }

  function handleData() {
    const vlrPer = [];

    vlrPer.push(ConverterStringParaFloat(dataNPS.valorNPS));
    const valorNPSFloat = ConverterStringParaFloat(dataNPS.valorNPS)
    dataNPS.valorNPSDif = 100 - valorNPSFloat;
    vlrPer.push(dataNPS.valorNPSDif);
    setPercent(vlrPer);
  }

  function getDados() {
    GetDataUr(filtroData).then((res) => {
      setDataNPS(res);
    });
  }

  useEffect(() => {
    getDados();
  }, [filtroData]);

  useEffect(() => {
    handleData();
  }, [dataNPS]);

  useEffect(() => {
    setNpsGraph({
      series: percent,
      options: {
        chart: {
          type: 'donut',
        },
        labels: ['NPS', 'Negativo'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
        legend: {
          show: false,
        },
        colors: ['#00c875', 'grey'],
        dataLabels: {
          enabled: false, 
        },
        tooltip: {
          enabled: false, 
        },
      },
    });
  }, [percent]);

  return (
    <div>
      <div id="chart">
        <div id="chart-timeline">
          
          <ReactApexChart
            options={npsGraph.options}
            series={npsGraph.series}
            type="donut"
          />
        </div>

      </div>
      <div id="html-dist"></div>
    </div>
  );
}
