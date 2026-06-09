export interface IImportacaoItem {
  id?: number;
  fornecedor?: string;
  pi?: string;
  invoice?: string;
  codPro?: string;
  apelido?: string;
  qtde?: number | null;
  nro_BL?: string;
  cntr?: string | null;
  tipo_Cntr?: string;
  agente_Carga?: string;
  navio?: string;
  terminal_Destino?: string;
  etd?: string;
  eta?: string;
  transiTime?: string | null;
  venc_Demurrage?: string;
  presenc_Carga?: string;
  di?: string;
  dtRegistro_DI?: string;
  canal?: string;
  local_Entrega?: string;
  transportadora?: string;
  dtEntrega?: string;
  mes?: string;
  nf?: string;
  ano?: string;
  pgto_AFRMM?: string;
  valor_Invoice?: string;
  taxa?: string;
  fatura?: string | null;
  impostos?: string;
  afrmm?: string;
  frete?: string | null;
  origem?: string;
  taxa_Diaria?: string;
  frete_BLR?: string;
  seguro?: string;
  taxa_Seguro?: string | null;
  valor_CIF?: string;
  po?: string;
  desovado?: string;
  armador?: string;
  tmp_ETA_PC?: string;
  tmp_Pc_Registr?: string;
  tmp_Regist_Entreg?: string;
  tmp_TTL_Desemb?: string;
  venc_Armazengm?: string;
  prz_Registr_90DD?: string;
}

export interface IRetornoImportacaoResponse {
  listaImport: IImportacaoItem[];
  totalPaginas?: number;
  totalLinhas?: number;
}

export type IRetornoImportacaoPut = Pick<
  IImportacaoItem,
  | 'id'
  | 'nro_BL'
  | 'cntr'
  | 'terminal_Destino'
  | 'canal'
  | 'local_Entrega'
  | 'transportadora'
  | 'dtEntrega'
  | 'mes'
  | 'impostos'
  | 'afrmm'
  | 'frete'
  | 'taxa_Diaria'
  | 'frete_BLR'
  | 'seguro'
  | 'taxa_Seguro'
  | 'valor_CIF'
  | 'desovado'
  | 'presenc_Carga'
  | 'armador'
>;
