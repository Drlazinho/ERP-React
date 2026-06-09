import { Buscar } from "../../../services/core/apiFabrica.service";
import { logServicosEndpoints } from "./logServico.endpoint";

export const getLogServicos = async () =>
    await Buscar(logServicosEndpoints.this);