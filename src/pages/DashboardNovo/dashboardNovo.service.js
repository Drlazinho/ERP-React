import { apiFabricaApoio } from '../../services/apis';

export const buscarfaturamentoAcumuladoProducao = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(`Dashboard/AcumuladoProducao`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarfaturamentoAcumuladoEntregues = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(
      `Dashboard/AcumuladoLogisticaEntrega`,
      {
        params: filtro,
      }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoFaturamento = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(`Dashboard/AcumuladoFaturamento`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarStatusCards = async () => {
  try {
    const result = await apiFabricaApoio.get(`ConfigCard/${0}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoTitulosReceber = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(
      `Dashboard/AcumuladoTitulosReceber`,
      {
        params: filtro,
      }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoTitulosPagar = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(
      `Dashboard/AcumuladoTitulosPagar`,
      {
        params: filtro,
      }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoLogisticaContainer = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(
      `Dashboard/AcumuladoLogisticaContainer`,
      {
        params: filtro,
      }
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoEstoque = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(`Dashboard/AcumuladoEstoque`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoImportacao = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(`Dashboard/AcumuladoImportacao`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarfaturamentoGraficoApiAnual = async () => {
  try {
    const result = await apiFabricaApoio.get(
      `Vw_fat_relatfaturamento/FaturamentoMensalUltimosDozeMeses`
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarAcumuladoChamados = async (filtro) => {
  try {
    const result = await apiFabricaApoio.get(`Dashboard/Inteligencia`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarfaturamentoGraficoApiUltimos30 = async () => {
  try {
    const result = await apiFabricaApoio.get(`Faturamento/Ultimos30`);

    return Promise.resolve(result.data.value);
  } catch (error) {
    return Promise.reject(error);
  }
};