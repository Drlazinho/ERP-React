import { apiFabrica, apiFabrica_operacao } from '../../../services/apis';

export const getEficienciaMensal = async (dataInicio, dataFim) => {
    try {
        const result = await apiFabrica_operacao.get(`Dashboard/EficienciaMes?dataInicio=${dataInicio}&dataFim=${dataFim}`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getEficienciaDiaria = async (dataInicio, dataFim) => {
    try {
        const result = await apiFabrica_operacao.get(`/Dashboard/EficienciaDia?dataInicio=${dataInicio}&dataFim=${dataFim}`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getEficienciaPorLinha = async (linha) => {
    try {
        const result = await apiFabrica_operacao.get(linha ? `/Dashboard/EficienciaLinha?linha=${linha}` : `/Dashboard/EficienciaLinha`);

        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const cadastrarMetas = async (body) => {
    try{
        const result = await apiFabrica.post(`/Dashboard/RegistrarMetasDet`,  body);
        return Promise.resolve(result.data);
    }catch(error){
        return Promise.reject(error);
    }
  }
