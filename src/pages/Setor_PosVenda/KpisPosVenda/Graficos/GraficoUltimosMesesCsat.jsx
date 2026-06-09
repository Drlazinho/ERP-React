import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetUltimosMesesCSAT } from '@/pages/Setor_PosVenda/KpisPosVenda/KpisPosVenda.service';

const ultimoMesesInferface = [
  {
    mes: '',
    mediaCSAT: '',
  },
];

export default function GraficoUltimosMesesCsat({}) {
  const [mes, setMes] = useState([]);
  const [media, setMedia] = useState([]);
  const [ultimosMesesCSAT, setUltimosMesesCSAT] =
    useState(ultimoMesesInferface);

  const [npsGraphUltimosMeses, setNpsGraphUltimosMeses] = useState({
    series: [
      {
        name: 'Média geral',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: 'Últimos 3 meses CSAT',
      },
      xaxis: {
        categories: [],
      },
      colors: ['#6982fe'],
    },
  });

  function formatarMes(dataString) {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  }

  function ConverterStringParaFloat(valor) {
    if (typeof valor === 'number') {
      return valor;
    }

    if (typeof valor === 'string') {
      const numeroSemPontos = valor.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return isNaN(numeroFloat) ? 0 : numeroFloat;
    }

    return 0;
  }

  function handleData() {
    const vlrMes = [];
    const vlrMedia = [];

    for (const obj of ultimosMesesCSAT) {
      vlrMes.push(formatarMes(obj.mes));
      vlrMedia.push(ConverterStringParaFloat(obj.mediaCSAT));
    }

    setMes(vlrMes);
    setMedia(vlrMedia);
  }

  function getDados() {
    GetUltimosMesesCSAT().then((res) => {
      setUltimosMesesCSAT(res);
    });
  }

  useEffect(() => {
    getDados();
  }, []);

  useEffect(() => {
    if (ultimosMesesCSAT.length > 0) {
      handleData();
    }
  }, [ultimosMesesCSAT]);

  useEffect(() => {
    setNpsGraphUltimosMeses({
      series: [
        {
          name: 'Média geral',
          data: media,
        },
      ],
      options: {
        chart: {
          type: 'area',
          toolbar: {
            show: false,
          },
        },
        title: {
          text: 'Últimos 3 meses CSAT',
        },
        xaxis: {
          categories: mes,
        },
        colors: ['#6982fe'],
      },
    });
  }, [media, mes]);

  return (
    <div>
      <ReactApexChart
        options={npsGraphUltimosMeses.options}
        series={npsGraphUltimosMeses.series}
        type="area"
        width={'100%'}
        height={180}
      />
    </div>
  );
}
