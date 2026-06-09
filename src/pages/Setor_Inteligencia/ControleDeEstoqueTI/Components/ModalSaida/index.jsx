import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  Grid,
  Select,
  MenuItem,
  OutlinedInput,
  TextField,
} from '@mui/material';

import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { registrarMovimentacaoInsumos } from '@/pages/Setor_Recepcao/Insumos/insumosFornecedor.service';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const interfaceInsumos = {
  id_insumos: 0,
  tipoMovimentacao: 'SAIDA',
  qtdMov: 0,
  setor: 'INTELIGENCIA',
  usuario: '',
  usuarioSistema: 'WEB',
  usuarioId: '',
  descricao: '',
};

export default function ModalSaida({
  data,
  cadastrarSaida,
  setorLista,
  handleFetchInsumos,
}) {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [send, setSend] = React.useState(interfaceInsumos);

  const { nome, id } = useUsuarioLocal();

  const handleSubmit = React.useCallback(() => {
    registrarMovimentacaoInsumos(send)
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Movimentação concluida.',
        });
        handleFetchInsumos();
        handleClose();
      })
      .catch((err) => {
        const error = err.response.data;
        addToast({
          type: 'danger',
          title: 'Erro na requisição',
          description: error,
        });
      });
  });

  return (
    <div>
      <Button
        variant="outlined"
        color="error"
        startIcon={<ExitToAppIcon />}
        onClick={handleOpen}
      >
        Saída
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Cadastro de Edição
            </Typography>
          </Box>
          <Box
            sx={{
              mt: '25px',
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              columns={12}
              spacing={1}
            >
              <Grid item xs={6}>
                <Typography variant="subtitle2">Produto</Typography>
                <TextField
                  sx={{ width: '100%', marginBottom: '10px' }}
                  defaultValue={data}
                  disabled
                  variant="filled"
                />
                <Typography variant="subtitle2">Setor</Typography>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={send.setor}
                  onChange={(e) =>
                    setSend({
                      ...send,
                      setor: e.target.value,
                    })
                  }
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  sx={{ width: '100%' }}
                >
                  {setorLista.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Quantidade Mov.</Typography>
                <TextField
                  sx={{ width: '100%', marginBottom: '10px' }}
                  type="number"
                  onChange={(e) =>
                    setSend({
                      ...send,
                      qtdMov: e.target.value,
                      usuario: nome,
                      usuarioId: id,
                      id_insumos: data,
                    })
                  }
                />
                <Typography variant="subtitle2">Destino</Typography>
                <TextField
                  sx={{ width: '100%' }}
                  onChange={(e) =>
                    setSend({
                      ...send,
                      descricao: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: '20px',
            }}
          >
            <Typography sx={{ color: 'red' }}>Usuário: {nome}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<ArrowOutwardIcon />}
              fullWidth
              onClick={() => {
                handleSubmit();
              }}
            >
              Enviar
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
