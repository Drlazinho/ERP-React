import { useState } from 'react';
import {
  IconButton,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
} from '@mui/material';
import { ButtonRegister } from '@/components/ButtonAmvox/ButtonsAmvox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/toast.hook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import InputAmvox from '@/components/InputAmvox';
import CheckIcon from '@mui/icons-material/Check';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { PostCadastrarDefeito } from '../ControleDeQualidade.service';
import SelectAmvox from '@/components/SelectAmvox';

const schema = z.object({
  nomeDefeito: z.string().nonempty('O nome do defeito é obrigatório'),
});

type FormValues = z.infer<typeof schema>;

type Defeito = {
  nomeDefeito: string;
};

const CadastrarDefeito_Form = ({ defeitos }: { defeitos: Defeito[] }) => {
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();
  const { id } = useUsuarioLocal();

  const handleShow = () => {
    setOpen(!open);
  };

  const handleClear = () => {
    reset();
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeDefeito: '',
    },
  });

  const queryClient = useQueryClient();

  const { mutate: handleDefeito, isPending } = useMutation({
    mutationFn: (data: FormValues) =>
      PostCadastrarDefeito({
        ...data,
        idUsuarioLancamento: id,
        nomeDefeito: data.nomeDefeito.toUpperCase(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['defeitos-controle-qualidade'],
      });
      addToast({
        type: 'success',
        title: 'Defeito cadastrado com sucesso',
      });
      handleShow();
      handleClear();
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar defeito',
        description: error.message,
      });
    },
  });
  const onSubmit = (formData: FormValues) => {
    handleDefeito(formData as any);
  };

  return (
    <>
      <ButtonRegister
        title="Cadastrar Defeito"
        startIcon={<AddIcon />}
        onClick={handleShow}
        color="error"
        sx={{ maxWidth: '300px' }}
      />

      <Dialog
        maxWidth={'xs'}
        fullWidth
        open={open}
        onClose={() => {
          handleShow();
          handleClear();
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}
            >
              Cadastrar Defeito
            </Typography>
            <IconButton onClick={handleShow}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid2 sx={{ mt: 1 }} container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <SelectAmvox
                  label="Defeitos Cadastrados"
                  options={defeitos.map((defeito) => ({
                    label: defeito.nomeDefeito,
                  }))}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="nomeDefeito"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      {...field}
                      label="Defeito"
                      error={!!errors?.nomeDefeito}
                      helperText={errors?.nomeDefeito?.message}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end', mb: 2, mr: 2 }}>
            <ButtonRegister
              title="Salvar"
              startIcon={isSubmitting && <CheckIcon />}
              type="submit"
              color="success"
              sx={{ maxWidth: '300px' }}
              disabled={isPending || isSubmitting}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CadastrarDefeito_Form;
