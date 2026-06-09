import { useEffect, useState } from 'react';
import { getDevolucao } from '../kpiTransport.service';
import { Box } from '@mui/material';
import TabelaDevolucao from './TabelaDevolucao';
import ModalCadastrarDevolucao from './ModalCadastrarDevolucao';

type Devolucao = {
  dtMeta: string;
  mtaPorcentgm: number;
  qtdVolExped: number;
  qtdVolDevol: number;
  varPorcetgm: number;
  dtRegis: string;
  userRegisID: number;
};

type MesData = {
  mes: string;
  volumeExpedido: number;
  volumeDevolvido: number;
  variacao: string;
  metaPercentual: string;
};

export type ITotalKpiDevolucao = {
  totalVolumeExpedido: 0;
  totalVolumeDevolvido: 0;
  mediaVariacaoPercentual: 0;
  mediaMetaPercentual: 0;
};

export default function DevolucaoSection() {
  const [data, setData] = useState<MesData[]>([]);
  const [dataTotal, setDataTotal] = useState<ITotalKpiDevolucao>({
    totalVolumeExpedido: 0,
    totalVolumeDevolvido: 0,
    mediaVariacaoPercentual: 0,
    mediaMetaPercentual: 0,
  });

  const formatarParaTabela = (data: Devolucao[]): MesData[] => {
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

    const dadosMapeados: Record<number, Devolucao> = {};

    data.forEach((item) => {
      const mesIndex = new Date(item.dtMeta).getMonth();
      dadosMapeados[mesIndex] = item;
    });

    return mesesNomes.map((mes, index) => {
      const item = dadosMapeados[index];

      const variacao = item?.varPorcetgm ? Number(item.varPorcetgm) : 0;
      const meta = item?.mtaPorcentgm ? Number(item.mtaPorcentgm) : 0;

      return {
        mes,
        volumeExpedido: item?.qtdVolExped ?? 0,
        volumeDevolvido: item?.qtdVolDevol ?? 0,
        variacao: `${variacao.toFixed(2)}%`,
        metaPercentual: `${meta.toFixed(2)}%`,
      };
    });
  };

  const handleGetDevolucao = () => {
    getDevolucao()
      .then((response) => {
        const formatado = formatarParaTabela(response.listaKpiDevolucaoes);
        setData(formatado);
        setDataTotal(response);
      })
      .catch((err) => console.error('Erro ao buscar frete:', err));
  };

  useEffect(() => {
    handleGetDevolucao();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <ModalCadastrarDevolucao handleGetDevolucao={handleGetDevolucao} />
      </Box>
      <TabelaDevolucao data={data} dataTotal={dataTotal} />
    </Box>
  );
}
