import { apiFabricaADM } from '../../../services/apis';

export const buscarPedidosPorFiltro = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Pedidos`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarPedidoImpressaoCubagem = async (nF_NRO) => {
  try {
    const result = await apiFabricaADM.post(`Pedidos/ImpressaoCubagem`, {
      nF_NRO: nF_NRO,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarPedidoImpressaoCubagemCheck = async (value) => {
  try {
    const result = await apiFabricaADM.post(`Pedidos/ImpressaoCubagem`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PedidosDescricaoGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Pedidos/Descricao`, {
      params: filtro,
    });

    return Promise.resolve(result.data.value);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PedidosCubagemoGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Pedidos/Cubagem`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
