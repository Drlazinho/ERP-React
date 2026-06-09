import { apiFabricaADM } from '@/services/apis';

export const ObterMeta = async (params) => {
  try {
    const result = await apiFabricaADM.get(`OrcamentoSetores/ObterMeta`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadastrarMeta = async (params) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/RegistrarMeta`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RegistrarCentroCusto = async (params) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/RegistrarCentroCusto`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AtualizarMeta = async (params) => {
  try {
    const result = await apiFabricaADM.patch(
      `OrcamentoSetores/AtualizaMeta`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
