import { useToast } from '@/hooks/toast.hook'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { registrarNovoInsumo } from '../insumos.service'
import { queryClient } from '@/libs/react-query'
import { queryKeys } from '@/libs/query-keys'

export default function useRegistrarInsumos() {
    const { addToast } = useToast()

    const { mutateAsync: CreateNewInsumosHandle, isPending, error, isSuccess } = useMutation({
        mutationFn: registrarNovoInsumo,
    })

    useEffect(() => {
        if (error) {
            addToast({
                type: 'error',
                title: 'Erro ao registrar novo insumo',
                description: error.message,
            })
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_saldo] })
            addToast({
                type: 'success',
                title: 'Sucesso ao registrar insumo',
                description: isSuccess,
            })
        }
    }, [isSuccess])


    return { CreateNewInsumosHandle, isPending }
}
