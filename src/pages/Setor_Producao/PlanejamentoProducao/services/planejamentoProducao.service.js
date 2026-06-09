import { apiFabrica_operacao } from '../../../../services/apis';

export const RegistrarApontamentoFinal = async (value) => {
  try {
    const result = await apiFabrica_operacao.post(
      'PlanejamentoProducao',
      value
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutEditPlanejamento = async (item) => {
  try {
    const result = await apiFabrica_operacao.put(
      'PlanejamentoProducao/EditarPlanejamento',
      item
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarPlanejamentoProducao = async (value) => {
  try {
    const result = await apiFabrica_operacao.patch(
      'PlanejamentoSemanalProducaoDetalhe',
      value,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConsultarPlanejamento = async (value) => {
  try {
    const result = await apiFabrica_operacao.get('PlanejamentoProducao', {
      params: {
        Semana: value.Semana,
        PeriodoInicio: value.PeriodoInicio,
        PeriodoFim: value.PeriodoFim,
        CodigoProduto: value.CodigoProduto,
        NomeProduto: value.NomeProduto,
      },
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConsultarPlanejamentoId = async (idPlanejamento) => {
  try {
    const result = await apiFabrica_operacao.get(
      `PlanejamentoProducao/PlanejamentoPorId?idPlanejamento=${idPlanejamento}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeleteId = async (idProduto) => {
  try {
    const result = await apiFabrica_operacao.delete(
      `PlanejamentoProducao/ProdutoPlanejamento?idProduto=${idProduto}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ConsultaProdutos = async (value) => {
  try {
    const result = await apiFabrica_operacao.get(
      'PlanejamentoProducao/ListaProdutosMetaHota',
      value
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
