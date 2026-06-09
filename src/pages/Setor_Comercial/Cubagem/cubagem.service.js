import { apiFabricaADM } from '../../../services/apis';

export const buscarCubagem = async (body) => {
  try {
    const result = await apiFabricaADM.put(`CubagemPedidos`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putCubagem = async (body) => {
  try {
    const result = await apiFabricaADM.put(
      `CubagemPedidos/CubagemPedidoParcial`,
      body
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
