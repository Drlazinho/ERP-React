import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  Typography,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

import { Add, ExitToApp } from '@mui/icons-material';
import ButtonCloseModal from '@/components/ButtonCloseModal';
import LabelInput from '@/components/Forms/LabelInput';
import { useToast } from '@/hooks/toast.hook';
import { NotaFiscalImagemPagamentoPost } from '@/services/notasFiscaisImagem.service';
import { MdAttachMoney } from 'react-icons/md';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  height: 600,
  bgcolor: '#fff',
  p: 4,
};

const initialState = {
  numeroNotaFiscal: '',
  arquivo: '',
};

export function ModalPagamento({
  handlePagamento,
  numeroNotaFiscal,
  updateTabela,
}) {
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();

  const handleOpen = (value) => {
    setOpen(true);
    setFormData({
      NumeroNotaFiscal: value,
      Arquivo: '',
    });
  };

  const handleClose = () => {
    setFormData(initialState);
    setOpen(false);
  };

  const handleAddPagamento = (value) => {
    const { Arquivo, NumeroNotaFiscal } = value;
    const formDataObj = new FormData();
    formDataObj.append('Arquivo', Arquivo);
    formDataObj.append('NumeroNotaFiscal', NumeroNotaFiscal);
    try {
      NotaFiscalImagemPagamentoPost(formDataObj);

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Pagamento cadastrado com sucesso',
      });
      handleClose();
      updateTabela();
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Erro ao cadastrar pagamento',
      });
      handleClose();
      setFormData(initialState);
    }
  };

  return (
    <div>
      <LoadingButton
        onClick={() => handleOpen(numeroNotaFiscal)}
        variant="contained"
        startIcon={<MdAttachMoney style={{ color: 'black' }} />}
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid grey',
        }}
      >
        <span className="6px" style={{ color: 'black', whiteSpace: 'nowrap' }}>
          FAZER PAGAMENTO
        </span>
      </LoadingButton>
      <Modal
        open={open}
        handleClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box component={'form'} sx={{ ...style, width: 800, height: 300 }}>
          <ButtonCloseModal onClick={handleClose} />
          <Typography
            variant="h6"
            component={'p'}
            textAlign={'center'}
            color={'#000'}
          >
            Registrar Nota de Pagamento
          </Typography>
          <Typography
            variant="h6"
            component={'p'}
            textAlign={'center'}
            color={'#000'}
            sx={{ fontWeight: 'bold' }}
          >
            NF {numeroNotaFiscal}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                flex: 2,
              }}
            >
              <FormLabel>Anexo</FormLabel>
              <LabelInput
                htmlFor="formFile"
                className="form-label"
                name="anexo"
                type="file"
                accept="application/pdf"
                id="formFile"
                onChange={(e) => {
                  setFormData({ ...formData, Arquivo: e.target.files[0] });
                }}
              />
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'end', my: 2, gap: 2 }}>
              <Button
                type="reset"
                variant="contained"
                color="success"
                startIcon={<Add />}
                size="small"
                onClick={() => handleAddPagamento(formData)}
              >
                Registrar
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                endIcon={<ExitToApp />}
                onClick={handleClose}
              >
                Cancelar/Fechar
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
