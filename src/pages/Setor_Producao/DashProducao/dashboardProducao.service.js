import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';

export const buscarTotalProducaoLinhas = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      'Apontamentos/DashboardProducao',
      { params: filtro }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarTotalProducaoProdutos = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      'Apontamentos/DashboardProducao',
      { params: filtro }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarProducaoLinhaGalpao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      'Apontamentos/ApontamentoProdutoLinhaGalpao',
      { params: filtro }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarMetaProducao = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      'EficienciaProducao/MetaProducao',
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarMetaProducao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      'EficienciaProducao/MetaProducao',
      { params: filtro }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarEficiencia = async (params) => {
  try {
    const result = await apiFabrica_operacao.put(
      'EficienciaProducao/EficienciaProducao',
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
