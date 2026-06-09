import { apiInteligencia } from '../../../services/apis';

export const postRelatorioApontamentos = async (body) => {
  try {
    const { data } = await apiInteligencia.post(
      `ApontamentoInteligencia/RelatorioApontamentos`,
      body,
      {
        responseType: 'blob',
      }
    );
    return data;
  } catch (error) {
    console.error('Erro ao obter relatório de apontamentos:', error);
    throw error;
  }
};

export const fetchRelatorioPeriodo = async ({
  dataInicial,
  dataFinal,
  setor,
}) => {
  try {
    const params = new URLSearchParams();

    if (dataInicial) params.append('DataInicial', dataInicial);
    if (dataFinal) params.append('DataFinal', dataFinal);
    if (setor) params.append('Setor', setor);

    const { data } = await apiInteligencia.get(
      `ApontamentoInteligencia/ExportarRelatorioApontamentosPeriodo?${params.toString()}`,
      {
        responseType: 'blob',
      }
    );

    return data;
  } catch (error) {
    console.error('Erro ao exportar relatório por período:', error);
    throw error;
  }
};
