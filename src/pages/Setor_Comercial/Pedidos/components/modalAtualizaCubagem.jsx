import * as React from 'react';
import {
  Modal,
  Typography,
  Button,
  Box,
  TextField,
  FormLabel,
  FormControl,
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

import BookmarkRemoveOutlinedIcon from '@mui/icons-material/BookmarkRemoveOutlined';

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

const interfaceCubagem = {
  codigo: '',
  descricao: '',
  item: '',
  local: '',
  quantidade: '',
  quantidadeEntregue: null,
  valorTotal: null,
  valorUnitario: null,
};

export default function AtualizaCubagem({ cubagem }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = React.useState(interfaceCubagem);

  React.useEffect(() => {
    setData(cubagem);
  }, [cubagem]);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="outlined"
        sx={{
          justifyContent: 'space-between',
          padding: '10px',
          fontWeight: 'bold',
        }}
      >
        <BookmarkRemoveOutlinedIcon /> - {data.quantidade}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Quantidade a ser cubada
          </Typography>
          <FormControl sx={{ width: '300px', padding: '20px' }}>
            <FormLabel sx={{ marginBottom: '5px' }}>Quantidade</FormLabel>
            <TextField
              type="number"
              placeholder={'Quantidade'}
              variant="outlined"
              id="outlined-multiline-static"
              rows={1}
              onChange={(e) => {
                if (e.target.value.length <= 3) {
                  setData({ ...data, quantidade: e.target.value });
                }
                // setData({
                //   ...data,
                //   quantidade: e.target.value,
                // });
              }}
              value={data.quantidade}
            />
          </FormControl>
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="success"
              endIcon={<SendIcon />}
              fullWidth
              onClick={() => {
                handleClose();
              }}
            >
              Enviar
            </Button>
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
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
