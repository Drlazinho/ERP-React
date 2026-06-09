import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';

export const getAgendamentoCarga = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`AgendamentoCarga`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putAgendamentoCarga = async (item) => {
  try {
    const result = await apiFabrica_operacao.put(`AgendamentoCarga`, item);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postNF = async (item) => {
  try {
    const result = await apiFabrica_operacao.post(`AgendamentoCarga`, item);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
