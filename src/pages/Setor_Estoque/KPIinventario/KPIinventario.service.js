import { apiFabrica_operacao } from '../../../services/apis';

export const PostInventario = async (email, params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `EstoqueInventario?Email=${email}`,
      params
    );

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetEstoqueInventarioPrincipal = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `EstoqueInventario/TabelaPrincipal?Ano=${filtro.ano}&Mes=${filtro.mes}`
    );
    return result;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const GetEstoqueInventarioHistorico = async () => {
  try {
    const result = await apiFabrica_operacao.get('EstoqueInventario');
    return result;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const GetEstoqueInventarioCardsMes = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `EstoqueInventario/Cards?Ano=${filtro.ano}&Mes=${filtro.mes}`
    );
    return result;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const GetEstoqueInventarioGraficoBarras = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `EstoqueInventario/graficoBarras?ano=${filtro.ano}`
    );
    return result;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    throw error;
  }
};

export const patchEstoqueInventario = async (query, params) => {
  try {
    const result = await apiFabrica_operacao.patch(
      `EstoqueInventario${query}`,
      params
    );
    return result;
  } catch (error) {
    console.error('Erro ao atualizar inventário:', error);
    throw error;
  }
};
