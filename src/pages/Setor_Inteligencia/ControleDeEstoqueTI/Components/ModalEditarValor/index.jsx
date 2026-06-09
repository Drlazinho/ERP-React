import * as React from 'react';
import { Button, Typography, TextField, Box, Grid, Modal } from '@mui/material';

import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import EditIcon from '@mui/icons-material/Edit';
import { atualizarNovoValorInsumo } from '@/pages/Setor_Recepcao/Insumos/insumos.service';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

 const interfaceEditarValor = {
  id: '',
  custo: '',
};

export default function ModalEditarValor({data, handleFetchInsumos}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { nome } = useUsuarioLocal();

  const [send, setSend] = React.useState(
    interfaceEditarValor
  );

  const PIGMEU = React.useCallback(() => {
    setSend({
      ...send,
      id: data.id,
      custo: data.custo
    })
  });

  const MELQUILTES = React.useCallback(() => {
    atualizarNovoValorInsumo(send).then((res) => {
      handleFetchInsumos();
      handleClose();
    });
  });

  React.useEffect(() => {
    PIGMEU();
  }, [data]);

  return (
    <div>
      <Button variant="outlined" startIcon={<EditIcon />} onClick={handleOpen}>
        Editar
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
              Alteração de Valor
            </Typography>
          </Box>

          <Box sx={{ mt: '30px' }}>
            <Grid container direction="row" columns={12} spacing={1}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Produto</Typography>
                <TextField
                  id="outlined-basic"
                  variant="filled"
                  sx={{ width: '100%' }}
                  value={send.id}
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Valor</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  sx={{ width: '100%' }}
                  value={send.custo}
                  onChange={(e) =>
                    setSend({
                      ...send,
                      custo: e.target.value,
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
              onClick={MELQUILTES}
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
