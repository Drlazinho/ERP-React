import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  InputAdornment,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import {
  PostControleEmprestimo,
  BuscarVencimentos,
} from '../controleEmprestimo.service';
import { bancos, operacao } from '../EmprestimosMock';
import { useToast } from '../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1112px',
  maxHeight: '90vh',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  scrollbarWidth: 'thin',
  msOverflowStyle: 'auto',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

const style2 = {
  width: '100%',
  height: '40px',
  borderRadius: '4px',
  backgroundColor: '#fff',
  '& .MuiInputBase-root': {
    height: '40px',
    '&:focus-within': {
      border: '1px solid lightgray',
    },
  },
};

const typeAmortizacao = [
  {
    valueAmortizacao: 'Mensal',
    valueIntevalo: 30,
    label: 'Mensal',
  },
  {
    valueAmortizacao: 'Trimestral',
    valueIntevalo: 90,
    label: 'Trimestral',
  },
  {
    valueAmortizacao: 'Semestral',
    valueIntevalo: 180,
    label: 'Semestral',
  },
  {
    valueAmortizacao: 'Anual',
    valueIntevalo: 365,
    label: 'Anual',
  },
];

const inicialFormData = {
  banco: '',
  dataInicial: 'dd/mm/aaaa',
  operacao: '',
  taxas: '',
  valorTotalEmprestimo: '',
  garantia: '',
  quantidadeMeses: '',
  quantidadeParcelas: '',
  amortizacao: '',
  carenciaEmMeses: '',
  intervaloEntreParcelas: '',
  parcelas: [],
};

