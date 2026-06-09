import { useState, useEffect } from 'react';
import { IOTIF } from '../types';
import { useToast } from '@/hooks/toast.hook';
import { GetOTIF } from '../services/dashoperacao.service';

export const useFetchOpOTIF = (filtro: {
  mesIndicador: number;
  anoIndicador: number;
}) => {
  const [otif, setOTIF] = useState<IOTIF>({} as IOTIF);

  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      GetOTIF(filtro)
        .then((res) => {
          setOTIF(res);
        })
        .catch((error) => {
          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            setOTIF({
              otif: 0,
              otifMeta: 0,
              otifUltimosTresMeses: [],
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
        });
    };

    fetchData();
  }, [addToast, filtro.mesIndicador, filtro.anoIndicador]);

  return { otif };
};
