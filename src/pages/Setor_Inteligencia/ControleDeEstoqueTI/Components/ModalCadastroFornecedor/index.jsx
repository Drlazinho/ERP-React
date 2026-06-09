import * as React from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  FormControl,
} from '@mui/material';
import Modal from '@mui/material/Modal';

import { registrarNovoInsumoFornecedor } from '@/pages/Setor_Recepcao/Insumos/insumosFornecedor.service';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

const interfaceFornecedor = {
  codFornecedor: '',
  nome: '',
  descricao: '',
};

export default function ModalCadastroFornecedor({handleFetchInsumos}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sendFornecedor, setSendFornecedor] = React.useState(
    interfaceFornecedor
  );

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setSendFornecedor({ ...sendFornecedor, [name]: value });
  };

  const handleSubmit = React.useCallback(() => {
    registrarNovoInsumoFornecedor(sendFornecedor).then((res) => {
      handleFetchInsumos();
      handleClose();
    });
  });

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<AddCircleOutlineIcon />}
      >
        Cadastrar Fornecedor
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
              Cadastro de Fornecedor de Insumos
            </Typography>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <FormControl sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Cod.Fornecedor</Typography>
                  <TextField
                    id="codFornecedor"
                    name='codFornecedor'
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Nome</Typography>
                  <TextField
                    id="nome"
                    name='nome'
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl sx={{ width: '100%' }}>
                  <Typography variant="subtitle1">Descrição</Typography>
                  <TextField
                    id="descricao"
                    name='descricao'
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<ArrowOutwardIcon />}
              fullWidth
              onClick={handleSubmit}
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
