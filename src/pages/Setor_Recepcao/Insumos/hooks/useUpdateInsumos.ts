import { useToast } from '@/hooks/toast.hook'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { atualizarNovoValorInsumo } from '../insumos.service'
import { queryClient } from '@/libs/react-query'
import { queryKeys } from '@/libs/query-keys'

export default function useUpdateInsumos() {
    const { addToast } = useToast()

    const { mutateAsync: UpdateInsumos, isPending, error, isSuccess } = useMutation({
        mutationFn: atualizarNovoValorInsumo,
    })

    useEffect(() => {
        if (error) {
            addToast({
                type: 'error',
                title: 'Erro ao atualiza insumo',
                description: error.message,
            })
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_saldo] })
            addToast({
                type: 'success',
                title: 'Sucesso ao atualiza insumo',
                description: isSuccess,
            })
        }
    }, [isSuccess])


    return { UpdateInsumos, isPending }
}
