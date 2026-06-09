import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import {
  Button,
  Box,
  Modal,
  TextField,
  Typography,
  FormControl,
  Grid2,
} from '@mui/material/';
import '../styles.css';
import {
  UpdateHora,
  buscaApontamentosId,
} from '@/pages/Setor_Inteligencia/ApontamentosWeb/apontamentosWeb.service';

import DataSaverOnIcon from '@mui/icons-material/DataSaverOn';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import { formatDateVisual } from '@/utils/formatDateInput';
import { useToast } from '@/hooks/toast.hook';
import { a } from 'react-spring';
import { set } from 'date-fns';

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

const interfacePatch = {
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

export default function ModalFechar({ nome, data, handleFetchApontamentos }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [loading, setLoading] = useState(false);
  const [dataFim, setDataFim] = useState(data);

  const { addToast } = useToast();

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setDataFim({
      ...dataFim,
      [name]: value,
      idApontamentoInteligencia: dataFim.id,
      idUsuario: dataFim.colaboradorID,
    });
  };

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    await UpdateHora(dataFim)
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Apontamento final atualizado',
        });
        handleFetchApontamentos();
        setDataFim(interfacePatch);
        handleGetId();
        handleClose();
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro ao atualizar',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  });

  const handleGetId = () => {
    buscaApontamentosId(dataFim.id).then((response) => {
      setDataFim(response);
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          handleOpen();
          handleGetId();
        }}
      >
        <DataSaverOnIcon sx={{ color: '#1e4572' }} />
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
            Atualizar Apontamento
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
                    defaultValue={dataFim.hr_Inicio}
                    value={dataFim.hr_Inicio}
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
                    defaultValue={dataFim.hr_Final}
                    value={dataFim.hr_Final}
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
                  defaultValue={dataFim.tarefa_Demanda}
                  value={dataFim.tarefa_Demanda}
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

            <Box
              sx={{
                flexDirection: 'row',
                display: 'flex',
                width: '100%',
                mt: 1,
                gap: '16px',
              }}
            >
              <FormControl>
                <Box sx={{ fontWeight: 'bold' }}>Num. Chamado</Box>
                <TextField
                  id="numChamado"
                  name="numChamado"
                  value={dataFim.numChamado}
                  defaultValue={dataFim.numChamado}
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
                  value={dataFim.numProjeto}
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
                  value={dataFim.numTask}
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
                  value={dataFim.observacao}
                  onChange={(e) => {
                    if (e.target.value.length <= 150) {
                      inputTextHandler(e);
                    }
                  }}
                  inputProps={{
                    maxLength: 150,
                  }}
                  helperText={`${
                    dataFim.observacao?.length || 0
                  }/150 caracteres`}
                  FormHelperTextProps={{
                    sx: {
                      textAlign: 'right',
                      color:
                        dataFim.observacao?.length === 150
                          ? 'error.main'
                          : 'text.secondary',
                    },
                  }}
                  sx={{
                    backgroundColor: '#fff',
                    '& .MuiInputBase-root': {
                      height: '48px',
                      borderRadius: '8px',
                      '&:focus-within': {
                        border: '1px solid lightgray',
                      },
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
              {loading ? 'Carregando...' : 'Salvar'}
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
