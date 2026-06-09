import { useToast } from '@/hooks/toast.hook'
import { useMutation } from '@tanstack/react-query'
import { useEffect } from 'react'
import { registrarNovoInsumoFornecedor } from '../insumosFornecedor.service'
import { queryClient } from '@/libs/react-query'
import { queryKeys } from '@/libs/query-keys'

export default function useRegistrarFornecedorInsumos() {
    const { addToast } = useToast()

    const { mutateAsync: CreateFornecedorInsumos, isPending, error, isSuccess } = useMutation({
        mutationFn: registrarNovoInsumoFornecedor,
    })

    useEffect(() => {
        if (error) {
            addToast({
                type: 'error',
                title: 'Erro ao registrar novo fornecedor de insumos',
                description: error.message,
            })
        }
    }, [error])

    useEffect(() => {
        if (isSuccess) {
            queryClient.invalidateQueries({ queryKey: [queryKeys.setor.recepcao.insumos.get_insumos_fornecedor] })
            addToast({
                type: 'success',
                title: 'Sucesso ao registrar novo fornecedor de insumos',
                description: isSuccess,
            })
        }
    }, [isSuccess])


    return { CreateFornecedorInsumos, isPending }
}
