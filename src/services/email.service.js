import { apiFabrica } from './apis';

export const EnviarFormEmail = async (value) => {
  try {
    const result = await apiFabrica.post(`Email`, value);

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
