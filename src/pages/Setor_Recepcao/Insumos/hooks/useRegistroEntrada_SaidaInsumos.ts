import { useToast } from '@/hooks/toast.hook'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryClient } from '@/libs/react-query'
import { queryKeys } from '@/libs/query-keys'
import { registrarInsumosMovimentacao } from '../insumosMovimentacao.service'

export default function useRegistroEntrada_SaidaInsumos() {
    const { addToast } = useToast()

    const { mutateAsync: CreateMovimentacaoInsumos, isPending, error, isSuccess } = useMutation({
        mutationFn: registrarInsumosMovimentacao,
    })

    useEffect(() => {
        if (error) {
            addToast({
                type: 'error',
                title: 'Erro ao movimentar entrada/saída de insumo',
                description: error.message,
            })
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_saldo] })
            addToast({
                type: 'success',
                title: 'Sucesso ao movimentar entrada/saída de insumo',
                description: isSuccess,
            })
        }
    }, [isSuccess])


    return { CreateMovimentacaoInsumos, isPending }
}
