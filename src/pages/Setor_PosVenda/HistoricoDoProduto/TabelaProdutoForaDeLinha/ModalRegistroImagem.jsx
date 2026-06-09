import { Box } from '@mui/joy';
import {
  Button,
  FormControl,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import ButtonCloseModal from '../../../../components/ButtonCloseModal';
import { atualizarImageForaLinha } from '../historicoDoProduto.service';
import { useToast } from '../../../../hooks/toast.hook';
import { Add } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  height: '50%',
  backgroundColor: 'white',
  borderRadius: '5%',
  p: 4,
  border: '2px solid #000',
  boxShadow: '0 3px 10px rgba(0, 0, 0, 0.5)'
};

const buttons = {
  paddingLeft: '50px',
  paddingTop: '80px',
};

const styleR = {
  width: '170px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '20px',
  border: '1px solid #f00',
  backgroundColor: '##f00',
};

const styleG = {
  width: '170px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '20px',
  border: '1px solid #28A745',
  backgroundColor: '#28A745',
};

const registroInicialImagem = {
  AnexoProduto: null,
  codigo: '',
};

export default function RegistroImagemProdutoPos({
  open,
  onClose,
  handleAtualizarLista,
  item,
}) {
  const [registroInfoImagem, setRegistroInfoImagem] = useState(
    registroInicialImagem
  );
  const { addToast } = useToast();
  useEffect(() => {
    if (item) {
      setRegistroInfoImagem({
        ...registroInfoImagem,
        codigo: item.codigo,
      });
    }
  }, [item]);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClear = () => {
    setRegistroInfoImagem(registroInicialImagem);
    onClose();
  };

  const handleSubmit = () => {
    setIsButtonDisabled(true);
    const formData = new FormData();

    formData.append('AnexoProduto', registroInfoImagem.AnexoProduto);
    formData.append('codigo', registroInfoImagem.codigo);
    atualizarImageForaLinha(formData)
      .then((res) => {
        addToast({
          type: 'success',
          description: 'Sucesso ao adicionar a imagem',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro na tentativa de atualizar a imagem',
        });
      })
      .finally(() => {
        handleClear();
        handleAtualizarLista();
        setIsButtonDisabled(false);
      });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      BackdropProps={{
        style: {
          backdropFilter: 'blur(0.9px)',
          backgroundColor: 'rgba(0, 0, 0, 0)',  
        },
      }}
    >
      <Box sx={style}>
        <ButtonCloseModal onClick={() => onClose()} />
        <Typography
          variant="h6"
          sx={{ textAlign: 'center', color: '#000', mb: 3 }}
        >
          Cadastrar/Atualizar Imagem do Produto
        </Typography>
        <form>
          <FormControl fullWidth>
            <TextField
              sx={{ mb: 3 }}
              label="Código: "
              variant="outlined"
              fullWidth
              name="codigo"
              disabled
              defaultValue={item?.codigo}
            />
          </FormControl>
          <TextField
            sx={{ mb: 3, textAlign: 'center', color: '#000' }}
            label="Descrição: "
            variant="outlined"
            fullWidth
            name="nome"
            disabled
            defaultValue={item?.nome}
          />
          <input
            className="form-control"
            name="Imagem"
            type="file"
            accept="image/png, image/jpeg"
            id="formFile"
            defaultValue={item?.anexoProduto}
            onChange={(e) =>
              setRegistroInfoImagem({
                ...registroInfoImagem,
                AnexoProduto: e.target.files[0],
              })
            }
          />
        </form>
        <Box sx={buttons}>
          <Button
            sx={styleG}
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            startIcon={
              isButtonDisabled ? (
                <CircularProgress size={20} />
              ) : (
                <Add />
              )
            }
          >
            ENVIAR
          </Button>
          <Button
            sx={styleR}
            variant="contained"
            color="error"
            onClick={handleClear}
          >
            CANCELAR
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
