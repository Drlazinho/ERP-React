// Como usar o GraficoUltimos3Meses?
// data={dadosEficiencia}
//   title="Eficiência por mês"
//   seriesName="Eficiência"
//   color="#00C875"
//   chartType="line"
//   height={250}
//   ou
//   data={[{x: 1, y: 10}, {x: 2, y: 20}]}
//    Formato percentual: valueFormat="percent"
//    Formato monetário (R$): valueFormat="currency"
//    Formato de quantidade: valueFormat="quantity"
//    Formato customizado: customFormat={(value) => `${value} unidades`}
//    Com limites no eixo Y: yAxisMin={0} yAxisMax={100}

import { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartType =
  | 'area'
  | 'line'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap';

type StrokeCurve = 'smooth' | 'straight' | 'stepline';

interface IDataPoint {
  x: string | number;
  y: number;
}

type ValueFormat = 'percent' | 'currency' | 'quantity' | 'custom';

interface ChartProps {
  data: IDataPoint[];
  title?: string;
  seriesName?: string;
  height?: number;
  color?: string;
  chartType?: ChartType;
  strokeCurve?: StrokeCurve;
  showDataLabels?: boolean;
  dataLabelColor?: string;
  backgroundColor?: string;
  valueFormat?: ValueFormat;
  customFormat?: (value: number) => string;
  yAxisMin?: number;
  yAxisMax?: number;
}

const defaultProps = {
  title: 'Gráfico',
  seriesName: 'Valores',
  height: 180,
  color: '#0089FF',
  chartType: 'area' as ChartType,
  strokeCurve: 'straight' as StrokeCurve,
  showDataLabels: true,
  dataLabelColor: '#0089FF',
  backgroundColor: '#0089FF',
  valueFormat: 'quantity' as ValueFormat,
  yAxisMin: undefined,
  yAxisMax: undefined,
};

export default function GraficoCustomizado(props: ChartProps) {
  const {
    data = [],
    title,
    seriesName,
    height,
    color,
    chartType,
    strokeCurve,
    showDataLabels,
    dataLabelColor,
    backgroundColor,
    valueFormat,
    customFormat,
    yAxisMin,
    yAxisMax,
  } = { ...defaultProps, ...props };

  const formatValue = (value: number): string => {
    if (typeof value !== 'number') return 'N/A';
    if (customFormat) return customFormat(value);

    switch (valueFormat) {
      case 'percent':
        return `${(value * 100).toFixed(2)}%`;
      case 'currency':
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(value);
      case 'quantity':
        return new Intl.NumberFormat('pt-BR').format(value);
      default:
        return value.toString();
    }
  };

  const [chartState, setChartState] = useState({
    series: [
      {
        name: seriesName,
        data: [] as number[],
      },
    ],
    options: {
      chart: {
        type: chartType,
        toolbar: { show: false },
      },
      stroke: {
        curve: strokeCurve,
        width: 2,
      },
      title: { text: title },
      xaxis: { categories: [] as string[] },
      yaxis: {
        min: yAxisMin,
        max: yAxisMax,
        labels: {
          formatter: (value: number) => formatValue(value),
        },
      },
      colors: [color],
      dataLabels: {
        enabled: showDataLabels,
        offsetY: -10,
        formatter: (value: number) => formatValue(value),
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
          colors: [dataLabelColor],
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          padding: 4,
          borderRadius: 8,
          backgroundColor: backgroundColor,
          borderWidth: 0,
        },
      },
      tooltip: {
        y: {
          formatter: (value: number) => formatValue(value),
        },
      },
    } as ApexCharts.ApexOptions,
  });

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const categories = data
        .map((item) => (item?.x !== undefined ? item.x.toString() : ''))
        .filter(Boolean);

      const values = data.map((item) =>
        typeof item?.y === 'number' ? item.y : 0
      );

      setChartState((prev) => ({
        ...prev,
        series: [
          {
            ...prev.series[0],
            data: values,
          },
        ],
        options: {
          ...prev.options,
          xaxis: { categories },
          yaxis: {
            ...prev.options.yaxis,
            min: yAxisMin,
            max: yAxisMax,
          },
        },
      }));
    }
  }, [data, yAxisMin, yAxisMax]);

  return (
    <div style={{ width: '100%' }}>
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type={chartType}
        width={'100%'}
        height={height}
      />
    </div>
  );
}
