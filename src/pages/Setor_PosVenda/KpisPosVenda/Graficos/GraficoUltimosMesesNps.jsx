import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { GetUltimoMesesNPS } from '@/pages/Setor_PosVenda/KpisPosVenda/KpisPosVenda.service';

const ultimoMesesInferface = [
  {
    mes: '',
    mediaNPS: '',
  },
];

export default function GraficoUltimosMesesNps({}) {
  const [mes, setMes] = useState([]);
  const [media, setMedia] = useState([]);
  const [ultimosMesesNPS, setUltimosMesesNPS] = useState(ultimoMesesInferface);

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
        text: 'Últimos 3 meses NPS',
      },
      xaxis: {
        categories: [],
      },
      colors: ['#ff9d61'],
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

    for (const obj of ultimosMesesNPS) {
      vlrMes.push(formatarMes(obj.mes));
      vlrMedia.push(ConverterStringParaFloat(obj.mediaNPS));
    }

    setMes(vlrMes);
    setMedia(vlrMedia);
  }

  function getDados() {
    GetUltimoMesesNPS().then((res) => {
      setUltimosMesesNPS(res);
    });
  }

  useEffect(() => {
    getDados();
  }, []);

  useEffect(() => {
    if (ultimosMesesNPS.length > 0) {
      handleData();
    }
  }, [ultimosMesesNPS]);

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
          text: 'Últimos 3 meses NPS',
        },
        xaxis: {
          categories: mes,
        },
        colors: ['#ff9d61'],
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
