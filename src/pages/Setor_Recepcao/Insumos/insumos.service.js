import { apiFabricaADM } from '@/services/apis';

export const buscarInsumosPorFiltro = async (email, params) => {
  try {
    const result = await apiFabricaADM.get(`Insumos?Email=${email}`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInsumosFornecedor = async () => {
  try {
    const result = await apiFabricaADM.get(`InsumosFornecedor`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getInsumosTipo = async () => {
  try {
    const result = await apiFabricaADM.get(`InsumosTipo`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarNovoInsumo = async (value) => {
  try {
    const result = await apiFabricaADM.post('Insumos', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarNovoValorInsumo = async (body) => {
  try {
    const result = await apiFabricaADM.put('Insumos', body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
