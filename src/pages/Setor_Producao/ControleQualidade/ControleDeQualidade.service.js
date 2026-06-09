import { apiFabrica_operacao, apiFactory } from '@/services/apis';

export const GetLinhasProducao = async () => {
  try {
    const result = await apiFabrica_operacao.get(`/ProducaoEsteiras`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetArmazens = async () => {
  try {
    const result = await apiFactory.get(`/Armazem`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetDefeitos = async () => {
  try {
    const result = await apiFabrica_operacao.get(
      `/ControleDeQualidadeDefeitos`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetOrigem = async () => {
  try {
    const result = await apiFabrica_operacao.get(`/ControleDeQualidadeOrigens`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetControleDeQualidade = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`/ControleDeQualidade`, {
      params: { ...filtro },
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostCadastrarDefeito = async (defeito) => {
  try {
    const result = await apiFabrica_operacao.post(
      `/ControleDeQualidadeDefeitos`,
      defeito
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostCadastrarOrigem = async (origem) => {
  try {
    const result = await apiFabrica_operacao.post(
      `/ControleDeQualidadeOrigens`,
      origem
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostCadastrarControleDeQualidade = async (controle) => {
  try {
    const result = await apiFabrica_operacao.post(
      `/ControleDeQualidade`,
      controle
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutControleDeQualidade = async (controle) => {
  try {
    const result = await apiFabrica_operacao.put(
      `/ControleDeQualidade`,
      controle
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
