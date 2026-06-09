import { Buscar } from '../core/apiFabrica.service';
import { apiFabrica } from '../apis';
import { endpointsProducao } from './producao.endpoints';


export const buscarLinhasProducao = async () =>
  await Buscar(endpointsProducao.linhas);

