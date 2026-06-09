import { useState, useEffect } from 'react';
import { GetInventarioDashOperacao } from '../services/dashoperacao.service';
import { IEstoqueInventarioResponse } from '../types';
import { useToast } from '@/hooks/toast.hook';

export const useFetchOpEstInvArmazem = (filtro: {
  mesIndicador: number;
  anoIndicador: number;
}) => {
  const [invEstoqueData, setInvEstoqueData] =
    useState<IEstoqueInventarioResponse>({} as IEstoqueInventarioResponse);
  const [isLoadingEst, setIsLoadingEst] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingEst(true);
      GetInventarioDashOperacao(filtro)
        .then((res) => {
          setInvEstoqueData(res);
        })
        .catch(() =>
          addToast({
            type: 'danger',
            title: 'Erro - Ao carregar dados do Estoque',
            description: 'endpoint EstoqueInventario/TabelaPrincipal',
          })
        )
        .finally(() => setIsLoadingEst(false));
    };

    fetchData();
  }, [filtro]);

  return { invEstoqueData, isLoadingEst };
};
