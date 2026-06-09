import { Buscar, BuscarPorGuid, Post, Put } from '../core/apiFabrica.service';
import { chamadosEndpoints } from './chamados.endpoints';
import { apiFabrica, apiInteligencia } from "../apis";

export const GetChamados = async (body) =>
    await Buscar(chamadosEndpoints.this, { EmailUsuario: body });

export const GetChamadosFiltrado = async (filtro) => {
    try {
        const result = await apiFabrica.get('Chamados', { params: filtro });
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
}
export const GetChamadosXFiltrado = async (filtro) => {
    try {
        const result = await apiInteligencia.get('ChamadosX', { params: filtro });
        return Promise.resolve(result.data);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const PostChamados = async (body) =>
    await Post(chamadosEndpoints.this, body)


export const PutChamados = async (body) =>
    await Put(chamadosEndpoints.this, body)

export const GetChamadosId = async (id) =>
    await BuscarPorGuid(chamadosEndpoints.this, id)

export const GetChamadosSolicitantes = async (solicitante) =>
     await BuscarPorGuid(chamadosEndpoints.solicitante, solicitante)


