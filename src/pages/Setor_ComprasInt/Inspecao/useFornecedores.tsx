// hooks/useFornecedores.ts
import { useQuery } from '@tanstack/react-query'
import { buscarFornecedor } from './inspecao.service'

export const useFornecedores = (filtro: { fornecedor: string; doc: string }) => {
  return useQuery({
    queryKey: ['fornecedores', filtro],
    queryFn: () => buscarFornecedor(filtro),
    staleTime: 1000 * 60 * 5,
  })
}
