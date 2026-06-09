import { apiFabricaADM } from '@/services/apis';

export const buscarNotaFiscalEmitidaPorNumero = async (numero) => {
  try {
    if (numero) {
      const result = await apiFabricaADM.get(
        `NotasEmitidas/AlterarVerifcadaLogistica/${numero}`
      );

      return Promise.resolve(result.data);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saidaNotaFiscalPortaria = async (numero, body) => {
  try {
    const result = await apiFabricaADM.post(
      `Portaria/VerificarNotaFiscal/${numero}`,
      body
    );

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarNotasEmitidasPorFiltro = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotasEmitidas`, { params: filtro });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscarNumeroDeNotasEmitidas = async (filtro) => {
  try {
    const result = await apiFabricaADM.get(`NotasEmitidas/TotalNotasEmitidas`, {
      params: filtro,
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarNovaSeparada = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotasEmitidas/Separado`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const atualizarSeparadoPorNF = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotasEmitidas/SeparadoPorNf`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const atualizarNotasEmitidasPorId = async (body) => {
  try {
    const result = await apiFabricaADM.put(`NotasEmitidas/${body.id}`, body);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
