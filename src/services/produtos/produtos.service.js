import { Put } from '../core/apiFabrica.service';
import { endpointsProdutos } from './produto.endpoints';
import { apiFabrica_operacao } from '../apis';
import {
  BuscarOperacao,
  PutOperacao,
} from '../core/apiFabricaOperacao.service';

export const consultaProdutos = async (filtro) =>
  await BuscarOperacao(endpointsProdutos.semImagem, {
    params: filtro,
  });

export const consultaProdutosImagem = async (filtro) =>
  await BuscarOperacao(endpointsProdutos.this, {
    params: filtro,
  });

export const buscarPosVendaEntregaItem = async (filtro) => {
  try {
    const result = await apiFabrica_operacao.get(
      `PosVendaEntregaClientes/EntregaClienteItem`,
      { params: filtro }
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarPorEanProduto = async (filtro) =>
  await BuscarOperacao(endpointsProdutos.produtoEan, filtro);

export const registrarProduto = async (value) =>
  await PutOperacao(endpointsProdutos.this, value);
