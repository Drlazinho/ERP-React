import { apiFabrica_operacao } from '@/services/apis';

export const GetProducao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`/Producao`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetProducaoNumeroOp = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `/Producao/ObterProducaoPorNumOP`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetLinhasProducao = async () => {
  try {
    const result = await apiFabrica_operacao.get(`/ProducaoEsteiras`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
