import { apiFabrica, apiInteligencia } from '../../../services/apis';

export const buscaApontamentos = async (id) => {
  try {
    const result = await apiInteligencia.get(
      `ApontamentoInteligencia/usuario?idUsuario=${id}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const buscaApontamentosId = async (value) => {
  try {
    const result = await apiInteligencia.get(
      `ApontamentoInteligencia?idApontamento=${value}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const registrarApontamentoInicial = async (value) => {
  try {
    const result = await apiInteligencia.post('ApontamentoInteligencia', value);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const UpdateHora = async (value) => {
  try {
    const result = await apiInteligencia.patch(
      'ApontamentoInteligencia',
      value
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

// export const RegistrarApontamentoFinal = async (value) => {
//   try {
//     const result = await apiInteligencia.post(
//       'PlanejamentoSemanalProducao',
//       value
//     );
//     return Promise.resolve(result.data);
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
