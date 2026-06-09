import { apiFabrica_operacao } from '../../../services/apis';

export const buscarApontamentosSanduicheirasPorFiltro = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`ApontamentosSanduicheira/UltimosApontamentos`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

