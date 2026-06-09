import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const GraficoRoundedReceitaGrupoProdutos = ({ data = [] }) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  const COLORS = [
    '#AA0000',
    '#404040',
    '#979797',
    '#FFBB28',
    '#00C49F',
    '#FF8042',
  ];

  const [formattedChartData, setFormattedChartData] = useState([]);

  useEffect(() => {
    if (!isValidData) {
      setFormattedChartData([]);
      return;
    }

    try {
      const dataLimitada = data.slice(0, 4);

      const newFormattedData = dataLimitada.map((item, index) => {
        if (item && typeof item === 'object') {
          return {
            name: item.descricao || `Grupo ${index + 1}`,
            value: Number(item.porcentagem) || 0,
          };
        }
        return { name: `Grupo ${index + 1}`, value: 0 };
      });

      setFormattedChartData(newFormattedData);
    } catch (error) {
      console.error('Erro ao processar dados para o gráfico:', error);
      setFormattedChartData([]);
    }
  }, [data, isValidData]);

  if (!formattedChartData || formattedChartData.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 350,
          width: '100%',
          color: '#333',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {isValidData ? 'Processando dados...' : 'Nenhum dado disponível'}
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <PieChart>
          <text
            x="50%"
            y={20}
            textAnchor="middle"
            dominantBaseline="central"
            style={{ fontSize: '12px', fill: '#333', fontWeight: 'bold' }}
          >
            Receita por Grupo de Produtos
          </text>

          <Pie
            data={formattedChartData}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={60}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={({ value }) => `${value}%`}
            fontSize={12}
          >
            {formattedChartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value.toFixed(2)}%`}
            contentStyle={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
            }}
          />
          <Legend
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
            wrapperStyle={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#333',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoRoundedReceitaGrupoProdutos;
