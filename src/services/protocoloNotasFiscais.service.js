import { apiFabricaADM } from './apis';

export const buscarNotaPorFiltro = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarNotaAprovadasPorFiltro = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota/Aprovadas`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const buscarProtocoloNotaStatus = async () => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota_status`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarProtocoloNotaStatusTodas = async () => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota_status/All`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarProtocoloNotaTipo = async () => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_tipo_nota`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarNota = async (filtro) => {
  try {
    const result = await apiFabricaADM.get('Protocolo_nota', {
      params: filtro,
    });
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarDetalhesNota = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota_det`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const AtualizarProtrocoloNotaDet = async (body) => {
  try {
    const result = await apiFabricaADM.put(`Protocolo_nota_det`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const adicionarNovaNota = async (body) => {
  try {
    const result = await apiFabricaADM.post(`ProtocoloNotasFiscais`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarCheck = async (body) => {
  try {
    const result = await apiFabricaADM.put(
      `ProtocoloNotasFiscais/${body.id}&Id=${body.id}&SegundoUsuario=${body.segundoUsuario}&TerceiroUsuario=${body.terceiroUsuario}`
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarArquivoDaNota = async (id) => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota/NotaFiscal/${id}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarMultiplosProtocoloDeNotas = async (body) => {
  try {
    const result = await apiFabricaADM.put(
      `Protocolo_nota_det/Multiplos`,
      body
    );

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getSituacoesNota = async () => {
  try {
    const result = await apiFabricaADM.get(`Protocolo_nota_situacoes`);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
