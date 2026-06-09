import React, { memo, useState } from 'react'
import useSortableData from '../../../../utils/sortable'
import { Link, useNavigate } from 'react-router-dom'
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDelete,
  AiOutlineStop,
} from 'react-icons/ai'
import { ImHappy2 } from 'react-icons/im'
import { RiEmotionUnhappyLine } from 'react-icons/ri'
import formatDateTotvs from '../../../../utils/formatDataTotvs'
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Tooltip,
  useTheme,
} from '@mui/material'
import { NotaFiscalImagemPedidoLoteGet } from '../../../../services/notasFiscaisImagem.service'
import { donwloadGzipPDF } from '../../../../utils/downloadPdf'
import { useToast } from '../../../../hooks/toast.hook'
import { Edit } from '@mui/icons-material'
import SaveIcon from '@mui/icons-material/Save'
import { putObservacaoEntregas } from '../entregas.service'
import { queryClient } from '@/libs/react-query'

const cabecalho = {
  cursor: 'pointer',
  color: '#333',
  fontWeight: 'bold',
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

function EntregasTabelaProps({ onRowHover, statusLogistica, ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(props.entregas)
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const handleOpen = (item) => {
    setOpen(true), setBodyData(item)
  }
  const handleClose = () => setOpen(false)
  const [loading, setLoading] = React.useState('')
  const [bodyData, setBodyData] = React.useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setBodyData({
      ...bodyData,
      [name]: value,
    })
  }

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === name ? sortConfig.direction : undefined
  }

  const tipoFrete = (item) => {
  switch (item) {
  case '0001':
    return '1 - VENDA';
  case '0002':
    return '2 - POS VENDA';
  case '0003':
    return '3 - VENDA FUNCIONÁRIO';
  case '0004':
    return '4 - RETIRADA FOB/FRATOS';
  case '0005':
    return '5 - BONIFICAÇÃO MKT';
  case '0006':
    return '6 - FRETE QUIOSQUE';
  case '0007':
    return '7 - MOSTRUÁRIO/REPRESENTANTE';
  case '0008':
    return '8 - RETIRADA';
  case '0009':
    return '9 - FEIRA/EXPOS/CONVENÇÃO';
  case '0010':
    return '10 - LOTAÇÃO';
  case '0011':
    return '11 - FRACIONADO';
  case '0012':
    return '12 - ROTA';
  case '0013':
    return '13 - VEÍCULO DEDICADO';
  case '0014':
    return '14 - TRANSFERÊNCIA INTERNA';
  case '0015':
    return '15 - TRANSFERÊNCIA EXTERNA';
  case '0016':
    return '16 - CORREIOS';
  case '0017':
    return '17 - PALLETIZADA';
  case '0018':
    return '18 - DIRETORIA';
  default:
    return 'FRETE NÃO MAPEADO';
}
  }

  const [loader, setLoader] = useState('')

  const handleDowloadZip = (value) => {
    NotaFiscalImagemPedidoLoteGet(value)
      .then((res) => {
        setLoader(value)
        donwloadGzipPDF(res.arquivo, res.nome)
      })
      .catch((err) => {
        addToast({
          type: 'danger',
          title: 'Error ao baixar nota',
          description: err.response.data.message,
        })
      })
      .finally(() => {
        setLoader('')
      })
  }

  const handleUpdateEntregas = () => {
    const item = {
      id: bodyData.id,
      observacao: bodyData.observacao,
      qtdPallets: Number(bodyData.qtdPallets),
    }
    setLoading(true)
    putObservacaoEntregas(item)
      .then(() => {
        setBodyData({})
        queryClient.invalidateQueries({ queryKey: ['entregas'] })
        handleClose()
      })
      .catch((err) => {
        addToast({
          type: 'danger',
          title: 'Error ao Atualizar',
          description: err.response.data.message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Atualizar
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Observação:{' '}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={bodyData.observacao}
                name="observacao"
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={'Cancelamento'}>Cancelamento</MenuItem>
                <MenuItem value={'Desistência da compra'}>
                  Desistência da compra
                </MenuItem>
                <MenuItem value={'Devolução'}>Devolução</MenuItem>
              </Select>

              <TextField
                sx={{ mt: 2 }}
                id="outlined-basic"
                label="Quantidade de Pallets"
                name="qtdPallets"
                variant="outlined"
                value={bodyData.qtdPallets}
                onChange={handleChange}
              />
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  mt: 2,
                  gap: 2,
                  justifyContent: 'end',
                }}
              >
                <Button
                  type="reset"
                  variant="contained"
                  color="error"
                  onClick={handleClose}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  loading={loading}
                  loadingPosition="end"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdateEntregas}
                >
                  Salvar
                </Button>
                {/* 000173845 */}
              </Box>
            </FormControl>
          </Typography>
        </Box>
      </Modal>

      <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }} component={Paper}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('notafiscal')}
                  className={getClassNamesFor('notafiscal')}
                  style={cabecalho}
                >
                  Nota fiscal
                </Button>
              </TableCell>

              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('nome')}
                  className={getClassNamesFor('nome')}
                  style={cabecalho}
                >
                  Nome
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('destino')}
                  className={getClassNamesFor('destino')}
                  style={cabecalho}
                >
                  Dest.
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('dias')}
                  className={getClassNamesFor('dias')}
                  style={cabecalho}
                >
                  Dias
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('previsao')}
                  className={getClassNamesFor('previsao')}
                  style={cabecalho}
                >
                  Previsão
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('entregue')}
                  className={getClassNamesFor('entregue')}
                  style={cabecalho}
                >
                  Entregue
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('expedido')}
                  className={getClassNamesFor('expedido')}
                  style={cabecalho}
                >
                  Exp.
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('expedido')}
                  className={getClassNamesFor('expedido')}
                  style={cabecalho}
                >
                  Frete
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('expedido')}
                  className={getClassNamesFor('expedido')}
                  style={cabecalho}
                >
                  Romaneio
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('memorando')}
                  className={getClassNamesFor('memorando')}
                  style={cabecalho}
                >
                  Memorando
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('motoristaId')}
                  className={getClassNamesFor('motoristaId')}
                  style={cabecalho}
                >
                  Id Motorista
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('motoristaNome')}
                  className={getClassNamesFor('motoristaNome')}
                  style={cabecalho}
                >
                  Nome Motorista
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('transportadoraCod')}
                  className={getClassNamesFor('transportadoraCod')}
                  style={cabecalho}
                >
                  Transportadora Codigo
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('transportadoraNome')}
                  className={getClassNamesFor('transportadoraNome')}
                  style={cabecalho}
                >
                  Transportadora Nome
                </Button>
              </TableCell>
                            <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('observacao')}
                  className={getClassNamesFor('observacao')}
                  style={cabecalho}
                >
                  Observação
                </Button>
              </TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>
                <Button
                  onClick={() => requestSort('qtdPallets')}
                  className={getClassNamesFor('qtdPallets')}
                  style={cabecalho}
                >
                  Qtd. Paletes
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 ? (
              items.map((item) => (
                <Tooltip
                  title={item.cancelado === '*' ? 'CANCELADO' : ''}
                  arrow
                  placement="top"
                  disableHoverListener={item.cancelado !== ''}
                >
                  <TableRow
                    key={item.id}
                    hover
                    onMouseEnter={() => onRowHover?.(item)}
                    sx={{
                      background: item.cancelado === '*' ? '#f79992' : theme.palette.background.default,
                    }}
                  >
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      <Box display="flex" gap={1}>
                        <Link
                          to={`/notafiscal/${item.documento}`}
                          title="Visualizar Espelho da Nota Fiscal"
                        >
                          {item.documento}
                        </Link>
                        {item.deletado === '*' && (
                          <IconButton title="ROMANEIO DELETADO" size="small">
                            <AiOutlineDelete style={{ color: 'red' }} />
                          </IconButton>
                        )}
                      </Box>
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.nome}
                    </TableCell>
                    <TableCell align="center">{item.destino}</TableCell>
                    <TableCell align="center">
                      {item.dias}{' '}
                      {item.dias < 10 ? (
                        <ImHappy2 style={{ color: 'green' }}  />
                      ) : (
                        <RiEmotionUnhappyLine style={{ color: 'red' }} />
                      )}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.previsao === ''
                        ? '--/--/----'
                        : formatDateTotvs(item.previsao)}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.entregue === ''
                        ? '--/--/----'
                        : formatDateTotvs(item.entregue)}
                    </TableCell>
                    <TableCell align="center">
                      {item.isLoading ? (
                        <Box display="flex" justifyContent="center">
                          <CircularProgress size={24} />
                        </Box>
                      ) : (
                        <IconButton
                          onClick={() => statusLogistica(item)}
                          disabled={item.expedido === 1}
                        >
                          {item.expedido === 0 ? (
                            <AiFillDislike style={{ color: 'red' }} size={20}/>
                          ) : (
                            <AiFillLike style={{ color: 'green' }} size={20}/>
                          )}
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {tipoFrete(item.classificFrete)}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.romaneio}
                    </TableCell>
                    <TableCell align="center" sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.memorando || '-'}
                    </TableCell>
                    <TableCell align="center" sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.motoristaId}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.motoristaNome}
                    </TableCell>
                    <TableCell align="center" sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.transportadoraCod}
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      {item.transportadoraNome}
                    </TableCell>
                                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      <Button
                        variant="outlined"
                        size='small'
                        onClick={() => handleOpen(item)}
                        sx={{ p: 0 }}
                        endIcon={<Edit />}
                      >
                        {item.observacao || '--'}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ background: 'inherit', whiteSpace: 'nowrap' }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleOpen(item)}
                        size='small'
                        sx={{ p: 0 }}
                        endIcon={<Edit />}
                      >
                        {item.qtdPallets || '0'}
                      </Button>
                    </TableCell>
                  </TableRow>
                </Tooltip>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={16} align="center">
                  <Typography variant="h6">
                    Nota pesquisada sem Romaneio Registrada
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export const Entregas_Tabela = memo(
  EntregasTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps)
  }
)
