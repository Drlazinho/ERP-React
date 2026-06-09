import { Buscar } from "../../../services/core/apiFabrica.service";
import { endpointsDashboardInteligencia } from "./dashboardInteligencia.endpoints";

export const buscarDashboardInteligencia = async () =>
  await Buscar(endpointsDashboardInteligencia.this);