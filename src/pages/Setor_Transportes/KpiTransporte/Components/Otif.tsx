import { useEffect, useState } from 'react';
import { getOtif } from '../kpiTransport.service';
import { Box } from '@mui/material';
import TabelaOtif from './TabelaOtif';
import ModalCadastrarOtif from './ModalCadastrarOtif';

type Otif = {
  dtMeta: string;
  mtaPorcentgm: number;
  qtdAgend: number;
  qtdNoShow: number;
  varPorcentgm: number;
  dtRegis: string;
  userRegisID: number;
};

type MesData = {
  mes: string;
  quantidadeAgendada: number;
  noShow: number;
  variacao: string;
  metaPercentual: string;
};

export type ITotalKpiOTIF = {
  totalQtdAgendada: 0;
  totalNoShow: 0;
  mediaVariacaoPercentual: 0;
  mediaMetaPercentual: 0;
};

export default function OtifSection() {
  const [data, setData] = useState<MesData[]>([]);
  const [dataTotal, setDataTotal] = useState<ITotalKpiOTIF>({
    totalQtdAgendada: 0,
    totalNoShow: 0,
    mediaVariacaoPercentual: 0,
    mediaMetaPercentual: 0,
  });
  const formatarParaTabela = (data: Otif[]): MesData[] => {
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

    const dadosMapeados: Record<number, Otif> = {};

    data.forEach((item) => {
      const mesIndex = new Date(item.dtMeta).getMonth();
      dadosMapeados[mesIndex] = item;
    });

    return mesesNomes.map((mes, index) => {
      const item = dadosMapeados[index];

      return {
        mes,
        quantidadeAgendada: item?.qtdAgend ?? 0,
        noShow: item?.qtdNoShow ?? 0,
        variacao: item
          ? `${item.varPorcentgm.toFixed(2).replace('.', ',')}%`
          : '0,00%',
        metaPercentual: item
          ? `${item.mtaPorcentgm.toFixed(2).replace('.', ',')}%`
          : '0,00%',
      };
    });
  };

  const handleGetOtif = () => {
    getOtif()
      .then((response) => {
        const formatado = formatarParaTabela(response.listaKpiTransporteOtif);
        setData(formatado);
        setDataTotal(response);
      })
      .catch((err) => console.error('Erro ao buscar OTIF:', err));
  };

  useEffect(() => {
    handleGetOtif();
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
        <ModalCadastrarOtif handleGetOtif={handleGetOtif} />
      </Box>
      <TabelaOtif data={data} dataTotal={dataTotal} />
    </Box>
  );
}
