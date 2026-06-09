import { apiFabrica } from "@/services/apis";

export const buscarInsumosFornecedorPorFiltro = async (filtro) => {
    try{
        const result = await apiFabrica.get('InsumosFornecedor', {
            params: filtro,
        })
        return  Promise.resolve(result.data);
    }catch(error){
        return Promise.reject(error);
    }
}
export const registrarNovoInsumoFornecedor = async (value) => {
    try{
        const result = await apiFabrica.post('InsumosFornecedor', value) 
        return  Promise.resolve(result.data);
    }catch(error){
        return Promise.reject(error);
    }
}

export const registrarMovimentacaoInsumos = async (value) => {
    try{
        const result = await apiFabrica.post('InsumosMovimentacao', value) 
        return  Promise.resolve(result.data);
    }catch(error){
        return Promise.reject(error);
    }
}


