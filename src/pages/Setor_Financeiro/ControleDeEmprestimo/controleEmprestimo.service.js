import { apiFabrica_operacao } from '../../../services/apis';

export const BuscarControleEmprestimo = async (filtros) => {
  try {
    const result = await apiFabrica_operacao.get(`ControleEmprestimo`, {
      params: filtros,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const PostControleEmprestimo = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `ControleEmprestimo/Registrar`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarVencimentos = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `ControleEmprestimo/CalcularDados`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const EditarControleEmprestimo = async (params) => {
  try {
    const result = await apiFabrica_operacao.patch(
      `ControleEmprestimo/AtualizarControleEmprestimos`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AtualizarStatusParcelas = async (formData) => {
  try {
    const result = await apiFabrica_operacao.patch(
      `ControleEmprestimo/AtualizaDadosParcela`,
      formData
      // {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
