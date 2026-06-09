import { apiFabrica, apiFabrica_Posvenda } from "../../../services/apis";

export const buscarPosVendaEntregaClientes = async (filtro) => {
  try {
      const result = await apiFabrica_Posvenda.get(`PosVendaEntregaClientes`, { params: filtro });
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};

export const buscarPosVendaColetaClientes = async (filtro) => {
  try {
      const result = await apiFabrica_Posvenda.get(`PosVendaColetaClientes`, { params: filtro });
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};
export const registrarPosVendaColetaClientes = async (value) => {
  try {
      const result = await apiFabrica_Posvenda.post(`PosVendaColetaClientes`, value);
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};

export const buscarPosVendaColetaItemImagem = async (value) => {
  try {
      const result = await apiFabrica_Posvenda.get(`PosVendaColetaClientes/ColetaClienteItem?Protocolo=${value}`);
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};

export const buscarPosVendaColetaItem = async (filtro) => {
  try {
      const result = await apiFabrica_Posvenda.get(`PosVendaColetaClientes/ColetaClienteItem`, {params: filtro});
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};

export const buscarPosVendaEntregaClientesItem = async (value) => {
  try {
      const result = await apiFabrica_Posvenda.get(`PosVendaEntregaClientes/EntregaClienteItem?OrdemServico=${value}`);
      return Promise.resolve(result.data);
  } catch (error) {
      return Promise.reject(error);
  }
};