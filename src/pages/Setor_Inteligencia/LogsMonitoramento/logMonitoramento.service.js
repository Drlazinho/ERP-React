import { apiFabrica } from '../../../services/apis';

export const logsRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/recente/', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const errosRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/recente/', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const endpointsRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/endpoints/', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const setoresRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/setores', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ultimosDiasRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/ultimos-dias', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const acumuladoRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/acumulado', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const acumuladosLoginsRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/acumulados-logins', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const indicadoresRequest = async (value) => {
  try {
    const result = await apiFabrica.post('RequestLogs/indicadores', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
