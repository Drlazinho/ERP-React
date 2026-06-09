import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import '../styles.css';

export default function UsuarioGrafico({ data }) {
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.9);

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth * 0.9);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
    },
    colors: ['#AA0000', '#E50000'],
    plotOptions: {
      bar: {
        borderRadius: 10,
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
        dataLabels: {
          position: 'top',
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.3,
        gradientToColors: ['#E50000'],
        stops: [0, 100],
        opacityFrom: 1,
        opacityTo: 1,
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
      labels: {
        style: {
          fontSize: '12px',
        },
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
    },
  });

  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const categories = data.map((item) => item.data);
      const quantidadeLogins = data.map((item) => item.quantidadeLogins || 0);

      setChartOptions((prev) => ({
        ...prev,
        xaxis: { categories },
      }));

      setSeries([{ name: 'Quantidade de Acessos', data: quantidadeLogins }]);
    }
  }, [data]);

  return (
    <div>
      <div className="chart-container">
        <ReactApexChart
          options={chartOptions}
          series={series}
          width={chartWidth}
          height={300}
          type="bar"
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}
