import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';

export const cadastrarValorDesconsideradoFunc = async (obj) => {
  try {
    const result = await apiFabrica_operacao.put(`/Estoque/3040`, {
      obj,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const graficoHistorico = async (params) => {
  try {
    const result = await apiFabrica_operacao.get(`/Estoqueshistorico`, { params });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const pedidosCarteira = async (dados) => {
  try {
    const result = await apiFabrica_operacao.get(
      `/Estoqueshistorico/GetPedidosPorProdutos?CodProduto=${dados}&pageNumber=1&pageSize=1000`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
