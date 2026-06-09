import { apiFabricaADM } from '../../../services/apis';

export interface ITituloReceber {
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
  valor_Orig: number;
  saldo: number;
  vencido: number;
  avencer: number;
  emissao: string;
  vencto_Real: string;
  historico: string;
  portador: string;
  numBco: string;
  dias_Atraso: number;
  dtUltimaAtualizacao: string;
  hrUltimaAtualizacao: string;
}

export interface IGetTitulosReceberResponse {
  valorOriginal: number;
  horarioAtualizacao: string;
  saldo: number;
  saldoReal: number;
  vencido: number;
  vencidoReal: number;
  avencer: number;
  titulos: ITituloReceber[];
  totalDeItens: number;
  totalDePaginas: number;
}

export interface ITitulosReceberFiltrosParams {
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

export const buscarTitulosReceberPorFiltro = async (
  filtro: ITitulosReceberFiltrosParams
) => {
  try {
    const result = await apiFabricaADM.get<IGetTitulosReceberResponse>(
      `TitulosReceber`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
