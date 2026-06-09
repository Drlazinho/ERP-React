import { BuscarInteligencia, BuscarPorGuidInteligencia, DeleteInteligencia, PostInteligencia, PutInteligencia } from '../core/apiInteligencia.service';
import {
  chamadosDetalheXEndpoints,
} from './chamadosDetalheX.endpoints';

export const GetChamadosDetalhe = async (request) => {
  return await BuscarInteligencia(chamadosDetalheXEndpoints.this, { params: request });
};

export const PostChamadosDetalhe = async (body) => {
  return await PostInteligencia(chamadosDetalheXEndpoints.this, body);
};

export const PutChamadosDetalhe = async (body) => {
  return await PutInteligencia(chamadosDetalheXEndpoints.this, body);
};

export const GetChamadosDetalheId = async (id) => {
  return await BuscarPorGuidInteligencia(chamadosDetalheXEndpoints.this, id);
};

export const DeleteChamadosDetalheId = async (id) => {
  return await DeleteInteligencia(chamadosDetalheXEndpoints.this, id);
};
