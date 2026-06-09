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

  return <GaugeChart value={csat} />;
};

export default GraficoCsat;

// import React, { useCallback, useEffect, useState } from 'react';
// import { GaugeComponent } from 'react-gauge-component';
// import { GetIndicadores } from '@/pages/Setor_Inteligencia/KpisInteligencia/KpisInteligencia.service';

// const interfaceIndicadores = {
//   indicadorNPS: null,
//   mediaIndicadorCSAT: null,
//   porcentagemIndicadorCSAT: '',
//   mediaCanalAtendimento: null,
//   porcentagemCanalAtendimento: null,
//   mediaAtendimento: null,
//   porcentagemAtendimento: null,
//   mediaColetaEntrega: null,
//   porcentagemColetaEntrega: null,
//   mediaAssistenciaTecnica: null,
//   porcentagemAssistenciaTecnica: null,
//   mediaSatisfacaoProduto: null,
//   porcentagemSatisfacaoProduto: null,
// };

// export default function GraficoCsat({ filtroData }) {
//   const [csat, setCsat] = useState(0);
//   const [indicadores, setIndicadores] = useState(interfaceIndicadores);
//   const [erro, setErro] = useState('');

//   function ConverterStringParaFloat(numeroString) {
//     if (!numeroString) {
//       return 0;
//     }

//     if (typeof numeroString === 'number') {
//       return numeroString;
//     }

//     // Se for uma string, faça a conversão
//     if (typeof numeroString === 'string') {
//       const numeroSemPontos = numeroString.replace(/\./g, '');
//       const numeroComPonto = numeroSemPontos.replace(',', '.');
//       const numeroFloat = parseFloat(numeroComPonto);
//       return isNaN(numeroFloat) ? 0 : numeroFloat;
//     }

//     return 0;
//   }

//   function handleData() {
//     if (!indicadores) {
//       setCsat(0);
//       return;
//     }

//     const valorCSAT = ConverterStringParaFloat(
//       indicadores.porcentagemIndicadorCSAT
//         ? indicadores.porcentagemIndicadorCSAT
//         : 0
//     );
//     setCsat(valorCSAT);
//   }

//   const handleFetch = useCallback(() => {
//     GetIndicadores(filtroData)
//       .then((res) => {
//         if (
//           typeof res === 'string' &&
//           res.includes(
//             'Não foi encontrado registro de indicadores para esse intervalo.'
//           )
//         ) {
//           setErro(res);
//           setIndicadores(interfaceIndicadores);
//           setCsat(0);
//         } else {
//           setErro('');
//           setIndicadores(res.value);
//         }
//       })
//       .catch((error) => {
//         setErro(
//           'Não foi encontrado registro de indicadores para esse intervalo.'
//         );
//         setIndicadores(interfaceIndicadores);
//         setCsat(0);
//       });
//   }, [filtroData]);

//   useEffect(() => {
//     handleData();
//   }, [indicadores]);

//   useEffect(() => {
//     handleFetch();
//   }, [filtroData, handleFetch]);

//   if (erro) {
//     return (
//       <div
//         style={{
//           textAlign: 'center',
//           padding: '20px',
//           color: '#333',
//           fontFamily: 'Poppins-Regular',
//           fontWeight: 'bold',
//         }}
//       >
//         {erro}
//       </div>
//     );
//   }

//   return (
//     <GaugeComponent
//       type="semicircle"
//       arc={{
//         padding: 0.02,
//         // cornerRadius: 2,
//         gradient: true,
//         subArcs: [
//           { limit: 15, color: '#e40101' },
//           { limit: 30, color: '#df0000' },
//           { limit: 45, color: '#d60101' },
//           { limit: 60, color: '#cc0101' },
//           { limit: 75, color: '#ac0101' },
//           { limit: 90, color: '#a30101' },
//           { limit: 100, color: '#9f0101' },
//         ],
//       }}
//       labels={{
//         valueLabel: {
//           style: { fill: '#333333', fontFamily: 'Poppins-Regular' },
//         },
//       }}
//       pointer={{ type: 'blob', animationDelay: 0 }}
//       value={csat}
//     />
//   );
// }
