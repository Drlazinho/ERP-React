import { PostOperacao } from '../core/apiFabricaOperacao.service';
import { checkExpedicaoEndpoints } from './check-expedicao.endpoints';

export const checkExpedicao = async (request) =>
  await PostOperacao(checkExpedicaoEndpoints.this, request);
