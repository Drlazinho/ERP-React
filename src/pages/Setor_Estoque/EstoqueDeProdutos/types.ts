// interfaces/EstoqueInterface.ts (pode criar um ficheiro com este nome ou colocar dentro do componente VirtualSupply.tsx)
export type ItemEstoqueExcelType = {
    codigo: string;
    ean: string;
    descricao: string;
    disponivel: number;
    qtdTerceiro: number;
    reserva: number;
    pendente: number;
    saldo: number;
    preco: number;
    usd: number;
    total: number;
    local: string;
    localizacao: string;
    grupo: string;
    grupoDesc: string;
    vendasTri: number;
    vendasAno: number;
    invoice: number;
    sugestaoTri: number;
    ipi: number;
    icm: number;
    filial: string;
    custo: number;
    precoMedio: number;
    diasEstoque: number;
    sugestaoMenosInvoice: number;
}

export type EstoqueExcelResponseType = {
    totalPaginas: number;
    estoque: ItemEstoqueExcelType[];
}