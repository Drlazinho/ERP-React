import {
  apiFabrica_operacao,
  apiFactory,
  apiFabricaADM,
} from '../../../services/apis';

export const BuscarProdutoMetahoraGet = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`TabelaMestra`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ProdutoMetahoraPost = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(`TabelaMestra`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetFornecedoresChina = async () => {
  try {
    const result = await apiFactory.get(`FornecedoresChina`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadastrarFornecedorChina = async (body) => {
  try {
    const result = await apiFactory.post(`FornecedoresChina`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadrastrarInsumosPost = async (body) => {
  try {
    const result = await apiFabricaADM.post(`Insumos`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetFornecedor = async () => {
  try {
    const result = await apiFabricaADM.get(`InsumosFornecedor`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetInsumosTipo = async () => {
  try {
    const result = await apiFabricaADM.get(`InsumosTipo`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const patchTabelaMestra = async (body) => {
  try {
    const result = await apiFabrica_operacao.patch(`TabelaMestra`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
