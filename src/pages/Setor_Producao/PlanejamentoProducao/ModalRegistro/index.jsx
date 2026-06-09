import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import moment from 'moment/moment';
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  maxWidth: '90%',
  maxHeight: '90%',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  overflowY: 'auto',
  borderRadius: '8px',
  flexDirection: 'row',
  padding: '24px',
};

export default function ModalRegistro({ open, onContinuar, onClose }) {
  const [errors, setErrors] = useState({});

  const handleClearErrors = () => {
    setErrors({});
  };

  const handleCloseModal = () => {
    handleClearErrors();
    onClose();
  };

  const [formData, setFormData] = useState({
    semanaAno: '',
    periodoInicio: '',
    periodoFim: '',
    // horasDisponiveis: '',
    horasDisponiveisDia: '',
    linhasDisponiveis: '',
    diasDisponiveis: '',
    observacao: '',
    emailUsuario: '',
    listaDetalhes: [],
  });

  const { email } = useUsuarioLocal();

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, emailUsuario: email }));
  }, [email]);

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleClear = () => {
    setFormData({
      semanaAno: '',
      periodoInicio: '',
      periodoFim: '',
      // horasDisponiveis: '',
      horasDisponiveisDia: '',
      linhasDisponiveis: '',
      diasDisponiveis: '',
      observacao: '',
      emailUsuario: email,
      listaDetalhes: [],
    });

    handleClearErrors();
  };

  const handleGetDiasDaSemana = (value) => {
    const [ano, semana] = value.split('-W');
    const comecoSemana = moment().year(ano).week(semana).startOf('isoWeek');
    const fimSemana = moment().year(ano).week(semana).endOf('isoWeek');

    const inicioSemanaFormatada = comecoSemana.format('YYYY-MM-DD');
    const fimSemanaFormatada = fimSemana.format('YYYY-MM-DD');

    setFormData((prevData) => ({
      ...prevData,
      semanaAno: value,
      periodoInicio: inicioSemanaFormatada,
      periodoFim: fimSemanaFormatada,
    }));
  };

  useEffect(() => {
    if (formData.semanaAno) {
      const [ano, semana] = formData.semanaAno.split('-W');
      const comecoSemana = moment().year(ano).week(semana).startOf('isoWeek');
      const fimSemana = moment().year(ano).week(semana).endOf('isoWeek');

      setFormData((prevData) => ({
        ...prevData,
        periodoInicio: comecoSemana.format('YYYY-MM-DD'),
        periodoFim: fimSemana.format('YYYY-MM-DD'),
      }));
    }
  }, [formData.semanaAno]);

  const handleSubmit = () => {
    const newErrors = {};

    if (!formData.semanaAno) newErrors.semanaAno = 'Campo obrigatório.*';
    if (!formData.diasDisponiveis)
      newErrors.diasDisponiveis = 'Campo obrigatório.*';
    // if (!formData.horasDisponiveis)
    //   newErrors.horasDisponiveis = 'Campo obrigatório.*';
    if (!formData.horasDisponiveisDia)
      newErrors.horasDisponiveisDia = 'Campo obrigatório.*';
    if (!formData.linhasDisponiveis)
      newErrors.linhasDisponiveis = 'Campo obrigatório.*';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onContinuar(formData);
    handleClear();
  };

  const inputStyles = {
    width: '100%',
    marginBottom: '24px',
    borderRadius: '4px',
    border: '1px solid #CCC',
    background: '#FFF',
    '& .MuiInputBase-root': {
      height: '32px',
      borderRadius: '4px',
    },
  };

  return (
    <div>
      <Modal open={open} onClose={handleCloseModal}>
        <Box sx={{ ...style }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              Planejamento Semanal
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              padding: '16px',
            }}
          >
            <Box
              sx={{
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                gap: '16px',
              }}
            >
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginBottom: '24px',
                }}
              >
                Realize o planejamento semanal:
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ flex: '1 1 200px' }}>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.semanaAno}
                  </Typography>
                  <TextField
                    type="week"
                    placeholder="Semana do ano"
                    id="outlined-basic"
                    color="success"
                    variant="outlined"
                    value={formData.semanaAno}
                    sx={{ ...inputStyles }}
                    onChange={(e) => {
                      handleGetDiasDaSemana(e.target.value);
                      handleChange(e, 'semanaAno');
                      if (errors.semanaAno)
                        setErrors((prev) => ({ ...prev, semanaAno: '' }));
                    }}
                    error={!!errors.semanaAno}
                  />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.diasDisponiveis}
                  </Typography>
                  <TextField
                    type="number"
                    placeholder="Dias disponíveis"
                    value={formData.diasDisponiveis}
                    sx={inputStyles}
                    onChange={(e) => {
                      handleChange(e, 'diasDisponiveis');
                      if (errors.diasDisponiveis)
                        setErrors((prev) => ({ ...prev, diasDisponiveis: '' }));
                    }}
                    error={!!errors.diasDisponiveis}
                    autoComplete="off"
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                {/* <Box sx={{ flex: '1 1 200px' }}>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.horasDisponiveis}
                  </Typography>
                  <TextField
                    type="number"
                    placeholder="Horas disponíveis por semana"
                    value={formData.horasDisponiveis}
                    sx={inputStyles}
                    onChange={(e) => {
                      handleChange(e, 'horasDisponiveis');
                      if (errors.horasDisponiveis)
                        setErrors((prev) => ({
                          ...prev,
                          horasDisponiveis: '',
                        }));
                    }}
                    error={!!errors.horasDisponiveis}
                    autoComplete="off"
                  />
                </Box> */}

                <Box sx={{ flex: '1 1 200px' }}>
                  <Typography variant="body2" sx={{ color: 'red' }}>
                    {errors.horasDisponiveisDia}
                  </Typography>
                  <TextField
                    required
                    id="outlined-basic"
                    variant="outlined"
                    size="small"
                    placeholder="Horas disponíveis por dia"
                    value={formData.horasDisponiveisDia || ''}
                    sx={inputStyles}
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

                      setFormData({
                        ...formData,
                        horasDisponiveisDia: formattedValue,
                      });
                    }}
                  />
                </Box>
              </Box>
              <Typography variant="body2" sx={{ color: 'red' }}>
                {errors.linhasDisponiveis}
              </Typography>
              <TextField
                type="number"
                placeholder="Quantidade de Linhas disponíveis"
                value={formData.linhasDisponiveis}
                sx={inputStyles}
                onChange={(e) => {
                  handleChange(e, 'linhasDisponiveis');
                  if (errors.linhasDisponiveis)
                    setErrors((prev) => ({ ...prev, linhasDisponiveis: '' }));
                }}
                error={!!errors.linhasDisponiveis}
                autoComplete="off"
              />

              <Box>
                <TextField
                  placeholder="Observação"
                  multiline
                  maxRows={4}
                  value={formData.observacao}
                  onChange={(e) => {
                    if (e.target.value.length <= 150)
                      handleChange(e, 'observacao');
                  }}
                  autoComplete="off"
                  sx={{
                    width: '100%',
                    borderRadius: '4px',
                    maxHeight: '150px',
                    overflowY: 'auto',
                    border: '1px solid #CCC',
                    background: '#FFF',
                  }}
                />
                <Typography variant="body2">
                  {`Quantidade de caracteres: ${formData.observacao.length}/150`}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '16px',
              }}
            >
              <Button
                variant="outlined"
                onClick={handleClear}
                startIcon={<DeleteOutlineIcon />}
                sx={{
                  borderRadius: '4px',
                  color: '#999',
                  border: '1px solid #CCC',
                  boxShadow: ' 0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                  textTransform: 'capitalize',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition:
                      'background-color 0.5s ease, transform 0.3s ease-in-out',
                    border: '1px solid #CCC',
                  },
                }}
              >
                Limpar
              </Button>

              <Button onClick={handleSubmit} variant="contained">
                Continuar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
