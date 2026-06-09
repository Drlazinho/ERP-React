import { apiFabrica, apiInteligencia } from '../../../services/apis';

export const GetNps = async () => {
  try {
    const result = await apiInteligencia.get(`/KPIAtendimento/Recentes`);
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

    const result = await apiInteligencia.get('/KPIAtendimento/Indicadores', {
      params,
    });

    return result.data;
  } catch (error) {
    console.error('Erro ao buscar indicadores:', {
      erro: error.response?.data || error.message,
      parametrosUsados: { ano: filtro.ano, mes: filtro.mes },
    });
    throw error;
  }
};

export const GetDataUr = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `/KPIAtendimento/IndicadoresUsuariosRespondentes?anoIndicador=${filtro.ano}&mesIndicador=${filtro.mes}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUltimoMesesNPS = async () => {
  try {
    const result = await apiInteligencia.get(`/KPIAtendimento/UltimosMesesNPS`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUltimosMesesCSAT = async () => {
  try {
    const result = await apiInteligencia.get(
      `/KPIAtendimento/UltimosMesesCSAT`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetRelatorioAnual = async (filtro) => {
  try {
    const response = await apiInteligencia.get(
      `/KPIAtendimento/RelatorioAnual`,
      {
        params: { anoRelatorio: filtro },
        responseType: 'blob',
      }
    );

    if (!(response.data instanceof Blob)) {
      throw new Error('Resposta não é um arquivo válido');
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

export const PostNps = async (formData) => {
  try {
    const result = await apiInteligencia.post(`/KPIAtendimento`, formData);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
