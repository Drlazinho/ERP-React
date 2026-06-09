import { apiFabrica_operacao, apiFactory } from '../apis';

export const Buscar = async (endpoint, request) => {
  try {
    const result = await apiFactory.get(`${endpoint}`, request);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarPorGuid = async (endpoint, guid) => {
  try {
    const result = await apiFabrica_operacao.get(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Login = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.post(`${endpoint}`, body);

    login(result.data.data.token);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Post = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.post(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Put = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Patch = async (endpoint, body) => {
  try {
    const result = await apiFabrica_operacao.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Delete = async (endpoint, guid) => {
  try {
    const result = await apiFabrica_operacao.delete(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
