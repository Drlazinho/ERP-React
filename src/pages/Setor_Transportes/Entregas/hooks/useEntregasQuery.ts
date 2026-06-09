import { buscarEntregasPorFiltros } from '@/services/entregas.service'
import { useQuery } from '@tanstack/react-query';
import { IFiltroEntregas } from '../entregas.service'

export function useEntregasQuery(filtro: IFiltroEntregas) {
  // const { addToast } = useToast();

  const query = useQuery({
    queryKey: ['entregas', filtro],
    queryFn: async () => {
      const res = await buscarEntregasPorFiltros(filtro);
      return res;
    },
    staleTime: .25 * (60 * 1000), 
  });

  return query;
}
