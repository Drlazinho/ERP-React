import * as React from 'react';
import Box from '@mui/material/Box';

import '../styles.css';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import {
  Grid2,
  TextField,
  Modal,
  Typography,
  Button,
  FormControl,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { registrarApontamentoInicial } from '@/pages/Setor_Inteligencia/ApontamentosWeb/apontamentosWeb.service';
import { formatDateVisual } from '@/utils/formatDateInput';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import CircularProgress from '@mui/material/CircularProgress';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    xs: '90%',
    sm: '80%',
    md: '70%',
    lg: '60%',
    xl: '50%',
  },
  maxWidth: '600px',
  maxHeight: '700px',
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  overflow: 'scroll',
  overflowX: 'hidden',
};

const interfacePost = {
  idApontamentoInteligencia: 0,
  idUsuario: 0,
  hr_Inicio: null,
  hr_Final: null,
  numChamado: 0,
  tarefa_Demanda: '',
  slA_ID: 0,
  observacao: '',
  numProjeto: 0,
  numTask: 0,
};

export default function ModalCadastroInicial({
  nome,
  handleFetchApontamentos,
  idUsuario,
}) {
  const { id } = useUsuarioLocal();
  const [open, setOpen] = React.useState(false);
  const [sendApontamento, setSendApontamento] = useState(interfacePost);
  const handleOpen = () => setOpen(true);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // Atualiza a data inicial quando o modal é aberto
  useEffect(() => {
    if (open) {
      setSendApontamento((prevState) => ({
        ...prevState,
        hr_Inicio: getCurrentDateTime(),
      }));
    }
  }, [open]);

  const handleClose = () => {
    setSendApontamento(interfacePost);
    setOpen(false);
  };

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setSendApontamento({ ...sendApontamento, [name]: value, idUsuario: id });
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    await registrarApontamentoInicial(sendApontamento)
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Apontamento cadastrado',
        });
        setSendApontamento(interfacePost);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro ao cadastrar',
        });
      })
      .finally(() => {
        setLoading(false);
        handleClose();
        handleFetchApontamentos();
      });
  }, [sendApontamento, addToast, handleFetchApontamentos, handleClose, id]);

  return (
    <div>
      <Button
        sx={{ maxWidth: '425px', width: '100%', bgcolor: '#1e4572' }}
        variant="contained"
        onClick={handleOpen}
      >
        Registrar Apontamento
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Box
            className="poppins-bold"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Cadastro Inicial
          </Box>
          <Box>
            <Grid2
              container
              spacing={2}
              columns={16}
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
              }}
            >
              <Grid2 item xs={8}>
                <Typography sx={{ mt: 3, fontWeight: 'bold' }}>
                  Data Inicial
                </Typography>
                <FormControl>
                  <TextField
                    id="hr_Inicio"
                    name="hr_Inicio"
                    type="datetime-local"
                    value={sendApontamento.hr_Inicio || ''}
                    variant="outlined"
                    onChange={inputTextHandler}
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
                  />
                </FormControl>
              </Grid2>
              <Grid2 item xs={8}>
                <Typography sx={{ mt: 3, fontWeight: 'bold' }}>
                  Data Final
                </Typography>
                <FormControl>
                  <TextField
                    id="hr_Final"
                    name="hr_Final"
                    type="datetime-local"
                    value={sendApontamento.hr_Final || ''}
                    onChange={inputTextHandler}
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
                  />
                </FormControl>
              </Grid2>
            </Grid2>
            <Typography sx={{ mt: 3, fontWeight: 'bold', fontSize: '20px' }}>
              Atividade
            </Typography>
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                mt: 1,
              }}
            >
              <Box sx={{ width: '100%' }}>
                <FormControl sx={{ width: '100%' }}>
                  <Box
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Descrição da Tarefa
                  </Box>
                  <TextField
                    id="tarefa_Demanda"
                    name="tarefa_Demanda"
                    onChange={inputTextHandler}
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
                  />
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                mt: 1,
                gap: 2,
              }}
            >
              <FormControl>
                <Box sx={{ fontWeight: 'bold' }}>Num. Chamado</Box>
                <TextField
                  id="numChamado"
                  name="numChamado"
                  onChange={inputTextHandler}
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
                />
              </FormControl>

              <FormControl>
                <Box sx={{ fontWeight: 'bold' }}>Num. Projeto</Box>
                <TextField
                  id="numProjeto"
                  name="numProjeto"
                  onChange={inputTextHandler}
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
                />
              </FormControl>

              <FormControl>
                <Box
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Num.Task
                </Box>
                <TextField
                  id="numTask"
                  name="numTask"
                  onChange={inputTextHandler}
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
                />
              </FormControl>
            </Box>

            <Typography sx={{ mt: 3, fontWeight: 'bold', fontSize: '18px' }}>
              Observação
            </Typography>
            <Box>
              <FormControl sx={{ width: '100%' }}>
                <TextField
                  id="observacao"
                  name="observacao"
                  onChange={(e) => {
                    if (e.target.value.length <= 150) {
                      inputTextHandler(e);
                    }
                  }}
                  inputProps={{
                    maxLength: 150,
                  }}
                  helperText={`${
                    sendApontamento.observacao?.length || 0
                  }/150 caracteres`}
                  FormHelperTextProps={{
                    sx: {
                      textAlign: 'right',
                      color:
                        sendApontamento.observacao?.length === 150
                          ? 'error.main'
                          : 'text.secondary',
                    },
                  }}
                  fullWidth
                />
              </FormControl>
            </Box>
          </Box>
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
              color: 'red',
              fontSize: '15px',
              fontWeight: 'bold',
            }}
          >
            {nome}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<ArrowOutwardIcon />}
              fullWidth
              onClick={() => {
                handleSubmit();
              }}
              disabled={loading}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteOutlineIcon />}
              fullWidth
              type="reset"
              onClick={handleClose}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
