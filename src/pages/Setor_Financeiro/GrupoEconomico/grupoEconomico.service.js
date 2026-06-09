import { apiFabricaApoio } from '../../../services/apis';

export const buscarRelatFaturamentoDash = async (value) => {
  try {
    const result = await apiFabricaApoio.get(`GrupoClientes`, {
      params: value,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarGrupoEconomico = async (params) => {
  try {
    const result = await apiFabricaApoio.get(`GrupoClientes/individual`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
