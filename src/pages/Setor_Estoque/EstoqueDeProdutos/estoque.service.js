import { apiFabrica_operacao } from "../../../services/apis";

export const buscarEstoque = async (filtro) => {
    try {
        const result = await apiFabrica_operacao.get(`Estoque/Card`, {params: filtro});
        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const buscarEstoqueExcelAndCard = async (Local, Codigo, Descricao) => {
    try {
        const result = await apiFabrica_operacao.get(`Estoque/Excel?Local=${Local}&Codigo=${Codigo}&Descricao=${Descricao}`);
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};