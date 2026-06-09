import { apiFabrica_operacao, apiFactory } from '@/services/apis';

export const ExportarExcel = async (params) => {
  try {
    const response = await apiFactory.get(
      `InovacaoGeradorSerial/GerarExcelQrCodes`,
      {
        params,
        responseType: 'blob',
      }
    );

    if (!(response.data instanceof Blob)) {
      throw new Error('Resposta não é um arquivo válido');
    }

    const contentType = response.headers['content-type'];
    const validContentTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/octet-stream',
    ];

    if (!validContentTypes.includes(contentType)) {
      throw new Error(`Tipo de conteúdo inválido: ${contentType}`);
    }

    return response.data;
  } catch (error) {
    console.error('Erro na exportação:', error);
    throw new Error(
      error.response?.data?.message ||
        error.message ||
        'Erro ao exportar para Excel'
    );
  }
};

export const BuscarProdutosSemImagem = async (params) => {
  try {
    const result = await apiFactory.get(`Produtos/ProdutoSemImagem`, {
      params,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarFornecedoresChina = async (params) => {
  try {
    const result = await apiFactory.get(`FornecedoresChina`, { params });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterQrCode = async (params) => {
  try {
    const result = await apiFactory.get(
      `InovacaoGeradorSerial/ObterGrupoQrCode`,
      {
        params,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterQrCodeGrupo = async (params) => {
  try {
    const result = await apiFactory.get(
      `InovacaoGeradorSerial/ObterQRCodeDoGrupo`,
      {
        params,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostObterQrCode = async (params) => {
  try {
    const result = await apiFactory.post(
      `InovacaoGeradorSerial/GerarQRCode`,
      params
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterAno = async () => {
  try {
    const result = await apiFactory.get(`InovacaoAno/ListarAno`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterMes = async () => {
  try {
    const result = await apiFactory.get(`InovacaoMes/ListarMeses`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterNacionalidade = async () => {
  try {
    const result = await apiFactory.get(
      `InovacaoNacionalidade/ListarNacionalidades`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetObterVoltagem = async () => {
  try {
    const result = await apiFactory.get(`InovacaoVoltagem/ListarVoltagem`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
