import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  Modal,
  OutlinedInput,
} from '@mui/material';
import {
  registrarNovoInsumo,
  getInsumosFornecedor,
  getInsumosTipo,
} from '@/pages/Setor_Recepcao/Insumos/insumos.service';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '40%',
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

const interfacePost = {
  id_insumos_tipo: 0,
  id_insumos_fornecedor: 0,
  codProduto: '',
  nome: '',
  custo: 0,
  um: '',
  qtd_UM: 0,
};

const unidadeInterface = [
  {
    id: 1,
    nome: 'CAIXA',
  },
  {
    id: 2,
    nome: 'UNIDADE',
  },
  {
    id: 3,
    nome: 'PACOTE',
  },
  {
    id: 4,
    nome: 'FARDO',
  },
  {
    id: 5,
    nome: 'GALÕES',
  },
];

const interfaceTipo = [
  {
    id: 0,
    nome: '',
  },
];

const interfaceFornecedor = [
  {
    id: 0,
    codFornecedor: '',
    nome: '',
    descricao: '',
  },
];

export default function ModalCadastro(handleFetchInsumos) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sendObj, setSendObj] = useState(interfacePost);
  const [fornecedor, setFornecedor] = useState(interfaceFornecedor);
  const [tipo, setTipo] = useState(interfaceTipo);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setSendObj({ ...sendObj, [name]: value });
  };

  const handleFetch = () => {
    getInsumosFornecedor().then((res) => {
      setFornecedor(res);
    });
    getInsumosTipo().then((res) => {
      setTipo(res);
    });
  };

  const handleSubmit = useCallback(() => {
    registrarNovoInsumo(sendObj).then((res) => {
      handleFetchInsumos();
      handleClose();
    });
  });

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        startIcon={<AddCircleOutlineIcon />}
      >
        Cadastrar Insumos
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
              Cadastrar Insumos
            </Typography>
          </Box>
          <Box sx={{ mt: '30px' }}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              columns={12}
              spacing={1}
            >
              <Grid item xs>
                <FormControl>
                  <Typography variant="subtitle2">Cod.Produto</Typography>
                  <TextField
                    id="codProduto"
                    name="codProduto"
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl>
                  <Typography variant="subtitle2">Nome</Typography>
                  <TextField
                    id="nome"
                    name="nome"
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
              <Grid item xs>
                <FormControl>
                  <Typography variant="subtitle2">Custo</Typography>
                  <TextField
                    id="custo"
                    name="custo"
                    variant="outlined"
                    sx={{ width: '100%' }}
                    onChange={inputTextHandler}
                  />
                </FormControl>
              </Grid>
            </Grid>
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
                <Typography variant="subtitle2">Unidade de Medida</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-multiple-select"
                  value={sendObj.um}
                  onChange={(e) =>
                    setSendObj({
                      ...sendObj,
                      um: e.target.value,
                    })
                  }
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  sx={{ width: '100%' }}
                >
                  {unidadeInterface.map((item) => (
                    <MenuItem key={item.id} value={item.nome}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
                <Typography variant="subtitle2">Tipo</Typography>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={sendObj.id_insumos_tipo}
                  onChange={(e) =>
                    setSendObj({
                      ...sendObj,
                      id_insumos_tipo: e.target.value,
                    })
                  }
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  sx={{ width: '100%' }}
                >
                  {tipo.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">Quantidade UM</Typography>
                <TextField
                  id="qtd_UM"
                  name="qtd_UM"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  onChange={inputTextHandler}
                />
                <Typography variant="subtitle2">Fornecedor</Typography>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={sendObj.id_insumos_fornecedor}
                  onChange={(e) =>
                    setSendObj({
                      ...sendObj,
                      id_insumos_fornecedor: e.target.value,
                    })
                  }
                  input={<OutlinedInput />}
                  MenuProps={MenuProps}
                  sx={{ width: '100%' }}
                >
                  {fornecedor.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      {item.nome}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
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
