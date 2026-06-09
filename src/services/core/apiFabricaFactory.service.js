import { apiFactory } from "../apis";


export const BuscarFactory = async (endpoint, request) => {
  try {
    const result = await apiFactory.get(`${endpoint}`, request);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const BuscarPorGuidFactory = async (endpoint, guid) => {
    try {
      const result = await apiFactory.get(`${endpoint}/${guid}`);
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };

export const PostFactory  = async (endpoint, body) => {
  try {
    const result = await apiFactory.post(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutFactory = async (endpoint, body) => {
  try {
    const result = await apiFactory.put(`${endpoint}`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const DeleteFactory = async (endpoint, guid) => {
    try {
      const result = await apiFactory.delete(`${endpoint}/${guid}`);
      return Promise.resolve(result.data);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
