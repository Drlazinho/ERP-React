import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Block } from '@mui/icons-material';

interface IMesQuantidade {
  mes: string;
  quantidadeProduzida: number;
}

interface Props {
  data: IMesQuantidade[];
}

interface ChartState {
  series: {
    name: string;
    data: number[];
  }[];
  options: any;
}

export default function GraficoUltimosMesesQuantidade({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div>
        {' '}
        <Block htmlColor="#F00" />
        Sem Registro de quantidade para o mês selecionado{' '}
      </div>
    );
  }

  function formatarMes(dataString: string): string {
    const data = new Date(dataString);
    return data.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  }

  function formatarQuantidade(quantidade: number): string {
    return quantidade.toLocaleString('pt-BR', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const [chartState, setChartState] = useState<ChartState>({
    series: [
      {
        name: 'Quantidade produzida',
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
        text: 'Quantidade produzida nos últimos 3 meses',
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          formatter: (value: number) => formatarQuantidade(value),
        },
      },
      colors: ['#e40101'],
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: ['#e40101'],
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 8,
          backgroundColor: '#e40101',
          borderWidth: 0,
        },
        formatter: (val: number) => formatarQuantidade(val),
      },
      tooltip: {
        y: {
          formatter: (value: number) => formatarQuantidade(value),
        },
      },
    },
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const mesesFormatados = data.map((item) => formatarMes(item.mes));
      const quantidades = data.map((item) => item.quantidadeProduzida);

      setChartState({
        series: [
          {
            name: 'Quantidade produzida',
            data: quantidades,
          },
        ],
        options: {
          ...chartState.options,
          xaxis: {
            categories: mesesFormatados,
          },
        },
      });
    }
  }, [data]);

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
