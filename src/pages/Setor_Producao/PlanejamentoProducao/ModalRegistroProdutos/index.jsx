import React from 'react';
import { useState, useEffect } from 'react';
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
  Autocomplete,
  InputLabel,
  Chip,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import moment from 'moment/moment';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  maxWidth: '100%',
  maxHeight: '90%',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  overflowY: 'auto',
  borderRadius: '8px',
  flexDirection: 'row',
  padding: '24px',
};

const inputStyles = {
  width: '100%',
  borderRadius: '4px',
  marginBottom: '14px',
  background: '#FFF',
  '& .MuiInputBase-root': {
    height: '32px',
    borderRadius: '4px',
  },
};

export const ModalRegistroProdutos = ({
  produtosLista,
  open,
  onClose,
  handleSubmit,
}) => {
  const [selectValue, setSelectValue] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { email } = useUsuarioLocal();
  const [produtoAtual, setProdutoAtual] = useState({
    codigo: '',
    quantidade: '',
    op: '',
    observacao: '',
    pendencia: '',
    prioridade: '',
    qtdColaboradores: '',
    semanaAno: '',
    periodoInicio: '',
    periodoFim: '',
    horasDisponiveisDia: '',
    linhasDisponiveis: '',
    diasDisponiveis: '',
    observacao2: '',
  });
  const [errors, setErrors] = useState({});

  const prioridadeSelect = [
    { value: '1', label: 'Alta' },
    { value: '2', label: 'Média' },
    { value: '3', label: 'Baixa' },
  ];

  const selectProdutosLista = produtosLista.map((item) => ({
    value: item.codigo,
    label: item.descricao,
    codigo: item.codigo,
  }));

  const handleGetDiasDaSemana = (value) => {
    const [ano, semana] = value.split('-W');
    const comecoSemana = moment().year(ano).week(semana).startOf('isoWeek');
    const fimSemana = moment().year(ano).week(semana).endOf('isoWeek');

    const inicioSemanaFormatada = comecoSemana.format('YYYY-MM-DD');
    const fimSemanaFormatada = fimSemana.format('YYYY-MM-DD');

    setProdutoAtual((prevData) => ({
      ...prevData,
      semanaAno: value,
      periodoInicio: inicioSemanaFormatada,
      periodoFim: fimSemanaFormatada,
    }));
  };

  useEffect(() => {
    if (produtoAtual.semanaAno) {
      const [ano, semana] = produtoAtual.semanaAno.split('-W');
      const comecoSemana = moment().year(ano).week(semana).startOf('isoWeek');
      const fimSemana = moment().year(ano).week(semana).endOf('isoWeek');

      setProdutoAtual((prevData) => ({
        ...prevData,
        periodoInicio: comecoSemana.format('YYYY-MM-DD'),
        periodoFim: fimSemana.format('YYYY-MM-DD'),
      }));
    }
  }, [produtoAtual.semanaAno]);

  const handleInputChange = (e, fieldName) => {
    setProdutoAtual({ ...produtoAtual, [fieldName]: e.target.value });
    if (e.target.value) {
      setErrors((prevErrors) => {
        const { [fieldName]: _, ...restErrors } = prevErrors;
        return restErrors;
      });
    }
  };

  const handleAddProduto = () => {
    const validationErrors = {};

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newProduto = {
      ...produtoAtual,
      produto: selectValue ? selectValue.label : 'Não informado',
    };

    setProdutos((prevProdutos) => {
      const updatedProdutos = [...prevProdutos, newProduto];

      updatedProdutos.sort((a, b) => a.prioridade - b.prioridade);
      return updatedProdutos;
    });

    setProdutoAtual((prev) => ({
      ...prev,
      op: '',
      prioridade: '',
      codigo: '',
      quantidade: '',
      qtdColaboradores: '',
      pendencia: '',
      observacao: '',
    }));
    setSelectValue(null);
    setErrors({});
  };

  const handleSubmitFormData = () => {
    const semanaAnoNumerica = Number(produtoAtual.semanaAno.split('W')[1]) || 0;

    const formData = {
      semanaAno: semanaAnoNumerica,
      periodoInicio: produtoAtual.periodoInicio,
      periodoFim: produtoAtual.periodoFim,
      horasDisponiveisDia: Number(produtoAtual.horasDisponiveisDia) || 0,
      linhasDisponiveis: Number(produtoAtual.linhasDisponiveis) || 0,
      observacao: produtoAtual.observacao2 || '',
      emailUsuario: email,
      diasDisponiveis: Number(produtoAtual.diasDisponiveis) || 0,
      produtos: produtos.map((produto) => ({
        ...produto,
        qtdPlanejada: Number(produto.quantidade) || 0,
        prioridade: Number(produto.prioridade) || 0,
        qtdColaboradores: Number(produto.qtdColaboradores) || 0,
      })),
    };

    handleSubmit({
      ...formData,
    });

    onClose();
    handleClear();
    handleFechar();
  };

  const handleRemoveProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
  };

  const handleClear = () => {
    setProdutoAtual((prev) => ({
      ...prev,
      op: '',
      prioridade: '',
      codigo: '',
      quantidade: '',
      qtdColaboradores: '',
      pendencia: '',
      observacao: '',
    }));
    setSelectValue(null);
    setErrors({});
  };

  const handleFechar = () => {
    setErrors({});
    setProdutos([]);
    setProdutoAtual({
      codigo: '',
      quantidade: '',
      op: '',
      observacao: '',
      pendencia: '',
      prioridade: '',
      qtdColaboradores: '',
      semanaAno: '',
      periodoInicio: '',
      periodoFim: '',
      horasDisponiveisDia: '',
      linhasDisponiveis: '',
      diasDisponiveis: '',
      observacao2: '',
    });
    setSelectValue(null);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          onClose();
          handleClear();
        }}
      >
        <Box sx={style}>
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
              Planejamento Semanal
            </Typography>
            <IconButton
              onClick={() => {
                onClose();
                handleClear();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              marginBottom: '24px',
              marginTop: '24px',
            }}
          >
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Stack>
                <Chip
                  label="1"
                  sx={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#FFEDED',
                  }}
                />
              </Stack>
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: '12px',
                }}
              >
                Realize o planejamento semanal:
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                marginTop: '16px',
              }}
            >
              <TextField
                type="week"
                required
                placeholder="Semana do ano"
                id="outlined-basic"
                color="success"
                variant="outlined"
                value={produtoAtual.semanaAno || ''}
                sx={{ ...inputStyles }}
                onChange={(e) => {
                  handleGetDiasDaSemana(e.target.value);
                  setProdutoAtual({
                    ...produtoAtual,
                    semanaAno: e.target.value,
                  });
                }}
              />
              <TextField
                label="Dias disponíveis"
                required
                type="number"
                placeholder="Dias disponíveis"
                autoComplete="off"
                value={produtoAtual.diasDisponiveis}
                sx={inputStyles}
                onChange={(e) => {
                  setProdutoAtual({
                    ...produtoAtual,
                    diasDisponiveis: e.target.value,
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Horas disponíveis por dia"
                required
                id="outlined-basic"
                variant="outlined"
                size="small"
                placeholder="Horas disponíveis por dia"
                value={produtoAtual.horasDisponiveisDia || ''}
                sx={inputStyles}
                onChange={(e) => {
                  setProdutoAtual({
                    ...produtoAtual,
                    horasDisponiveisDia: e.target.value,
                  });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                required
                label="Linhas disponíveis"
                type="number"
                placeholder="Quantidade de Linhas disponíveis"
                value={produtoAtual.linhasDisponiveis}
                sx={inputStyles}
                onChange={(e) => {
                  setProdutoAtual({
                    ...produtoAtual,
                    linhasDisponiveis: e.target.value,
                  });
                }}
                autoComplete="off"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Observação"
                placeholder="Observação"
                value={produtoAtual.observacao2}
                onChange={(e) => {
                  setProdutoAtual({
                    ...produtoAtual,
                    observacao2: e.target.value,
                  });
                }}
                autoComplete="off"
                sx={inputStyles}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: '16px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                gap: '16px',
                width: '500px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Stack>
                  <Chip
                    label="2"
                    sx={{
                      width: '32px',
                      height: '32px',
                      backgroundColor: '#FFEDED',
                    }}
                  />
                </Stack>
                <Typography
                  sx={{
                    fontWeight: '500',
                    fontSize: '12px',
                  }}
                >
                  Informe os produtos a serem produzidos na semana:
                </Typography>
              </Box>
              {/* Numero op / prioridade */}
              <Box
                sx={{
                  display: 'flex',
                  gap: '10px',
                  width: '100%',
                  flexDirection: 'column',
                }}
              >
                <Box sx={{ flex: '1 1 auto' }}>
                  <TextField
                    required
                    label="N° OP"
                    placeholder="Número OP"
                    sx={{ ...inputStyles }}
                    value={produtoAtual.op}
                    onChange={(e) => handleInputChange(e, 'op')}
                    autoComplete="off"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Box>

                <Box sx={{ flex: '1 1 auto' }}>
                  <FormControl fullWidth sx={{ ...inputStyles }}>
                    <InputLabel id="prioridade-label" sx={{ mt: '-10px' }}>
                      Prioridade
                    </InputLabel>
                    <Select
                      labelId="prioridade-label"
                      value={produtoAtual.prioridade}
                      label="Prioridade"
                      onChange={(e) => handleInputChange(e, 'prioridade')}
                      required
                      error={Boolean(errors.prioridade)}
                    >
                      {prioridadeSelect.map((item) => (
                        <MenuItem key={item.value} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              {/* produtos/quantidade */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ flex: '1 1 300px' }}>
                  <FormControl fullWidth sx={{ ...inputStyles }}>
                    <Autocomplete
                      id="autocomplete-produto"
                      options={selectProdutosLista}
                      getOptionLabel={(option) =>
                        `${option.value} - ${option.label} `
                      }
                      value={selectValue}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      onChange={(event, newValue) => {
                        setSelectValue(newValue);

                        const produtoSelecionado = produtosLista.find(
                          (produto) => produto.codigo === newValue?.value
                        );

                        setProdutoAtual({
                          ...produtoAtual,
                          codigo: newValue ? newValue.value : '',
                          qtdColaboradores:
                            produtoSelecionado?.qtdColaboradores || 0,
                        });

                        if (newValue) {
                          setErrors((prevErrors) => {
                            const { produto, ...restErrors } = prevErrors;
                            return restErrors;
                          });
                        }
                      }}
                      required
                      error={Boolean(errors.codigo)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Produto"
                          variant="outlined"
                          InputLabelProps={{
                            sx: {
                              transform:
                                inputValue || selectValue
                                  ? 'translate(14px, -10px)'
                                  : 'translate(14px, 4px)',
                              fontSize: '16px',
                              transition: 'transform 0.2s ease-in-out',
                            },
                            shrink: Boolean(inputValue || selectValue),
                          }}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ flex: '1 1 180px' }}>
                  <TextField
                    label="Quantidade"
                    required
                    type="number"
                    placeholder="Quantidade"
                    sx={inputStyles}
                    value={produtoAtual.quantidade}
                    onChange={(e) => handleInputChange(e, 'quantidade')}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={Boolean(errors.quantidade)}
                    autoComplete="off"
                  />
                </Box>
              </Box>
              <Box>
                <TextField
                  required
                  label="Qtd Operadores"
                  placeholder="Qtd Operadores"
                  sx={{ ...inputStyles, mb: '0' }}
                  value={produtoAtual.qtdColaboradores}
                  onChange={(e) => {
                    if (e.target.value.length <= 100)
                      handleInputChange(e, 'qtdColaboradores');
                  }}
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Pendência"
                  placeholder="Pendência"
                  sx={{ ...inputStyles, mb: '0' }}
                  value={produtoAtual.pendencia}
                  onChange={(e) => {
                    if (e.target.value.length <= 100)
                      handleInputChange(e, 'pendencia');
                  }}
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box>
                <TextField
                  label="Observação do produto"
                  placeholder="Observação do produto"
                  sx={{
                    width: '100%',
                    background: '#FFF',
                    borderRadius: '4px',
                    '& .MuiInputBase-root': {
                      height: '76px',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    },
                  }}
                  value={produtoAtual.observacao}
                  onChange={(e) => {
                    if (e.target.value.length <= 150)
                      handleInputChange(e, 'observacao');
                  }}
                  autoComplete="off"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '16px',
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<DeleteOutlineIcon />}
                  sx={{
                    color: '#999',
                    border: '1px solid #CCC',
                  }}
                  onClick={handleClear}
                >
                  Limpar
                </Button>

                <Button
                  variant="contained"
                  onClick={handleAddProduto}
                  disabled={
                    !produtoAtual.quantidade ||
                    !produtoAtual.qtdColaboradores ||
                    !produtoAtual.codigo ||
                    !produtoAtual.op ||
                    !produtoAtual.prioridade
                  }
                >
                  Adicionar
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                padding: '16px',
                width: '652px',
                borderRadius: '16px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Box
                sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
              >
                <Box
                  sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}
                >
                  <Stack>
                    <Chip
                      label="3"
                      sx={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#FFEDED',
                      }}
                    />
                  </Stack>
                  <Typography
                    sx={{
                      fontWeight: '500',
                      fontSize: '12px',
                    }}
                  >
                    Planejamento:
                  </Typography>
                </Box>

                <Box sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {produtos.map((produto, index) => (
                    <Box key={index}>
                      <Box
                        sx={{
                          display: 'flex',
                          padding: '16px',
                          gap: '10px',
                          borderRadius: '8px',
                          border: '1px solid #CCC',
                          flexDirection: 'column',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '12px',
                          }}
                          variant="body2"
                        >
                          Número OP: {produto.op}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Produto: {produto.produto || 'Não informado'}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Código: {produto.codigo}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          variant="body2"
                        >
                          Prioridade:
                          <strong
                            style={{
                              color: '#FF5E5E',
                              marginLeft: '5px',
                              fontSize: '12px',
                            }}
                          >
                            {prioridadeSelect.find(
                              (p) => p.value === produto.prioridade
                            )?.label || 'Não definida'}
                          </strong>
                        </Typography>

                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Quantidade: {produto.quantidade}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Pendência:{' '}
                          {produto.pendencia || (
                            <Typography
                              variant="body2"
                              sx={{
                                display: 'inline',
                                color: '#999999',
                                fontSize: '12px',
                              }}
                            >
                              Sem pendências.
                            </Typography>
                          )}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Quantidade Operadores: {produto.qtdColaboradores}
                        </Typography>
                        <Typography sx={{ fontSize: '12px' }} variant="body2">
                          Observação:{' '}
                          {produto.observacao || (
                            <Typography
                              variant="body2"
                              sx={{
                                display: 'inline',
                                color: '#999999',
                                fontSize: '12px',
                              }}
                            >
                              Sem observaçôes.
                            </Typography>
                          )}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          mb: '10px',
                        }}
                      >
                        <Button
                          onClick={() => handleRemoveProduto(index)}
                          startIcon={
                            <DeleteOutlineIcon sx={{ color: '#999' }} />
                          }
                          sx={{
                            textTransform: 'capitalize',
                            color: '#999',
                            fontSize: '12px',
                          }}
                        >
                          Deletar planejamento
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={handleSubmitFormData}
                    sx={{
                      textTransform: 'capitalize',
                    }}
                    variant="contained"
                    color="success"
                    disabled={produtos.length === 0}
                  >
                    Confirmar
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
