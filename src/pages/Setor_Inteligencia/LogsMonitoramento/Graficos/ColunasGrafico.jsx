import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { setoresRequest } from '../logMonitoramento.service';

const Idados = [
  {
    setor: '',
    qtdRequests: null,
  },
];

export default function ColunaGrafico() {
  const [dadosEndpoint, setDadosEndpoint] = useState(Idados);
  const [data, setData] = useState({
    series: [{ name: '', data: [] }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [],
        forceAlignLabels: true,
        barPercentage: 0.8,
        categoryPercentage: 0.6,
        labels: {
          rotate: 0,
          style: {
            fontSize: '9px',
            overflow: 'ellipsis'
          },
        },
      },
      yaxis: {
        show: false,
      },
    },
  });

  const handleFetchSetores = () => {
    setoresRequest({})
      .then((response) => {
        setDadosEndpoint(response);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    handleFetchSetores();
  }, []);

  useEffect(() => {
    if (dadosEndpoint.length > 0) {
      const setores = dadosEndpoint.map((obj) => obj.setor);
      const qtdRequests = dadosEndpoint.map((obj) => obj.qtdRequests);

      setData((prevData) => ({
        ...prevData,
        series: [{ name: 'Quantidade de Requests', data: qtdRequests }],
        options: {
          ...prevData.options,
          xaxis: {
            categories: setores,
          },
        },
      }));
    }
  }, [dadosEndpoint]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={data.options}
          series={data.series}
          width={550}
          height={180}
          type="bar"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
