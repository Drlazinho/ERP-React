import { apiFabricaDev } from '../apis';

export const Buscar = async (endpoint, request) => {
  try {
    const result = await apiFabricaDev.get(`${endpoint}`, request);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarPorGuid = async (endpoint, guid) => {
  try {
    const result = await apiFabricaDev.get(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Login = async (endpoint, body) => {
  try {
    const result = await apiFabricaDev.post(`${endpoint}`, body);

    login(result.data.data.token);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Post = async (endpoint, body) => {
  try {
    const result = await apiFabricaDev.post(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Put = async (endpoint, body) => {
  try {
    const result = await apiFabricaDev.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const Delete = async (endpoint, guid) => {
  try {
    const result = await apiFabricaDev.delete(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
