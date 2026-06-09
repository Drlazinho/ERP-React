import { apiFabrica, apiInteligencia } from './apis';

export const ChamadosFecharPut = async (value) => {
  try {
    const result = await apiInteligencia.put(`Chamados/Fechar/${value}`);

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const ChamadosXFecharPut = async (idChamado, idUserFechamento) => {
  try {
    const result = await apiInteligencia.put(`ChamadosX/Fechar`, null, {
      params: {
        idChamado,
        idUserFechamento,
      },
    });

    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
//   export const ChamadosFecharPut = async (body) => {
//     try {
//       const result = await apiFabrica.put(`Chamados/fechar`, body);

//       return Promise.resolve(result.data);
//     } catch (error) {
//       return Promise.reject(error);
//     }0
//   };
