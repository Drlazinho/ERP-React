import {
  ButtonCancel,
  ButtonCustom,
  ButtonSave,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { Edit } from '@mui/icons-material';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
} from '@mui/material';
import { FormEvent, useState } from 'react';
import useUpdateInsumos from '../hooks/useUpdateInsumos';

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

export default function AtualizarValorInsumos_Form({ item }: IProps) {
  const { nome } = useUsuarioLocal();
  const initialState = {
    id: item.id,
    custo: '',
  };
  const [open, setOpen] = useState(false);
  const handleShow = () => {
    setOpen(!open);
  };
  const [formData, setFormData] = useState(initialState);
  const { UpdateInsumos, isPending } = useUpdateInsumos();

  const handleClose = () => {
    setFormData(initialState);
    handleShow();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    UpdateInsumos(formData).then(() => {
      setFormData(initialState);
      handleShow();
    });
  };

  return (
    <>
      <ButtonCustom
        startIcon={<Edit />}
        title="Editar Valor"
        onClick={handleShow}
        color="primary"
        variant="outlined"
      />
      <Dialog open={open} onClose={handleShow}>
        <Box component={'form'} onSubmit={handleSubmit}>
          <DialogTitle>Alteração de Valor</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={1} sx={{ py: 1 }} component={'form'}>
              <Grid2 size={{ xs: 12 }}>
                <InputAmvox label="Produto" disabled value={item.id} focused />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <InputAmvox
                  label="Valor"
                  value={formData.custo}
                  type="number"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      custo: e.target.value,
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
            <ButtonSave type="submit" loading={isPending}/>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
