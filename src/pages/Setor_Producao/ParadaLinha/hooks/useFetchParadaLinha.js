import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/toast.hook';
import { getParadaLinha } from '../RetornoParadaLinha.service';

export const useFetchParadaLinha = (filtro) => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getParadaLinha(filtro);
      setApiResponse(res);
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao carregar dados',
        description: 'Ocorreu um erro ao buscar as paradas de linha',
      });
      setApiResponse(null);
    } finally {
      setLoading(false);
    }
  }, [addToast, filtro]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const data = apiResponse || null;

  return {
    data,
    loading,
    refetch: fetchData,
  };
};
