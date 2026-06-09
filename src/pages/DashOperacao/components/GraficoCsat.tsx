import { GaugeComponent } from 'react-gauge-component';

interface GraficoCsatProps {
  value: number | string;
}

export default function GraficoCsat({ value }: GraficoCsatProps) {
  let numero = 0;

  if (typeof value === 'string') {
    const valueFormated = value.replace(',', '.');
    numero = parseFloat(valueFormated);
  } else if (typeof value === 'number') {
    numero = value;
  }

  if (isNaN(numero)) {
    console.error('O valor não pôde ser convertido para número.');
    numero = 0;
  }

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        padding: 0.02,
        subArcs: [
          { limit: 15, color: '#df304a' },
          { limit: 30, color: '#f04e25' },
          { limit: 45, color: '#ff7c02' },
          { limit: 60, color: '#f7e401' },
          { limit: 75, color: '#c7ea01' },
          { limit: 90, color: '#54e637' },
          { limit: 100, color: '#00c875' },
        ],
      }}
      labels={{
        valueLabel: {
          style: { fill: '#333333', fontFamily: 'Poppins-Regular' },
        },
      }}
      pointer={{ type: 'blob', animationDelay: 0 }}
      value={numero}
    />
  );
}