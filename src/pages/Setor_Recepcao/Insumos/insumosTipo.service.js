import { apiFabricaADM } from '@/services/apis';

export const buscarInsumosTipo = async () => {
  try {
    const result = await apiFabricaADM.get('InsumosTipo');
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
