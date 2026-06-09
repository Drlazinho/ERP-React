import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/toast.hook';
import { getDadosImportBI } from '../RetornoImportacao.service';
import { IRetornoImportacaoResponse } from '../types';

export const useFetchImportBI = (filtro: any) => {
  const [data, setData] = useState<IRetornoImportacaoResponse | null>(null);
  const { addToast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const res = await getDadosImportBI(filtro);
      setData(res);
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro - Ao carregar dados do Estoque',
        description: 'endpoint /KpiOperacao/TaxaOcupacao',
      });
    }
  }, [filtro, addToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, refetch: fetchData, filtro };
};
