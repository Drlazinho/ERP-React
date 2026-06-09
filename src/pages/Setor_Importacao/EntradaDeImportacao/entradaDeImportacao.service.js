import { apiFabrica, apiFactory } from "../../../services/apis";

export const buscarImportC7EntradasPorFiltro = async (filtro) =>{
    try{
        const result = await apiFactory.get(`ImportC7Entradas`, {
            params: filtro,
        })
        return Promise.resolve(result.data.value);
    }catch(error){
        return Promise.reject(error);
    }
}
