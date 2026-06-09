import { apiFabricaADM } from './apis';

export const NotaFiscalImagemGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscalImagem`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPost = async (body) => {
  try {
    const result = await apiFabricaADM.post(`NotaFiscalImagem`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemGuiaGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscalImagemGuia`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemGuiaGetDownload = async (value) => {
  try {
    const result = await apiFabricaADM.get(
      `NotaFiscalImagemGuia/arquivo?Numero=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPedidoLoteGet = async (value) => {
  try {
    const result = await apiFabricaADM.get(
      `NotaFiscalImagemPedido/Lote?NumeroNotaFiscal=${value}`
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemGuiaPost = async (body) => {
  try {
    const result = await apiFabricaADM.post(`NotaFiscalImagemGuia`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemGuiaPut = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotaFiscalImagemGuia`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPagamentoGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscalImagemPagamento`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPagamentoGetDownload = async (value) => {
  try {
    const result = await apiFabricaADM.get(
      `NotaFiscalImagemPagamento/arquivo?Numero=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPagamentoPut = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotaFiscalImagemPagamento`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPagamentoPost = async (body) => {
  try {
    const result = await apiFabricaADM.post(`NotaFiscalImagemPagamento`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPedidoPost = async (body) => {
  try {
    const result = await apiFabricaADM.post(`NotaFiscalImagemPedido`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPedidoPut = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotaFiscalImagemPedido`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const NotaFiscalImagemPedidoGet = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotaFiscalImagemPedido`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
