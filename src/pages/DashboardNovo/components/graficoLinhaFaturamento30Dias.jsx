import React, { useEffect, useMemo, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { Category } from '@mui/icons-material';

export default function GraficoLinhaFaturamento30Dias({
  apiFaturamento30dias,
}) {
  const [valorBrutoFat, setValorBrutoFat] = useState([]);
  const [valorBrutoDevol, setValorBrutoDevol] = useState([]);
  const [valorLiquido, setValorLiquido] = useState([]);
  const [diasFaturaDash, setDiasFaturaDash] = useState([]);

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

  function handleAray() {
    const vlrBrutoFat = [];
    const vlrBrutoDevol = [];
    const vlrLiquido = [];
    const diasFatura = [];

    for (const obj of apiFaturamento30dias) {
      vlrBrutoFat.push(ConverterStringParaFloat(obj.vlR_BRUTO_FAT));
      vlrBrutoDevol.push(ConverterStringParaFloat(obj.vlR_BRUTO_DEVOL));
      vlrLiquido.push(ConverterStringParaFloat(obj.vlR_LIQUIDO));
      diasFatura.push(formatDateTotvs(obj.dT_TOTVS));
    }

    setValorBrutoFat(vlrBrutoFat);
    setValorBrutoDevol(vlrBrutoDevol);
    setValorLiquido(vlrLiquido);
    setDiasFaturaDash(diasFatura);
  }

  const [faturamentos, setFaturamentos] = useState({
    series: [
      {
        name: 'Faturamento Bruto',
        data: [],
      },
      {
        name: 'Faturamento Líquido',
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
    handleAray();
  }, [apiFaturamento30dias]);

  useEffect(() => {
    setFaturamentos({
      series: [
        {
          name: 'Faturamento Bruto',
          data: valorBrutoFat,
        },
        {
          name: 'Faturamento Líquido',
          data: valorLiquido,
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
          toolbar: {
            show: true,
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2,
        },
        colors: ['#0000ff', '#089981'],
        markers: {
          size: 0,
        },
        tooltip: {
          shared: true,
          intersect: false,
          theme: 'light',
        },
        xaxis: {
          categories: diasFaturaDash.map((dia) => {
            return dia.slice(0, 5);
          }),
          labels: {
            style: {
              colors: '#000000',
            },
          },
        },
        yaxis: {
          min: 0,
          max: 70000000,
          tickAmount: 7,
          labels: {
            style: {
              colors: '#000000',
            },
            formatter: (value) =>
              value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }),
          },
        },
        dataLabels: {
          enabled: false, // Desabilita as marcações fixas
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
  }, [valorLiquido]);

  return (
    <div>
      <div id="chart">
        <div id="chart-timeline">
          <ReactApexChart
            options={faturamentos.options}
            series={faturamentos.series}
            type="area"
            height={300}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
