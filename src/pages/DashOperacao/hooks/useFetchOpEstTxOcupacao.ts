import { useState, useEffect } from 'react';
import { ITaxaOcupacaoResponse } from '../types';
import { GetEstTxOcDashOperacao } from '../services/dashoperacao.service';
import { useToast } from '@/hooks/toast.hook';

export const useFetchOpEstTxOcupacao = () => {
  const [ocupacaoData, setOcupacaoData] = useState<ITaxaOcupacaoResponse>(
    {} as ITaxaOcupacaoResponse
  );
  const { addToast } = useToast();

  useEffect(() => {
    GetEstTxOcDashOperacao()
      .then((res) => {
        setOcupacaoData(res);
      })
      .catch(() => {
        addToast({
          type: 'danger',
          title: 'Erro - Ao carregar dados do Estoquque',
          description: 'endpoint /KpiOperacao/TaxaOcupacao',
        });
      });
  }, []);

  return { ocupacaoData };
};
