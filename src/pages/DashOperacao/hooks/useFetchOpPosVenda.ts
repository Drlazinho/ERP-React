import { useState, useEffect } from 'react';
import { GetOperacaoPosVendaNPS } from '../services/dashoperacao.service';
import { IPosVendaOperacaoResponse } from '../types';
import { useToast } from '@/hooks/toast.hook'

export const useFetchOpPosVenda = (filtro: { mesIndicador: number; anoIndicador: number }) => {
  const [data, setData] = useState<IPosVendaOperacaoResponse>({} as IPosVendaOperacaoResponse);
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState({ error400: false });
  const {addToast} = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      GetOperacaoPosVendaNPS(filtro)
      .then((res) => {
        setData(res);
        setErrorState((prevState) => ({
          ...prevState,
          error400: false,
        }));
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrorState((prevState) => ({
            ...prevState,
            error400: true,
          }));
        }
        addToast({
          type: 'danger',
          title: 'Erro - Ao carregar dados do Pós Venda',
        });
      })
      .finally(() => setIsLoading(false))
    };

    fetchData();
  }, [filtro]);

  return { data, isLoading, errorState };
};