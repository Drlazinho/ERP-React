import React from 'react';
import { Typography } from '@mui/material';

function TabelaDashChamados({ data }) {
  if (!data || data.length === 0) {
    return <Typography variant="body1">Nenhum dado disponível...</Typography>;
  }
  const meses = [
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
  ];
  const mesesKeys = [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ];

  const dadosTransformados = mesesKeys.map((mes) => (data[mes] || 0) * 100);

  const dados = [
    {
      cor: '#FFC000',
      valores: Array(12).fill(90),
    },
    {
      cor: '#00B050',
      valores: dadosTransformados,
    },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'center', padding: '8px' }}></th>
            {meses.map((mes) => (
              <th
                key={mes}
                style={{
                  textAlign: 'center',
                  padding: '8px',
                  border: '1px solid rgba(221, 226, 228, 0.40)',
                }}
              >
                {mes}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dados.map((linha) => (
            <tr key={linha.cor}>
              <td
                style={{
                  borderRight: '1px solid rgba(221, 226, 228, 0.40)',
                  textAlign: 'center',
                  padding: '8px',
                }}
              >
                <div
                  style={{
                    backgroundColor: linha.cor,
                    height: 20,
                    width: 20,
                    borderRadius: '50%',
                    margin: '0 auto',
                  }}
                />
              </td>
              {linha.valores.map((valor, index) => (
                <td
                  key={index}
                  style={{
                    textAlign: 'center',
                    padding: '8px',
                    border: '1px solid rgba(221, 226, 228, 0.40)',
                  }}
                >
                  {valor}%
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TabelaDashChamados;
