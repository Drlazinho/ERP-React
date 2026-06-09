import { apiInteligencia } from './apis';

export const ChamadoCategoriaGet = async () => {
    try {
        const result = await apiInteligencia.get(`ChamadosCategoria`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ChamadoSituacaoGet = async () => {
    try {
        const result = await apiInteligencia.get(`ChamadoSituacao`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ChamadosStatusGet = async () => {
    try {
        const result = await apiInteligencia.get(`ChamadosStatus`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const ChamadosTiposGet = async () => {
    try {
        const result = await apiInteligencia.get(`ChamadosTipos`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

