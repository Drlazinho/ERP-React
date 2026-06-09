import { queryKeys } from '@/libs/query-keys'

import { consultaTotalContainer, consultaTotalProduto } from '@/services/recebimentoPermanenciaContainer.service'
import formatDateInput from '@/utils/formatDateInput'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

type props = {
  date?: string | null
}
export function useRecebimentoContainerDashQuery({ date = new Date().toLocaleDateString('en-CA') }: props) {
  const [ containerDia, setContainerDia ] = useState([])

  const { data: totalContainer = {} } = useQuery({
    queryKey: [queryKeys.setor.transportes.recebimento_container.get_total_recebimento_container, date],
    queryFn: () => consultaTotalContainer(date),
    staleTime: 0.25 * (60 * 1000),
  })

  const { data: totalContainerProduto = [] } = useQuery({
    queryKey: [queryKeys.setor.transportes.recebimento_container.get_container_produto, date],
    queryFn: () => consultaTotalProduto(date),
    staleTime: 0.25 * (60 * 1000),
  })

useEffect(() => {
  const filtrarProdutosDoDia = () => {
    const produtosDoDia = totalContainerProduto
      .filter((container : any) => container.data === formatDateInput(date))
      .flatMap((item: any) => item.produtos || []);
      
    setContainerDia(produtosDoDia);
  };

  if (totalContainerProduto.length > 0) {
    filtrarProdutosDoDia();
  }
}, [date, totalContainerProduto]);

  return { totalContainer, totalContainerProduto, containerDia }
}