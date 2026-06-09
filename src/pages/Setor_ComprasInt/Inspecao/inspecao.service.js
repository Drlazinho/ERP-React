import { apiFabrica, apiFactory } from '../../../services/apis';

export const updateInspecaoFornecedor = async (id, alteracoes) => {
    try {
        const result = await apiFactory.put(`RatingFornecedor/${id}`, alteracoes);
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const buscarFornecedor = async (filtro) => {
    try{
        const result = await apiFactory.get(`RatingFornecedor`, { params: filtro })
        return  Promise.resolve(result.data);
    }catch(error){
        return Promise.reject(error);
    }
}
