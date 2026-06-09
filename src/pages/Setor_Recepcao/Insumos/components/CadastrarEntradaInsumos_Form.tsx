import {
  ButtonCancel,
  ButtonRegister,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useInsumosEFornecedoresQuery } from '../hooks/useInsumosEFornecedoresQuery';
import SelectAmvox from '@/components/SelectAmvox';
import useRegistroEntrada_SaidaInsumos from '../hooks/useRegistroEntrada_SaidaInsumos';

export default function CadastrarEntradaInsumos_Form() {
  const { nome, id } = useUsuarioLocal();
  const initialState = {
    usuario: nome,
    usuarioId: id,
    usuarioSistema: 'WEB',
    tipoMovimentacao: 'ENTRADA',
    setor: 'RECEPÇÃO',
    descricao: '',
  };
  const [formData, setFormData] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };

  const { insumos_entrada_data } = useInsumosEFornecedoresQuery();
  const { CreateMovimentacaoInsumos, isPending } =
    useRegistroEntrada_SaidaInsumos();

  const handleClose = () => {
    setFormData(initialState);
    handleShow();
  };

  const handleSelectChange =
    <T extends object, K extends keyof T>(field: string, extractKey: K) =>
    (_event: React.SyntheticEvent, value: T | null) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value?.[extractKey] ?? '',
      }));
    };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    CreateMovimentacaoInsumos(formData).then(() => {
      setFormData(initialState);
      handleShow();
    });
  };

  return (
    <>
      <ButtonRegister title="Cadastro de Entrada" onClick={handleShow} />
      <Dialog fullWidth open={open} onClose={handleShow}>
        <Box component={'form'} onSubmit={handleSubmit}>
          <DialogTitle>Cadastro de Entrada de Insumos</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1} sx={{ py: 1 }} component={'form'}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputAmvox
                  label="Qtd. de Produto Movimentada"
                  required
                  type="number"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      qtdMov: parseInt(e.target.value),
                    }))
                  }
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <SelectAmvox<{ id: number; nome: string }>
                  label="Tipo"
                  options={insumos_entrada_data}
                  onChange={handleSelectChange('id_insumos', 'id')}
                  getOptionLabel={(option) => option.nome}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                />{' '}
              </Grid2>
            </Grid2>
            <Typography align="center" color="textDisabled">
              Usuário: {nome}
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <ButtonCancel onClick={handleClose} />
            <ButtonSave type="submit" loading={isPending}/>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
