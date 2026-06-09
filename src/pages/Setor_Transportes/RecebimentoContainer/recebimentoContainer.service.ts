import { apiFabrica_operacao } from '@/services/apis'

export const PostMotorista = async (body : any) => {
  try {
    const result = await apiFabrica_operacao.post(`Motoristas`, body);
    return Promise.resolve(result.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
