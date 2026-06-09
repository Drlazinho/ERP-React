import { apiFabricaADM } from '../../../services/apis';

export const BuscarNotas = async (params) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscalEntrada/Comparacao`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
