import { apiFabrica, apiFabrica_Posvenda } from '../../../services/apis';

export const getProdutosForaLinha = async (filtro) => {
  try {
    const result = await apiFabrica_Posvenda.get(`ProdutosForaLinha`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarImageForaLinha = async (body) => {
  try {
    const result = await apiFabrica_Posvenda.patch(`/ProdutosForaLinha`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
