import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function GraficoInventario({ data }) {
  const [series, setSeries] = useState([]);
  const [chartSize, setChartSize] = useState({
    width: '100%',
    height: '350px',
  });

  useEffect(() => {
    if (data && data.inventarioGeralAno) {
      const valores = Object.values(data.inventarioGeralAno);
      setSeries([
        {
          name: 'Total',
          data: valores,
        },
      ]);
    }

    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setChartSize({
        width: isMobile ? '100%' : '100%',
        height: isMobile ? '200px' : '350px',
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  const options = {
    chart: {
      id: 'basic-bar',
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: [
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
      ],
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="app" style={{ width: '100%', height: '100%' }}>
      <div style={{ width: '100%', maxWidth: '1156px', margin: '0 auto' }}>
        <Chart
          options={options}
          series={series}
          type="bar"
          width={chartSize.width}
          height={chartSize.height}
        />
      </div>
    </div>
  );
}

export default GraficoInventario;
