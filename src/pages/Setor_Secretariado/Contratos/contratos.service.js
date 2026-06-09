import { apiFabrica, apiFactory } from '@/services/apis';

export const buscarContratosPorFiltro = async (filtro) => {
  try {
    const result = await apiFactory.get(`ControleContratos`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const adicionarNovoContrato = async (body) => {
  try {
    const result = await apiFactory.post(`ControleContratos`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const buscarContrato = async (id) => {
  try {
    const result = await apiFactory.get(`ControleContratos/${id}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const atualizarContrato = async (id, contrato) => {
  try {
    const result = await apiFactory.put(`ControleContratos/${id}`, contrato);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
