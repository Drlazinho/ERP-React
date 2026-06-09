import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import {
  FormControl,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import {
  GetFornecedoresChina,
  patchTabelaMestra,
} from '../../tabelaMestra.service';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import DeleteIcon from '@mui/icons-material/Delete';
import { useToast } from '../../../../../hooks/toast.hook';

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
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

export default function ModalEditar({ isOpen, onClose, row, GetDados }) {
  const { nome, email } = useUsuarioLocal();
  const [formData, setFormData] = useState({
    id: row.idTabelaMestra || 0,
    nomeUsuario: nome || '',
    idFornecedor: row.idFornecedor || 0,
    tipoFornecedor: row.tipoFornecedor || '',
    porteProduto: row.porteProduto || '',
    qtdProdutosPalet: row.qtdProdutosPalet || 0,
    observacao: row.observacoes || '',
    pesoBruto: row.pesoBruto || 0,
    pesoPalet: row.pesoPalet || 0,
    insumosProduto: row.listaInsumosUtilizados
      ? row.listaInsumosUtilizados.map((item) => ({
          idInsumos: item.idInsumos,
          qtdInsumosUsados: item.qtdInsumosUsados,
        }))
      : [],
    produtoMetaHora: {
      metaHora_Prod: row.produtoMetaHora || 0,
      qtdOperadores: row.operadores || 0,
    },
    comodite: row.comodite || '',
    tipoProducao: row.tpProducao || '',
    quantidadePecaMaster: row.qtdPecaMaster || 0,
    quantidadeVolumes: row.qtdVolumes || 0,
    statusProducao: row.statusProducao || true,
    codigo: row.codigo || '',
  });

  const { addToast } = useToast();
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleChange = (field, value) => {
    setFormData((prevState) => {
      const keys = field.split('.');
      if (keys.length > 1) {
        return {
          ...prevState,
          [keys[0]]: {
            ...prevState[keys[0]],
            [keys[1]]: value,
          },
        };
      }
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  const handleInsumoChange = (idInsumos, value) => {
    setFormData((prevState) => {
      const insumoExists = prevState.insumosProduto.some(
        (insumo) => insumo.idInsumos === idInsumos
      );

      return {
        ...prevState,
        insumosProduto: insumoExists
          ? prevState.insumosProduto.map((insumo) =>
              insumo.idInsumos === idInsumos
                ? { ...insumo, qtdInsumosUsados: value }
                : insumo
            )
          : [
              ...prevState.insumosProduto,
              { idInsumos, qtdInsumosUsados: value },
            ],
      };
    });
  };

  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      insumosProduto: formData.insumosProduto.map((insumo) => ({
        ...insumo,
        qtdInsumosUsados: Number(insumo.qtdInsumosUsados),
      })),
    };

    try {
      await patchTabelaMestra(dataToSend);
      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Produto atualizado com sucesso',
      });
      GetDados();
      onClose();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'A atualização falhou',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
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
              Editar Produto
            </Typography>
            <Button type="reset" onClick={onClose} variant="text">
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
            <TextField
              label="Código"
              variant="outlined"
              size="small"
              value={formData.codigo}
              onChange={(e) => handleChange('codigo', e.target.value)}
            />
            <TextField
              label="Quantidade no Palete"
              variant="outlined"
              size="small"
              type="number"
              value={formData.qtdProdutosPalet}
              onChange={(e) => handleChange('qtdProdutosPalet', e.target.value)}
            />
            <FormControl size="small">
              <InputLabel id="fornecedor-label">Fornecedor</InputLabel>
              <Select
                label="Fornecedor"
                labelId="fornecedor-label"
                value={formData.idFornecedor}
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
                onChange={(e) => handleChange('tipoFornecedor', e.target.value)}
              >
                <MenuItem value={'Nacional'}>Nacional</MenuItem>
                <MenuItem value={'Exterior'}>Internacional</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Quantidade Operadores"
              variant="outlined"
              size="small"
              type="number"
              value={formData.produtoMetaHora.qtdOperadores}
              onChange={(e) =>
                handleChange('produtoMetaHora.qtdOperadores', e.target.value)
              }
            />
            <TextField
              label="Meta por Hora"
              variant="outlined"
              size="small"
              type="number"
              value={formData.produtoMetaHora.metaHora_Prod}
              onChange={(e) =>
                handleChange('produtoMetaHora.metaHora_Prod', e.target.value)
              }
            />
            <TextField
              id="outlined-basic"
              label="Comodite"
              variant="outlined"
              size="small"
              value={formData.comodite}
              onChange={(e) => handleChange('comodite', e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Tipo de Produção"
              variant="outlined"
              size="small"
              value={formData.tipoProducao}
              onChange={(e) => handleChange('tipoProducao', e.target.value)}
            />
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
              onChange={(e) =>
                handleChange('statusProducao', e.target.value === 'true')
              }
            >
              <MenuItem value="true">Ativo</MenuItem>
              <MenuItem value="false">Inativo</MenuItem>
            </Select>
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 232
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(232, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 233
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(233, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 234
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(234, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 235
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(235, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 236
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(236, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 237
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(237, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 238
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(238, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 239
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(239, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 240
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(240, e.target.value)}
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
                value={
                  formData.insumosProduto?.find(
                    (insumo) => insumo.idInsumos === 241
                  )?.qtdInsumosUsados || ''
                }
                onChange={(e) => handleInsumoChange(241, e.target.value)}
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
                value={formData.pesoBruto}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                onChange={(e) => handleChange('pesoBruto', e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ display: 'flex' }}>
              <TextField
                id="outlined-basic"
                label="Peso Palete"
                variant="outlined"
                size="small"
                type="number"
                value={formData.pesoPalet}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                }}
                onChange={(e) => handleChange('pesoPalet', e.target.value)}
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
                onChange={(e) => handleChange('porteProduto', e.target.value)}
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
                value={formData.quantidadePecaMaster}
                onChange={(e) =>
                  handleChange('quantidadePecaMaster', e.target.value)
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
                value={formData.quantidadeVolumes}
                onChange={(e) =>
                  handleChange('quantidadeVolumes', e.target.value)
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
            <Typography
              sx={{ fontWeight: 'bold', color: '#333333', fontSize: '12px' }}
            >
              Observação
            </Typography>
            <TextField
              label="Observações"
              variant="outlined"
              size="small"
              multiline
              rows={3}
              value={formData.observacao}
              onChange={(e) => handleChange('observacao', e.target.value)}
            />
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
              onClick={onClose}
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
              color="primary"
              type="submit"
              onClick={(e) => handleSubmitFormData(e)}
              startIcon={
                loading ? <CircularProgress size={20} /> : <SendIcon />
              }
              disabled={loading}
            >
              {loading ? 'Enviando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
