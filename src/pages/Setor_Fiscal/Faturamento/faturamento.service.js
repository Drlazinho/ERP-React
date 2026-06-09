import {
  apiFabrica,
  apiFabricaADM,
  apiFabricaApoio,
  apiFabrica_operacao,
} from '../../../services/apis';
import axios from 'axios';

export const buscarRelatFaturamento = async (value) => {
  try {
    const result = await apiFabricaADM.get(`Vw_fat_relatfaturamento`, {
      params: value,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarRelatFaturamentoDash = async (value, cancelToken) => {
  try {
    const result = await apiFabricaApoio.get(
      `Vw_fat_relatfaturamento/DashboardComercial`,
      {
        params: value,
        cancelToken: cancelToken.token,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Requisição de faturamento cancelada:', error.message);
    }
    return Promise.reject(error);
  }
};

export const buscarFaturamentoUltimos3Anos = async (value) => {
  try {
    const result = await apiFabricaApoio.get(
      `/Vw_fat_relatfaturamento/FaturamentoAnualUltimosTresMeses?ano=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscaCalendario = async (value) => {
  try {
    const result = await apiFabrica_operacao.get(
      `/VwFaturamento/CalendarioFaturamento?Data=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
