import * as React from 'react';
import { useState, useCallback } from 'react';
import AddIcon from '@mui/icons-material/Add';
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
} from '@mui/material';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  adicionarMovimentacaoNovo,
  gerarNumeroMei,
} from '../../../../../services/movimentacaoCorrente.service';
import { useToast } from '../../../../../hooks/toast.hook';

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

const programacaoSelect = [
  { label: 'Programação Avaria', value: 'Programação Avaria' },
  { label: 'Programação de Devolução', value: 'Programação de Devolução' },
  { label: 'Transferência', value: 'Transferência' },
  {
    label: 'Liberação de retrabalho da Produção',
    value: 'Liberação de retrabalho da Produção',
  },
  { label: 'OP', value: 'OP' },
  { label: 'Entrada Manual ', value: 'Entrada Manual ' },
  { label: 'Saída Manual', value: 'Saída Manual' },
  { label: 'Transformação', value: 'Transformação' },
];

const selectMov = [
  { label: 'ENTRADA', value: 'ENTRADA' },
  { label: 'SAIDA', value: 'SAIDA' },
  { label: 'TRANSFERENCIA', value: 'TRANSFERENCIA' },
];

const interfacePostMei = {
  tipo: '',
  idUsuario: 0,
  motivo: '',
  observacao: '',
  dataMovimentação: '',
  movimentacaoCorrenteProdutos: [],
};

