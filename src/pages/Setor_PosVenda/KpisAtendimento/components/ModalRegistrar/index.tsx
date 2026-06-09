import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
} from '@mui/material';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/toast.hook';
import SelectAmvox from '@/components/SelectAmvox';
import InputAmvox from '@/components/InputAmvox';
import { ButtonCancel } from '@/components/ButtonAmvox/ButtonsAmvox';
import { ButtonRegister } from '@/components/ButtonAmvox/ButtonsAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import {
  PostAtendimentos,
  GetCategorias,
  GetUsuarios,
} from '../../KpiAtendimento.service';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

const schema = z.object({
  emailUserAvaliado: z.object({
    email: z.string(),
    nome: z.string(),
  }),
  idTipoMeioComun: z.object({
    id: z.number(),
    tipo: z.string(),
  }),
  totalAtendimentos: z.string().min(1, 'Campo obrigatório').optional(),
  promotores: z.string().min(1, 'Campo obrigatório').optional(),
  neutros: z.string().min(1, 'Campo obrigatório').optional(),
  detratores: z.string().min(1, 'Campo obrigatório').optional(),
  dataReferente: z.string().min(1, 'Campo obrigatório'),
  observacao: z.string().max(100, 'Máximo de 100 caracteres').optional(),
});

const ModalRegistrar = () => {
  const { addToast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { email } = useUsuarioLocal();
  const handleClear = () => {
    reset();
  };

  const { data: categorias = [] } = useQuery<{ id: number; tipo: string }[]>({
    queryKey: ['categorias'],
    queryFn: GetCategorias,
  });

  const { data: agentes = [] } = useQuery<{ email: string; nome: string }[]>({
    queryKey: ['agentes', email],
    queryFn: () => GetUsuarios(email),
  });
  const queryClient = useQueryClient();

  const newAvaliacao = useMutation({
    mutationFn: PostAtendimentos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['atendimentos'] });
      addToast({
        type: 'success',
        title: 'Cadastro Realizado',
      });
      setOpen(false);
      handleClear();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }
      addToast({
        type: 'danger',
        title: 'Erro - Ao atualizar',
        description: errorMessage,
      });
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setLoading(true);
    const payload = {
      promotores: Number(data.promotores) || 0,
      detratores: Number(data.detratores) || 0,
      neutros: Number(data.neutros) || 0,
      dataReferente: data.dataReferente || '',
      emailUserAvaliado: data.emailUserAvaliado?.email || '',
      emailUserRegistro: email || '',
      idTipoMeioComun: Number(data.idTipoMeioComun?.id) || 0,
      totalAtendimentos: Number(data.totalAtendimentos) || 0,
      observacao: data.observacao || '',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newAvaliacao.mutate(payload as any, {
      onSettled: () => setLoading(false),
    });
  };

  return (
    <>
      <Button
        size="medium"
        variant="contained"
        onClick={() => setOpen(true)}
        color="error"
        sx={{ width: '200px' }}
      >
        Registrar
      </Button>

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          handleClear();
        }}
        maxWidth="sm"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Registrar </DialogTitle>
          <DialogContent>
            <Grid2 sx={{ mt: 3 }} container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="dataReferente"
                  control={control}
                  render={({ field }) => (
                    <InputDateAmvox
                      label="Data"
                      {...field}
                      error={!!errors.dataReferente}
                      helperText={errors.dataReferente?.message as string}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="emailUserAvaliado"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox<{ email: string; nome: string }>
                      options={agentes}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? '' : option.nome
                      }
                      isOptionEqualToValue={(option, value) =>
                        typeof option !== 'string' &&
                        typeof value !== 'string' &&
                        option.email === value.email
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      label="Agente"
                      placeholder="Selecione um agente"
                      error={!!errors.emailUserAvaliado}
                      helperText={errors.emailUserAvaliado?.message as string}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="idTipoMeioComun"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox<{ id: number; tipo: string }>
                      options={categorias}
                      getOptionLabel={(option) =>
                        typeof option === 'string' ? '' : option.tipo
                      }
                      isOptionEqualToValue={(option, value) =>
                        typeof option !== 'string' &&
                        typeof value !== 'string' &&
                        option.id === value.id
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      label="Categoria"
                      placeholder="Selecione uma categoria"
                      error={!!errors.idTipoMeioComun}
                      helperText={errors.idTipoMeioComun?.message as string}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="totalAtendimentos"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      label="Total de Atendimentos"
                      placeholder="Ex: 100"
                      inputProps={{ maxLength: 5 }}
                      error={!!errors.totalAtendimentos}
                      helperText={errors.totalAtendimentos?.message as string}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 5) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="promotores"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      label="Promotores"
                      placeholder="Ex: 10"
                      inputProps={{ maxLength: 5 }}
                      error={!!errors.promotores}
                      helperText={errors.promotores?.message as string}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 5) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="neutros"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      label="Neutros"
                      placeholder="Ex: 30"
                      inputProps={{ maxLength: 5 }}
                      error={!!errors.neutros}
                      helperText={errors.neutros?.message as string}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 5) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="detratores"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      label="Detratores"
                      placeholder="Ex: 10"
                      inputProps={{ maxLength: 5 }}
                      error={!!errors.detratores}
                      helperText={errors.detratores?.message as string}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 5) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="observacao"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      label="Observação"
                      inputProps={{ maxLength: 100 }}
                      error={!!errors.observacao}
                      helperText={errors.observacao?.message as string}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 100) {
                          field.onChange(value);
                        }
                      }}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', gap: 2, p: 2 }}>
            <ButtonCancel
              variant="contained"
              color="inherit"
              fullWidth
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancelar
            </ButtonCancel>
            <ButtonRegister
              fullWidth
              type="submit"
              variant="contained"
              color="error"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            >
              Registrar
            </ButtonRegister>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ModalRegistrar;
