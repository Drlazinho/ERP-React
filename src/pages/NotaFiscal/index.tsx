import { useState, useEffect, useMemo } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Paper,
  Typography,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

import { apiFabricaADM } from '../../services/apis'
import LayoutNovo from '../../components/LayoutNovo'
import formatDateTotvs from '../../utils/formatDataTotvs'

import InfoCardAmvox from '@/components/InfoCardAmvox'
import { ButtonCustom } from '@/components/ButtonAmvox/ButtonsAmvox'
import { PictureAsPdf } from '@mui/icons-material'

interface IPedidoItem {
  cnpj?: string
  descricao?: string
  dtFat?: string
  item?: string
  local?: string
  nf?: string | null |undefined
  nome?: string
  qtde?: number
  total?: number
  valor?: number
}

interface PedidoListaItem extends Omit<IPedidoItem, 'total' | 'valor'> {
  total: string
  valor: string
}

export default function NotaFiscal() {
    const { documento } = useParams<{ documento?: string }>()
  const [pedidoLista, setPedidoLista] = useState<PedidoListaItem[]>([])
  const [filtroNota, setFiltroNota] = useState<Pick<IPedidoItem, 'nf'>>({ nf: documento || undefined })

 const totalGeral = useMemo(() => {
    let qtdprodutos_ = 0
    let somatotal_ = 0

    pedidoLista.forEach((item: PedidoListaItem) => {
      qtdprodutos_ += item.qtde || 0
      somatotal_ += parseFloat(item.total || '0')
    })

    return {
      qdtProdutos: qtdprodutos_,
      somatotal: somatotal_,
    }
  }, [pedidoLista])

  useEffect(() => {
    apiFabricaADM
      .get('/Pedidos/PedidoPorNota', { params: filtroNota })
      .then((retorno) => {
        setPedidoLista(
          retorno.data.map((item: IPedidoItem) => ({
            nome: item.nome,
            descricao: item.descricao,
            valor: item.valor?.toFixed(2) || '0.00',
            qtde: item.qtde || 0,
            total: item.total?.toFixed(2) || '0.00',
            dtfat: item.dtFat,
            nf: item.nf,
          }))
        )
      })
  }, [filtroNota])

  const handleClear = (e: React.FormEvent) => {
    e.preventDefault()
    setFiltroNota({ nf: undefined })
  }

  const nomeDoCliente = [...new Set(pedidoLista.map((item) => item.nome))]
  const dataDoCliente = [...new Set(pedidoLista.map((item) => formatDateTotvs(item.dtFat || '')))]

  return (
    <LayoutNovo>
      <Box width="98%" mx="auto" my={2}>
        <form onSubmit={handleClear}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InfoCardAmvox title="Qtd Produtos" amount={Number(totalGeral.qdtProdutos)} type='quantity'/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <InfoCardAmvox title="Total R$" amount={Number(totalGeral.somatotal)} type="money" />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Typography variant="h6" fontWeight="bold" color="text.primary" mb={1}>
                Espelho da Nota Fiscal - {filtroNota.nf }
              </Typography>
            </Grid2>

            <Grid2 >
              <Grid2 container spacing={1}>
                <Grid2 >
                  <ButtonCustom
                    color='error'
                    component={RouterLink}
                    to="/transporte/entregas"
                    title='Ir p/ Entregas'
                  />                </Grid2>
                <Grid2>
                  <ButtonCustom
                    color='error'
                    component={RouterLink}
                    to="/financeiro/financeiro"
                    title='Ir p/ Financeiro'
                  />
                </Grid2>
                <Grid2>
                  <ButtonCustom
                    color='error'
                    component={RouterLink}
                    to="/comercial/notasfiscaisemitidas"
                    title='Ir p/ Notas Emitidas'
                  />
                </Grid2>
                <Grid2>
                  <ButtonCustom  title='Baixar PDF' startIcon={<PictureAsPdf />} component={RouterLink}
                    to={`/printpdf/${documento}`} />
                </Grid2>
              </Grid2>
            </Grid2>
          </Grid2>
        </form>

        <Box mt={4} component={Paper} p={2} sx={{ position: 'relative' }}>


          <Box mb={2}>
            <Typography variant="subtitle1" fontWeight="bold">
              Nota Fiscal
            </Typography>
            <Typography variant="body2">Nome: {nomeDoCliente.join(', ')}</Typography>
            <Typography variant="body2">Data: {dataDoCliente.join(', ')}</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Descrição</strong></TableCell>
                  <TableCell><strong>Valor</strong></TableCell>
                  <TableCell><strong>Qtde</strong></TableCell>
                  <TableCell><strong>Total</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedidoLista.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.descricao}</TableCell>
                    <TableCell>{item.valor}</TableCell>
                    <TableCell>{item.qtde}</TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={2}><strong>Total:</strong></TableCell>
                  <TableCell><strong>{totalGeral.qdtProdutos}</strong></TableCell>
                  <TableCell><strong> {totalGeral.somatotal.toFixed(2)}</strong></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </LayoutNovo>
  )
}
