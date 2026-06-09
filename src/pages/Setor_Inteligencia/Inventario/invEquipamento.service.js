import { Buscar, Post, Put } from '../../../services/core/apiFabrica.service';
import { endpointsInventario } from './invEquipamento.endpoint';

export const buscarInvEquipamento = async () =>
  await Buscar(endpointsInventario.this);

export const registrarInvEquipamento = async (body) =>
  await Post(endpointsInventario.this, body);

export const atualizarInvEquipamento = async (body) =>
  await Put(endpointsInventario.this, body);

export const buscarInvColaborador = async (filtro) =>
  await Buscar(endpointsInventario.colaborador, { params: filtro });

export const registrarInvColaborador = async (body) =>
  await Post(endpointsInventario.colaborador, body);

export const atualizarInvColaborador = async (body) =>
  await Put(endpointsInventario.colaborador, body);

export const buscarinvEquipamentoColaborador = async () =>
  await Buscar(endpointsInventario.equipamentoColaborador);
  
export const registrarMovimentacaoEquipamento = async (body) =>
  await Post(endpointsInventario.equipamentoColaborador, body);

export const buscarInvEquipamentoStatus = async () =>
  await Buscar(endpointsInventario.equipamentoStatus);
