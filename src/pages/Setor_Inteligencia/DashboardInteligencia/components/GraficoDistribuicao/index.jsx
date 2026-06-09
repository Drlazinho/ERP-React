import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { Typography } from '@mui/material';

const GraficoDistribuicao = ({ data }) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  const COLORS = [
    '#008FFB',
    '#00E396',
    '#FEB019',
    '#FF4560',
    '#775DD0',
    '#A55EEA',
  ];

  const [formattedChartData, setFormattedChartData] = useState([]);

  useEffect(() => {
    if (!isValidData) {
      setFormattedChartData([]);
      return;
    }

    try {
      const newFormattedData = data.map((item, index) => {
        if (item && typeof item === 'object') {
          return {
            name: item.categoria || `Categoria ${index + 1}`,
            value: Number(item.participacao) || 0,
          };
        }
        return { name: `Categoria ${index + 1}`, value: 0 };
      });

      setFormattedChartData(newFormattedData);
    } catch (error) {
      console.error(
        'Erro ao processar dados para o gráfico de distribuição:',
        error
      );
      setFormattedChartData([]);
    }
  }, [data, isValidData]);

  if (!formattedChartData || formattedChartData.length === 0) {
    return (
      <Typography
        variant="body1"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          width: '100%',
          color: '#333',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {isValidData ? 'Processando dados...' : 'Nenhum dado disponível...'}
      </Typography>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      }}
    >
      <div style={{ width: '100%', height: '300px' }}>
        <ResponsiveContainer>
          <PieChart margin={{ top: 10, right: 20, bottom: 0, left: 20 }}>
            <Pie
              data={formattedChartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={({ cx, cy, midAngle, outerRadius, percent, name }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + 10;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="black"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    fontSize={10}
                  >
                    {`${name} (${(percent * 100).toFixed(1)}%)`}{' '}
                  </text>
                );
              }}
            >
              {formattedChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => [
                `${value.toFixed(2)}%`,
                props.payload.name,
              ]}
              contentStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Legend
              align="center"
              verticalAlign="bottom"
              layout="horizontal"
              wrapperStyle={{
                fontSize: '12px',
                fontWeight: 'bold',
                color: '#000',
                marginTop: '10px',
              }}
              iconType="circle"
              // custom payload para exibir apenas a categoria na legenda, se preferir
              // payload={formattedChartData.map((item, i) => ({
              //   value: item.name,
              //   type: 'circle',
              //   id: item.name,
              //   color: COLORS[i % COLORS.length]
              // }))}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default GraficoDistribuicao;
