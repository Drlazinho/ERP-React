import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';

export const getEstoqueOcupacao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`EstoqueOcupacao`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getGalpao = async () => {
  try {
    const result = await apiFabrica_operacao.get(`Galpao`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const cadastrarCapacidade = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(`EstoqueOcupacao`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const cadastrarAtualizacao = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(
      `EstoqueOcupacaoDetalhe`,
      body
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const excluirGalpao = async (id) => {
  try {
    const result = await apiFabrica_operacao.delete(`/EstoqueOcupacao/${id}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarCapacidade = async (obj) => {
  try {
    const result = await apiFabrica_operacao.put(
      `/EstoqueOcupacao?idEstoque=${obj.id}`,
      {
        novaCapacidade: obj.capacidade,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getHistoricoOcupacao = async (obj) => {
  try {
    const result = await apiFabrica_operacao.get(
      `/EstoqueOcupacaoDetalhe?IdEstoqOcup=${obj.id}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
