import React from 'react';
import { GaugeComponent } from 'react-gauge-component';

interface GaugeChartProps {
  value: number;
  width?: number | string;
  height?: number | string;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, width, height }) => {
  return (
    <div
      style={{
        width,
        height,
      }}
    >
      <GaugeComponent
        type="semicircle"
        arc={{
          padding: 0.02,
          gradient: true,
          subArcs: [
            { limit: 15, color: '#e40101' },
            { limit: 30, color: '#df0000' },
            { limit: 45, color: '#d60101' },
            { limit: 60, color: '#cc0101' },
            { limit: 75, color: '#ac0101' },
            { limit: 90, color: '#a30101' },
            { limit: 100, color: '#9f0101' },
          ],
        }}
        labels={{
          valueLabel: {
            style: { fill: '#333333', fontFamily: 'Poppins-Regular' },
          },
        }}
        pointer={{ type: 'blob', animationDelay: 0 }}
        value={value}
      />
    </div>
  );
};

export default GaugeChart;
