import { apiMunicipiosIBGE } from "./apis";

export const buscarMunicipiosPorUF = async (uf) => {
    try {
        const result = await apiMunicipiosIBGE.get(`/estados/${uf}/municipios`);

        return Promise.resolve(result);
    } catch (error) {
        return Promise.reject(error);
    }
};