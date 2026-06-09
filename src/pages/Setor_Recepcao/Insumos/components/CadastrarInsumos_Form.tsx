import {
  ButtonCancel,
  ButtonRegister,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useInsumosEFornecedoresQuery } from '../hooks/useInsumosEFornecedoresQuery';
import useRegistrarInsumos from '../hooks/useRegistrarInsumos';

export default function CadastrarInsumos_Form() {
  const UM_LIST = [
    { value: 'CAIXA', label: 'CAIXA' },
    { value: 'UNIDADE', label: 'UNIDADE' },
    { value: 'PACOTE', label: 'PACOTE' },
    { value: 'FARDO', label: 'FARDO' },
    { value: 'GALÕES', label: 'GALÕES' },
  ];

  const { insumosFornecedores_data, insumosTipo_data } =
    useInsumosEFornecedoresQuery();

  const { CreateNewInsumosHandle, isPending } = useRegistrarInsumos();

  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSelectChange =
    <T extends object, K extends keyof T>(field: string, extractKey: K) =>
    (_event: React.SyntheticEvent, value: T | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value?.[extractKey] ?? '',
      }));
    };

  const handleClose = () => {
    setFormData({});
    handleShow();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    CreateNewInsumosHandle(formData).then(() => {
      setFormData({});
      handleShow();
    });
  };

  return (
    <>
      <ButtonRegister title="Cadastrar Insumos" onClick={handleShow} />
      <Dialog open={open} onClose={handleShow}>
        <Box component={'form'} onSubmit={handleSubmit}>
          <DialogTitle>Cadastro de Fornecedor de Insumos</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1} sx={{ py: 1 }} component={'form'}>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  label="Cod. Produto"
                  required
                  onChange={handleInputChange('codProduto')}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  label="Nome"
                  required
                  onChange={handleInputChange('nome')}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <InputAmvox
                  label="Custo"
                  required
                  onChange={handleInputChange('custo')}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <SelectAmvox
                  label="UM"
                  options={UM_LIST}
                  onChange={handleSelectChange('um', 'value')}
                  getOptionLabel={(option) => option.label}
                  isOptionEqualToValue={(option, value) =>
                    option.value === value.value
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputAmvox label="Quantidade UM" type="number" required />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <SelectAmvox<{ id: number; nome: string }>
                  label="Tipo"
                  options={insumosTipo_data}
                  onChange={handleSelectChange('id_insumos_tipo', 'id')}
                  getOptionLabel={(option) => option.nome}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <SelectAmvox<{ id: number; nome: string }>
                  label="Fornecedor"
                  options={insumosFornecedores_data}
                  onChange={handleSelectChange('id_insumos_fornecedor', 'id')}
                  getOptionLabel={(option) => option.nome}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
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
