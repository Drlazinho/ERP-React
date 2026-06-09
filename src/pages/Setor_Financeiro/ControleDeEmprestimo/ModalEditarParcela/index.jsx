import * as React from 'react';
import { useState } from 'react';
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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AtualizarStatusParcelas } from '../controleEmprestimo.service';
import { CircularProgress } from '@mui/material';
import { useToast } from '../../../../hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '60%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: '350px',
  height: '300px',
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

const status = [
  {
    label: 'A Vencer',
    value: 0,
  },
  { label: 'Liquidada', value: 1 },
  { label: 'Vencida', value: 2 },
];

const ModalEditarParcela = ({
  isOpen,
  onClose,
  rowData,
  handleGetEmprestimos,
  showModalEditarEmprestimo,
}) => {
  const formatarData = (data) => {
    if (!data) return '';

    if (data === '0001-01-01T00:00:00') {
      return new Date().toISOString().split('T')[0];
    }

    return data.split('T')[0];
  };

  const [formData, setFormData] = useState({
    status: rowData.pgtoEfetuado,
    controleEmprestimoId: rowData.contratoAtivoId,
    detalheId: rowData.id,
    dataPagamento: formatarData(rowData.dataPagamentoEfetuado),
    valorPagamento: rowData.vlrParcela || 0,
  });
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditarParcela = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await AtualizarStatusParcelas(formData);
      // addToast({
      //   type: 'success',
      //   title: 'Sucesso',
      //   description: 'Parcela editada com sucesso',
      // });
      handleGetEmprestimos();
      showModalEditarEmprestimo(true);
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Erro ao editar parcela',
      });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="20px"
          >
            <Typography id="modal-modal-title" sx={{ fontWeight: 'bold' }}>
              Editar Parcela N° {rowData.nmrParcela}
            </Typography>
            <CloseIcon onClick={onClose} />
          </Stack>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              marginTop: '25px',
            }}
          >
            <TextField
              id="outlined-basic"
              label="Valor Pago"
              variant="outlined"
              size="small"
              sx={{ flex: '5 1 auto' }}
              value={
                formData.valorPagamento !== undefined
                  ? new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(parseFloat(formData.valorPagamento || 0))
                  : ''
              }
              onChange={(e) => {
                let inputValue = e.target.value;

                const numericValue = inputValue.replace(/[^\d]/g, '');

                const parsedValue = numericValue
                  ? parseFloat(numericValue) / 100
                  : 0;

                handleInputChange('valorPagamento', parsedValue);
              }}
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
              }}
            />

            <TextField
              type="date"
              id="outlined-basic"
              label="Data Pagamento"
              variant="outlined"
              size="small"
              sx={{ flex: '5 1 auto' }}
              value={formatarData(formData.dataPagamento)}
              onChange={(e) =>
                handleInputChange('dataPagamento', e.target.value)
              }
            />

            <FormControl fullWidth>
              <InputLabel id="select-status-label" shrink>
                Status
              </InputLabel>
              <Select
                size="small"
                label="Status"
                labelId="select-status-label"
                value={formData.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
                displayEmpty
              >
                {status.map((item, index) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              marginTop: '25px',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={() => {
                handleEditarParcela();
              }}
              disabled={loading}
            >
              {loading ? (
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

export default ModalEditarParcela;
