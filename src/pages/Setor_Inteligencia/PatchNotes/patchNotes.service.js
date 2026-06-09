import { apiFabrica, apiFabricaApoio } from '../../../services/apis';

export const getPatchNotes = async () => {
  try {
    const result = await apiFabricaApoio.get(`PatchNote`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postPatchNotes = async (body) => {
  try {
    const result = await apiFabricaApoio.post(`PatchNote`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deletePatchNotes = async (id) => {
  try {
    const result = await apiFabricaApoio.delete(`/PatchNote?idPatchNote=${id}`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarPatchNotes = async (body) => {
  try {
    const result = await apiFabricaApoio.put(`/PatchNote`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
