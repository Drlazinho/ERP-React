import React, { useState, useCallback, useMemo } from 'react';
import {
  IconButton,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  Box,
  Typography,
  Modal,
  TextField,
  FormLabel,
  Autocomplete,
  Button,
  TableBody,
  TableRow,
  Select,
  MenuItem,
  CircularProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteOutlineIcon,
} from '@mui/icons-material';

import {
  ConsultarPlanejamentoId,
  PutEditPlanejamento,
  DeleteId,
} from '@/pages/Setor_Producao/PlanejamentoProducao/services/planejamentoProducao.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  flexDirection: 'column',
  display: 'flex',
  top: '45%',
  left: '50%',
  maxWidth: '90%',
  maxHeight: '80%',
  overflowY: 'auto',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '16px',
  p: '40px',
};

export default function ModalEdit({
  subRowData,
  rowId,
  produtosLista,
  update,
}) {
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [novoItem, setNovoItem] = useState({
    horasDisponiveisDia: null,
    linhasDisponiveis: null,
    produtos: [],
    quantidade: '',
    prioridade: null,
  });

  const selectProdutosLista = useMemo(
    () =>
      produtosLista.map((item) => ({
        value: item.codigo,
        label: item.descricao,
      })),
    [produtosLista]
  );

  const handleNovoItemChange = useCallback((campo, valor) => {
    setNovoItem((prev) => ({ ...prev, [campo]: valor }));
  }, []);

  const handleFieldChange = useCallback((field, value) => {
    setData((prevData) => ({ ...prevData, [field]: value }));
  }, []);

  const handleOpen = useCallback(async () => {
    setOpen(true);
    if (!subRowData[rowId]) {
      setIsLoading(true);
      try {
        const fetchedData = await ConsultarPlanejamentoId(rowId);
        setData(fetchedData);
      } catch (error) {
        addToast({
          type: 'danger',
          title: 'Erro ao carregar',
          description: '',
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setData(subRowData[rowId]);
    }
  }, [rowId, subRowData]);

  const adicionarNovoItem = useCallback(() => {
    const novoDetalhe = {
      id: 0,
      nome: novoItem.produtos?.label || '',
      codigo: novoItem.produtos?.value || '',
      qtdRealizada: novoItem.quantidade,
      prioridade: novoItem.prioridade || '1',
    };

    setData((prevData) => ({
      ...prevData,
      detalhes: [...(prevData.detalhes || []), novoDetalhe],
    }));

    setNovoItem({ produto: null, quantidade: '', prioridade: '1' });

    addToast({
      type: 'success',
      title: 'Produto adicionado com sucesso.',
      description: '',
    });
  }, [novoItem]);

  const handleUpdateDetalhe = useCallback((index, field, value) => {
    setData((prevData) => {
      const detalhesAtualizados = [...(prevData.detalhes || [])];
      detalhesAtualizados[index][field] = value;
      return { ...prevData, detalhes: detalhesAtualizados };
    });
  }, []);

  const handleClose = () => setOpen(false);

  const handleSubmit = useCallback(async () => {
    const { email } = useUsuarioLocal();
    const body = {
      idPlanejamento: rowId,
      horasDisponiveisDia: data.horasDisponiveisDia,
      diasDisponiveis: data.diasDisponiveis,
      linhasDisponiveis: data.linhasDisponiveis,
      produtos: data.detalhes?.map((item) => ({
        id: item.id,
        id_plan: item.idPlanejamento,
        op: item.op || 0,
        codigo: item.codigo,
        qtdPlanejada: item.qtdPlanejada,
        qtdRealizada: item.qtdRealizada,
        prioridade: item.prioridade,
        pendencia: item.pendencia,
        observacaoProduto: item.observacaoProduto,
        qtdColaboradores: item.qtdColaboradores,
      })),
      observacao: data.observacao,
      idUserAtualizacao: data.idUserAtualizacao || 0,
      emailUsuario: email,
    };

    setIsLoading(true);
    try {
      await PutEditPlanejamento(body).then((res) => {});
      update();
      addToast({
        type: 'success',
        title: 'Planejamento atualizado.',
        description: 'Planejamento atualizado com sucesso.',
      });
      handleClose();
    } catch (error) {
      console.error('Erro ao enviar os dados', error);
    } finally {
      setIsLoading(false);
    }
  }, [data, update]);

  const deletarItemDaTabela = useCallback(async (itemId, e) => {
    e.preventDefault();

    if (itemId === 0) {
      setData((prevData) => ({
        ...prevData,
        detalhes: prevData?.detalhes?.filter(
          (detalhe) => detalhe.id !== itemId
        ),
      }));
      addToast({
        type: 'success',
        title: 'Produto removido com sucesso.',
        description: '',
      });
      return;
    }

    try {
      await DeleteId(itemId);
      setData((prevData) => ({
        ...prevData,
        detalhes: prevData?.detalhes?.filter(
          (detalhe) => detalhe.id !== itemId
        ),
      }));
      addToast({
        type: 'success',
        title: 'Produto removido com sucesso.',
        description: '',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Erro ao deletar produto.',
      });
    }
  }, []);

  const handleClear = useCallback(() => {
    setData({
      idPlanejamento: 0,
      horasDisponiveisDia: 0,
      diasDisponiveis: 0,
      linhasDisponiveis: 0,
      detalhes: [],
      observacao: '',
      idUserAtualizacao: 0,
    });
    setNovoItem({
      produtos: [],
      quantidade: '',
      prioridade: '1',
    });
  }, []);

  const handleLimparClick = useCallback(() => {
    handleClear();
  }, [handleClear]);

  const prioridadeSelect = [
    { value: '1', label: 'Alta' },
    { value: '2', label: 'Média' },
    { value: '3', label: 'Baixa' },
  ];

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <EditIcon />
      </IconButton>
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
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontFamily: 'Poppins', fontWeight: '600' }}
            >
              Editar produtos
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              mb: '24px',
              gap: '22px',
            }}
          >
            <Box>
              <FormLabel>Horas Disponiveis/Dia</FormLabel>
              <TextField
                required
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={data.horasDisponiveisDia || ''}
                sx={{
                  height: '48px',
                  display: 'flex',
                  width: '130px',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid var(--Neutra-N50, #CCC)',
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
                      ? `${[
                          numericValue
                            .slice(0, sizeSlice)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                          numericValue.slice(sizeSlice),
                        ].join(',')}`
                      : `${numericValue}`;

                  setData({
                    ...data,
                    horasDisponiveisDia: formattedValue,
                  });
                }}
              />
            </Box>
            <Box>
              <FormLabel>Linhas Disponiveis</FormLabel>
              <TextField
                value={data.linhasDisponiveis || ''}
                onChange={(e) =>
                  handleFieldChange('linhasDisponiveis', e.target.value)
                }
                sx={{
                  height: '48px',
                  display: 'flex',
                  width: '130px',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid var(--Neutra-N50, #CCC)',
                    },
                  },
                }}
              />
            </Box>
            <Box>
              <FormLabel>Dias Disponiveis</FormLabel>
              <TextField
                value={data.diasDisponiveis || ''}
                onChange={(e) =>
                  handleFieldChange('diasDisponiveis', e.target.value)
                }
                sx={{
                  height: '48px',
                  display: 'flex',
                  width: '130px',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid var(--Neutra-N50, #CCC)',
                    },
                  },
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'end',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Box sx={{ width: '800px' }}>
              <FormLabel>Produto</FormLabel>
              <Autocomplete
                id="produto-autocomplete"
                options={selectProdutosLista}
                getOptionLabel={(option) => option.label || ''}
                value={novoItem.produtos}
                onChange={(_, novoProduto) =>
                  handleNovoItemChange('produtos', novoProduto)
                }
                sx={{
                  height: '48px',
                  display: 'flex',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid var(--Neutra-N50, #CCC)',
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </Box>
            <Box sx={{ width: 'auto' }}>
              <FormLabel>Quantidade</FormLabel>
              <TextField
                value={novoItem.quantidade}
                onChange={(e) =>
                  handleNovoItemChange('quantidade', e.target.value)
                }
                sx={{
                  height: '48px',
                  display: 'flex',
                  width: '130px',
                  borderRadius: '8px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid var(--Neutra-N50, #CCC)',
                    },
                  },
                }}
              />
            </Box>
            <Button
              variant="outlined"
              onClick={adicionarNovoItem}
              sx={{
                display: 'flex',
                height: '52px',
                padding: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#A00',
                borderColor: 'red',
                gap: '8px',
                textTransform: 'capitalize',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: '#760000',
                  color: '#fff',
                  borderColor: '#fff',
                  transform: 'scale(1.1)',
                  transition:
                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                },
              }}
              startIcon={<AddIcon />}
            >
              Adicionar
            </Button>
          </Box>
          <Box>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                display: 'flex',
                mb: '24px',
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
                  sx={{ minWidth: 1146, maxHeight: 336 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell>Nº OP</TableCell>
                    <TableCell>Código</TableCell>
                    <TableCell>Produto</TableCell>
                    <TableCell>Quant. Planejada</TableCell>
                    <TableCell>Quant. Realizada</TableCell>
                    <TableCell>Prioridade</TableCell>
                    <TableCell>Pendência</TableCell>
                    <TableCell>Observação</TableCell>
                    <TableCell>Quantidade Operadores</TableCell>
                    <TableCell />
                  </TableHead>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          <CircularProgress sx={{ color: '#A00' }} />
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.detalhes?.map((detalhe, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              value={detalhe.op}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(index, 'op', e.target.value)
                              }
                              sx={{
                                width: 100,
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>{detalhe.codigo}</TableCell>
                          <TableCell>{detalhe.nome}</TableCell>
                          <TableCell>
                            <TextField
                              value={detalhe.qtdPlanejada}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'qtdPlanejada',
                                  e.target.value
                                )
                              }
                              sx={{
                                width: 100,
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={detalhe.qtdRealizada}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'qtdRealizada',
                                  e.target.value
                                )
                              }
                              sx={{
                                width: 100,
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Select
                              sx={{
                                width: 100,
                                height: '40px',
                                '& .MuiSelect-select': {
                                  display: 'flex',
                                  alignItems: 'center',
                                  height: '40px',
                                },
                                '& .MuiOutlinedInput-input': {
                                  padding: 1,
                                  height: '40px',
                                },
                              }}
                              value={detalhe.prioridade}
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'prioridade',
                                  e.target.value
                                )
                              }
                            >
                              {prioridadeSelect.map((item) => (
                                <MenuItem
                                  key={item.value}
                                  value={item.value}
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  {item.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={detalhe.pendencia}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'pendencia',
                                  e.target.value
                                )
                              }
                              sx={{
                                width: 100,
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={detalhe.observacaoProduto}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'observacaoProduto',
                                  e.target.value
                                )
                              }
                              sx={{
                                width: 200,
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              value={detalhe.qtdColaboradores || ''}
                              variant="outlined"
                              onChange={(e) =>
                                handleUpdateDetalhe(
                                  index,
                                  'qtdColaboradores',
                                  e.target.value
                                )
                              }
                              sx={{
                                width: 'auto',
                                '& .MuiInputBase-root': {
                                  height: 40,
                                },
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ borderBottom: 'none' }}>
                            <Button
                              variant="outlined"
                              onClick={(e) =>
                                deletarItemDaTabela(detalhe.id, e)
                              }
                              sx={{
                                display: 'flex',
                                height: '48px',
                                padding: '16px',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '8px',
                                borderRadius: '8px',
                                border: '2px solid #A00',
                                transition:
                                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                                '&:hover': {
                                  bgcolor: '#760000',
                                  color: '#fff',
                                  borderColor: '#fff',
                                  transform: 'scale(1.1)',
                                  transition:
                                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                                },
                              }}
                            >
                              <RemoveIcon
                                sx={{
                                  color: '#A00',
                                  '&:hover': {
                                    color: '#fff',
                                    transform: 'scale(1.1)',
                                    transition:
                                      'background-color 0.5s ease, transform 0.3s ease-in-out',
                                  },
                                }}
                              />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <FormLabel>Observação</FormLabel>
            <TextField
              placeholder="Observação"
              value={data.observacao}
              onChange={(e) =>
                setData({
                  ...data,
                  observacao: e.target.value,
                })
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: '24px',
              gap: '16px',
            }}
          >
            <Button
              variant="outlined"
              sx={{
                display: 'flex',
                padding: '6px 8px',
                justifyContent: 'center',
                borderRadius: '4px',
                border: '1px solid #CCC',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                color: '#999',
                textTransform: 'capitalize',
              }}
              startIcon={<DeleteOutlineIcon />}
              onClick={handleLimparClick}
            >
              Limpar
            </Button>

            <Button
              variant="contained"
              sx={{
                textTransform: 'capitalize',
                background: 'linear-gradient(180deg, #A00 0%, #D60000 100%)',
                borderRadius: '4px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  bgcolor: '#760000',
                  color: '#FFF',
                  borderColor: '#fff',
                  transform: 'scale(1.1)',
                  transition:
                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                },
              }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : 'Continuar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
