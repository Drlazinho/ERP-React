import { Buscar } from "../core/apiFabrica.service";
import { endpointsLogUsuarios } from "./logUsuario.endpoints";

export const buscarLogUsuarios = async () =>
  await Buscar(endpointsLogUsuarios.this);