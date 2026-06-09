import { apiFabrica, apiFabrica_operacao, apiFabricaADM } from "../apis";
export const buscarApontamentosPorFiltro = async (filtro) => {
    try {
      const result = await apiFabrica_operacao.get(`LeitorQrCode`, { params: filtro });
      
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };


export const LeitorApontamentosQRCode = async (value) => {
    try{
        const result = await apiFabrica_operacao.post('Apontamentos', value)
        return Promise.resolve(result.data);
    }catch (error){
        return Promise.reject(error);

    }
}