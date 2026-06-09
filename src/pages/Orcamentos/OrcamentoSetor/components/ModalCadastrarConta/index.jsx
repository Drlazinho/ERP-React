import React from 'react';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  IconButton,
  MenuItem,
  TextField,
  FormLabel,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Typography,
  Button,
  Box,
  Autocomplete,
  Select,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useToast } from '../../../../../hooks/toast.hook';

import { RegistarContas } from '../../orcamentoSetor.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const meses = [
  { id: 1, nome: 'Janeiro' },
  { id: 2, nome: 'Fevereiro' },
  { id: 3, nome: 'Março' },
  { id: 4, nome: 'Abril' },
  { id: 5, nome: 'Maio' },
  { id: 6, nome: 'Junho' },
  { id: 7, nome: 'Julho' },
  { id: 8, nome: 'Agosto' },
  { id: 9, nome: 'Setembro' },
  { id: 10, nome: 'Outubro' },
  { id: 11, nome: 'Novembro' },
  { id: 12, nome: 'Dezembro' },
];

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '45%',
  left: '50%',
  maxWidth: '60%',
  maxHeight: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: '40px',
};

const ModalcadastrarConta = ({ idCentroCusto, ano }) => {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [tabelaDespesas, setTabelaDespesas] = useState([]);
  const [itemTabela, setItemTabela] = useState({});

  const queryClient = useQueryClient();

  const registerAccountsMutation = useMutation({
    mutationFn: RegistarContas,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orcamentos-setor', idCentroCusto, ano],
      });
      queryClient.invalidateQueries({
        queryKey: ['orcamentos-setor', idCentroCusto],
      });
      handleClear();
      handleClose();
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Conta cadastrada com sucesso!',
      });
    },
    onError: (error) => {
      let errorMessage = 'Erro ao cadastrar conta.';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    },
  });

  const handleOpen = () => {
    setOpen(true);
    setHasError(false);
  };
  const handleClose = () => {
    setOpen(false);
    setHasError(false);
  };

  const handleModalClickOutside = () => {
    setHasError(true);
  };

  const adicionarTabela = () => {
    if (itemTabela.codigo && itemTabela.descricao) {
      const itemJaExiste = tabelaDespesas.some(
        (item) =>
          item.codigo === itemTabela.codigo ||
          item.descricao === itemTabela.descricao
      );

      if (itemJaExiste) {
        alert(
          'Este código ou descrição já foi adicionado! Escolha valores diferentes.'
        );
        return;
      }

      setTabelaDespesas((prev) => [
        ...prev,
        {
          codigo: itemTabela.codigo,
          descricao: itemTabela.descricao,
        },
      ]);

      setItemTabela({
        codigo: '',
        descricao: '',
      });
    }
  };

  const deletarItemDaTabela = (index) => {
    setTabelaDespesas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => setTabelaDespesas([]);

  const handleRegistrar = () => {
    const params = {
      idCentroCusto: Number(idCentroCusto),
      ano: ano,
      contas: (tabelaDespesas || []).map((item) => ({
        ...item,
        codigo: item.codigo || '',
        descricao: item.descricao || '',
      })),
    };
    registerAccountsMutation.mutate(params);
  };

  return (
    <div>
      <Button
        size="medium"
        onClick={handleOpen}
        className="cardRegistro"
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
      >
        Cadastrar Conta
      </Button>

      <Modal open={open} onClose={handleModalClickOutside}>
        <Box
          sx={{
            ...style,
            border: hasError ? '2px solid red' : 'none',
            transition: hasError ? 'border-color 0.3s ease-in-out' : 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '40px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{
                fontWeight: 'bold',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '20px',
                color: '#333',
              }}
            >
              Cadastrar Conta
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel
                required
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Código
              </FormLabel>
              <TextField
                type="number"
                id="filled-basic"
                required
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '100%',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                slotProps={{
                  input: {
                    inputMode: 'numeric',
                    pattern: '[0-9]{4}',
                  },
                }}
                value={itemTabela.codigo}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, '').slice(0, 4);
                  setItemTabela({ ...itemTabela, codigo: value });
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormLabel
                required
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Descrição
              </FormLabel>
              <TextField
                id="filled-basic"
                required
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '100%',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                value={itemTabela.descricao}
                onChange={(e) =>
                  setItemTabela({ ...itemTabela, descricao: e.target.value })
                }
              />
            </Box>
            <Button
              type="submit"
              size="small"
              variant="outlined"
              color="error"
              onClick={adicionarTabela}
              startIcon={<AddIcon />}
              sx={{ height: '48px', mt: '20px' }}
            >
              Adicionar
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              alignItems: 'flex-start',
              gap: '24px',
              borderRadius: '16px',
              border: '1px solid #ccc',
              mb: '24px',
              mt: '24px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography sx={{ fontWeight: 'bold', color: '#333' }}>
                Contas
              </Typography>
            </Box>

            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                display: 'flex',
              }}
            >
              <TableContainer
                style={{
                  maxHeight: 300,
                  overflowY: 'auto',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ maxHeight: 336, width: 600 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Ação</TableCell>
                  </TableHead>
                  <TableBody>
                    {tabelaDespesas.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{item.codigo}</TableCell>
                        <TableCell align="center">{item.descricao}</TableCell>

                        <TableCell align="center">
                          <IconButton>
                            <DeleteOutlineIcon
                              onClick={(e) => deletarItemDaTabela(index, e)}
                              color="error"
                            />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              sx={{
                bgcolor: registerAccountsMutation.isPending ? '#CCC' : '#A00',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: !registerAccountsMutation.isPending
                    ? '#760000'
                    : '#CCC',
                  transform: !registerAccountsMutation.isPending
                    ? 'scale(1.1)'
                    : 'none',
                },
              }}
              className="cardRegistro"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={
                tabelaDespesas.length === 0 ||
                registerAccountsMutation.isPending
              }
              onClick={handleRegistrar}
            >
              {registerAccountsMutation.isPending
                ? 'Aguarde...'
                : 'Registrar Despesa'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalcadastrarConta;
