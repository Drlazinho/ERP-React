import { chamadosXEndpoints } from './chamadosX.endpoints';
import { apiInteligencia } from '../apis';
import {
  BuscarInteligencia,
  BuscarPorGuidInteligencia,
  PutInteligencia,
} from '../core/apiInteligencia.service';

export const GetChamados = async (body) =>
  await BuscarInteligencia(chamadosXEndpoints.this, { EmailUsuario: body });

export const GetChamadosXFiltrado = async (filtro) => {
  try {
    const result = await apiInteligencia.get('ChamadosX', { params: filtro });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GetCatogoriaSetorSelecionado = async (idSetor) => {
  try {
    const result = await apiInteligencia.get(
      `ChamadosCategoria/idsetor?idsetor=${idSetor}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postChamadosX = async (value) => {
  try {
    const result = await apiInteligencia.post(`ChamadosX`, value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postChamadosDetalhesX = async (value) => {
  try {
    const result = await apiInteligencia.post(`ChamadoDetalheX`, value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const putChamadosX = async (value) => {
  try {
    const result = await apiInteligencia.put(`ChamadosX`, value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PutChamados = async (body) =>
  await PutInteligencia(chamadosXEndpoints.this, body);

export const GetChamadosXId = async (id) =>
  await BuscarPorGuidInteligencia(chamadosXEndpoints.this, id);

// export const GetChamadosXSolicitantes = async (Emailsolicitante, status) =>
//   await BuscarPorGuidInteligencia(
//     chamadosXEndpoints.solicitante,
//     Emailsolicitante,
//     status
//   );

export const GetChamadosXSolicitantes = async (emailSolicitante, status) => {
  try {
    const { data } = await apiInteligencia.get(
      `${chamadosXEndpoints.solicitante}/`,
      { params: { emailSolicitante, status } }
    );
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};
