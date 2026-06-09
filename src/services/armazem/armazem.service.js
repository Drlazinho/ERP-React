import { BuscarFactory } from '../core/apiFabricaFactory.service';
import { armazemEndpoints } from './armazem.endpoint';

export const GetArmazem = async () => await BuscarFactory(armazemEndpoints.this);
