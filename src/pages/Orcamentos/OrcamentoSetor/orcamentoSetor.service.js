import { apiFabricaADM } from '@/services/apis';

export const ObterCentroCusto = async (idCentroCusto) => {
  try {
    const result = await apiFabricaADM.get(
      `OrcamentoSetores/CentroCustoDetalhe`,
      {
        params: { idCentroCusto },
      }
    );
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ObterContaDetalhe = async (idConta) => {
  try {
    const result = await apiFabricaADM.get(`OrcamentoSetores/ContaDetalhe`, {
      params: { idConta },
    });
    return result.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RegistarContas = async (params) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/RegistraContas`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadastrarSubcontas = async (params) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/RegistrarContaDetalhe`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadastrarSubcontasMensal = async (params) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/RegistrarValorContaDetalhe`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarSubcontas = async (idConta) => {
  try {
    const result = await apiFabricaADM.post(
      `OrcamentoSetores/ListarContasDetalhe`,
      {
        idConta,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PatchEditarConta = async (params) => {
  try {
    const result = await apiFabricaADM.patch(
      `OrcamentoSetores/AtualizarConta`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PatchEditarSubconta = async (params) => {
  try {
    const result = await apiFabricaADM.patch(
      `OrcamentoSetores/AtualizarValorContaDetalhe`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
