import { apiFabrica_operacao } from '../services/apis';

export const consultaProdutos = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`Produtos/ProdutoSemImagem`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const consultaProdutosImagem = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`Produtos`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const consultaGalpao = async () => {
  try {
    const result = await apiFabrica_operacao.get(`Galpao`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const gerarQrCode = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(`Produtos`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
