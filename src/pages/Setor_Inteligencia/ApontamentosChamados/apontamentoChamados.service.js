import { apiFabrica, apiInteligencia } from '@/services/apis';

export const GetApontamentoChamados = async (filtro) => {
  try {
    const result = await apiInteligencia.get(
      `ChamadosXIndicadores?EmailUsuario=${filtro}`
    );
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
