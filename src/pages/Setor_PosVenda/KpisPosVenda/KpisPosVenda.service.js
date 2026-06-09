import { apiFabrica, apiFabrica_Posvenda } from '../../../services/apis';

export const GetNps = async () => {
  try {
    const result = await apiFabrica_Posvenda.get(`/PosVendaNPS/recentes`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetIndicadores = async (filtro) => {
  try {
    const result = await apiFabrica_Posvenda.get(
      `/PosVendaNPS/indicadores?anoIndicador=${filtro.ano}&mesIndicador=${filtro.mes}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetDataUr = async (filtro) => {
  try {
    const result = await apiFabrica_Posvenda.get(
      `/PosVendaNPS/IndicadoresUsuariosRespondentes?anoIndicador=${filtro.ano}&mesIndicador=${filtro.mes}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUltimoMesesNPS = async () => {
  try {
    const result = await apiFabrica_Posvenda.get(`/PosVendaNPS/UltimosMesesNPS`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUltimosMesesCSAT = async () => {
  try {
    const result = await apiFabrica_Posvenda.get(`/PosVendaNPS/UltimosMesesCSAT`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetRelatorioAnual = async (filtro) => {
  try {
    const { data } = await apiFabrica_Posvenda.get(`/PosVendaNPS/RelatorioAnual`, {
      params: { anoRelatorio: filtro },
      responseType: 'blob',
    });
    return data;
  } catch (error) {
    console.error('Error fetching annual report:', error);
    throw error;
  }
};

export const PostNps = async (formData) => {
  try {
    const result = await apiFabrica_Posvenda.post(`/PosVendaNPS`, formData);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
