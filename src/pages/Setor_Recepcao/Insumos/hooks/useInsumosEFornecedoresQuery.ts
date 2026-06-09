import { queryKeys } from '@/libs/query-keys'

import { useQuery } from '@tanstack/react-query'
import { buscarInsumosTipo } from '../insumosTipo.service'
import { buscarInsumosFornecedorPorFiltro } from '../insumosFornecedor.service'
import { buscarInsumosPorFiltro } from '../insumos.service'
import useUsuarioLocal from '@/hooks/usuarioLocal.hook'
import { consultaSetores } from '@/services/setores/setores.service'


export function useInsumosEFornecedoresQuery() {
      const { email } = useUsuarioLocal();

    const { data: insumosTipo_data = [] } = useQuery({
        queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_tipo],
        queryFn: () => buscarInsumosTipo(),
        staleTime: 120 * (60 * 1000),
    })

    const { data: insumosFornecedores_data = [] } = useQuery({
        queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_fornecedor],
        queryFn: () => buscarInsumosFornecedorPorFiltro(),
        staleTime: 120 * (60 * 1000),
    })

    const { data: insumos_entrada_data = [] } = useQuery({
        queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_saldo],
        queryFn: () => buscarInsumosPorFiltro(email),
        staleTime: 0.25 * (60 * 1000),
    })

    const { data: setores_data = [] } = useQuery({
        queryKey: [queryKeys.geral.setores],
        queryFn: () => consultaSetores(),
        staleTime: 0.25 * (60 * 1000),
    })


    return { insumosTipo_data, insumosFornecedores_data, insumos_entrada_data, setores_data }
}