import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { acumuladoRequest } from '../logMonitoramento.service';

const Idados = [{ naturezaLog: '', quantidadeRequests: null }];

export default function DonutGrafico() {
  const [data, setData] = useState(Idados);

  const graficoDonut = {
    series: data.map((item) => item.quantidadeRequests),
    options: {
      chart: { type: 'donut' },
      colors: ['#10A304', '#FF0000'],
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 90,
          offsetY: 20,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: { legend: { position: 'bottom' } },
        },
      ],
      legend: { show: false },
    },
  };

  const fetchAcumulados = async () => {
    try {
      const response = await acumuladoRequest({});
      setData(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAcumulados();
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={graficoDonut.options}
          series={graficoDonut.series}
          type="donut"
        />
      </div>
    </div>
  );
}
