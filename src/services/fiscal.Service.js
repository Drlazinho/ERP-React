import { apiNotaFiscal } from './apis';

export const BuscarNotaFiscal = async (filtro) => {
  try {
    const result = await apiNotaFiscal.get(`Document`, { params: filtro });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarFilial = async (filtro) => {
  try {
    const result = await apiNotaFiscal.get(`api/Filial`, { params: filtro });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const RetornarPdfNotaFiscal = async (value) => {
  try {
    const result = await apiNotaFiscal.get(
      `api/Pdfnf/byte?ChaveNotaFiscal=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarNota = async (filtro) => {
  try {
    const result = await apiNotaFiscal.get('Document', { params: filtro });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarXmlNota = async (chaveNota) => {
  try {
    const result = await apiNotaFiscal.get(
      `api/Docbinary/xml?ChaveNotaFiscal=${chaveNota}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GerarBarCode = async (value) => {
  try {
    const result = await fetch(
      `https://api.invertexto.com/v1/barcode?token=${import.meta.env.VITE_INVERTEXTO_TOKEN}&text=${value}&type=code128&font=0`
    );
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
