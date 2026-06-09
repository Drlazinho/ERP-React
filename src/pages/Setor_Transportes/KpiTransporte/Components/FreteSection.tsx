import { useEffect, useState } from 'react';
import { getFrete } from '../kpiTransport.service';
import TabelaFrete from './TabelaFrete';
import ModalCadastrarFrete from './ModalCadastrarFrete';
import { Box } from '@mui/material';

type FreteData = {
  dtMeta: string;
  dtRegis: string;
  mtaPorcentgm: number;
  userRegisID: number;
  variaPorcentgm: number;
  vlrFrteRealizdo: number;
  vlrMtaMensal: number;
  vlrNfsFat: number;
};

type MesData = {
  mes: string;
  meta: string;
  realizado: string;
  nfFaturada: string;
  variacao: string;
  metaPercentual: string;
};

export type ITotalKpiFrete = {
  mediaMetaPercentual: 0;
  mediaVariacaoPercentual: 0;
  totalMeta: 0;
  totalNfFaturada: 0;
  totalRealizado: 0;
};

export default function FreteSection() {
  const [data, setData] = useState<MesData[]>([]);
  const [dataTotal, setDataTotal] = useState<ITotalKpiFrete>({
    mediaMetaPercentual: 0,
    mediaVariacaoPercentual: 0,
    totalMeta: 0,
    totalNfFaturada: 0,
    totalRealizado: 0,
  });

  const formatarParaTabela = (data: FreteData[]): MesData[] => {
    const mesesNomes = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];

    const dadosMapeados: Record<number, FreteData> = {};

    data.forEach((item) => {
      const mesIndex = new Date(item.dtMeta).getMonth();
      dadosMapeados[mesIndex] = item;
    });

    return mesesNomes.map((mes, index) => {
      const item = dadosMapeados[index];
      return item
        ? {
            mes,
            meta: item.vlrMtaMensal.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            realizado: item.vlrFrteRealizdo.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            nfFaturada: item.vlrNfsFat.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }),
            variacao: `${item.variaPorcentgm.toFixed(2)}%`,
            metaPercentual: `${item.mtaPorcentgm.toFixed(2)}%`,
          }
        : {
            mes,
            meta: 'R$ 0,00',
            realizado: 'R$ 0,00',
            nfFaturada: 'R$ 0,00',
            variacao: '0,00%',
            metaPercentual: '0,00%',
          };
    });
  };

  const carregarFrete = () => {
    getFrete()
      .then((response) => {
        const formatado = formatarParaTabela(response.listaTransportKpiFretes);
        setData(formatado);
        setDataTotal(response);
      })
      .catch((err) => console.error('Erro ao buscar frete:', err));
  };

  useEffect(() => {
    carregarFrete();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <ModalCadastrarFrete handleFrete={carregarFrete} />
      </Box>
      <TabelaFrete data={data} dataTotal={dataTotal} />
    </Box>
  );
}
