import { apiNotaFiscal } from "../apis";

export const buscarNotaFiscalIo = async () => {
    try{
        const result = await apiNotaFiscal.get(`Pdfnf`);
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};    