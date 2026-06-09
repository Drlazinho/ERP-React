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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from '@mui/material';
import { useToast } from '@/hooks/toast.hook';
import { NumericFormat } from 'react-number-format';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { registrarEficiencia } from '../../dashboardProducao.service';

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

const ModalEditar = ({ open, onClose, data, onUpdate }) => {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    id: data.id,
    metaProducao: data.metaProducao,
    dataEficiencia: data.dataEficiencia.split('T')[0],
    quantidadeProduzida: data.quantidadeProduzida,
    horasTrabalhadas: '',
    horasDisponíveis: '',
    quantidadeRejeitos: '',
  });
  const [loading, setLoading] = useState(false);
  const { id, email } = useUsuarioLocal();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = React.useCallback(async () => {
    const formatarValor = (valor) => {
      if (typeof valor === 'string') {
        return Number(valor.replace('h', '').replace(',', '.'));
      }
      return Number(valor);
    };
    const params = {
      id: Number(formData.id),
      metaProducao: Number(formData.metaProducao),
      dataEficiencia: formData.dataEficiencia,
      quantidadeProduzida: Number(formData.quantidadeProduzida),
      quantidadeRejeitos: Number(formData.quantidadeRejeitos),
      horasDisponíveis: formatarValor(formData.horasDisponíveis),
      horasTrabalhadas: formatarValor(formData.horasTrabalhadas),
      usuarioRegistro: email,
      usuarioID: id,
    };

    try {
      setLoading(true);
      await registrarEficiencia(params);
      onUpdate();
      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Meta editada com sucesso',
      });
      setLoading(false);
      onClose();
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
        title: 'Erro!',
        description: errorMessage,
      });
      setLoading(false);
    }
  }, [formData, onClose, onUpdate, addToast, email, id]);
  return (
    <div>
      <Modal
        open={open}
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
              Editar Meta
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
              width: '100%',
              gap: '16px',
              mb: '30px',
            }}
          >
            <TextField
              required
              type="date"
              label="Data"
              value={formData.dataEficiencia}
              name="dataEficiencia"
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />

            <TextField
              required
              type="number"
              label="Meta Produção"
              value={formData.metaProducao}
              name="metaProducao"
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />

            <TextField
              required
              type="number"
              label="Quantidade Produzida"
              value={formData.quantidadeProduzida}
              name="quantidadeProduzida"
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
              mb: '30px',
            }}
          >
            <NumericFormat
              customInput={TextField}
              required
              label="Quantidade Rejeitos"
              name="quantidadeRejeitos"
              value={formData.quantidadeRejeitos}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />
            <NumericFormat
              customInput={TextField}
              required
              label="Horas Disponíveis"
              name="horasDisponíveis"
              value={formData.horasDisponíveis}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="h"
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />
            <NumericFormat
              customInput={TextField}
              required
              label="Horas Trabalhadas"
              name="horasTrabalhadas"
              value={formData.horasTrabalhadas}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="h"
              slotProps={{
                inputLabel: {
                  shrink: true,
                  sx: {
                    color: '#333333',
                    fontSize: '16px',
                  },
                },
              }}
              onChange={handleChange}
            />

            <Button
              type="submit"
              size="small"
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => {
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
                handleSubmit();
              }}
            >
              {loading ? 'Carregando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEditar;
