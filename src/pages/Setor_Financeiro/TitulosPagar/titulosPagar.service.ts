import { apiFabricaADM } from '../../../services/apis';

export interface Titulo {
  id: number;
  filial: string;
  cliente: string;
  nome_Cliente: string;
  prefixo: string;
  numero: string;
  parcela: string;
  tipo: string;
  natureza: string;
  moeda: number;
  cotacao: number;
  valor_Orig: number;
  saldo: number;
  emissao: string;
  vencto_Real: string;
  historico: string;
  portador: string;
  numBco: string;
  dias_atraso: number;
  dtUltimaAtualizacao: string;
  hrUltimaAtualizacao: string;
}

export interface IGetTitulosPagar {
  valorTotal: number;
  valorOriginal: number;
  titulos: Titulo[];
  totalDeItens: number;
  totalDePaginas: number;
  valorAVencer: number;
  valorVencido: number;
}

export interface ITitulosPagarFiltrosParams {
  id?: number;
  nomeCliente?: string | null;
  portador?: string | null;
  natureza?: string | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  numero?: string | null;
  tipo?: string | null;
  numBco?: string | null;
  numeroDaPagina: number;
  itensPorPagina: number;
  codigoCliente?: string | null;
}

export const buscarTitulosPagarPorFiltro = async (
  filtro: ITitulosPagarFiltrosParams
) => {
  try {
    const result = await apiFabricaADM.get<IGetTitulosPagar>(`TitulosPagar`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
