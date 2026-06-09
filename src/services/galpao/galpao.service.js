import { BuscarFactory } from "../core/apiFabricaFactory.service";
import { endpointsGalpao } from "./galpao.endpoint";

export const buscarGalpao = async () =>
  await BuscarFactory(endpointsGalpao.this);