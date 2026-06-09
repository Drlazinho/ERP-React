import { apiFabrica_operacao } from '../../../services/apis';

export const getFrete = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get('/KpiTransporte/Frete');
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getDevolucao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get('/KpiTransporte/Devolucao');
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getOtif = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get('/KpiTransporte/OTIF');
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postFrete = async (item) => {
  try {
    const result = await apiFabrica_operacao.post('KpiTransporte/Frete', item);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postDevolucao = async (item) => {
  try {
    const result = await apiFabrica_operacao.post(
      'KpiTransporte/Devolucao',
      item
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postOtif = async (item) => {
  try {
    const result = await apiFabrica_operacao.post('KpiTransporte/Otif', item);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
