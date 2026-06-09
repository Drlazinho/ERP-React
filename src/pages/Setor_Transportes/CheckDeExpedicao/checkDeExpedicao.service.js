import { apiFabricaADM, apiFabrica_operacao } from '../../../services/apis';

export const getPedidoPorNota = async (filtro) => {
  try {
    const result = await apiFabricaADM.get('/Pedidos/PedidoPorNota', {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProdutoEan = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get('/Produtos', {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postItenPedidoPorNota = async (item) => {
  try {
    await apiFabricaADM.post('/Pedidos/ItensPedidoPorNota', item);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