export default function ModalMei({
  // data,
  dataKit,
  dataArmazem,
  handleFetchMovimentação,
}) {
  const { id } = useUsuarioLocal();
  const [tabelaProdutos, setTabelaProdutos] = useState([]);
  const [sendMei, setSendMei] = useState(interfacePostMei);
  const [itemTabela, setItemTabela] = useState({});
  const [numeroMei, setNumeroMei] = useState('');
  const [open, setOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToast } = useToast();

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setSendMei({ ...sendMei, [name]: value, idUsuario: id });
  };

  const getNumero = () => {
    gerarNumeroMei().then((res) => {
      setNumeroMei(res);
    });
  };

  const handleOpen = () => {
    setOpen(true);
    getNumero();
  };
  const handleClose = () => setOpen(false);

  const handleSelectedValue = (event, value) => {
    if (value) {
      const [codigo, nome] = value.split(' - ');
      setItemTabela((prev) => ({ ...prev, codigo, nome }));
    }
  };

  const handleSelectedValueArmazemOri = (event, value) => {
    if (value) {
      setItemTabela((prev) => ({ ...prev, armazOrigem: value }));
    }
  };

  const handleSelectedValueArmazemDes = (event, value) => {
    if (value) {
      setItemTabela((prev) => ({ ...prev, armazDestino: value }));
    }
  };

  const adicionarItensNaTabela = () => {
    if (
      itemTabela.codigo &&
      itemTabela.quantidade > 0 &&
      itemTabela.armazOrigem &&
      itemTabela.armazDestino
    ) {
      setTabelaProdutos((prev) => [
        ...prev,
        {
          codigo: itemTabela.codigo,
          produto: itemTabela.nome,
          quantidade: itemTabela.quantidade,
          armazOrigem: itemTabela.armazOrigem?.local,
          armazDestino: itemTabela.armazDestino?.local,
        },
      ]);

      setItemTabela({
        codigo: '',
        nome: '',
        quantidade: 0,
        armazOrigem: null,
        armazDestino: null,
      });
    }
  };

  const deletarItemDaTabela = (item, e) => {
    e.preventDefault();
    const novaListaDeProdutos = tabelaProdutos.filter(
      (produto) => produto.codigo !== item.codigo
    );
    setTabelaProdutos(novaListaDeProdutos);
  };

  const handleSubmit = useCallback(async () => {
    if (
      !sendMei.tipo ||
      !sendMei.motivo ||
      tabelaProdutos.length === 0 ||
      isSubmitting
    ) {
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedMei = {
        ...sendMei,
        movimentacaoCorrenteProdutos: tabelaProdutos.map((produto) => ({
          codProduto: produto.codigo,
          quantidade: produto.quantidade,
          armazOrigem: produto.armazOrigem,
          armazDestino: produto.armazDestino,
        })),
      };

      await adicionarMovimentacaoNovo(updatedMei);
      setSendMei(interfacePostMei);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'MEI cadastrado',
      });
      setTabelaProdutos([]);
      handleClose();
      handleFetchMovimentação();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: error.response.data.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    sendMei,
    tabelaProdutos,
    isSubmitting,
    adicionarMovimentacaoNovo,
    addToast,
    setSendMei,
    handleClose,
    handleFetchMovimentação,
  ]);

  return (
    <div>
      <Button
        sx={{
          bgcolor: '#A00',
          fontFamily: 'Poppins, sans-serif',
          transition: 'background-color 0.5s ease, transform 0.3s ease-in-out',
          '&:hover': {
            bgcolor: '#760000',
            transform: 'scale(1.1)',
            fontFamily: 'Poppins, sans-serif',
            transition:
              'background-color 0.5s ease, transform 0.3s ease-in-out',
          },
        }}
        onClick={handleOpen}
        className="cardRegistro"
        variant="contained"
        startIcon={<AddIcon />}
      >
        Registrar MEI
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
              height: '40px',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Registrar MEI
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '8px',
              m: '24px 0px 24px 0px',
            }}
          >
            Nº MEI
            <Box sx={{ color: 'red' }}>{numeroMei}</Box>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              gap: '32px',
              mb: '24px',
              [theme.breakpoints.down(650)]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Box
              sx={{
                width: '168px',
              }}
            >
              <FormLabel>Data</FormLabel>
              <TextField
                type="date"
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  width: '168px',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                name="dataMovimentação"
                onChange={inputTextHandler}
              />
            </Box>

            <Box
              sx={{
                width: '300px',
              }}
            >
              <FormLabel>Motivo</FormLabel>
              <TextField
                select
                fullWidth
                sx={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  maxWidth: '100%',
                  '& .MuiInputBase-root': {
                    height: '48px',
                    borderRadius: '8px',
                    '&:focus-within': {
                      border: '1px solid lightgray',
                    },
                  },
                }}
                inputProps={{ style: { height: '48px' } }}
                name="motivo"
                onChange={inputTextHandler}
              >
                {programacaoSelect.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box
              sx={{
                width: '200px',
              }}
            >
              <FormLabel>Tipo</FormLabel>
              <TextField
                select
                fullWidth
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                name="tipo"
                onChange={inputTextHandler}
              >
                {selectMov.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'end',
              width: '100%',
              gap: '32px',
              mb: '24px',
              [theme.breakpoints.down(1200)]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Box sx={{ width: '350px' }}>
              <FormLabel>Código</FormLabel>
              <Autocomplete
                value={
                  itemTabela.codigo
                    ? `${itemTabela.codigo} - ${itemTabela.nome}`
                    : ''
                }
                freeSolo
                options={
                  Array.isArray(dataKit)
                    ? dataKit.map((item) => `${item.codigo} - ${item.nome}`)
                    : []
                }
                onChange={handleSelectedValue}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
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
                    inputProps={{
                      ...params.inputProps,
                      style: { height: '48px', width: '100%' },
                    }}
                  />
                )}
              />
            </Box>
            <Box sx={{ width: '250px' }}>
              <FormLabel>Armazem de Origem</FormLabel>
              <Autocomplete
                freeSolo
                value={itemTabela.armazOrigem || { localiz: '', local: '' }}
                options={
                  Array.isArray(dataArmazem.armazens)
                    ? dataArmazem.armazens
                    : []
                }
                getOptionLabel={(option) =>
                  `${option.local} - ${option.localiz}`
                }
                onChange={handleSelectedValueArmazemOri}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
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
                    inputProps={{
                      ...params.inputProps,
                      style: { height: '48px', width: '100%' },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ width: '250px' }}>
              <FormLabel>Armazem de Destino</FormLabel>
              <Autocomplete
                freeSolo
                value={itemTabela.armazDestino || { localiz: '', local: '' }}
                options={
                  Array.isArray(dataArmazem.armazens)
                    ? dataArmazem.armazens
                    : []
                }
                getOptionLabel={(option) =>
                  `${option.local} - ${option.localiz}`
                }
                onChange={handleSelectedValueArmazemDes}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
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
                    inputProps={{
                      ...params.inputProps,
                      style: { height: '48px', width: '100%' },
                    }}
                  />
                )}
              />
            </Box>

            <Box sx={{ width: '166px' }}>
              <FormLabel>Quantidade</FormLabel>
              <TextField
                type="number"
                fullWidth
                value={itemTabela.quantidade || ''}
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
                inputProps={{
                  style: { height: '48px', width: '100%' },
                }}
                onChange={(e) =>
                  setItemTabela((prev) => ({
                    ...prev,
                    quantidade: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </Box>
            <Button
              variant="outlined"
              onClick={adicionarItensNaTabela}
              sx={{
                display: 'flex',
                height: '48px',
                padding: '16px',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#A00',
                borderColor: 'red',
                gap: '8px',
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
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Typography>Lista de produtos</Typography>
              <Typography>Quantidade total: {tabelaProdutos.length}</Typography>
            </Box>
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                display: 'flex',
                width: '100%',
                overflow: 'hidden',
              }}
            >
              <TableContainer
                style={{
                  maxHeight: 188,
                  overflowY: 'auto',
                }}
              >
                <Table sx={{ width: '100%' }}>
                  <TableHead>
                    <TableCell>Código</TableCell>
                    <TableCell>Armazem de Origem</TableCell>
                    <TableCell>Armazem de Destino</TableCell>
                    <TableCell align="center">Quantidade</TableCell>
                    <TableCell />
                  </TableHead>
                  <TableBody>
                    {tabelaProdutos.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          {item.codigo}
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          {item.armazOrigem}
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          {item.armazDestino}
                        </TableCell>
                        <TableCell align="center" sx={{ borderBottom: 'none' }}>
                          {item.quantidade}
                        </TableCell>
                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Button
                            variant="outlined"
                            onClick={(e) => deletarItemDaTabela(item, e)}
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box sx={{ mb: '24px' }}>
            <FormLabel>Observação</FormLabel>
            <TextField
              fullWidth
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                '& .MuiInputBase-root': {
                  borderRadius: '8px',
                  '&:focus-within': {
                    border: '1px solid lightgray',
                  },
                },
              }}
              inputProps={{
                style: { width: '100%' },
              }}
              name="observacao"
              onChange={inputTextHandler}
            />
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
              onClick={handleSubmit}
              className="cardRegistro"
              variant="contained"
              startIcon={<AddIcon />}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Aguarde...' : 'Registrar MEI'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
