import  { useState, useEffect, useCallback } from 'react'
import debounce from '@/utils/debounce'
import TabeladePedidos from './components/tabela'
import {
  Grid,
  Box,
  TableContainer,
} from '@mui/material'
import { NotaFiscalImagemPedidoPost } from '@/services/notasFiscaisImagem.service'
import { PedidosDescricaoGet } from './pedidos.service'
import Loader from '@/components/Loader'
import dayjs from 'dayjs'
import { Pagination } from '@mui/material'
import { formatDatetoHtmlDay } from '@/utils/formatDate'
import { useToast } from '@/hooks/toast.hook'
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox'
import { useDebounce } from '@/hooks/debounce.hook'
import InfoCardAmvox from '@/components/InfoCardAmvox'
import HeaderAmvox from '@/components/HeaderAmvox'
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox'
import InputAmvox from '@/components/InputAmvox'

export default function Pedido() {
  const [pedidoLista, setPedidoLista] = useState({
    lista: [],
    qtdProduto: 0,
    valorTotal: 0,
  })
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState({
    pagina: 1,
    cliente: null,
    cnpj: null,
    dataInicio: formatDatetoHtmlDay(),
    numPedido: null,
  })

  const debouncedFiltro = useDebounce(filtro, 1000)

  const { addToast } = useToast()

  const handleFiltro = (e, value) => {
    setFiltro({ ...filtro, pagina: value })
  }

  const handleChange = (e) => {
    const value = e.target.value

    setFiltro((prevFiltro) => ({ ...prevFiltro, numPedido: value }))
  }

  const handleFetch = useCallback(() => {
    setLoading(true)
    PedidosDescricaoGet(debouncedFiltro)
      .then((res) => {
        setPedidoLista({
          lista: res.pedidos,
          qtdProduto: res.quantidadeProdutos,
          valorTotal: res.valorTotal,
        })
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Pedidos!',
          description:
            'Erro ao listar Pedidos, por favor tente novamente dentre de instantes !',
        })
      })
      .finally(() => setLoading(false))
  }, [debouncedFiltro])

  const handleClear = () => {
    setFiltro({
      pagina: 1,
      numPedido: null,
      cnpj: null,
      cliente: null,
      dataInicio: formatDatetoHtmlDay(),
    })
  }

  const handleSubmitPedido = (value) => {
    const { numeroPedido, arquivo } = value

    const formData = new FormData()

    formData.append('NumeroPedido', numeroPedido)
    formData.append('Arquivo', arquivo)

    NotaFiscalImagemPedidoPost(formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Pedido cadastrado com sucesso!',
        })
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Pedido incorreto',
          description: _err.response.data.message,
        })
      })
      .finally(() => {
        handleFetch()
      })
  }

  useEffect(() => handleFetch(), [debouncedFiltro])

  return (
    <Box sx={{ px: 2 }}>
      <HeaderAmvox title='Pedidos' />
      <Grid container columnSpacing={2} >
        <Grid item sx={6} md={4.5} xs={12} sm={12}>
          <InfoCardAmvox
            amount={Number(pedidoLista.qtdProduto)}
            title={'Quantidade de Produtos'}
          />
        </Grid>
        <Grid item sx={6} md={4.5} xs={12} sm={12}>
          <InfoCardAmvox
            type='money'
            amount={Number(pedidoLista.valorTotal)}
            title={'Total/Pedidos/Mês'}
          />
        </Grid>
      </Grid>
      <Grid
        component={'form'}
        container
        sx={{ my: 2 }}
        columnSpacing={1}
      >
        <Grid item xs={6} sm={6} md={1.7}>
            <InputAmvox
              type="text"
              label="Número do pedido"
              size="small"
              name="numPedido"
              value={filtro.numPedido}
              inputProps={{ maxLength: 10 }}
              onChange={handleChange}
            />
        </Grid>
        <Grid item xs={6} sm={6} md={2}>
 
            <InputAmvox
              type="number"
              label="Número do CNPJ"
              size="small"
              inputProps={{ maxLength: 14 }}
              name="cnpj"
              onChange={(e) =>
                setFiltro({
                  ...filtro,
                  dataInicio: null,
                  cnpj: e.target.value,
                })
              }
            />
        </Grid>
        <Grid item xs={6} sm={6} md={4}>
            <InputAmvox
              type="text"
              label="Nome do Cliente"
              size="small"
              name="cliente"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({
                    ...filtro,
                    dataInicio: null,
                    cliente: e.target.value,
                  })
                }, 1000)
              }
            />
        </Grid>

        <Grid item xs={6} sm={2} md={2}>
          <InputDateAmvox
            label={'Data'}
            dataGet={filtro.dataInicio}
            value={filtro.dataInicio}
            onChange={(date) =>
              debounce(() => {
                const formattedDate = date
                  ? dayjs(date).format('YYYY-MM-DD')
                  : null
                setFiltro({ ...filtro, dataInicio: formattedDate })
              })
            }
          />
        </Grid>
        <Grid item xs={6} sm={6} md={1}>
          <ButtonClear type="reset"
            onClick={handleClear}
          />
        </Grid>
      </Grid>
      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        gap={2}
      >
        {loading ? (
          <Loader />
        ) : (
          <TableContainer style={{ maxHeight: 500, overflowY: 'auto' }}>
            <TabeladePedidos
              data={pedidoLista.lista}
              handleSubmitPedido={handleSubmitPedido}
            />
          </TableContainer>
        )}
        <Pagination
          count={pedidoLista.totalPaginas}
          onChange={handleFiltro}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  )
}
