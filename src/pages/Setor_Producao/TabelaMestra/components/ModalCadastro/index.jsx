import * as React from 'react';
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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '../../../../../hooks/toast.hook';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import {
  GetFornecedor,
  GetInsumosTipo,
  CadrastrarInsumosPost,
} from '../../tabelaMestra.service';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: '90vh',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '16px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const newRegister = {
  codProduto: 0,
  nome: 0,
  custo: 0,
  um: 0,
  qtd_UM: 0,
  id_insumos_tipo: 0,
  id_insumos_fornecedor: 0,
};

export const ModalCadastro = () => {
  const [formData, setFormData] = React.useState(newRegister);
  const [open, setOpen] = React.useState(false);
  const [fornecedores, setFornecedores] = React.useState([]);
  const [tipos, setTipos] = React.useState([]);
  const [unidades, setUnidades] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const { addToast } = useToast();

  const handleClose = () => {
    setOpen(false);
    setFormData(newRegister);
  };
  const { email } = useUsuarioLocal();

  const fetchFornecedores = async () => {
    try {
      const response = await GetFornecedor();
      setFornecedores(response);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  const fetchTipos = async () => {
    try {
      const response = await GetInsumosTipo();
      setTipos(response);
    } catch (error) {
      console.error('Erro ao buscar tipos:', error);
    }
  };

  const handleSubmitFormData = (e) => {
    e.preventDefault();
    CadrastrarInsumosPost(formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Insumo cadastrado com sucesso',
        });
        setFormData(newRegister);
        handleClose();
      })
      .catch(() => {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'O cadastro falhou',
        });
        setFormData(newRegister);
        handleClose();
      });
  };
  React.useEffect(() => {
    fetchFornecedores();
    fetchTipos();
  }, []);

  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="outlined"
        color="success"
        size="large"
        startIcon={<AddIcon />}
      >
        Registrar Insumo
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Registrar Insumo
            </Typography>

            <Button type="reset" onClick={handleClose} variant="text">
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              color: '#333333',
              fontSize: '12px',
              marginBottom: '16px',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>Usuário:</span> {email}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignContent: 'center',
              justifyContent: 'center',
              mb: 2,
              border: '0px solid #333333',
              boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.25)',
              padding: '16px',
              borderRadius: '8px',
              gap: 1.5,
              backgroundColor: '#FFFFFF',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Código do produto
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Código do Produto"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    codProduto: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Nome
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Nome"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    nome: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Custo
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Custo"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    custo: e.target.value,
                  });
                }}
              />
            </FormControl>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Unidade de Medida
            </Typography>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <InputLabel id="demo-simple-select-label" shrink={!!formData.um}>
                UM
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Um"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    um: e.target.value,
                  });
                }}
              >
                <MenuItem value={'CAIXA'}>CAIXA</MenuItem>
                <MenuItem value={'UNIDADE'}>UNIDADE</MenuItem>
                <MenuItem value={'PACOTE'}>PACOTE</MenuItem>
                <MenuItem value={'FARDO'}>FARDO</MenuItem>
                <MenuItem value={'GALOES'}>GALÕES</MenuItem>
              </Select>
            </FormControl>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Quantidade UM
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Quantidade da unidade de medida"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    qtd_UM: e.target.value,
                  });
                }}
              />
            </FormControl>

            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Tipo
            </Typography>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!formData.id_insumos_tipo}
              >
                Tipo
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Tipo"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    id_insumos_tipo: e.target.value,
                  });
                }}
              >
                {tipos.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Fornecedor
            </Typography>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!formData.id_insumos_fornecedor}
              >
                Fornecedor
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Fornecedor"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    id_insumos_fornecedor: e.target.value,
                  });
                }}
              >
                {fornecedores.map((fornecedor) => (
                  <MenuItem key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              paddingY: 1,
              justifyContent: 'end',
            }}
            fullWidth
          >
            <Button
              variant="outlined"
              type="reset"
              onClick={handleClose}
              sx={{
                boxShadow: '0 1px 5px rgba(0, 0, 0, 0.5)',
                border: '1px solid #CCCCCC80',
                color: '#999999',
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={(e) => handleSubmitFormData(e)}
            >
              Salvar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
