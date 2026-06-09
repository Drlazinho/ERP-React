import { apiFabrica, apiFactory } from "@/services/apis";

export const consultarNfe = async (filtro) => {
    try {
        const result = await apiFactory.get(`Portaria`, { params: filtro });
  
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
  };