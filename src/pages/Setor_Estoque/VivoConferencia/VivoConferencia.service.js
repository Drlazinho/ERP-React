import { apiFabrica_operacao, apiFactory } from '../../../services/apis';

export const buscarArmazens = async () => {
  try {
    const result = await apiFactory.get('/Galpao');
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConferirQrCode = async (params) => {
  try {
    const result = await apiFabrica_operacao.get(
      `GeradorNumSerieVivo/Conferencia`,
      { params }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const VerificarQrCode = async (params) => {
  try {
    const result = await apiFabrica_operacao.put(
      `GeradorNumSerieVivo/Expedicao`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
