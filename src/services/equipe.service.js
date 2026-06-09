import { apiFabrica, apiInteligencia } from './apis';

export const buscarMembroEquipe = async () => {
    try {
        const result = await apiInteligencia.get(`Equipe`);
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};
export const adicionarMembroEquipe = async (value) => {
    try {
        const result = await apiInteligencia.post(`Equipe`, value);
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

