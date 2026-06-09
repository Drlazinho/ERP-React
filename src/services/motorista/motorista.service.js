import { Buscar, Post } from "../core/apiFabrica.service";
import { motoristasEndpoints } from "./motorista.endpoint";

export const GetMotoristas = async () =>
    await Buscar(motoristasEndpoints.this);

export const PostMotoristas = async (body) =>
    await Post(motoristasEndpoints.this, body)
