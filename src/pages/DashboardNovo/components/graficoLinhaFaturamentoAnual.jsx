import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';


export default function GraficoLinhaFaturamentoAnual({ apiFaturamentoAnual }) {
  const [valorBrutoFat, setValorBrutoFat] = useState([]);
  const [valorLiquido, setValorLiquido] = useState([]);
  const [meses, setMeses] = useState([]);

  function ConverterStringParaFloat(numeroString) {
    const numeroSemPontos = numeroString.replace(/\./g, '');
    const numeroComPonto = numeroSemPontos.replace(',', '.');
    return parseFloat(numeroComPonto);
  }

  function handleAray() {
    if (!Array.isArray(apiFaturamentoAnual)) return;

    const vlrBrutoFat = [];
    const vlrLiquido = [];
    const mesesArray = [];

    for (const obj of apiFaturamentoAnual) {
      vlrBrutoFat.push(ConverterStringParaFloat(obj.faturamentoBruto));
      vlrLiquido.push(ConverterStringParaFloat(obj.faturamentoLiquido));
      mesesArray.push(obj.mes);
    }

    setValorBrutoFat(vlrBrutoFat);
    setValorLiquido(vlrLiquido);
    setMeses(mesesArray);
  }

  useEffect(() => {
    handleAray();
  }, [apiFaturamentoAnual]);

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
        background: '#FFFFFF',
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
        labels: {
          style: {
            colors: '#000000',
          },
        },
      },
      yaxis: {
        min: 0,
        max: 90000000,
        tickAmount: 9,
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
        ...faturamentos.options,
        xaxis: {
          categories: meses, // Atualiza os meses dinamicamente
        },
      },
    });
  }, [valorBrutoFat, valorLiquido, meses]);

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
    </div>
  );
}
