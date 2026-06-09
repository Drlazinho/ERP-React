import { GetAtendimentos } from '../KpiAtendimento.service';
import { IAtendimentoResponse } from '../types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFetchAtendimento = (filtro: {
  mes: number;
  ano: number;
  idUsuario?: number | null;
  idMeioComunicacao?: number;
}) => {
  const query = useQuery<IAtendimentoResponse[], AxiosError>({
    queryFn: () => GetAtendimentos(filtro),
    queryKey: ['atendimentos', filtro],
    enabled: !!filtro,
    retry: false,
  });
  return {
    data: query.data || [],
    refetch: query.refetch,
    loading: query.isLoading,
    error: query.error,
    isError: query.isError,
  };
};
