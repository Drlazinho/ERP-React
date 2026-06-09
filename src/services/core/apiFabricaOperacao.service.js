import { apiFabrica_operacao } from '../apis';

export const BuscarOperacao = async (endpoint, request) => {
  try {
    const result = await apiFabrica_operacao.get(`${endpoint}`, request);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostOperacao = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.post(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutOperacao = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
