import { BuscarFactory } from "../core/apiFabricaFactory.service";
import { endpointsSetores } from "./setores.endpoints";

export const consultaSetores = async () =>
  await BuscarFactory(endpointsSetores.this);
