import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Block } from '@mui/icons-material';

interface IMesFrete {
  mes: string;
  historicoFrete: number;
}

interface Props {
  data: IMesFrete[];
}

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: {
    chart: {
      type: 'area';
      toolbar: {
        show: boolean;
      };
    };
    stroke: {
      curve: 'straight';
      width: number;
    };
    title: {
      text: string;
    };
    xaxis: {
      categories: string[];
    };
    colors: string[];
    dataLabels: {
      enabled: boolean;
      offsetY: number;
      style: {
        fontSize: string;
        fontWeight: 'bold';
        colors: string[];
      };
      background: {
        enabled: boolean;
        foreColor: string;
        padding: number;
        borderRadius: number;
        backgroundColor: string;
        borderWidth: number;
      };
      formatter: (value: number) => string;
    };
    tooltip: {
      y: {
        formatter: (value: number) => string;
      };
    };
    yaxis: {
      labels: {
        formatter: (value: number) => string;
      };
    };
  };
}

export default function GraficoUltimosMesesFrete({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div>
        <Block htmlColor="#F00" />
        Sem Registro de frete para o mês selecionado{' '}
      </div>
    );
  }

  const [chartState, setChartState] = useState<ChartState>({
    series: [
      {
        name: 'Frete',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'area',
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: 'straight',
        width: 2,
      },
      title: {
        text: 'Frete nos últimos 3 meses',
      },
      xaxis: {
        categories: [],
      },
      colors: ['#FF9D61'],
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#FF9D61'],
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#FF9D61',
          borderWidth: 0,
        },
        formatter: (value: number) => formatarQuantidade(value),
      },
      tooltip: {
        y: {
          formatter: (value: number) => formatarQuantidade(value),
        },
      },
      yaxis: {
        labels: {
          formatter: (value: number) => formatarQuantidade(value),
        },
      },
    },
  });

  function formatarMes(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  }

  function formatarQuantidade(valor: number): string {
    return `${valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}%`;
  }

  useEffect(() => {
    if (data && data.length > 0) {
      const mesesFormatados = data.map((item) => formatarMes(item.mes));
      const quantidades = data.map((item) => item.historicoFrete);

      setChartState((prevState) => ({
        ...prevState,
        series: [
          {
            name: 'Frete',
            data: quantidades,
          },
        ],
        options: {
          ...prevState.options,
          xaxis: {
            categories: mesesFormatados,
          },
          tooltip: {
            y: {
              formatter: (value: number) => formatarQuantidade(value),
            },
          },
        },
      }));
    }
  }, [data, setChartState]);

  return (
    <div style={{ width: '100%' }}>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="area"
        width={'100%'}
        height={180}
      />
    </div>
  );
}
