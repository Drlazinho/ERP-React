
import { Buscar } from '../core/apiFabricaADM.service';
import { endpointsPedidos } from './pedidos.endpoints';

export const buscarPedidosPorFiltro = async (filtro) =>
  await Buscar(endpointsPedidos.this, { params: filtro });

export const buscarPedidosPorNota = async (filtro) =>
  await Buscar(endpointsPedidos.porNota,  filtro);
