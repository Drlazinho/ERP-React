import {
  apiFabrica_operacao,
  apiFabrica_Posvenda,
} from '../../../services/apis';
import {
  IEstoqueInventarioCardResponse,
  IEstoqueInventarioResponse,
  IPosVendaOperacaoResponse,
  ITaxaOcupacaoResponse,
} from '../types';

export const GetOperacaoPosVendaNPS = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<IPosVendaOperacaoResponse> => {
  try {
    const result = await apiFabrica_Posvenda.get(
      `/PosVendaNPS/Operacao?anoIndicador=${filtro.anoIndicador}&mesIndicador=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetEstTxOcDashOperacao =
  async (): Promise<ITaxaOcupacaoResponse> => {
    try {
      const result = await apiFabrica_operacao.get(`/KpiOperacao/TaxaOcupacao`);
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const GetInventarioDashOperacao = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<IEstoqueInventarioResponse> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/EstoqueInventario/TabelaPrincipal?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetEstoqueInvGeral = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<IEstoqueInventarioCardResponse> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/EstoqueInventario/Cards?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetProducao = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<any> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/KpiOperacao/Producao?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetFrete = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<any> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/KpiOperacao/Transportes/Frete?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetDevolucao = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<any> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/KpiOperacao/Transportes/Devolucao?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetOTIF = async (filtro: {
  anoIndicador: number;
  mesIndicador: number;
}): Promise<any> => {
  try {
    const result = await apiFabrica_operacao.get(
      `/KpiOperacao/Transportes/Otif?Ano=${filtro.anoIndicador}&Mes=${filtro.mesIndicador}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
