import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';
import { patchEstoqueInventario } from '../KPIinventario.service';
import { useToast } from '../../../../hooks/toast.hook';
import {
  FormLabel,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@mui/material';
import { set } from 'date-fns';
import { a } from 'react-spring';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '90%',
  width: '1216px',
  maxHeight: '80%',
  overflowY: 'auto',
  padding: '32px',
  borderRadius: '16px',
  bgcolor: 'background.paper',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  gap: '32px',
};

export const ModalEditar = ({ isOpen, onClose, data, handleFetch }) => {
  const [rows, setRows] = useState([]);
  const [dataContada, setDataContada] = useState('');
  const [updatedData, setUpdatedData] = useState(data);
  const [loading, setLoading] = useState(false);
  const { email } = useUsuarioLocal();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setRows(data?.resultados || []);
      setDataContada(data?.resultados[0]?.dataContada?.split('T')[0] || '');
    }

    if (!isOpen) {
      setRows([]);
      setDataContada('');
    }
  }, [data, isOpen]);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (typeof handleFetch !== 'function') {
      console.error('handleFetch não é uma função');
      return;
    }

    const payload = rows.map((row) => ({
      id: row.id || 0,
      armazem: row.armazem || 0,
      qtdContada: row.qtdContada || 0,
      qtdComDivergencia: row.qtdComDivergencia || 0,
      dataContada: row.dataContada,
    }));

    try {
      const queryEmail = encodeURIComponent(email);

      const response = await patchEstoqueInventario(
        `?Email=${queryEmail}`,
        payload
      );
      setUpdatedData(response.data);
      addToast({
        title: 'Sucesso',
        message: 'Registro editado com sucesso',
        type: 'success',
        description: 'Atualizado com sucesso',
      });

      setLoading(false);
      onClose();
      handleFetch();
    } catch (err) {
      console.error('Erro ao enviar os dados:', err);
      addToast({
        title: 'Erro',
        message: err.response?.data?.message || 'Ocorreu um erro inesperado.',
        type: 'danger',
        description: 'Erro ao Atualizar',
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ color: '#A00' }}
            >
              Editar Registro
            </Typography>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Data Contada</FormLabel>
            <TextField
              type="date"
              value={dataContada}
              onChange={(e) => setDataContada(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '150px',
                '& .MuiInputBase-root': {
                  height: '40px',
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
            />
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ bgcolor: '#FBFBFB', border: '1px solid #CCC' }}>
                <TableRow>
                  <TableCell>Armazém</TableCell>
                  <TableCell align="left">Quantidade de Itens</TableCell>
                  <TableCell align="left">Itens com Divergência</TableCell>
                  <TableCell align="left">% Acuracidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      ARM {row.armazem}
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        type="number"
                        value={row.qtdContada}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'qtdContada',
                            parseInt(e.target.value, 10) || ''
                          )
                        }
                        sx={{
                          display: 'flex',
                          width: '140px',
                          '& .MuiInputBase-root': {
                            height: '32px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid rgba(0, 0, 0, 0.10)',
                            },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        type="number"
                        value={row.qtdComDivergencia}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'qtdComDivergencia',
                            parseInt(e.target.value, 10) || ''
                          )
                        }
                        sx={{
                          display: 'flex',
                          width: '140px',
                          '& .MuiInputBase-root': {
                            height: '32px',
                            borderRadius: '8px',
                            '&:focus-within': {
                              border: '1px solid rgba(0, 0, 0, 0.10)',
                            },
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '140px',
                          height: '32px',
                          borderRadius: '8px',
                          border: '1px solid rgba(0, 0, 0, 0.20)',
                          backgroundColor: '#fff',
                        }}
                      >
                        {parseFloat(
                          ((row.qtdContada - row.qtdComDivergencia) /
                            row.qtdContada) *
                            100
                        ).toFixed(2)}
                        %
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{
                fontFamily: 'Poppins, sans-serif',
                padding: '4px 16px',
                height: '32px',
                borderRadius: '8px',
                border: '1px solid #A00',
                color: '#A00',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                '&:hover': {
                  bgcolor: '#A00',
                  color: '#fff',
                  transform: 'scale(1.1)',
                },
              }}
              onClick={handleSubmit}
              variant="outlined"
              startIcon={loading ? null : <AddIcon />}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Atualizar'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
