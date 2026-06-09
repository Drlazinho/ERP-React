import { useState, useEffect } from 'react';
import { IFrete } from '../types';
import { useToast } from '@/hooks/toast.hook';
import { GetFrete } from '../services/dashoperacao.service';

export const useFetchOPFrete = (filtro: {
  mesIndicador: number;
  anoIndicador: number;
}) => {
  const [frete, setFrete] = useState<IFrete>();
  const { addToast } = useToast();
  const [isLoadingTransporte, setIsLoadingTransporte] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingTransporte(true);
      GetFrete(filtro)
        .then((res) => {
          setFrete(res);
        })
        .catch((error) => {
          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            setFrete({
              valorFaturado: 0,
              frete: 0,
              freteMeta: 0,
              freteUltimosTresMeses: [],
            });
            return;
          }
          let errorMessage = 'Erro ao editar meta';

          if (error.response && error.response.data) {
            if (typeof error.response.data === 'object') {
              errorMessage =
                JSON.stringify(error.response.data) ||
                error.message ||
                error.response.data.title;
            } else {
              errorMessage = error.response.data;
            }
          }

          addToast({
            type: 'danger',
            title: 'Erro',
            description: errorMessage,
          });
        })
        .finally(() => {
          setIsLoadingTransporte(false);
        });
    };

    fetchData();
  }, [addToast, filtro.mesIndicador, filtro.anoIndicador]);

  return { frete, isLoadingTransporte };
};
