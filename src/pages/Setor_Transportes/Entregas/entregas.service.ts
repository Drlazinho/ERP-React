import { apiFabrica_operacao } from '../../../services/apis'

export interface IGetEntregas {
  data: EntregasItem[]
  aSair: number
  aEntregar: number
  entregue: number
  mediaDiaria: number
  previsaoEntrega: number
  entregueDia: number
  previsaoDia: number
  count: number
  page: number
  pages: number | null
  totalCount: number
  horarioAtualizacao: string
}

export interface EntregasItem {
    id: number;
    documento: string;
    nome: string;
    cnpj: string;
    liquido: string;
    bruto: string;
    origem: string;
    destino: string;
    romaneio: string;
    emissao: string;
    saida: string;
    previsao: string;
    entregue: string;
    status: string;
    dias: number;
    diasEmissao: number;
    meta: number;
    comercial: number;
    expedido: number;
    userCom: string;
    userLog: string;
    setorCom: string;
    setorLog: string | null;
    chaveNf: string;
    condPgto: string;
    classificFrete: string;
    memorando: string;
    motoristaId: number;
    motoristaNome: string;
    transportadoraCod: string;
    transportadoraNome: string;
    cancelado: string;
    deletado: string;
    observacao: string | null;
    qtdPallets: number;
}



interface FiltroEntregas {
  documento: string | null;
  cnpj: string | null;
  nome: string | null;
  dias: number | null;
  datainicio: string | null;
  datafim: string | null;
  emissaoInicio: string | null | undefined;
  emissaoFim: string | null;
  previsaoInicio: string | null;
  previsaoFim: string | null;
  saidaInicio: string | null;
  saidaFim: string | null;
  classificFrete: string | null | undefined;
  romaneio: string | null;
};

export type IFiltroEntregas = Partial<FiltroEntregas>

export const buscarEntregasPorFiltros = async (
  filtro: IFiltroEntregas
): Promise<IGetEntregas> => {
  const response = await apiFabrica_operacao.get<IGetEntregas>('Entregas', {
    params: filtro,
  });
  return response.data;
};


export const putObservacaoEntregas = async (item: number) => {
  try {
    const result = await apiFabrica_operacao.put('/Entregas', item)
    return Promise.resolve(result.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
