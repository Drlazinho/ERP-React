import {
  ButtonCancel,
  ButtonCustom,
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
import { ExitToApp } from '@mui/icons-material';
import useRegistroEntrada_SaidaInsumos from '../hooks/useRegistroEntrada_SaidaInsumos';

interface IProps {
  item: {
    id: number;
    tipo: string;
    fornecedor: string;
    codProduto: string;
    nome: string;
    custo: number;
    um: string;
    qtd_UM: number;
    saldo: number;
  };
}

export default function CadastrarSaidaInsumos_Form({ item }: IProps) {
  const { nome, id } = useUsuarioLocal();
  const initialState = {
    usuario: nome,
    usuarioId: id,
    usuarioSistema: 'WEB',
    tipoMovimentacao: 'SAIDA',
    descricao: '',
    id_insumos: item.id,
  };
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };
  const [formData, setFormData] = useState(initialState);
  const { setores_data } = useInsumosEFornecedoresQuery();
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
      <ButtonCustom
        startIcon={<ExitToApp />}
        title="Saída"
        onClick={handleShow}
        variant="outlined"
        color="error"
      />{' '}
      <Dialog fullWidth open={open} onClose={handleShow}>
        <Box component={'form'} onSubmit={handleSubmit}>
          <DialogTitle>Cadastro de Saída de Insumos</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1} sx={{ py: 1 }} component={'form'}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputAmvox
                  label="Produto"
                  required
                  type="number"
                  value={item.id}
                  disabled
                  focused
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputAmvox
                  label="Quantidade Movimentada"
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
                <SelectAmvox<{ setor: string }>
                  label="Setor"
                  options={setores_data}
                  onChange={handleSelectChange('setor', 'setor')}
                  getOptionLabel={(option) => option.setor}
                  isOptionEqualToValue={(option, value) =>
                    option.setor === value.setor
                  }
                />{' '}
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <InputAmvox
                  label="Destino"
                  required
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                />
              </Grid2>
            </Grid2>
            <Typography align="center" color="textDisabled">
              Usuário: {nome}
            </Typography>
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
