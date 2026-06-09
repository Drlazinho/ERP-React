import { queryKeys } from '@/libs/query-keys'

import { useQuery } from '@tanstack/react-query'
import { buscarInsumosMovimentacaoPorFiltro } from '../insumosMovimentacao.service'

type props = {
  tipoMovimentacao?: string | null
}
export function useHistoricoInsumosQuery( filtro : props) {
  const { data: historico_data = [] } = useQuery({
    queryKey: [queryKeys.setor.recepcao.insumos.get_historico_insumos, filtro],
    queryFn: () => buscarInsumosMovimentacaoPorFiltro(filtro),
    staleTime: 0.25 * (60 * 1000),
  })

  return { historico_data }
}