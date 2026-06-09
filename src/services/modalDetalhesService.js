import { apiFabrica, apiInteligencia } from './apis';

export const getCategoriasEmail = async (email) => {
  try {
    const result = await apiInteligencia.get(
      `ChamadosCategoria?email=${email}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSubcategorias = async (id) => {
  try {
    const result = await apiInteligencia.get(
      `ChamadosxSubCategoria?CategoriaId=${id}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateInspecaoFornecedor = async (id, alteracoes) => {
  try {
    const result = await apiFabrica.put(`RatingFornecedor/${id}`, alteracoes);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getChamadoSituacao = async () => {
  try {
    const result = await apiInteligencia.get(`ChamadoSituacao`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getResponsavelChamados = async () => {
  try {
    const result = await apiInteligencia.get(`Equipe`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getChamadosCategoria = async () => {
  try {
    const result = await apiInteligencia.get(`ChamadosCategoria`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getChamadosTipos = async () => {
  try {
    const result = await apiInteligencia.get(`ChamadosTipos`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getChamadosStatus = async () => {
  try {
    const result = await apiInteligencia.get(`ChamadosStatus`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const getImagemDetalhe = async () => {
//   try {
//     const result = await apiFabrica.get(`ChamadoSituacao`);
//      const imagemDetalhe = result.data.imagemDetalhe;
//     return Promise.resolve(imagemDetalhe);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
