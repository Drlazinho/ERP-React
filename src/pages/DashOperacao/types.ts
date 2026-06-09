export interface IPosVendaOperacaoResponse {
  satisfacaoGeral: string;
  nps: string;
  promotores: number;
  porcentagemPromotores: string;
  detratores: number;
  porcentagemDetratores: string;
  neutros: number;
  porcentagemNeutros: string;
  totalRespondentes: number;
}

export interface ITaxaOcupacaoResponse {
  estoqueTaxaDisponivel: number;
  estoqueTaxaOcupado: number;
  estoqueTaxaSedeOcupacao: number;
  estoqueTaxaCordebrasOcupacao: number;
  estoqueTaxaPosvendaSPOcupacao: number;
  estoqueTaxaPosvendaBAOcupacao: number;
  estoqueTaxaLogicOcupacao: number;
  estoqueTaxaBlocadoSedeOcupacao: number;
}

export interface IResultadoEstoqueInventario {
  id: number;
  armazem: number;
  qtdContada: number;
  qtdComDivergencia: number;
  dataContada: string;
  usuarioID: number;
  mes: string;
  acuracidade: string;
}

export interface IEstoqueInventarioResponse {
  mes: number;
  ano: number;
  acuracidadeGeral: string;
  resultados: IResultadoEstoqueInventario[];
}

export interface IEstoqueInventarioCardResponse {
  inventarioAno: number;
  inventarioMes: number;
}

export interface IMesEficiencia {
  mes: string;
  mediaEficiencia: number;
}

export interface IMesQuantidade {
  mes: string;
  quantidadeProduzida: number;
}

export interface IProducaoProduzidos {
  ano: number;
  mes: number;
  eficienciaMedia: number;
  disponibilidadeMedia: number;
  qualidadeMedia: number;
  oeeMedia: number;
  metaProducaoTotal: number;
  quantidadeProduzidaTotal: number;
  quantidadePendenteTotal: number;
  eficienciaUltimosTresMeses: IMesEficiencia[];
  quantidadeProduzidaUltimosTresMeses: IMesQuantidade[];
}

export interface IMesFrete {
  mes: string;
  historicoFrete: number;
}

export interface IFrete {
  valorFaturado?: number;
  frete?: number;
  freteMeta?: number;
  freteUltimosTresMeses?: IMesFrete[] | null;
}

export interface IMesDevolucao {
  mes: string;
  historicoDevolucao: number;
}

export interface IDevolucao {
  devolucao?: number;
  devolucaoMeta?: number;
  devolucaoUltimosTresMeses?: IMesDevolucao[] | null;
}

export interface IMesOTIF {
  mes: string;
  historicoOtif: number;
}

export interface IOTIF {
  otif?: number;
  otifMeta?: number;
  otifUltimosTresMeses?: IMesOTIF[] | null;
}
