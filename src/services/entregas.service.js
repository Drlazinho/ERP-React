import { apiFabrica, apiFabrica_operacao } from './apis';

export const buscarNotaFiscalPorNumero = async (numero) => {
  try {
    if (numero) {
      const result = await apiFabrica_operacao.get(`Entregas/AlterarEntregaExpedido/${numero}`);
      return Promise.resolve(result.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarEntregasPorFiltros = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`Entregas`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const putExpedicao = async (id,value) => {
  try {
    const result = await apiFabrica_operacao.put(`Entregas/${id}`, {value});

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
