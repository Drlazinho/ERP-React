import React, { useCallback, useEffect, useState } from 'react';
import { GaugeComponent } from 'react-gauge-component';
import { GetIndicadores } from '@/pages/Setor_PosVenda/KpisPosVenda/KpisPosVenda.service';

const interfaceIndicadores = {
  indicadorNPS: null,
  mediaIndicadorCSAT: null,
  porcentagemIndicadorCSAT: '',
  mediaCanalAtendimento: null,
  porcentagemCanalAtendimento: null,
  mediaAtendimento: null,
  porcentagemAtendimento: null,
  mediaColetaEntrega: null,
  porcentagemColetaEntrega: null,
  mediaAssistenciaTecnica: null,
  porcentagemAssistenciaTecnica: null,
  mediaSatisfacaoProduto: null,
  porcentagemSatisfacaoProduto: null,
};

export default function GraficoCsat({ filtroData }) {
  const [csat, setCsat] = useState(0);
  const [indicadores, setIndicadores] = useState(interfaceIndicadores);
  const [erro, setErro] = useState('');

  function ConverterStringParaFloat(numeroString) {
    if (!numeroString) {
      return 0;
    }

    if (typeof numeroString === 'number') {
      return numeroString;
    }

    // Se for uma string, faça a conversão
    if (typeof numeroString === 'string') {
      const numeroSemPontos = numeroString.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return isNaN(numeroFloat) ? 0 : numeroFloat;
    }

    return 0;
  }

  function handleData() {
    const valorCSAT = ConverterStringParaFloat(
      indicadores.porcentagemIndicadorCSAT
    );
    setCsat(valorCSAT);
  }

  const handleFetch = useCallback(() => {
    GetIndicadores(filtroData)
      .then((res) => {
        if (
          typeof res === 'string' &&
          res.includes(
            'Não foi encontrado registro de indicadores para esse intervalo.'
          )
        ) {
          setErro(res);
          setIndicadores(interfaceIndicadores);
          setCsat(0);
        } else {
          setErro('');
          setIndicadores(res);
        }
      })
      .catch((error) => {
        setErro(
          'Não foi encontrado registro de indicadores para esse intervalo.'
        );
        setIndicadores(interfaceIndicadores);
        setCsat(0);
      });
  }, [filtroData]);

  useEffect(() => {
    handleData();
  }, [indicadores]);

  useEffect(() => {
    handleFetch();
  }, [filtroData, handleFetch]);

  if (erro) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '20px',
          color: '#333',
          fontFamily: 'Poppins-Regular',
          fontWeight: 'bold',
        }}
      >
        {erro}
      </div>
    );
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
      value={csat}
    />
  );
}
