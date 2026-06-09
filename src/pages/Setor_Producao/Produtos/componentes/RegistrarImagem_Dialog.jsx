import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  Typography,
} from '@mui/material';
import { registrarProduto } from '@/services/produtos/produtos.service';
import { Queue } from '@mui/icons-material';
import { update } from 'react-spring';

const registroInicialImagem = {
  anexoProduto: '',
  codigo: '',
};

export default function RegistroImagem_Dialog({ item }) {
  const [open, setOpen] = React.useState(false);
  const [registroInfoImagem, setRegistroInfoImagem] = useState(
    registroInicialImagem
  );

  const registroImagem = async (value) => {
    const { anexoProduto, codigo } = value;

    const formData = new FormData();
    formData.append('anexoProduto', anexoProduto);
    formData.append('codigo', codigo);

    registrarProduto(formData)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Imagens enviada com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: _err.response.data.title,
        });
      })
      .finally(() => {
        setOpen(false);
      });
  };

  useEffect(() => {
    if (item) {
      setRegistroInfoImagem({
        anexoProduto: '',
        codigo: item.codigo,
      });
    }
  }, [item]);

  const handleClear = (e) => {
    e.preventDefault();
    setRegistroInfoImagem(registroInicialImagem);
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item) {
      registroImagem(registroInfoImagem);
    }
  };

  const handleShow = () => {
    setOpen(!open);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleShow}>
        <Queue />{' '}
      </Button>
      <Dialog open={open} onClose={handleShow} fullWidth maxWidth="sm">
        <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
          <Typography variant="h6">
            Cadastrar/Atualizar Imagem do Produto
          </Typography>
        </DialogTitle>

        <DialogContent dividers>
          <form>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Código"
                variant="outlined"
                name="codigo"
                value={item?.codigo || ''}
                disabled
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextField
                label="Apelido"
                variant="outlined"
                name="apelido"
                value={item?.apelido || ''}
                disabled
                fullWidth
              />
            </FormControl>

            <FormControl fullWidth>
              <input
                className="form-control"
                name="Imagem"
                type="file"
                accept="image/png, image/jpeg"
                id="formFile"
                onChange={(e) =>
                  setRegistroInfoImagem((prev) => ({
                    ...prev,
                    anexoProduto: e.target.files?.[0] || '',
                    codigo: item.codigo,
                  }))
                }
              />
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="success" onClick={handleSubmit}>
            ENVIAR
          </Button>
          <Button variant="contained" color="error" onClick={handleClear}>
            CANCELAR / FECHAR
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
