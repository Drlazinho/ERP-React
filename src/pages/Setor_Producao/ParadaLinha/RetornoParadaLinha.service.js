import { apiFabrica_operacao } from '@/services/apis';

export const getParadaLinha = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`ParadaProducao`, {
      params: { ...filtro },
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMotivoParada = async () => {
  try {
    const result = await apiFabrica_operacao.get(
      `ProducaoParada/MotivosParada`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CriarMotivo = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `ProducaoParada/MotivosParada`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CriarObservacao = async (idParada, observacao) => {
  try {
    const result = await apiFabrica_operacao.put(
      `/ParadaProducao/Observacao?IdParada=${idParada}&Observacao=${observacao}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
