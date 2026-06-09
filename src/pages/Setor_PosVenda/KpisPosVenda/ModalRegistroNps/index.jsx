import { Box } from '@mui/joy';
import {
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
  CircularProgress,
  FormLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import { PostNps } from '@/pages/Setor_PosVenda/KpisPosVenda/KpisPosVenda.service';
import { Add } from '@mui/icons-material';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import dayjs from 'dayjs';
import debounce from '@/utils/debounce';
import { useToast } from '@/hooks/toast.hook';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 704,
  backgroundColor: 'white',
  borderRadius: '5%',
  p: 4,
  display: 'flex',
  flexWrap: 'wrap',
  border: '2px solid #000',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
};

const buttons = {
  paddingLeft: '400px',
  paddingTop: '25px',
};

const styleG = {
  width: '170px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  border: '1px solid #28A745',
  backgroundColor: '#28A745',
  fontFamily: 'Poppins, sans-serif',
};

const objEnvio = {
  mediaCanalAtend: null,
  mediaAtend: null,
  mediaColetaEntrega: null,
  mediaAssistenciaTecnica: null,
  mediaStasfacProd: null,
  detratores: null,
  passivos: null,
  promotores: null,
  idUsuario: null,
  dataRegistro: null,
};

export default function ModalRegistroNps({
  open,
  onClose,
  handleAtualizarLista,
}) {
  const [obj, setObj] = useState(objEnvio);
  const { addToast } = useToast();

  const { id } = useUsuarioLocal();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClear = () => {
    setObj(objEnvio);
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setObj((prevData) => ({
      ...prevData,
      [name]: value,
      idUsuario: id,
    }));
  };

  const handleSubmit = () => {
    setIsButtonDisabled(true);

    PostNps(obj)
      .then((res) => {
        addToast({
          type: 'success',
          description: 'Sucesso ao registrar NPS',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro na tentativa de Registrar NPS',
        });
      })
      .finally(() => {
        handleClear();
        handleAtualizarLista();
        setIsButtonDisabled(false);
      });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(0.9px)',
          backgroundColor: 'rgba(0, 0, 0, 0)',
        },
      }}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            mb: '24px',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: '#000',
              fontFamily: 'Poppins, sans-serif',
              alignSelf: 'flex-start',
              display: 'flex',
            }}
          >
            Registro
          </Typography>
          <Box sx={{ display: 'flex', mt: '10px', maxWidth: '200px' }}>
            <InputDateAmvox
              valueData={obj.dataRegistro}
              name="dataRegistro"
              label={'Data'}
              onChange={(date) =>
                debounce(() => {
                  const formattedDate = date
                    ? dayjs(date).format('YYYY-MM-DD')
                    : null;
                  setObj((prevData) => ({
                    ...prevData,
                    dataRegistro: formattedDate,
                  }));
                })
              }
            />
          </Box>
        </Box>
        <ButtonCloseModal onClick={() => onClose()} />
        <Box sx={{ display: 'flex', gap: '40px' }}>
          <Box
            sx={{
              display: 'flex',
              paddingBottom: '6px',
              width: '300px',
              height: '528px',
              flexDirection: 'column',
              background: '#FFFAF8',
              borderRadius: '16px 16px 16px 16px',
              border: '1px solid #FFBD95',
              padding: '24px',
              gap: '24px',
            }}
          >
            <Box
              style={{
                display: 'flex',
              }}
            >
              <FormLabel
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  background: '#FFE9CB',
                  borderRadius: '16px 16px 16px 16px',
                  width: '62px',
                  border: '1px solid #FFBD95',
                  color: '#DA5D0F',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                CSAT
              </FormLabel>
            </Box>
            <Box>
              <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>
                Canal de Atendimento
              </FormLabel>
              <TextField
                label=""
                variant="outlined"
                fullWidth
                name="mediaCanalAtend"
                onChange={handleChange}
                size="small"
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
              />
            </Box>
            <Box>
              <FormLabel>Atendente</FormLabel>
              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="mediaAtend"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel
                style={{
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Coleta/Entrega
              </FormLabel>
              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="mediaColetaEntrega"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Qualidade do Serviço
              </FormLabel>

              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="mediaAssistenciaTecnica"
                onChange={handleChange}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '300px',
              height: '395px',
              flexDirection: 'column',
              borderRadius: '16px 16px 16px 16px',
              background: '#FBFBFF',
              border: '1px solid #CDC4FA',
              padding: '24px',
              gap: '24px',
            }}
          >
            <Box
              style={{
                display: 'flex',
              }}
            >
              <FormLabel
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontFamily: 'Poppins, sans-serif',
                  background: '#EFECFF',
                  borderRadius: '16px 16px 16px 16px',
                  width: '62px',
                  border: '1px solid #BFB2FF',
                  color: '#7B61FF',
                }}
              >
                NPS
              </FormLabel>
            </Box>
            <Box>
              <FormLabel style={{ fontFamily: 'Poppins, sans-serif' }}>
                Detratores
              </FormLabel>
              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="detratores"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Passivos
              </FormLabel>
              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="passivos"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormLabel
                style={{
                  textAlign: 'center',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Promotores
              </FormLabel>
              <TextField
                sx={{
                  border: 'none',
                  '& fieldset': { borderRadius: '8px' },
                  '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: 'white',
                  },
                  backgroundColor: 'white',
                  borderRadius: '8px',
                }}
                size="small"
                variant="outlined"
                fullWidth
                name="promotores"
                onChange={handleChange}
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                width: '300px',
                ml: '-24px',
                mt: '30px',
                padding: '24px',
                background: '#F6FFFA',
                borderRadius: '16px 16px 16px 16px',
                border: '1px solid #BDE3BB',
                flexDirection: 'column',
              }}
            >
              <Box>
                <FormLabel
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  Satisfação Produto
                </FormLabel>
                <TextField
                  sx={{
                    border: 'none',
                    '& fieldset': { borderRadius: '8px' },
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: 'white',
                    },
                    backgroundColor: 'white',
                    borderRadius: '8px',
                  }}
                  size="small"
                  variant="outlined"
                  fullWidth
                  name="mediaStasfacProd"
                  onChange={handleChange}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={buttons}>
          <Button
            sx={styleG}
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            startIcon={
              isButtonDisabled ? <CircularProgress size={20} /> : <Add />
            }
          >
            Registrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
