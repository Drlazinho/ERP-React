import { useState, useEffect } from 'react';
import { GetDevolucao } from '../services/dashoperacao.service';
import { IDevolucao } from '../types';
import { useToast } from '@/hooks/toast.hook';

export const useFetchOpDevolucao = (filtro: {
  mesIndicador: number;
  anoIndicador: number;
}) => {
  const [devolucao, setDevolucao] = useState<IDevolucao>({} as IDevolucao);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      GetDevolucao(filtro)
        .then((res) => {
          setDevolucao(res);
        })
        .catch((error) => {
          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            setDevolucao({
              devolucao: 0,
              devolucaoMeta: 0,
              devolucaoUltimosTresMeses: [],
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

  return { devolucao };
};
