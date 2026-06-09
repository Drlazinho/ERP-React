import {
  ButtonCancel,
  ButtonRegister,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import useRegistrarFornecedorInsumos from '../hooks/useRegistrarFornecedorInsumos'

export default function CadastrarFornecedorInsumos_Form() {
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };

  const { CreateFornecedorInsumos, isPending } = useRegistrarFornecedorInsumos()

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleClose = () => {
    setFormData({});
    handleShow();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(formData)
    CreateFornecedorInsumos(formData).then(() => {
      setFormData({});
      handleShow();
    });
  };

  return (
    <>
      <ButtonRegister
        title="Cadastro de Fornecedor de Insumos"
        onClick={handleShow}
      />
      <Dialog open={open} onClose={handleShow}>
        <Box component={'form'} onSubmit={handleSubmit}>
          <DialogTitle>Cadastro de Fornecedor de Insumos</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1} sx={{ py: 1 }}>
              <Grid2 size={{ xs: 12 }}>
                <InputAmvox
                  label="Cod. Fornecedor"
                  required
                  onChange={handleInputChange('codFornecedor')}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <InputAmvox
                  label="Nome"
                  required
                  onChange={handleInputChange('nome')}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <InputAmvox
                  label="Descrição"
                  required
                  multiline
                  rows={4}
                  onChange={handleInputChange('descricao')}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <ButtonCancel onClick={handleClose} />
            <ButtonSave type="submit" loading={isPending} />
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
