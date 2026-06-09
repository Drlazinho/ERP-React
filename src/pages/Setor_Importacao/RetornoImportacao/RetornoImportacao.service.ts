import { apiImportacao } from '../../../services/apis';
import { IRetornoImportacaoPut, IRetornoImportacaoResponse } from './types';

export const getDadosImportBI = async (
  filtro: any
): Promise<IRetornoImportacaoResponse> => {
  try {
    const result = await apiImportacao.get(`ImportBI`, {
      params: {
        ...filtro,
      },
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putDadosImportBI = async (body: IRetornoImportacaoPut) => {
  try {
    const result = await apiImportacao.put(`ImportBI`, [body]);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
