import { apiFabrica_Posvenda, apiFactory } from '@/services/apis';
import { IAtendimentoResponse, IMediaGeralItem } from './types';

export const GetAtendimentos = async (params: {
  ano: number;
  mes: number;
  idUsuario?: number | null;
  idMeioComunicacao?: number;
}): Promise<IAtendimentoResponse[]> => {
  try {
    const response = await apiFabrica_Posvenda.get('/PosVenda_AtendAval', {
      params,
    });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PostAtendimentos = async (data: {
  promotores: number;
  detratores: number;
  neutros: number;
  dataReferente: string;
  emailUserAvaliado: string;
  emailUserRegistro: string;
  idTipoMeioComun: number;
  totalAtendimentos: number;
  observacao: string;
}) => {
  try {
    const response = await apiFabrica_Posvenda.post(
      '/PosVenda_AtendAval',
      data
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetCategorias = async () => {
  try {
    const response = await apiFabrica_Posvenda.get(
      '/Posvendas_meioComun/meiosComunicacao'
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetUsuarios = async (email: string) => {
  try {
    const response = await apiFactory.get('/Usuarios/GETALL?email=' + email);

    return Promise.resolve(response.data.usuarios || []);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetMediaGeral = async (params: {
  ano: number;
  mes: number;
  idUsuario?: number | null;
}): Promise<IMediaGeralItem[]> => {
  try {
    const response = await apiFabrica_Posvenda.get(
      '/PosVenda_AtendAval/medias',
      { params }
    );

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
