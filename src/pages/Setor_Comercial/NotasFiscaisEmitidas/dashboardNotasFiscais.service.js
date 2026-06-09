import { apiFabricaApoio } from '../../../services/apis';

export const graficoNotasExpedicao = async (params) => {
  try {
    const result = await apiFabricaApoio.get(`/Dashboard/NotasExpedicaoGrafico`, { params });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
