import { useState, useEffect } from 'react'
import { GetEstoqueInvGeral } from '../services/dashoperacao.service'
import { IEstoqueInventarioCardResponse } from '../types'
import { useToast } from '@/hooks/toast.hook'

export const useFetchOpEstInvGeral = (filtro: { mesIndicador: number; anoIndicador: number }) => {
    const [invEstoqueGeralData, setInvEstoqueGeralData] =
        useState<IEstoqueInventarioCardResponse>(
            {} as IEstoqueInventarioCardResponse
        )
    const { addToast } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            GetEstoqueInvGeral(filtro)
                .then((res) => {
                    setInvEstoqueGeralData(res)
                })
                .catch(() =>
                    addToast({
                        type: 'danger',
                        title: 'Erro - Ao carregar dados do Estoque',
                        description: 'endpoint EstoqueInventario/Card',
                    })
                )
        }

        fetchData()
    }, [filtro])

    return { invEstoqueGeralData }
}