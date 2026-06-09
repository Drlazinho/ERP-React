import React from 'react';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
import { useToast } from '../../../../../hooks/toast.hook';
import { CadastrarSubcontas } from '../../orcamentoSetor.service';

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

const ModalCadastrarSubcontas = ({ contas, ano }) => {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [tabelaDespesas, setTabelaDespesas] = useState([]);
  const [itemTabela, setItemTabela] = useState({});
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
    nome: '',
    idConta: '',
  });

  const queryClient = useQueryClient();

  const cadastrarSubcontasMutation = useMutation({
    mutationFn: CadastrarSubcontas,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['subcontas', formData.idConta, ano],
      });
      queryClient.invalidateQueries({
        queryKey: ['detalhes-conta'],
      });

      handleClear();
      handleClose();
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Subconta cadastrada com sucesso.',
      });
    },
    onError: (error) => {
      let errorMessage = 'Erro ao cadastrar subconta.';

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

  const handleClear = () => {
    setTabelaDespesas([]);
    setItemTabela({ codigo: '', descricao: '', idConta: '' });
  };

  const handleRegistarSubcontas = () => {
    const params = {
      idConta: Number(formData.idConta),
      ano: Number(ano),
      contaDetalhe: (tabelaDespesas || []).map((item) => ({
        ...item,
        codigo: item.codigo || '',
        descricao: item.descricao || '',
        concat: '',
      })),
    };
    cadastrarSubcontasMutation.mutate(params);
  };

  return (
    <div>
      <Button
        size="medium"
        onClick={handleOpen}
        className="cardRegistro"
        variant="contained"
        color="error"
        startIcon={<AddIcon />}
      >
        Cadastrar SubContas
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
              Cadastrar Subcontas
            </Typography>
            <IconButton
              onClick={() => {
                handleClose();
                handleClear();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '250px' }}
            >
              <FormLabel
                required
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Conta
              </FormLabel>
              <Select
                size="small"
                fullWidth
                value={formData.idConta || ''}
                onChange={(e) => {
                  const selectedConta = contas.find(
                    (conta) => conta.idConta === Number(e.target.value)
                  );

                  if (selectedConta) {
                    setFormData({
                      ...formData,
                      idConta: selectedConta.idConta,
                      nome: selectedConta.nome,
                      orcadoAnual: selectedConta.orcadoAnual,
                    });
                  }
                }}
                disabled={tabelaDespesas.length > 0}
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                }}
              >
                {Array.isArray(contas) &&
                  contas.map((conta) => (
                    <MenuItem key={conta.idConta} value={conta.idConta}>
                      {conta.codigo} - {conta.nome}
                    </MenuItem>
                  ))}
              </Select>
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
                Código
              </FormLabel>
              <TextField
                type="text"
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
                    pattern: '[0-9]{2}',
                  },
                }}
                value={itemTabela.codigo || ''}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value.replace(/\D/g, '').slice(0, 2);
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
                value={itemTabela.descricao || ''}
                onChange={(e) =>
                  setItemTabela({ ...itemTabela, descricao: e.target.value })
                }
              />
            </Box>
            <Button
              variant="outlined"
              color="error"
              onClick={adicionarTabela}
              startIcon={<AddIcon />}
              sx={{ height: '48px', marginTop: '20px' }}
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
                Conta: {formData.nome}
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
                  sx={{ maxHeight: 336, width: 700 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Ação</TableCell>

                    <TableCell />
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
                bgcolor: cadastrarSubcontasMutation.isPending ? '#CCC' : '#A00',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: !cadastrarSubcontasMutation.isPending
                    ? '#760000'
                    : '#CCC',
                  transform: !cadastrarSubcontasMutation.isPending
                    ? 'scale(1.1)'
                    : 'none',
                },
              }}
              className="cardRegistro"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={
                tabelaDespesas.length === 0 ||
                cadastrarSubcontasMutation.isPending
              }
              onClick={handleRegistarSubcontas}
            >
              {cadastrarSubcontasMutation.isPending
                ? 'Aguarde...'
                : 'Registrar Despesa'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCadastrarSubcontas;
