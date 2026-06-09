import { apiFabrica, apiInteligencia } from '../../../services/apis';

export const DashboardCardsGet = async (filtro) => {
  try {
    const result = await apiInteligencia.get(`DashboardChamados`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DashboardCategoria = async (filtro) => {
  try {
    const result = await apiInteligencia.get(`DashboardChamados/categoria`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DashboardDistribuicao = async (filtro) => {
  try {
    const result = await apiInteligencia.get(`DashboardChamados/Distribuicao`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DashboardChamadosPorColaborador = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `DashboardChamados/ChamadosPorColaborador`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DashboardGraficoSLA = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `DashboardChamados/SLAPorCategoriaGrafico`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DashboardGraficoSLAAno = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `DashboardChamados/SLAGeralAnoGrafico`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetIndicadores = async (filtro) => {
  try {
    const params = {
      anoIndicador: filtro.ano,
    };

    if (filtro.mes != null) {
      params.mesIndicador = filtro.mes;
    }

    const result = await apiInteligencia.get(`/KPIAtendimento/Indicadores`, {
      params,
    });

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar indicadores:', error);
    throw error;
  }
};

export const GetDataUr = async (filtro) => {
  try {
    const params = {
      anoIndicador: filtro.ano,
    };

    if (filtro.mes != null) {
      params.mesIndicador = filtro.mes;
    }

    const result = await apiInteligencia.get(
      `/KPIAtendimento/IndicadoresUsuariosRespondentes`,
      { params }
    );

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
    throw error;
  }
};

export const GetChamadosGeral = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `/DashboardChamados/GetTodosChamadosPorCategoria`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
