import { apiFabricaADM } from '@/services/apis'
import { AxiosResponse } from 'axios'

export interface IInsumosMovimentacaoItem {
  dataMov: string
  descricao: string
  id: number
  produto: string
  qtdMov: number
  saldoAnterior: number
  saldoNovo: number
  setor: string
  tipoMovimentacao: string
  usuario: string
  usuarioSistema:  string
}

export interface IResponseInsumoMovimentacao {
  data: IInsumosMovimentacaoItem[]
}


export const buscarInsumosMovimentacaoPorFiltro = async (filtro : any) => {
  try {
   const result: AxiosResponse<IInsumosMovimentacaoItem[]> = await apiFabricaADM.get('InsumosMovimentacao', {
      params: filtro,
    })
    return Promise.resolve(result.data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registrarInsumosMovimentacao = async (value: any) => {
  try {
    const result = await apiFabricaADM.post('InsumosMovimentacao', value)
    return Promise.resolve(result.data)
  } catch (error) {
    return Promise.reject(error)
  }
}
