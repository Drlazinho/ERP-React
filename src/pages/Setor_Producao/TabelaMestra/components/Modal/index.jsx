import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import debounce from '../../../../../utils/debounce';
import { GetFornecedoresChina } from '../../tabelaMestra.service';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import {
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';
import { boolean } from 'zod';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: '95vh',
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
  userLog: '',
  codigoProduto: '',
  qtdProdutosPalet: 0,
  idFornecedor: 0,
  tipoFornecedor: '',
  metaHora: 0,
  comodite: '',
  tpProducao: '',
  statusProducao: true,
  qtdOperadores: 0,
  insumos: [
    { idInsumos: 232, quantidadeInsumosUsado: 0 },
    { idInsumos: 233, quantidadeInsumosUsado: 0 },
    { idInsumos: 234, quantidadeInsumosUsado: 0 },
    { idInsumos: 235, quantidadeInsumosUsado: 0 },
    { idInsumos: 236, quantidadeInsumosUsado: 0 },
    { idInsumos: 237, quantidadeInsumosUsado: 0 },
    { idInsumos: 238, quantidadeInsumosUsado: 0 },
    { idInsumos: 239, quantidadeInsumosUsado: 0 },
  ],
  pesoBruto: 0,
  pesoPalet: 0,
  qtdPecaMaster: 0,
  qtdVolumes: 0,
  porteProduto: '',
  observacoes: '',
  fornecedor: '',
};

export default function ModalRegistro({ handleSubmit, GetDados }) {
  const [formData, setFormData] = React.useState(newRegister);
  const [open, setOpen] = React.useState(false);
  const [fornecedores, setFornecedores] = useState([]);
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData(newRegister);
  };
  const { email } = useUsuarioLocal();

  const handleSubmitFormData = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData(newRegister);

    debounce(() => {
      GetDados();
    }, 3000);
    handleClose();
  };

  const fetchFornecedores = async () => {
    try {
      const response = await GetFornecedoresChina();
      setFornecedores(response);
    } catch (error) {
      console.error('Erro ao buscar fornecedores:', error);
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  // Verifica se o insumo existe, add o novo insumo no array
  const handleInsumoChange = (idInsumos, value) => {
    setFormData((prevState) => {
      const existingInsumoIndex = prevState.insumos.findIndex(
        (insumo) => insumo.idInsumos === idInsumos
      );

      let updatedInsumos;
      if (existingInsumoIndex >= 0) {
        updatedInsumos = prevState.insumos.map((insumo, index) =>
          index === existingInsumoIndex
            ? { ...insumo, quantidadeInsumosUsado: parseInt(value, 10) || 0 }
            : insumo
        );
      } else {
        updatedInsumos = [
          ...prevState.insumos,
          { idInsumos, quantidadeInsumosUsado: parseInt(value, 10) || 0 },
        ];
      }

      return {
        ...prevState,
        insumos: updatedInsumos,
      };
    });
  };

  const handleChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: parseInt(value, 10) || 0,
    }));
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        color="success"
        size="large"
        startIcon={<PlaylistAddIcon />}
      >
        Cadastrar
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
              Cadastrar
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
              Geral
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Código"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    codigoProduto: e.target.value,
                    userLog: email,
                  });
                }}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Quantidade no Palete"
                variant="outlined"
                size="small"
                onChange={(e) =>
                  handleChange('qtdProdutosPalet', e.target.value)
                }
              />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!formData.idFornecedor}
              >
                Fornecedor
              </InputLabel>
              <Select
                sx={{ padding: 0.3 }}
                size="small"
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Fornecedor"
                onChange={(e) => handleChange('idFornecedor', e.target.value)}
              >
                {fornecedores.map((fornecedor) => (
                  <MenuItem key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!formData.tipoFornecedor}
              >
                Tipo de Fornecedor
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.tipoFornecedor}
                label="Tipo de Fornecedor"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    tipoFornecedor: e.target.value,
                  });
                }}
              >
                <MenuItem value={'Nacional'}>Nacional</MenuItem>
                <MenuItem value={'Exterior'}>Internacional</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Quantidade Operadores"
                variant="outlined"
                size="small"
                type="number"
                onChange={(e) => handleChange('qtdOperadores', e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Meta Hora"
                variant="outlined"
                size="small"
                type="number"
                onChange={(e) => handleChange('metaHora', e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Comodite"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    comodite: e.target.value,
                  });
                }}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Tipo de Produção"
                variant="outlined"
                size="small"
                onChange={(e) => handleChange('tpProducao', e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={formData.statusProducao !== undefined}
              >
                Status Produção
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={String(formData.statusProducao)}
                label="Status Produção"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    statusProducao: e.target.value === 'true',
                  });
                }}
              >
                <MenuItem value="true">Ativo</MenuItem>
                <MenuItem value="false">Inativo</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
            {' '}
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Insumos
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Filme Strech"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(232, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Fita adesiva HM TR 02 Cores 48MM X 200MM"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mm</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(233, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Fita adesiva Transparente 48X100MM"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">mm</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(234, e.target.value || 0)}
              />
            </FormControl>
          </Box>

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
            {' '}
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Etiquetas
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta Lacre Reistar"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(235, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 20X20X4 QR CODE"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(236, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 100X60 CQ / LP / Recebimento"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(237, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 15X10X4 Fone e Voltagem"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(238, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 50x25x2"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(239, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 60X40X1 ARF / Bagvox"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(240, e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Etiqueta 100X80"
                variant="outlined"
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">m</InputAdornment>
                  ),
                }}
                onChange={(e) => handleInsumoChange(241, e.target.value || 0)}
              />
            </FormControl>
          </Box>

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
            {' '}
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Peso
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Peso Bruto "
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                onChange={(e) => handleChange('pesoBruto', e.target.value || 0)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Peso Palete"
                variant="outlined"
                size="small"
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                onChange={(e) => handleChange('pesoPalet', e.target.value || 0)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ display: 'flex' }}>
              <InputLabel
                id="demo-simple-select-label"
                shrink={!!formData.porteProduto}
              >
                Porte do Produto
              </InputLabel>
              <Select
                size="small"
                sx={{ padding: 0.3 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formData.porteProduto}
                label="Porte do Produto"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    porteProduto: e.target.value,
                  });
                }}
              >
                <MenuItem value={'Grande'}>Grande</MenuItem>
                <MenuItem value={'Medio'}>Médio</MenuItem>
                <MenuItem value={'Pequeno'}>Pequeno</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Quantidade peça master"
                variant="outlined"
                size="small"
                type="number"
                onChange={(e) =>
                  handleChange('qtdPecaMaster', e.target.value || 0)
                }
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Quantidade volumes"
                variant="outlined"
                size="small"
                type="number"
                onChange={(e) =>
                  handleChange('qtdVolumes', e.target.value || 0)
                }
              />
            </FormControl>
          </Box>
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
            {' '}
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Observação
            </Typography>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Observação"
                variant="outlined"
                size="small"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    observacoes: e.target.value,
                  });
                }}
              />
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
              endIcon={<DeleteIcon />}
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
              endIcon={<SendIcon />}
              type="submit"
              onClick={(e) => handleSubmitFormData(e)}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
