import {  apiFabrica_operacao } from '../../../services/apis';

export const buscarApontamentosPorFiltro = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`Apontamentos`, { params: filtro });
    
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const buscarTotalApontamentosPorFiltro = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`Apontamentos/TotalApontamentos`, { params: filtro });
    
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const realizarCheckQrCode = async (value) => {
  try {
    const result = await apiFabrica_operacao.get(`Apontamentos/ChecagemQr?qrcode=${value}`);
    
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const checarMediaHora = async (value) => {
  try {
    const result = await apiFabrica_operacao.get(`Apontamentos/MediaHoraByCodigo?codigo=${value}`);
    
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};


