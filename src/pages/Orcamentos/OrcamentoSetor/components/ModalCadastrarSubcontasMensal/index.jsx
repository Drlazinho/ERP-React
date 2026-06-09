import React from 'react';
import { useState, useCallback, useEffect } from 'react';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useToast } from '../../../../../hooks/toast.hook';

import {
  CadastrarSubcontasMensal,
  BuscarSubcontas,
} from '../../orcamentoSetor.service';

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

const ModalcadastrarSubcontasMeses = ({ ano, contas, onUpdate }) => {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tabelaDespesas, setTabelaDespesas] = useState([]);
  const [itemTabela, setItemTabela] = useState({});
  const [subcontasSelect, setSubcontasSelect] = useState([]);
  const [formData, setFormData] = useState({
    mes: '',
    valor: '',
    idContaDetalhe: '',
    tipoValor: '1',
    nome: '',
    idConta: '',
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
    if (itemTabela.mes && itemTabela.valor) {
      const mesJaExiste = tabelaDespesas.some(
        (item) => item.mes === itemTabela.mes
      );

      if (mesJaExiste) {
        alert('Este mês já foi adicionado! Escolha um mês diferente.');
        return;
      }

      setTabelaDespesas((prev) => [
        ...prev,
        {
          mes: itemTabela.mes,
          valor: itemTabela.valor,
        },
      ]);

      setItemTabela({
        mes: '',
        valor: '',
      });
    }
  };

  const deletarItemDaTabela = (index) => {
    setTabelaDespesas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setTabelaDespesas([]);
    formData.tipoValor = '1';
    setItemTabela({
      mes: '',
      ano: ano,
      valor: '',
    });
    setFormData({
      mes: '',
      ano: ano,
      valor: '',
      idContaDetalhe: '',
      tipoValor: '1',
      nome: '',
      idConta: '',
    });
  };

  const handleRegistrar = useCallback(async () => {
    const parseCurrency = (value) => {
      return Number(
        value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
    };
    setIsSubmitting(true);

    try {
      const params = {
        idSubconta: Number(formData.idContaDetalhe || 0),
        tipoValor: Number(formData.tipoValor),

        orcamentosMensaisSubconta: (tabelaDespesas || []).map((item) => ({
          mes: Number(item.mes),
          ano: Number(ano),
          valorOrcado:
            formData.tipoValor === '1' ? parseCurrency(item.valor ?? '0') : 0,
          valorRealizado:
            formData.tipoValor === '2' ? parseCurrency(item.valor ?? '0') : 0,
        })),
      };

      await CadastrarSubcontasMensal(params);
      handleClose();
      handleClear();

      onUpdate();

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Orçamento cadastrado com sucesso!',
      });
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

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
    } finally {
      setIsSubmitting(false);
    }
  }, [formData.idContaDetalhe, formData.tipoValor, tabelaDespesas, onUpdate]);

  const handleBucarsubcontas = async () => {
    try {
      const response = await BuscarSubcontas(formData.idConta);
      setSubcontasSelect(response || []);
    } catch (error) {
      console.error('Erro ao buscar subcontas:', error);
    }
  };

  useEffect(() => {
    if (formData.idConta) {
      handleBucarsubcontas();
    }
  }, [formData.idConta]);

  const getLabelNome = (tipoValor) => {
    return tipoValor === '1' ? 'Valor Orçado' : 'Valor Realizado';
  };
  const contasFlat = contas.flat();
  const subcontasFlat = subcontasSelect.flat();

  return (
    <div>
      <Button
        size="medium"
        onClick={handleOpen}
        className="cardRegistro"
        variant="contained"
        color="success"
        startIcon={<AddIcon />}
      >
        Registrar Valor Subcontas
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
              Registrar Valor Subcontas
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
                Contas
              </FormLabel>
              <Select
                size="small"
                fullWidth
                value={formData.idConta || ''}
                onChange={(e) => {
                  const selectedConta = contasFlat.find(
                    (conta) => conta.idConta === Number(e.target.value)
                  );

                  if (selectedConta) {
                    setFormData({
                      ...formData,
                      idConta: selectedConta.idConta,
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
                {Array.isArray(contasFlat) &&
                  contasFlat.map((conta) => (
                    <MenuItem key={conta.idConta} value={conta.idConta}>
                      {conta.codigo} - {conta.nome}
                    </MenuItem>
                  ))}
              </Select>
            </Box>
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
                Subconta
              </FormLabel>
              <Select
                size="small"
                fullWidth
                value={formData.idContaDetalhe || ''}
                onChange={(e) => {
                  const selectedConta = subcontasFlat.find(
                    (conta) => conta.id === Number(e.target.value)
                  );

                  if (selectedConta) {
                    setFormData({
                      ...formData,
                      idContaDetalhe: selectedConta.id,
                      nome: selectedConta.nome,
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
                {subcontasFlat.length === 0 && (
                  <MenuItem value="" disabled>
                    Nenhuma subconta encontrada
                  </MenuItem>
                )}

                {Array.isArray(subcontasFlat) &&
                  subcontasFlat.map((conta) => (
                    <MenuItem key={conta.id} value={conta.id}>
                      {conta.nome}
                    </MenuItem>
                  ))}
              </Select>
            </Box>

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
                Mês
              </FormLabel>
              <Select
                size="small"
                fullWidth
                value={itemTabela.mes}
                onChange={(e) =>
                  setItemTabela({ ...itemTabela, mes: e.target.value })
                }
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                }}
              >
                {meses.map((mes) => (
                  <MenuItem key={mes.id} value={mes.id}>
                    {mes.nome}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              marginTop: '1.5rem',
            }}
          >
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
                Tipo de Valor
              </FormLabel>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.tipoValor === '1'}
                      onChange={() =>
                        setFormData({ ...formData, tipoValor: '1' })
                      }
                      disabled={tabelaDespesas.length > 0}
                    />
                  }
                  label="Orçado"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.tipoValor === '2'}
                      onChange={() =>
                        setFormData({ ...formData, tipoValor: '2' })
                      }
                      disabled={tabelaDespesas.length > 0}
                    />
                  }
                  label="Realizado"
                />
              </Box>
            </Box>

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
                {getLabelNome(formData.tipoValor)}
              </FormLabel>
              <TextField
                fullWidth
                valueIsNumericString
                value={itemTabela.valor}
                variant="outlined"
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
                onChange={(e) => {
                  let inputValue = e.target.value;

                  const numericValue = inputValue
                    .replace(/[^\d,]/g, '')
                    .replace(',', '');

                  const sizeSlice = numericValue.length - 2;
                  const formattedValue =
                    numericValue.length > 2
                      ? `R$ ${[
                          numericValue
                            .slice(0, sizeSlice)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                          numericValue.slice(sizeSlice),
                        ].join(',')}`
                      : `R$ ${numericValue}`;

                  setItemTabela({
                    ...itemTabela,
                    valor: formattedValue,
                  });
                }}
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
                Subconta: {formData.nome}
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
                  maxHeight: 188,
                  overflowY: 'auto',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 600, maxHeight: 336 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell align="center">Mês</TableCell>
                    <TableCell align="center">
                      {getLabelNome(formData.tipoValor)}
                    </TableCell>

                    <TableCell align="center">Ação</TableCell>
                  </TableHead>
                  <TableBody>
                    {tabelaDespesas.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{item.mes}</TableCell>
                        <TableCell align="center">{item.valor}</TableCell>

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
                bgcolor: isSubmitting ? '#CCC' : '#A00',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: !isSubmitting ? '#760000' : '#CCC',
                  transform: !isSubmitting ? 'scale(1.1)' : 'none',
                },
              }}
              className="cardRegistro"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={tabelaDespesas.length === 0 || isSubmitting}
              onClick={handleRegistrar}
            >
              {isSubmitting ? 'Aguarde...' : 'Registrar Despesa'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalcadastrarSubcontasMeses;
