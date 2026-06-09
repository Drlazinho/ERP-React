import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Block } from '@mui/icons-material';

interface IMesEficiencia {
  mes: string;
  mediaEficiencia: number;
}

interface Props {
  data: IMesEficiencia[];
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
    };
  };
}

export default function GraficoUltimosMesesEficiencia({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div>
        {' '}
        <Block htmlColor="#F00" />
        Sem Registro de eficiência para o mês selecionado{' '}
      </div>
    );
  }
  const [meses, setMeses] = useState<string[]>([]);
  const [medias, setMedias] = useState<number[]>([]);
  const [chartState, setChartState] = useState<ChartState>({
    series: [
      {
        name: 'Média de eficiência',
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
        text: 'Eficiência nos últimos 3 meses',
      },
      xaxis: {
        categories: [],
      },
      colors: ['#0089FF'],
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#0089FF'],
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#0089FF',
          borderWidth: 0,
        },
      },
    },
  });

  function formatarMes(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  }

  useEffect(() => {
    if (data && data.length > 0) {
      const mesesFormatados = data.map((item) => formatarMes(item.mes));
      const mediasEficiencia = data.map((item) => item.mediaEficiencia);

      setMeses(mesesFormatados);
      setMedias(mediasEficiencia);
    }
  }, [data]);

  useEffect(() => {
    setChartState((prevState) => ({
      ...prevState,
      series: [
        {
          name: 'Média de eficiência',
          data: medias,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          categories: meses,
        },
      },
    }));
  }, [medias, meses]);

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
