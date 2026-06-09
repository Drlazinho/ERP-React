import { apiFabrica, apiFabrica_operacao } from './apis';

export const buscarProdutoPorFiltro = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `MovimentacaoCorrenteProdutos`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adicionarMovimentacao = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(
      `MovimentacaoCorrente/Registrar`,
      body
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adicionarMovimentacaoNovo = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(
      `MovimentacaoCorrente/Registrar`,
      body
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const gerarNumeroMei = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `MovimentacaoCorrente/GerarMei`,
      {
        params: filtro,
      }
    );
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const buscarMovimentacao = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `MovimentacaoCorrente/Movimentacoes`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarMovimentacaoMei = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `MovimentacaoCorrente/Movimentacoes`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarMovimentacaoProdutos = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `MovimentacaoCorrenteProdutos`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getKit = async () => {
  try {
    const result = await apiFabrica_operacao.get(`Produtos/ProdutoEKits`);
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const putCheckin = async (item) => {
  try {
    const result = await apiFabrica_operacao.put(
      'MovimentacaoCorrente/IndicarAprovador',
      item,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return result.data;
  } catch (error) {
    console.error('Erro ao enviar a requisição:', error);
    throw error;
  }
};
