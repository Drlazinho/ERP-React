import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function GraficoRadialBar({ dataCard }) {
  const [series, setSeries] = useState(dataCard.inventarioMes);

  useEffect(() => {
    setSeries(dataCard.inventarioMes);
  }, [dataCard]);

  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
        dataLabels: {
          name: {
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#000',
          },
          value: {
            show: false,
          },
        },
        track: {
          strokeWidth: '50%',
        },
        strokeWidth: 8,
      },
    },
    labels: [`${series}%`],
    colors: ['#22C55E'],
  };

  return (
    <div className="app">
      <ReactApexChart
        options={options}
        series={[series]}
        type="radialBar"
        width={170}
        aria-label="Gráfico radial representando o inventário do mês"
      />
    </div>
  );
}

export default GraficoRadialBar;
