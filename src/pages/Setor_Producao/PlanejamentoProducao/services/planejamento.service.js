import { Buscar, Post, Put, Patch } from '../../../../services/core/apiFabrica.service';
import {
  endpointsPlanejamentoProducao,
  endpointsProducao_plan_sem_detalh,
} from './planejamento.endpoints';

export const consultaPlanejamento = async (filtro) =>
  await Buscar(endpointsPlanejamentoProducao.this, {
    params: filtro,
  });

export const Producao_plan_sem_detalh = async (filtro) =>
  await Buscar(endpointsProducao_plan_sem_detalh.this, {
    params: filtro,
  });

export const calcularPlanejamentoProducao = async (value) => {
  try {
    const result = await Post(endpointsPlanejamentoProducao.calculo, value);
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const PlanejamentoSemanalProducao = async (value) => {
  try {
    const result = await Post(PlanejamentoSemanalProducao.this, value);
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarPlanejamentoProducao = async (value) => {
  try {
    const result = await Post(endpointsPlanejamentoProducao.this, value);
    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarPlanejamentoProducao = async (value) =>
  await Patch(endpointsPlanejamentoProducao.this, value);
