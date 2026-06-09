import { BuscarInteligencia, BuscarPorGuidInteligencia, DeleteInteligencia, PostInteligencia, PutInteligencia } from '../core/apiInteligencia.service';
import { chamadosDetalheEndpoints } from './chamadosDetalhe.endpoints';

export const GetChamadosDetalhe = async (request) =>
    await BuscarInteligencia(chamadosDetalheEndpoints.this, { params: request });


export const PostChamadosDetalhe = async (body) =>
    await PostInteligencia(chamadosDetalheEndpoints.this, body)


export const PutChamadosDetalhe = async (body) =>
    await PutInteligencia(chamadosDetalheEndpoints.this, body)


export const GetChamadosDetalheId = async (id) =>
    await BuscarPorGuidInteligencia(chamadosDetalheEndpoints.this, id)


export const DeleteChamadosDetalheId = async (id) =>
    await DeleteInteligencia(chamadosDetalheEndpoints.this, id)

