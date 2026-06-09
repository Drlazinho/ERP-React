import { apiFabrica_operacao } from '../services/apis';

export const consultaContainer = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `RecebimentoPermanenciaContainer`,
      {
        params: filtro,
      }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AdicionarExpedicao = async (body) => {
  try {
    const result = await apiFabrica_operacao.post(`ExpedicaoCarga`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AtualizaImagemTransportadora = async (body) => {
  try {
    const result = await apiFabrica_operacao.put(`Transportadora_sa4`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const consultaExpedicaoCarga = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(`ExpedicaoCarga`, {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const consultaTransportadora = async () => {
  try {
    const result = await apiFabrica_operacao.get(`Transportadora_sa4`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const consultaContainerNota = async (value) => {
  try {
    const result = await apiFabrica_operacao.get(
      `RecebimentoPermanenciaContainer/${value}`
    );
    return Promise.resolve(result.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adicionarNovoContainer = async (formData) => {
  try {
    const result = await apiFabrica_operacao.post(
      `RecebimentoPermanenciaContainer`,
      formData
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const consultaTotalContainer = async (data) => {
  try {
    const result = await apiFabrica_operacao.get(
      `RecebimentoPermanenciaContainer/TotalContainer/${data}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const consultaTotalProduto = async (data) => {
  try {
    const result = await apiFabrica_operacao.get(
      `RecebimentoPermanenciaContainer/ContainerProduto/${data}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
