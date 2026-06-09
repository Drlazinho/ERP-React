import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useMemo } from 'react'
import { putAgendamentoCarga } from '@/pages/Setor_Transportes/AgendamentoCarga/agendamentoCarga.service'
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputAdornment,
  FormLabel,
  Modal as MuiModal,
  Box,
  Typography,
} from '@mui/material'
import { Link } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit'

import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import IconButton from '@mui/material/IconButton'
import CheckIcon from '@mui/icons-material/Check'
import LockIcon from '@mui/icons-material/Lock'
import { useToast } from '@/hooks/toast.hook'
import { LoadingButton } from '@mui/lab'
import { apiFabrica } from '@/services/apis'
import moment from 'moment/moment'
import './styles.css'
import formatDateTotvs from '@/utils/formatDataTotvs'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
}

const interfaceObj = {
  id: 0,
  numRomaneio: '',
  valorFrete: '',
  mes: '',
  ordemEntregas: '',
  prazoRecLogistic: '',
  canhoto: '',
  dtEntregue: '',
  valor: '',
  codCliente: '',
  motorista: '',
  ordemCarregamento: 0,
  peso_Kg: '',
  volumes: '',
  cubagem: '',
  previsaoCarregamento: '',
  entregue: '',
  statusAgenda: '',
  observacao: '',
  dtAgenda: '',
  dtPrevisao: '',
  uf: '',
  destino: '',
  cliente: '',
  numNfe: '',
  tipoTransporteNf: '',
  descarga: '',
  expedidoEm: '',
  horaRecebLogistica: '',
  dtRecebLogistic: '',
  chaveNf: '',
}

const interfaceCanhoto = [
  {
    id: 1,
    nome: 'RECEBIDO',
  },
  {
    id: 2,
    nome: 'SCANEADO',
  },
  {
    id: 3,
    nome: 'FOTO',
  },
]

const interfaceStatusAgenda = [
  {
    id: 1,
    nome: 'AGUARD. LIBER. COMERC.',
  },
  {
    id: 2,
    nome: 'CONFIRMADO',
  },
  {
    id: 3,
    nome: 'SOLICITAR AGEN. COMERC.',
  },
  {
    id: 4,
    nome: 'SOLICITAR AGEN. LOGIST.',
  },
  {
    id: 5,
    nome: 'VERIFICAR',
  },
  {
    id: 6,
    nome: 'AGUARD. RETORN. REPRESENT.',
  },
  {
    id: 7,
    nome: 'AGUARD. CONF. AGENDA',
  },
  {
    id: 8,
    nome: 'AGUARD. TROCA NF',
  },
  {
    id: 9,
    nome: 'REAGENDA',
  },
  {
    id: 10,
    nome: 'REAGENDA 1',
  },
  {
    id: 11,
    nome: 'NF CANCELADA',
  },
]

