import { apiFabricaADM } from './apis';

export const buscarNotaFiscalPDF = async (value) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscal/${value}`);
    return Promise.resolve(result.data.value.notaFiscalResponse);
  } catch (error) {
    return Promise.reject(error);
  }
};
