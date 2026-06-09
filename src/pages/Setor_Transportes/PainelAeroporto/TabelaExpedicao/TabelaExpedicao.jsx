import React, { memo, useState } from 'react';
import { useMemo } from 'react';
import {
  IconButton,
  TextField,
  MenuItem,
  Select,
  Box,
  Button,
  Modal,
  FormLabel,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { apiFabrica_operacao } from '../../../../services/apis';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import { useToast } from '../../../../hooks/toast.hook';
import moment from 'moment';
import '../styles.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const interfacePutExpedicao = {
  id: 0,
  doca: '',
  status: '',
  prioridade: '',
};

const interfaceStatusCadastro = [
  {
    id: 1,
    status: 'EM DOCA',
  },
  {
    id: 2,
    status: 'EM CARREGAMENTO',
  },
  {
    id: 3,
    status: 'EM DESCARGA',
  },
  {
    id: 4,
    status: 'ACESSANDO O PATIO',
  },
  {
    id: 5,
    status: 'LIBERADO',
  },
  {
    id: 6,
    status: 'CANCELADO',
  },
  {
    id: 7,
    status: 'AGUARD. SEPARAÇÃO',
  },
];

const interfacePrioridade = [
  {
    id: 1,
    status: 'Alta',
  },
  {
    id: 2,
    status: 'Média',
  },
  {
    id: 3,
    status: 'Baixa',
  },
];

function TabelaExpedicaoProps({ listaExpedicao, handleFetch }) {
  const [showModal, setShowModal] = useState(false);
  const [atualizaExpedicao, setAtualizaExpedicao] = useState(
    interfacePutExpedicao
  );
  const [statusObj, setStatusObj] = useState(interfaceStatusCadastro);
  const [prioridadeObj, setPrioridadeObj] = useState(interfacePrioridade);
  const [isLoading, setIsLoading] = useState(false);

  function renderColorStatus(status) {
    switch (status) {
      case 'EM DOCA':
        return '#FFC470';
      case 'EM CARREGAMENTO':
        return '#FFC470';
      case 'EM DESCARGA':
        return '#FFC470';
      case 'ACESSANDO O PATIO':
        return '#DD5746';
      case 'LIBERADO':
        return '#799351';
      case 'CANCELADO':
        return '#DD5746';
      case 'AGUARD. SEPARAÇÃO':
        return '#f8a835';
      default:
        return undefined;
    }
  }

  const { addToast } = useToast();

  const AtualizarExpedicao = async (item) => {
    setIsLoading(true);
    try {
      await apiFabrica_operacao.put(
        `/ExpedicaoCarga?Id=${item.id}&Doca=${item.doca}&Status=${item.status}&Prioridade=${item.prioridade}`
      );
    } catch (err) {
      setIsLoading(false);
      addToast({
        type: 'warning',
        title: 'Erro ao atualizar expedição!',
      });
    } finally {
      setIsLoading(false);
      handleClose();
      handleFetch();
      addToast({
        type: 'success',
        title: 'Sucesso ao atualizar expedição!',
      });
    }
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setAtualizaExpedicao({ ...atualizaExpedicao, [name]: value });
  };

  const handleClose = () => {
    setShowModal(!showModal);
    setAtualizaExpedicao(interfacePutExpedicao);
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, width: '900px', height: '250px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Editar Expedição
            </Typography>

            <Button type="reset" onClick={handleClose} variant="text">
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '12%' }}
            >
              <FormLabel
                sx={{ fontWeight: '700', color: '#333', fontSize: '12px' }}
              >
                Doca
              </FormLabel>
              <TextField
                size="small"
                type="text"
                id="doca"
                name="doca"
                value={atualizaExpedicao.doca}
                onChange={inputTextHandler}
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': { borderRadius: '8px' },
                }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel
                sx={{ fontWeight: '700', color: '#333', fontSize: '12px' }}
              >
                Status
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={atualizaExpedicao.status}
                label="Status"
                onChange={(e) =>
                  setAtualizaExpedicao({
                    ...atualizaExpedicao,
                    status: e.target.value,
                  })
                }
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                }}
              >
                {statusObj.map((item) => (
                  <MenuItem key={item.id} value={item.status}>
                    {item.status}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', width: '32%' }}
            >
              <FormLabel
                sx={{ fontWeight: '700', color: '#333', fontSize: '12px' }}
              >
                Prioridade
              </FormLabel>
              <Select
                size="small"
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={atualizaExpedicao.prioridade}
                label="Prioridade"
                onChange={(e) =>
                  setAtualizaExpedicao({
                    ...atualizaExpedicao,
                    prioridade: e.target.value,
                  })
                }
                sx={{
                  width: '100%',
                  borderRadius: '8px',
                }}
              >
                {prioridadeObj.map((item) => (
                  <MenuItem key={item.id} value={item.status}>
                    {item.status}
                  </MenuItem>
                ))}
              </Select>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '32%',
                alignItems: 'center',
                paddingTop: '10px',
              }}
            >
              <LoadingButton
                loading={isLoading}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  width: '200px',
                  marginTop: '20px',
                  marginBottom: '20px',
                  borderRadius: '8px',
                }}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={() => {
                  AtualizarExpedicao(atualizaExpedicao);
                }}
              >
                <span>Salvar</span>
              </LoadingButton>
            </div>
          </Box>
        </Box>
      </Modal>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Hora De Chegada</TableCell>
              <TableCell align="center">Prioridade</TableCell>
              <TableCell align="center">Doca</TableCell>
              <TableCell align="center">Destino/Cliente</TableCell>
              <TableCell align="center">UF</TableCell>
              <TableCell align="center">Motorista</TableCell>
              <TableCell align="center">Veiculo</TableCell>
              <TableCell align="center">Cub</TableCell>
              <TableCell align="center">Tipo Carga</TableCell>
              <TableCell align="center">Tipo Transporte</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listaExpedicao.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell align="center">
                  {moment(row.chegada).format('DD/MM/yyyy HH:mm')}
                </TableCell>
                <TableCell align="center">{row.prioridade}</TableCell>
                <TableCell align="center">
                  <b>{row.doca}</b>
                </TableCell>
                <TableCell align="center">{row.destino}</TableCell>
                <TableCell align="center">{row.uf}</TableCell>
                <TableCell align="center">{row.motorista}</TableCell>
                <TableCell align="center">{row.veiculo}</TableCell>
                <TableCell align="center">{row.cubagem}</TableCell>
                <TableCell align="center">{row.tipO_CARGA}</TableCell>
                <TableCell align="center">
                  <img
                    width="150"
                    height="30"
                    src={`data:image/png;base64, ${row.transportadora}`}
                    alt="logo"
                  />
                </TableCell>
                <TableCell align="center">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    size="small"
                    inputProps={{
                      style: {
                        fontSize: 10,
                        padding: 8,
                        textAlign: 'center',
                        color: renderColorStatus(row.status),
                      },
                    }}
                    InputLabelProps={{ style: { fontSize: 12 } }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: `2px solid ${renderColorStatus(row.status)}`,
                          borderRadius: '16px',
                        },
                      },
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: renderColorStatus(row.status),
                      },
                    }}
                    disabled
                    value={row.status}
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    onClick={() => {
                      setAtualizaExpedicao({
                        id: row.id,
                        doca: row.doca,
                        status: row.status,
                        prioridade: row.prioridade,
                      });
                      setShowModal(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const TabelaExpedicao = memo(
  TabelaExpedicaoProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