export default function TabelaAgendamentoCarga({
  setShowSlide,
  setSelectedObj,
  data,
  handleFetch,
}) {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [putObj, setPutObj] = React.useState(interfaceObj)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showModalEditar, setShowModalEditar] = React.useState(false)
  const [listaCanhotos] = React.useState(interfaceCanhoto)
  const [listaStatusAgenda] = React.useState(interfaceStatusAgenda)
  const { addToast } = useToast()

  function openSlide(obj) {
    setShowSlide(true)
    setSelectedObj(obj)
  }

  const updateTabela = (item) => {
    putAgendamentoCarga(item)
      .then((retorno) => {
        addToast({
          type: 'success',
          title: 'Atualização feita com sucesso!!',
        })
        setTimeout(() => {
          handleFetch()
        }, 2000)
      })
      .catch((er) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar agendamento!!',
        })
      })
  }

  const updateAgendamento = (agendamento) => {
    setIsLoading(!isLoading)
    const body = {
      id: agendamento.id,
      dtRecebLogistic: moment(agendamento.dtRecebLogistic).format('YYYY-MM-DD'),
      horaRecebLogistica: agendamento.horaRecebLogistica,
      descarga: agendamento.descarga,
      previsaoCarregamento: moment(agendamento.previsaoCarregamento).format(
        'YYYY-MM-DD'
      ),
      dtAgenda: moment(agendamento.dtAgenda).format('YYYY-MM-DD'),
      observação: agendamento.observação,
      statusAgenda: agendamento.statusAgenda,
      entregue: agendamento.entregue,
      dtPrevisao: moment(agendamento.dtPrevisao).format('YYYY-MM-DD'),
      ordemCarregamento: Number(agendamento.ordemCarregamento),
      canhoto: agendamento.canhoto,
      ordemEntregas: agendamento.ordemEntregas,
    }

    putAgendamentoCarga(body)
      .then((retorno) => {
        addToast({
          type: 'success',
          title: 'Atualização feita com sucesso!!',
        })
        setTimeout(() => {
          handleFetch()
        }, 2000)
        setIsLoading(false)
        handleClose()
      })
      .catch((er) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar agendamento!!',
        })
        setIsLoading(false)
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setPutObj((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleClose = () => {
    setShowModalEditar(!showModalEditar)
    setPutObj({})
  }

  const handleChangePage = (newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <>
      <MuiModal open={showModalEditar} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Edição Nf {putObj.chaveNf}
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose()
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Data Receb Logist</FormLabel>
              <TextField
                type="date"
                id="dtRecebLogistic"
                name="dtRecebLogistic"
                value={moment(putObj.dtRecebLogistic).format('YYYY-MM-DD')}
                onChange={(e) =>
                  setPutObj({
                    ...putObj,
                    dtRecebLogistic: e.target.value,
                  })
                }
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Hora Receb Logist</FormLabel>
              <TextField
                type="text"
                id="horaRecebLogistica"
                name="horaRecebLogistica"
                value={putObj.horaRecebLogistica}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Descarga</FormLabel>
              <TextField
                type="text"
                id="descarga"
                name="descarga"
                value={putObj.descarga}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Ordem Entregas</FormLabel>
              <TextField
                type="number"
                id="ordemEntregas"
                name="ordemEntregas"
                value={putObj.ordemEntregas}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Previsao</FormLabel>
              <TextField
                type="date"
                id="dtPrevisao"
                name="dtPrevisao"
                value={moment(putObj.dtPrevisao).format('YYYY-MM-DD')}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Data Agenda</FormLabel>
              <TextField
                type="date"
                id="dtAgenda"
                name="dtAgenda"
                value={moment(putObj.dtAgenda).format('YYYY-MM-DD')}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Observacao</FormLabel>
              <TextField
                type="text"
                id="observacao"
                name="observacao"
                value={putObj.observacao}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Status Agenda</FormLabel>
              <Select
                id="statusAgenda"
                name="statusAgenda"
                size="small"
                value={putObj.statusAgenda}
                onChange={(e) => {
                  setPutObj((prevData) => ({
                    ...prevData,
                    statusAgenda: e.target.value,
                  }))
                }}
                sx={{
                  height: '55px',
                  width: '100%',
                  borderRadius: '8px',
                  borderColor: '#ccc',
                }}
              >
                {listaStatusAgenda.map((item) => (
                  <MenuItem key={item.id} value={item.nome}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Entregue</FormLabel>
              <TextField
                type="text"
                id="entregue"
                name="entregue"
                value={putObj.entregue}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Previsao de Carregamento</FormLabel>
              <TextField
                type="date"
                id="previsaoCarregamento"
                name="previsaoCarregamento"
                value={moment(putObj.previsaoCarregamento).format('YYYY-MM-DD')}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Ordem de Carregamento</FormLabel>
              <TextField
                type="number"
                id="ordemCarregamento"
                name="ordemCarregamento"
                value={putObj.ordemCarregamento}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '30%',
              }}
            >
              <FormLabel>Canhoto</FormLabel>
              <Select
                id="canhoto"
                name="canhoto"
                size="small"
                value={putObj.canhoto}
                onChange={(e) => {
                  setPutObj((prevData) => ({
                    ...prevData,
                    canhoto: e.target.value,
                  }))
                }}
                sx={{
                  height: '55px',
                  width: '100%',
                  borderRadius: '8px',
                  borderColor: '#ccc',
                }}
              >
                {listaCanhotos.map((item) => (
                  <MenuItem key={item.id} value={item.nome}>
                    {item.nome}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '20px',
              gap: '20px',
            }}
          >
            <Button
              variant="contained"
              color="error"
              style={{
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              onClick={() => {
                handleClose()
              }}
            >
              <span>Fechar</span>
            </Button>
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'green',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                updateAgendamento(putObj)
              }}
            >
              <span>Confirmar</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>
      <Paper sx={{ mb: 2 }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Ações
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Chave Nf
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Dt Receb. Logistica
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Hora Receb. Logistica
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Dt Expedição
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Nº NF
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Cliente
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Destino
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  UF
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Previsão
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Dt Agenda
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Observação
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Status Agenda
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Entregue
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Cub M³
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Volume
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Qtd. Pallet
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Dt Fatauramento
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Nº Romaneio
                </TableCell>
                <TableCell align="center" style={{ fontWeight: 'bold' }}>
                  Motorista
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => {
                            setPutObj(item)
                            setShowModalEditar(!showModalEditar)
                          }}
                          type="button"
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={async () => {
                            await openSlide(item)
                          }}
                        >
                          {item.chaveNf}
                        </Button>
                      </TableCell>
                      <TableCell align="center">
                        {item.dtRecebLogistic}                      </TableCell>
                      <TableCell align="center">
                        {item.horaRecebLogistica}
                      </TableCell>
                      <TableCell align="center">
                        {item.expedidoEm
                          ? moment(item.expedidoEm).format('DD/MM/YYYY')
                          : ''}
                      </TableCell>
                      <TableCell align="center">{item.numNfe}</TableCell>
                      <TableCell align="center">{item.cliente}</TableCell>
                      <TableCell align="center">{item.destino}</TableCell>
                      <TableCell align="center">{item.uf}</TableCell>
                      <TableCell align="center">
                        <TextField
                          type="date"
                          value={
                            item.dtPrevisao
                              ? moment(item.dtPrevisao).format('YYYY-MM-DD')
                              : ''
                          }
                          onChange={(e) =>
                            updateTabela({
                              id: item.id,
                              dtPrevisao: moment(e.target.value).format(
                                'YYYY-MM-DD'
                              ),
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TextField
                          type="date"
                          value={
                            item.dtAgenda
                              ? moment(item.dtAgenda).format('YYYY-MM-DD')
                              : ''
                          }
                          onChange={(e) =>
                            updateTabela({
                              id: item.id,
                              dtAgenda: moment(e.target.value).format(
                                'YYYY-MM-DD'
                              ),
                            })
                          }
                        />
                      </TableCell>
                      <TableCell align="center">{item.observacao}</TableCell>
                      <TableCell align="center">
                        <Select
                          size="small"
                          value={item.statusAgenda}
                          onChange={(e) =>
                            updateTabela({
                              id: item.id,
                              statusAgenda: e.target.value,
                            })
                          }
                          sx={{
                            border: 1,
                          }}
                        >
                          {listaStatusAgenda.map((item) => (
                            <MenuItem key={item.id} value={item.nome}>
                              {item.nome}
                            </MenuItem>
                          ))}
                        </Select>
                        { }
                      </TableCell>
                      <TableCell align="center">{item.entregue}</TableCell>
                      <TableCell align="center">{item.cubagem}</TableCell>
                      <TableCell align="center">{item.volumes}</TableCell>
                      <TableCell align="center">{item.peso_Kg}</TableCell>
                      <TableCell align="center">
                        {moment(item.dtFaturamento).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell align="center">{item.numRomaneio}</TableCell>
                      <TableCell align="center">{item.motorista}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </>
  )
}
