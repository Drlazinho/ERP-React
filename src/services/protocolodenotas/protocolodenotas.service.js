import { BuscarPorGuid, Post, Put } from "../core/apiFabricaADM.service";
import { endpointsProtocolodeNotas } from "./protocolodenotas.endpoint";

export const AtualizarProtocolo = async (value) =>
    await Put(endpointsProtocolodeNotas.this, value);

export const RegistrarProtocolosDeNotaMultiplas = async (value) =>
    await Post(endpointsProtocolodeNotas.multiplo, value);

export const BuscarPDFProtocoloDeNota = async (id) =>
    await BuscarPorGuid(endpointsProtocolodeNotas.download, id);