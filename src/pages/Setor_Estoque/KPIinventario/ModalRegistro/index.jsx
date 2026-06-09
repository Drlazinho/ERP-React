import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
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
} from '@mui/material';
import { useState } from 'react';
import { PostInventario } from '../KPIinventario.service';
import { useToast } from '../../../../hooks/toast.hook';
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';

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

const initialRows = [
  { armazem: 'ARM 30', quantidadeItens: 0, itensDivergencia: 0 },
  { armazem: 'ARM 40', quantidadeItens: 0, itensDivergencia: 0 },
  { armazem: 'ARM 50', quantidadeItens: 0, itensDivergencia: 0 },
  { armazem: 'ARM 51', quantidadeItens: 0, itensDivergencia: 0 },
  { armazem: 'ARM 52', quantidadeItens: 0, itensDivergencia: 0 },
];

export default function ModalRegistro({ handleFetch }) {
  const [open, setOpen] = useState(false);
  const { email } = useUsuarioLocal();
  const { addToast } = useToast();
  const [rows, setRows] = useState(initialRows);
  const [dataContada, setDataContada] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
  };

  const handleSubmit = async () => {
    if (!dataContada) {
      addToast({
        type: 'warning',
        title: 'Aviso',
        description: 'Por favor, insira uma data válida.',
      });
      return;
    }

    try {
      const updateInventario = rows.map((row) => ({
        armazem: Number(row.armazem.replace('ARM ', '')),
        qtdContada: Number(row.quantidadeItens),
        qtdComDivergencia: Number(row.itensDivergencia),
        dataContada: new Date(dataContada).toISOString(),
      }));

      await PostInventario(email, updateInventario);
      setRows(initialRows);
      setDataContada('');
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Inventário cadastrado com sucesso!',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Houve um problema ao cadastrar o Inventário.',
      });
    } finally {
      handleClose();
      handleFetch();
    }
  };

  return (
    <div>
      <Button
        sx={{
          fontFamily: 'Poppins, sans-serif',
          padding: '4px 16px',
          height: '32px',
          borderRadius: '8px',
          border: '1px solid #A00',
          bgcolor: '#ffff',
          color: '#A00',
          transition: 'background-color 0.5s ease, transform 0.3s ease-in-out',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
          '&:hover': {
            bgcolor: '#A00',
            color: '#fff',
            transform: 'scale(1.1)',
          },
        }}
        onClick={handleOpen}
        variant="outlined"
        startIcon={<AddIcon />}
      >
        Registrar
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
              Registro
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Data</FormLabel>
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
                  <TableCell align="left">% Acuridade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={row.armazem}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.armazem}
                    </TableCell>
                    <TableCell align="left">
                      <TextField
                        type="number"
                        value={row.quantidadeItens}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'quantidadeItens',
                            e.target.value
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
                        value={row.itensDivergencia}
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            'itensDivergencia',
                            e.target.value
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
                        value={parseFloat(
                          ((row.quantidadeItens - row.itensDivergencia) /
                            row.quantidadeItens) *
                            100
                        ).toFixed(2)}
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
              startIcon={<AddIcon />}
            >
              Registrar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
