import React, { useCallback, useState } from 'react';

import {
  Box,
  FormControl,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import AddchartIcon from '@mui/icons-material/Addchart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { setorSelect } from '../MockDados';
import { RegistrarCentroCusto } from '../../orcamentoSetores.service';
import { useToast } from '../../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '50%',
  maxHeight: '90%',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  overflowY: 'auto',
  borderRadius: '8px',
  flexDirection: 'row',
  padding: '24px',
};

const ModalCadastrarSetor = ({ idMeta, onUpdate }) => {
  const [open, setOpen] = React.useState(false);
  const [hasError, setHasError] = useState(false);
  const [tabelaDespesas, setTabelaDespesas] = useState([]);
  const [itemTabela, setItemTabela] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    codigo: '',
    descricao: '',
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

  const handleClear = () => setTabelaDespesas([]);

  const handleRegistrarMeta = useCallback(async () => {
    const parseCurrency = (value) =>
      Number(
        value.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );

    setIsSubmitting(true);
    try {
      const dados = {
        idMeta: idMeta,
        centroCusto: (tabelaDespesas || []).map((item) => ({
          ...item,
          codigo: item.codigo,
          descricao: item.descricao.toUpperCase(),
          concat: '',
        })),
      };

      await RegistrarCentroCusto(dados);
      setIsSubmitting(false);
      handleClose();
      handleClear();
      onUpdate();

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Meta cadastrada com sucesso',
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
  }, [idMeta, tabelaDespesas, onUpdate]);

  const deletarItemDaTabela = (index) => {
    setTabelaDespesas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Button
        size="medium"
        onClick={handleOpen}
        className="cardRegistro"
        variant="contained"
        color="success"
        startIcon={<AddchartIcon />}
      >
        Cadastrar Centro de Custo
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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              maxwidth: '1216px',
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{ fontWeight: 'bold', fontSize: '16px' }}
            >
              Cadastrar Centro de Custo
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
          <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '16px',
                    marginTop: '24px',
                  }}
                >
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Cód. Setor"
                    variant="outlined"
                    size="small"
                    value={itemTabela.codigo || ''}
                    sx={{
                      flex: 1,
                      backgroundColor: '#fff',
                      display: 'flex',
                      width: '100%',
                      '& .MuiOutlinedInput-root': {
                        height: '48px',
                        borderRadius: '8px',
                        '&:focus-within': {
                          border: '1px solid lightgray',
                        },
                      },
                    }}
                    onChange={(e) => {
                      const newValue = e.target.value.slice(0, 2);
                      setItemTabela({
                        ...itemTabela,
                        codigo: newValue,
                      });
                    }}
                  />

                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Setor</InputLabel>
                    <Select
                      id="demo-simple-select"
                      label="Setor"
                      variant="outlined"
                      size="small"
                      value={itemTabela.descricao || ''}
                      sx={{
                        flex: 1,
                        backgroundColor: '#fff',
                        display: 'flex',
                        width: '230px',
                        height: '48px',
                        borderRadius: '8px',
                        border: '1px solid lightgray',
                      }}
                      onChange={(e) => {
                        setItemTabela({
                          ...itemTabela,
                          descricao: e.target.value,
                        });
                      }}
                    >
                      <MenuItem value="" disabled>
                        Selecione
                      </MenuItem>
                      {setorSelect.map((item) => (
                        <MenuItem value={item.id}>{item.nome}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <Button
                    size="small"
                    className="cardRegistro"
                    variant="contained"
                    color="success"
                    onClick={adicionarTabela}
                    startIcon={<AddIcon />}
                  >
                    Adicionar
                  </Button>
                </Box>
              </Box>
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
                  Centro de custos
                </Typography>
              </Box>
              <Box
                sx={{
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <TableContainer
                  style={{
                    maxHeight: 300,
                    overflowY: 'auto',
                    width: '100%',
                  }}
                >
                  <Table
                    stickyHeader
                    sx={{ width: '100%', maxHeight: 336 }}
                    aria-label="simple table"
                  >
                    <TableHead>
                      <TableCell align="center">Cód. Setor</TableCell>
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
                onClick={handleRegistrarMeta}
                className="cardRegistro"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={tabelaDespesas.length === 0 || isSubmitting}
              >
                {isSubmitting ? 'Aguarde...' : 'Registrar Despesa'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCadastrarSetor;
