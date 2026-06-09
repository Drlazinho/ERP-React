import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

function GraficoDispVend({ data }) {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.5);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.5);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [options, setOptions] = useState({
    chart: {
      id: 'area',
    },
    colors: ['#6FD195', '#7086FD'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 0.2,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      hover: {
        sizeOffset: 3,
      },
    },
    xaxis: {},
    legend: {
      show: false,
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const mesesNomes = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];

      const categoriasMes = data.map((item) => mesesNomes[item.mes - 1]);
      const somaTotalEstoque = data.map((item) => item.somaTotalEstoque);
      const somaTotalVendido = data.map((item) => item.somaTotalVendido);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: categoriasMes,
        },
      }));

      setSeries([
        {
          name: 'Estoque Disponível',
          data: somaTotalEstoque,
        },
        {
          name: 'Total Vendido',
          data: somaTotalVendido,
        },
      ]);
    }
  }, [data]);

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        width={chartWidth}
        height={250}
        type="area"
      />
    </div>
  );
}

export default GraficoDispVend;
