import { apiFabrica_operacao } from '@/services/apis';

export const GeradorNumSerie = async (params) => {
  const { codigoSap, quantidade, userIdGeracaoQrCode } = params;
  try {
    const url = `GeradorNumSerieVivo/GerarNumeroDeSerie?&CodigoSap=${codigoSap}&Quantidade=${quantidade}&UserIdGeracaoQrCode=${userIdGeracaoQrCode}&GalpaoId=4`;

    const result = await apiFabrica_operacao.post(url);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarNumeroSerie = async (params) => {
  try {
    const result = await apiFabrica_operacao.get(`GeradorNumSerieVivo`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ExportarExcel = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `GeradorNumSerieVivo/GerarExcelNumeroDeSerie`,
      params,
      {
        responseType: 'blob',
      }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CadastrarProduto = async (params) => {
  try {
    const result = await apiFabrica_operacao.post(
      `GeradorNumSerieVivo/CadastrarProduto`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarProdutos = async (params) => {
  try {
    const result = await apiFabrica_operacao.get(
      `GeradorNumSerieVivo/Produtos`,
      { params }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
