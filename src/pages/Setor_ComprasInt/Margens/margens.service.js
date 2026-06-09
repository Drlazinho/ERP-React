import { apiFabrica_operacao } from '../../../services/apis';

export const getMargens = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`/Estoque/Card`, { params: filtro })
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMargensExcel = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
        `/Estoque/Excel?Local=${filtro.Local}&Codigo=${filtro.codigo}&Descricao=${filtro.descricao}`
      )
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};