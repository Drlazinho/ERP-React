import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
  IconButton,
} from '@mui/material';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/toast.hook';
import InputAmvox from '@/components/InputAmvox';
import CloseIcon from '@mui/icons-material/Close';
import { PatchEditarConta } from '../../orcamentoSetor.service';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CircularProgress from '@mui/material/CircularProgress';

const schema = z.object({
  codigo: z.string(),
  nome: z
    .string()
    .min(1, 'Campo obrigatório')
    .transform((str) => str.toUpperCase()),
});

const ModalEditarConta = ({ open, handleClose, data }) => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      codigo: data?.codigo || '',
      nome: data?.nome ? data.nome.toUpperCase() : '',
    },
  });

  const handleClear = () => {
    reset();
  };

  const queryClient = useQueryClient();

  const handleEditarConta = useMutation({
    mutationFn: (data) => PatchEditarConta(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orcamentos-setor'],
      });

      addToast({
        type: 'success',
        title: 'Edição realizado com sucesso',
      });
      handleClose();
      handleClear();
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Erro ao editar',
      });
    },
  });

  const onSubmit = (formData) => {
    const dataToSubmit = {
      ...formData,
      id: data.idConta,
      nome: formData.nome.toUpperCase(),
    };
    handleEditarConta.mutate(dataToSubmit);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        handleClose();
        handleClear();
      }}
      maxWidth="xs"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontWeight: 'bold' }}>Editar Conta</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} sx={{ mt: 3 }}>
            <Grid2 size={12}>
              <Controller
                name="codigo"
                control={control}
                render={({ field }) => (
                  <InputAmvox label="Código" {...field} disabled />
                )}
              />
            </Grid2>
            <Grid2 size={12}>
              <Controller
                name="nome"
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <InputAmvox
                    label="Descrição"
                    placeholder="Digite a descrição da conta"
                    {...restField}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    onChange={(e) => {
                      const upperValue = e.target.value.toUpperCase();
                      onChange(upperValue);
                    }}
                    inputProps={{
                      style: { textTransform: 'uppercase' },
                    }}
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button
            size="small"
            variant="contained"
            type="submit"
            startIcon={!handleEditarConta.isPending && <SaveAsIcon />}
            disabled={handleEditarConta.isPending}
          >
            {handleEditarConta.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Salvar'
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalEditarConta;
