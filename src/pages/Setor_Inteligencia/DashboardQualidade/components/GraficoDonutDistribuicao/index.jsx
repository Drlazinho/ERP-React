import React from 'react';
import Chart from 'react-apexcharts';

const GraficoDonutDistribuicao = () => {
  const chartOptions = {
    chart: {
      type: 'donut',
    },
    labels: ['Elaboração', 'Revisão', 'Padronização'],
    colors: ['#C39BD3', '#85C1E9', '#7DCEA0'],
    legend: {
      position: 'right',
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val.toFixed(0)}%`,
    },
  };

  const chartSeries = [40, 40, 20];

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="donut"
        width="380"
        height={200}
      />
    </div>
  );
};

export default GraficoDonutDistribuicao;
