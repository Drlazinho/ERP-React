import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Loader from '@/components/Loader/index.jsx';


function GraficoNotasFiscais({ data }) {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.92);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.92);
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
    colors: ['#6FD195', '#ffa8a8'],
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
    yaxis: {
      labels: {
        formatter: function (val) {
          return new Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(val);
        },
      },
    },
    legend: {
      show: false,
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const categoriasMes = data.map((item) => item.data);
      const valorNaoExpedido = data.map((item) => item.valorTotalNotasNaoExpedidas);
      const valorExpedido = data.map((item) => item.valorTotalNotasExpedidas);

      setOptions((prevOptions) => ({
        ...prevOptions,
        xaxis: {
          categories: categoriasMes,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              const formattedValue = new Intl.NumberFormat('pt-BR', {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(val);
        
              return `R$: ${formattedValue}`;
            },
          },
        },
      }));

      setSeries([
        {
          name: 'Notas expedidas',
          data: valorExpedido,
        },
        {
          name: 'Notas não expedidas',
          data: valorNaoExpedido,
        },
      ]);
      setLoading(false);
    }
  }, [data]);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
      <ReactApexChart
        options={options}
        series={series}
        width={chartWidth}
        height={600}
        type="area"
      />
    )}
    </div>
  );
}

export default GraficoNotasFiscais;
