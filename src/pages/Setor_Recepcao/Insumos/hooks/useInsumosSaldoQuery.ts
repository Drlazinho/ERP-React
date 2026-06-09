import { queryKeys } from '@/libs/query-keys'

import { useQuery } from '@tanstack/react-query'
import { buscarInsumosPorFiltro } from '../insumos.service'

type props = {
  email?: string | null
  codProduto?: string | null
  nome?: string | null
}
export function useInsumosSaldoQuery( filtro : props) {
  const { data: insumos_data = [], isLoading: insumos_isLoading } = useQuery({
    queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_saldo, filtro],
    queryFn: () => buscarInsumosPorFiltro(filtro.email, filtro),
    staleTime: 0.25 * (60 * 1000),
  })

  return { insumos_data, insumos_isLoading }
}