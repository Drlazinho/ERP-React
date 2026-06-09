import React, { useCallback, useEffect, useState } from 'react';
import { GetIndicadores } from '@/pages/Setor_Inteligencia/KpisInteligencia/KpisInteligencia.service';
import GaugeChart from '@/components/GaugeChart';
import ErrorDisplay from '@/components/ErrorDisplay';

interface Indicadores {
  indicadorNPS: number | null;
  mediaIndicadorCSAT: number | null;
  porcentagemIndicadorCSAT: string;
  mediaCanalAtendimento: number | null;
  porcentagemCanalAtendimento: number | null;
  mediaAtendimento: number | null;
  porcentagemAtendimento: number | null;
  mediaColetaEntrega: number | null;
  porcentagemColetaEntrega: number | null;
  mediaAssistenciaTecnica: number | null;
  porcentagemAssistenciaTecnica: number | null;
  mediaSatisfacaoProduto: number | null;
  porcentagemSatisfacaoProduto: number | null;
}

interface GraficoCsatProps {
  filtroData: string;
}

const GraficoCsat: React.FC<GraficoCsatProps> = ({ filtroData }) => {
  const [csat, setCsat] = useState<number>(0);
  const [indicadores, setIndicadores] = useState<Indicadores | null>(null);
  const [erro, setErro] = useState<string>('');

  const converterStringParaFloat = (
    numeroString: string | number | null | undefined
  ): number => {
    if (!numeroString) {
      return 0;
    }

    if (typeof numeroString === 'number') {
      return numeroString;
    }

    if (typeof numeroString === 'string') {
      const numeroSemPontos = numeroString.replace(/\./g, '');
      const numeroComPonto = numeroSemPontos.replace(',', '.');
      const numeroFloat = parseFloat(numeroComPonto);
      return isNaN(numeroFloat) ? 0 : numeroFloat;
    }

    return 0;
  };

  const handleData = () => {
    if (!indicadores) {
      setCsat(0);
      return;
    }

    const valorCSAT = converterStringParaFloat(
      indicadores.porcentagemIndicadorCSAT || '0'
    );
    setCsat(valorCSAT);
  };

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
          setIndicadores(null);
          setCsat(0);
        } else {
          setErro('');
          setIndicadores(res.value);
        }
      })
      .catch(() => {
        setErro(
          'Não foi encontrado registro de indicadores para esse intervalo.'
        );
        setIndicadores(null);
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
    return <ErrorDisplay message={erro} />;
  }

  return <GaugeChart value={csat} width={350} height={200} />;
};

export default GraficoCsat;
