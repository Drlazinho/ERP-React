import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ultimosDiasRequest } from '../logMonitoramento.service';

const Ggrafico = [
  {
    data: '',
    qtdRequests: null,
  },
];

function ReqGrafico() {
  const [dadosEndpoint, setDadosEndpoint] = useState(Ggrafico);
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 1,
        gradientToColors: ['rgba(177, 185, 248, 0.00)'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0,
        stops: [0, 100],
        colorStops: [
          { offset: 0, color: '#ADB7F9', opacity: 1 },
          { offset: 100, color: 'rgba(177, 185, 248, 0.00)', opacity: 0 },
        ],
      },
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      show: false,
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Quantidade de acessos',
      data: [],
    },
  ]);

  const handleFetchDias = () => {
    ultimosDiasRequest({})
      .then((response) => {
        setDadosEndpoint(response);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    handleFetchDias();
  }, []);

  useEffect(() => {
    if (dadosEndpoint.length > 0) {
      const datas = dadosEndpoint.map((obj) => obj.data);
      const qtdRequests = dadosEndpoint.map((obj) => obj.qtdRequests);

      setChartOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: datas,
        },
      }));

      setSeries([
        {
          name: 'Quantidade de Requests',
          data: qtdRequests,
        },
      ]);
    }
  }, [dadosEndpoint]);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type="area"
        width={560}
        height={180}
      />
    </div>
  );
}

export default ReqGrafico;
