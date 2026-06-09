import { GetMediaGeral } from '../KpiAtendimento.service';
import { IMediaGeralItem } from '../types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFetchMedias = (filtro: {
  mes: number;
  ano: number;
  idUsuario?: number | null;
}) => {
  const query = useQuery<IMediaGeralItem[], AxiosError>({
    queryFn: () => GetMediaGeral(filtro),
    queryKey: ['medias', filtro],
    enabled: !!filtro,
    retry: false,
  });
  return {
    medias: query.data || [],
    refetch: query.refetch,
    loadingMedias: query.isLoading,
    errorMedias: query.error,
    isErrorMedias: query.isError,
  };
};
