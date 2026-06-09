import { useState, useEffect } from 'react';
import { IProducaoProduzidos } from '../types';
import { useToast } from '@/hooks/toast.hook';
import { GetProducao } from '../services/dashoperacao.service';

export const useFetchOpProduzidos = (filtro: {
  mesIndicador: number;
  anoIndicador: number;
}) => {
  const [isLoadingProduzidos, setIsLoadingProduzidos] = useState(false);
  const [produzidosData, setProduzidosData] = useState<IProducaoProduzidos>(
    {} as IProducaoProduzidos
  );
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingProduzidos(true);
      GetProducao(filtro)
        .then((res) => {
          setProduzidosData(res);
        })
        .catch((error) => {
          if (
            error.response?.status === 400 ||
            error.response?.status === 404
          ) {
            setProduzidosData({
              ano: 0,
              mes: 0,
              eficienciaMedia: 0,
              disponibilidadeMedia: 0,
              qualidadeMedia: 0,
              oeeMedia: 0,
              metaProducaoTotal: 0,
              quantidadeProduzidaTotal: 0,
              quantidadePendenteTotal: 0,
              eficienciaUltimosTresMeses: [],
              quantidadeProduzidaUltimosTresMeses: [],
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
        .finally(() => setIsLoadingProduzidos(false));
    };

    fetchData();
  }, [filtro.mesIndicador, filtro.anoIndicador, addToast]);

  return { produzidosData, isLoadingProduzidos };
};
