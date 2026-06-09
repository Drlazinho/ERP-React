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
  TableRow,
  TableCell,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import CloseIcon from '@mui/icons-material/Close';
import { bancos, operacao } from '../EmprestimosMock';
import { EditarControleEmprestimo } from '../controleEmprestimo.service';
import { CircularProgress } from '@mui/material';
import { useToast } from '../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1112px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
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
    value: 'Mensal',
    label: 'Mensal',
  },
  {
    value: 'Trimestral',
    label: 'Trimestral',
  },
  {
    value: 'Semestral',
    label: 'Semestral',
  },
  {
    value: 'Anual',
    label: 'Anual',
  },
];

export const ModalEditar = ({
  isOpen,
  onClose,
  rowData,
  handleGetEmprestimos,
  showModalEditarEmprestimo,
}) => {
  const [formData, setFormData] = useState({
    dtContratada: rowData.dtContratada,
    contratosAtivos: rowData.contratosAtivos,
    modelCaptacao: rowData.modelCaptacao,
    txCaptacao: rowData.txCaptacao,
    vlrContratado: rowData.vlrContratado,
    porcentGarantia: rowData.porcentGarantia,
    quantidadeMeses: '',
    quantidadeParcelas: '',
    amortizacao: '',
    periodoCarreira: rowData.periodoCarreira,
    detalhes: rowData.detalhes || [],
  });
  const { addToast } = useToast();
  const [parcelas, setParcelas] = useState({});
  const [loadingParcelas, setLoadingParcelas] = useState(false);

  const formatarData = (data) => {
    const partesData = data.split('T')[0];
    return partesData;
  };

  const handleEditar = async () => {
    setLoadingParcelas(true);
    const data = {
      id: rowData.id,
      dtContratada: formatarData(formData.dtContratada),
      contratosAtivos: formData.contratosAtivos,
      modelCaptacao: formData.modelCaptacao,
      txCaptacao: formData.txCaptacao,
      vlrContratado: formData.vlrContratado,
      porcentGarantia: formData.porcentGarantia,
      quantidadeMeses: formData.quantidadeMeses,
      quantidadeParcelas: formData.quantidadeParcelas,
      amortizacao: formData.amortizacao,
      periodoCarreira: formData.periodoCarreira,
      detalhes: formData.detalhes,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await EditarControleEmprestimo(data);

      // addToast({
      //   type: 'success',
      //   title: 'Sucesso',
      //   description: 'Empréstimo editado com sucesso',
      // });

      handleGetEmprestimos();
      showModalEditarEmprestimo(true);
      setLoadingParcelas(false);
      onClose();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro ao editar empréstimo',
        description: 'Erro ao editar empréstimo',
      });
    }
    setLoadingParcelas(false);
  };

  const handleParcelChange = (index, field, value) => {
    const updatedParcelas = [...formData.detalhes];
    updatedParcelas[index][field] = value;
    setFormData({
      ...formData,
      detalhes: updatedParcelas,
    });
  };

  useEffect(() => {
    const sortedParcelas = [...formData.detalhes].sort(
      (a, b) => a.nmrParcela - b.nmrParcela
    );
    setParcelas(sortedParcelas);
  }, [formData.detalhes]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={() => {
          onClose();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
              Editar empréstimo
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                onClose();
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
                value={formData.contratosAtivos}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contratosAtivos: e.target.value,
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
              label="Data de Inicio do Contrato"
              type="date"
              fullWidth
              sx={{
                ...style2,
              }}
              value={formatarData(formData.dtContratada)}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  dtContratada: e.target.value,
                })
              }
              inputProps={{
                style: { width: '100%' },
              }}
            />
            <FormControl fullWidth>
              <InputLabel id="select operacao-label" shrink required>
                Tipo de Operação
              </InputLabel>
              <Select
                required
                label="Tipo de Operação"
                labelId="select-operacao-label"
                value={formData.modelCaptacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    modelCaptacao: e.target.value,
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
                value={formData.txCaptacao}
                valueIsNumericString
                decimalSeparator=","
                allowNegative={false}
                suffix="%"
                onValueChange={(values) => {
                  setFormData({
                    ...formData,
                    txCaptacao: values.floatValue,
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
              value={
                formData.vlrContratado !== undefined
                  ? new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(parseFloat(formData.vlrContratado || 0))
                  : ''
              }
              valueIsNumericString
              onChange={(e) => {
                let inputValue = e.target.value;

                // Remove caracteres não numéricos
                const numericValue = inputValue.replace(/[^\d]/g, '');

                // Converte para número
                const parsedValue = numericValue
                  ? parseFloat(numericValue) / 100
                  : 0;

                setFormData({
                  ...formData,
                  vlrContratado: parsedValue,
                });
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
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
              value={formData.porcentGarantia}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="%"
              onValueChange={(values) => {
                setFormData({
                  ...formData,
                  porcentGarantia: values.floatValue,
                });
              }}
            />

            {/* <FormControl>
              <InputLabel id="select-amortizacao-label" shrink required>
                Tipo de Amortização
              </InputLabel>
              <Select
                size="small"
                label="Tipo de Amortização"
                labelId="select-amortizacao-label"
                value={formData.amortizacao}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    amortizacao: e.target.value,
                  })
                }
                displayEmpty
                sx={{ flex: '0 1 auto', width: '255px' }}
              >
                <MenuItem value="" disabled>
                  Selecione o tipo de amortização
                </MenuItem>
                {typeAmortizacao.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              mt: '24px',
            }}
          ></Box>

          <Box
            sx={{
              mt: '24px',
              borderTop: '1px solid #EDEDED',
              overflow: 'auto',
              height: '400px',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}
            >
              Parcelas
            </Typography>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
            >
              {/* {loadingParcelas ? (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CircularProgress size={24} />
                      <Typography variant="body1" sx={{ marginLeft: 2 }}>
                        Carregando parcelas...
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : */}
              {parcelas && parcelas.length > 0 ? (
                parcelas.map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', gap: 2 }}>
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

                    <TextField
                      type="date"
                      id="outlined-basic"
                      label="Data de vencimento"
                      variant="outlined"
                      size="small"
                      sx={{ flex: '1 0 auto' }}
                      value={formatarData(item.dtVencimento)}
                      onChange={(e) =>
                        handleParcelChange(
                          index,
                          'dtVencimento',
                          e.target.value
                        )
                      }
                    />
                  </Box>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Nenhuma parcela disponível.
                  </TableCell>
                </TableRow>
              )}
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
                onClose();
              }}
              sx={{
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                border: '1px solid #333',
                color: '#333',
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={handleEditar}
              disabled={loadingParcelas}
            >
              {loadingParcelas ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} color="inherit" />
                  <Typography variant="body2" sx={{ color: 'inherit' }}>
                    Salvando...
                  </Typography>
                </Box>
              ) : (
                'Salvar'
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
