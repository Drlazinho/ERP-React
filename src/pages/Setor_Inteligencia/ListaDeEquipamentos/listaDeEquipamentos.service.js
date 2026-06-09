import { apiFactory } from '../../../services/apis';

export const consultarPatrimonio = async (filtro) => {
  try {
    const result = await apiFactory.get(`Patrimonio`, { params: filtro });
    return Promise.resolve(result.data);
  } catch (_err) {
    return Promise.reject(_err);
  }
};
