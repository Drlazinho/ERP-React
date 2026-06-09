import { apiFabricaADM } from '../../../services/apis';

export const buscarClientesJoinPorFiltro = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`ClientesJoin`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarClientesComVendedores = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`PosicaoClientes/Clientes`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarTitulosEmAberto = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`PosicaoClientes/TitulosEmAberto`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarFaturamentosEmAberto = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`PosicaoClientes/FaturamentosEmAberto`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarContato = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`PosicaoClientes/Contato`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarInformacoesGerais = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`PosicaoClientes/InformacoesGerais`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
