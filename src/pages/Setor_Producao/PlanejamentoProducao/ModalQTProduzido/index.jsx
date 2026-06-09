import React, { useContext } from 'react';
import {
  FormControl,
  Box,
  Button,
  Typography,
  Modal,
  FormLabel,
  TextField,
  CircularProgress,
} from '@mui/material';

import AddBoxIcon from '@mui/icons-material/AddBox';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { atualizarPlanejamentoProducao } from '@/pages/Setor_Producao/PlanejamentoProducao/services/planejamentoProducao.service';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function RegistrarQuantidadeProduzida({
  value,
  codigo,
  observacao,
  id,
  prioridade,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToast();
  const { email } = useUsuarioLocal();
  const [data, setData] = React.useState({
    qtdRealizada: value || 0,
    codigo: codigo || 0,
    observacao: observacao || '',
    id: id || 0,
    prioridade: prioridade || 0,
    email: email,
  });

  const handleSubmit = () => {
    setLoading(true);
    atualizarPlanejamentoProducao(data)
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Registro efetuado.',
          description: 'Quantidade produzida foi registrada com sucesso.',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Registro não efetuado.',
          description:
            'Quantidade de produto informada maior que a quantidade pendente.',
        });
      });
    setLoading(false);
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddBoxIcon sx={{ color: 'green' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backdropFilter: 'blur(1px)',
          },
        }}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Registrar Quantidade Produzida
          </Typography>
          <FormControl sx={{ width: '300px', padding: '10px' }}>
            <FormLabel sx={{ marginBottom: '5px' }}>Código</FormLabel>
            <TextField
              type="text"
              placeholder={'Código'}
              variant="outlined"
              id="outlined-multiline-static"
              size="small"
              rows={1}
              onChange={(e) => {
                setData({ ...data, codigo: e.target.value });
              }}
              value={data.codigo}
              disabled
            />
          </FormControl>
          <FormControl sx={{ width: '300px', padding: '10px' }}>
            <FormLabel>Quantidade Produzida</FormLabel>
            <TextField
              type="number"
              placeholder={'Quantidade Produzida'}
              variant="outlined"
              id="outlined-multiline-static"
              rows={1}
              size="small"
              onChange={(e) => {
                setData({ ...data, qtdRealizada: Number(e.target.value) });
              }}
            />
          </FormControl>

          <FormControl sx={{ width: '300px', padding: '10px' }}>
            <FormLabel sx={{ marginBottom: '5px' }}>Obs</FormLabel>
            <TextField
              type="text"
              placeholder={'Obs'}
              variant="outlined"
              id="outlined-multiline-static"
              rows={1}
              size="small"
              onChange={(e) => {
                setData({ ...data, observacao: e.target.value });
              }}
              value={data.observacao}
            />
          </FormControl>
          <input
            type="hidden"
            value={data.id}
            onChange={(e) => {
              setData({ ...data, id: e.target.value });
            }}
          />
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1 }} fullWidth>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteIcon />}
              fullWidth
              type="reset"
              onClick={handleClose}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color={loading ? 'inherit' : 'success'}
              endIcon={
                loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <SendIcon />
                )
              }
              fullWidth
              type="submit"
              onClick={() => handleSubmit(data)}
              disabled={loading}
              sx={{
                backgroundColor: loading ? '#e0e0e0' : 'success.main',
                color: loading ? '#9e9e9e' : '#fff',
                '&:hover': {
                  backgroundColor: loading ? '#e0e0e0' : 'success.dark',
                },
              }}
            >
              {loading ? 'Enviando...' : 'Enviar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
