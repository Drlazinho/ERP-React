import { apiInteligencia } from "../../../services/apis"

export const buscarParametrizacaoCard = async (value = 0) => {
  try {
    const result = await apiInteligencia.get(`ConfigCard/${value}`)
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const criarParametrizacaoCard = async (value) => {
  try {
    const result = await apiInteligencia.post(`ConfigCard`, value)
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const criarParametrizacaoPage = async (value) => {
  try {
    const result = await apiInteligencia.post(`ConfigPage`, value)
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const atualizarStatusCard = async (value) => {
  try {
    const result = await apiInteligencia.put(`ConfigCard/status/${value}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putDescricaoCard = async (value) => {
  try {
    const result = await apiInteligencia.put(`ConfigCard`, value);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarParametrizacaoPageInfo = async (value = 0) => {
  try {
    const result = await apiInteligencia.get(`ConfigPage/${value}`)
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const buscarParametrizacaoPage = async () => {
  try {
    const result = await apiInteligencia.get(`ConfigPage/0`)
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
}

export const postStatusPage = async (value) => {
  try {
    const result = await apiInteligencia.put(`ConfigCard`, value);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};


export const putDescricaoPage = async (value) => {
  try {
    const result = await apiInteligencia.put(`ConfigPage`, value);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarStatusPage = async (value) => {
  try {
    const result = await apiInteligencia.put(`ConfigPage/status/${value}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};