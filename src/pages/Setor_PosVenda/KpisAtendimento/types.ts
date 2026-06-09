export interface IAtendimentoItem {
  nomeUsuario?: string;
  promotores?: number;
  detratores?: number;
  razoaveis?: number;
  totalAtendimentos?: number;
  totalAvaliacoes?: number;
  satisfacaoGeral?: number;
  meioComunicacao?: string;
  dtReferencia?: string;
  percentualDeAtendimentosAvaliados?: string;
  observacao?: string;
}

export interface IAtendimentoResponse {
  atendimentos: IAtendimentoItem[];
}

export interface IMediaPorMeioComunicacao {
  key: string;
  value: number;
}

export interface IMediaGeralItem {
  nome?: string;
  media?: number;
  dataReferente?: string;
  mediasPorMeioComunicacao?: IMediaPorMeioComunicacao[];
}
