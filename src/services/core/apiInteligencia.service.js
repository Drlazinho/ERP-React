import {  apiInteligencia } from '../apis';

export const BuscarInteligencia = async (endpoint, request) => {
  try {
    const result = await apiInteligencia.get(`${endpoint}`, request);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarPorGuidInteligencia = async (endpoint, guid) => {
  try {
    const result = await apiInteligencia.get(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const PostInteligencia  = async (endpoint, body) => {
//   try {
//     const result = await apiInteligencia.post(`${endpoint}`, body);
//     return Promise.resolve(result.data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };

export const PostInteligencia = async (endpoint, body) => {
  try {
    const formData = new FormData();

    for (const key in body) {
      formData.append(key, body[key]);
    }

    const result = await apiInteligencia.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutInteligencia = async (endpoint, body) => {
  try {
    const result = await apiInteligencia.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeleteInteligencia = async (endpoint, guid) => {
  try {
    const result = await apiInteligencia.delete(`${endpoint}/${guid}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
