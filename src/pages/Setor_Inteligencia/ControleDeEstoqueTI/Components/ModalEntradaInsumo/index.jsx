import * as React from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Select,
  OutlinedInput,
  MenuItem,
} from '@mui/material';
import Modal from '@mui/material/Modal';

import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { registrarMovimentacaoInsumos } from '@/pages/Setor_Recepcao/Insumos/insumosFornecedor.service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  width: '40%',
  transform: 'translate(-50%, -50%)',
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

const interfaceEntradaInsumos = {
  id_insumos: 0,
  tipoMovimentacao: 'ENTRADA',
  qtdMov: 0,
  setor: 'INTELIGENCIA',
  usuario: '',
  usuarioSistema: 'WEB',
  usuarioId: '',
  descricao: '',
};

export default function ModalEntradaDeInsumos({
  nomeProdutoLista,
  handleFetchInsumos,
}) {
  const [open, setOpen] = React.useState(false);
  const [produtoLista, setProdutoLista] = React.useState([]);
  const [sendEntrada, setSendEntrada] = React.useState(interfaceEntradaInsumos);
  const { nome, id } = useUsuarioLocal();
  const handle = () => setOpen(!open);

  React.useEffect(() => {
    const lista = nomeProdutoLista.map((item) => ({
      value: item.id,
      label: item.nome,
    }));

    setProdutoLista(lista);
  }, [nomeProdutoLista]);

  const handleSubmit = React.useCallback(() => {
    registrarMovimentacaoInsumos(sendEntrada).then((res) => {
      handle();
      handleFetchInsumos();
    });
  });

  return (
    <div>
      <Button
        variant="contained"
        onClick={handle}
        startIcon={<AddCircleOutlineIcon />}
      >
        Cadastrar Entrada Insumos
      </Button>
      <Modal
        open={open}
        onClose={handle}
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
              Cadastro de Entrada
            </Typography>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Grid container direction="row" columns={12} spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Produto</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sendEntrada.id_insumos}
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  sx={{ width: '100%' }}
                  onChange={(e) =>
                    setSendEntrada({
                      ...sendEntrada,
                      id_insumos: e.target.value,
                    })
                  }
                >
                  {produtoLista.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.label}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Quantidade Mov.</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="number"
                  sx={{ width: '100%' }}
                  onChange={(e) =>
                    setSendEntrada({
                      ...sendEntrada,
                      qtdMov: e.target.value,
                      usuario: nome,
                      usuarioId: id,
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
              onClick={handleSubmit}
              fullWidth
            >
              Enviar
            </Button>
            <Button
              variant="contained"
              color="error"
              endIcon={<DeleteOutlineIcon />}
              fullWidth
              type="reset"
              onClick={handle}
            >
              Cancelar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