export const ModalIncluirEmprestimo = ({
  showSuccessMessageEmprestimo,
  handleGetEmprestimos,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = useState(inicialFormData);
  const [loading, setLoading] = useState(false);

  const handleClear = () => {
    setFormData(inicialFormData);
    setData({ detalhes: [] });
  };
  const [data, setData] = useState({ detalhes: [] });
  const [detalhesModificados, setDetalhesModificados] = useState(false);

  const { addToast } = useToast();

  const handleVencimentos = async () => {
    setLoading(true);
    const formatarValor = (valor) => {
      return valor
        ?.replace('R$', '')
        .replace(/\./g, '')
        .replace(',', '.')
        .trim();
    };

    const params = {
      contratosAtivos: formData.banco,
      dtContratada: formData.dataInicial,
      txCaptacao: Number(formData.taxas),
      modelCaptacao: formData.operacao,
      vlrContratado: Number(formatarValor(formData.valorTotalEmprestimo)),
      porcentGarantia: Number(formData.garantia),
      quantidadeParcelas: Number(formData.quantidadeParcelas),
      intervaloDias: Number(formData.intervaloEntreParcelas),
      carenciaEmMeses: Number(formData.tempoCarencia),
      modalidadeAmortizacao: formData.amortizacao,

      ...(detalhesModificados && {
        detalhes: data.detalhes.map((item) => ({
          dtVencimento: new Date(item.dtVencimento).toISOString(),
          nmrParcela: item.nmrParcela,
        })),
      }),
    };

    try {
      const res = await BuscarVencimentos(params);

      setData(res);
      setDetalhesModificados(false);

      addToast({
        type: 'success',
        title: detalhesModificados
          ? 'Recálculo realizado'
          : 'Cálculo realizado',
        description: detalhesModificados
          ? 'Parcelas recalculadas com sucesso'
          : 'Parcelas calculadas com sucesso',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: detalhesModificados
          ? 'Erro ao recalculcar parcelas'
          : 'Erro ao calcular parcelas',
      });
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.banco &&
      formData.dataInicial &&
      formData.operacao &&
      formData.taxas &&
      formData.valorTotalEmprestimo &&
      formData.garantia &&
      formData.quantidadeParcelas &&
      formData.amortizacao &&
      formData.tempoCarencia
    );
  };

  const handlePostEmprestismos = async () => {
    try {
      await PostControleEmprestimo(data);
      showSuccessMessageEmprestimo(true);
      handleGetEmprestimos();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao enviar empréstimo',
        description: 'Erro ao enviar empréstimo',
      });
    } finally {
      handleClose();
      handleClear();
    }
  };
  const handleParcelChange = (index, field, value) => {
    const updatedDetalhes = [...data.detalhes];
    updatedDetalhes[index] = {
      ...updatedDetalhes[index],
      [field]: value,
    };
    setData((prevData) => ({
      ...prevData,
      detalhes: updatedDetalhes,
    }));

    if (field === 'dtVencimento' || field === 'nmrParcela') {
      setDetalhesModificados(true);
    }
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
        }}
        fullWidth
        variant="contained"
        color="primary"
        size="large"
      >
        Incluir Empréstimo
      </Button>
      <Modal
        open={open}
        onClose={() => {
          handleClose();
          handleClear();
        }}
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Incluir empréstimo
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
                handleClear();
              }}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '24px',
            }}
          >
            <Typography
              sx={{
                fontWeight: 'bold',
                color: '#333333',
                fontSize: '14px',
              }}
            >
              Contrato{' '}
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="select-banco-label" shrink required>
                Banco
              </InputLabel>
              <Select
                required
                label="Banco"
                labelId="select-banco-label"
                value={formData.banco}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    banco: e.target.value,
                  })
                }
                displayEmpty
                sx={{ ...style2 }}
              >
                <MenuItem value="" disabled>
                  Selecione o banco
                </MenuItem>
                {bancos
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              required
              label="Data de Início do Contrato"
              type="date"
              fullWidth
              sx={{
                ...style2,
              }}
              value={formData.dataInicial}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dataInicial: e.target.value,
                })
              }
              InputLabelProps={{ shrink: true }}
            />

            <FormControl fullWidth>
              <InputLabel id="select operacao-label" shrink required>
                Tipo de Operação
              </InputLabel>
              <Select
                required
                label="Tipo de Operação"
                labelId="select-operacao-label"
                value={formData.operacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    operacao: e.target.value,
                  })
                }
                displayEmpty
                sx={{ ...style2 }}
              >
                <MenuItem value="" disabled>
                  Tipo de Operação
                </MenuItem>
                {operacao
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((item, index) => (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Stack>
              <NumericFormat
                required
                size="small"
                customInput={TextField}
                label="Taxa nominal %"
                variant="outlined"
                fullWidth
                sx={{ width: '250px' }}
                value={formData.taxas}
                valueIsNumericString
                decimalSeparator=","
                allowNegative={false}
                suffix="%"
                onValueChange={(values) => {
                  setFormData({
                    ...formData,
                    taxas: values.floatValue,
                  });
                }}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mt: '24px',
            }}
          >
            <TextField
              required
              id="outlined-basic"
              label="R$ Valor captado"
              variant="outlined"
              size="small"
              sx={{ flex: '0 1 255px' }}
              value={formData.valorTotalEmprestimo}
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

                setFormData({
                  ...formData,
                  valorTotalEmprestimo: formattedValue,
                });
              }}
            />

            <NumericFormat
              required
              customInput={TextField}
              label="Garantia"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ flex: '0 1 255px' }}
              value={formData.garantia}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="%"
              onValueChange={(values) => {
                setFormData({
                  ...formData,
                  garantia: values.floatValue,
                });
              }}
            />

            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Quantidade de parcelas"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ flex: '0 1 250px' }}
              value={formData.quantidadeParcelas}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  quantidadeParcelas: e.target.value,
                });
              }}
            />
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mt: '24px',
            }}
          >
            <FormControl>
              <InputLabel id="select-amortizacao-label" shrink required>
                Amortização
              </InputLabel>
              <Select
                size="small"
                required
                label="Amortização"
                labelId="select-amortizacao-label"
                value={formData.amortizacao}
                onChange={(e) => {
                  const selectedAmortizacao = typeAmortizacao.find(
                    (item) => item.valueAmortizacao === e.target.value
                  );

                  setFormData({
                    ...formData,
                    amortizacao: selectedAmortizacao.valueAmortizacao,
                    intervaloEntreParcelas: selectedAmortizacao.valueIntevalo,
                  });
                }}
                displayEmpty
                sx={{ flex: '0 1 auto', width: '255px' }}
              >
                <MenuItem value="" disabled>
                  Selecione a amortização
                </MenuItem>
                {typeAmortizacao.map((item, index) => (
                  <MenuItem key={index} value={item.valueAmortizacao}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              required
              type="number"
              id="outlined-basic"
              label="Carência (em meses)"
              variant="outlined"
              size="small"
              value={formData.tempoCarencia}
              sx={{ flex: '0 1 auto', width: '255px' }}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  tempoCarencia: e.target.value,
                });
              }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              paddingY: 1,
              justifyContent: 'end',
              mt: '24px',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleVencimentos}
              disabled={!isFormValid() || loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : detalhesModificados ? (
                'Recalcular parcelas'
              ) : (
                'Calcular parcelas'
              )}
            </Button>
          </Box>

          <Box sx={{ mt: '24px', borderTop: '1px solid #EDEDED' }}>
            {Array.isArray(data.detalhes) && data.detalhes.length > 0 && (
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}
              >
                Parcelas
              </Typography>
            )}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              {Array.isArray(data.detalhes) &&
                data.detalhes.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                    {/* Número da Parcela */}
                    <TextField
                      size="small"
                      id="outlined-basic"
                      label="Parcela"
                      variant="outlined"
                      value={item.nmrParcela}
                      sx={{
                        flex: '0 0 90px',
                        '& .MuiInputBase-input': {
                          textAlign: 'center',
                        },
                      }}
                      onChange={(e) =>
                        handleParcelChange(index, 'nmrParcela', e.target.value)
                      }
                    />

                    {/* Valor da Parcela */}
                    <TextField
                      id="outlined-basic"
                      label="Valor"
                      variant="outlined"
                      size="small"
                      sx={{ flex: '5 1 auto' }}
                      value={
                        item.vlrParcela !== undefined
                          ? new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(parseFloat(item.vlrParcela || 0))
                          : ''
                      }
                      onChange={(e) => {
                        let inputValue = e.target.value;

                        const numericValue = inputValue.replace(/[^\d]/g, '');

                        const parsedValue = numericValue
                          ? parseFloat(numericValue) / 100
                          : 0;

                        handleParcelChange(index, 'vlrParcela', parsedValue);
                      }}
                      inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                      }}
                    />

                    {/* Data de Vencimento */}
                    <TextField
                      type="date"
                      id="outlined-basic"
                      label="Data de vencimento"
                      variant="outlined"
                      size="small"
                      sx={{ flex: '1 0 auto' }}
                      value={item.dtVencimento.split('T')[0]}
                      onChange={(e) =>
                        handleParcelChange(
                          index,
                          'dtVencimento',
                          e.target.value
                        )
                      }
                    />
                  </Box>
                ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              paddingY: 1,
              justifyContent: 'end',
              mt: '24px',
            }}
          >
            <Button
              variant="outlined"
              type="reset"
              onClick={() => {
                handleClose();
                handleClear();
              }}
              sx={{
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                border: '1px solid #333',
                color: '#333',
              }}
            >
              Cancelar
            </Button>
            {Array.isArray(data.detalhes) &&
              data.detalhes.length > 0 &&
              !detalhesModificados && (
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  onClick={() => {
                    handlePostEmprestismos();
                    handleClose();
                    handleClear();
                  }}
                >
                  Concluir
                </Button>
              )}
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
