import { apiFabrica, apiFabrica_Posvenda } from '../../../services/apis';

export const custoRetornoPost = async (value) => {
  try {
    const result = await apiFabrica_Posvenda.post(`CustoRetorno`, value)

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};