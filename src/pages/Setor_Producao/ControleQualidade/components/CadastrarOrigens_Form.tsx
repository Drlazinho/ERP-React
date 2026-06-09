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
import { PostCadastrarOrigem } from '../ControleDeQualidade.service';
import SelectAmvox from '@/components/SelectAmvox';

const schema = z.object({
  nomeOrigem: z.string().nonempty('O nome da origem é obrigatório'),
});

type FormValues = z.infer<typeof schema>;

type Origem = {
  nomeOrigem: string;
};

const CadastrarOrigens_Form = ({ origem }: { origem: Origem[] }) => {
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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nomeOrigem: '',
    },
  });

  const queryClient = useQueryClient();
  const handleDefeito = useMutation({
    mutationFn: (data) => PostCadastrarOrigem(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['origem-controle-qualidade'],
      });
      addToast({
        type: 'success',
        title: 'Origem cadastrada com sucesso',
      });
      handleShow();
      handleClear();
    },
    onError: () => {
      addToast({
        type: 'error',
        title: 'Erro ao cadastrar origem',
      });
    },
  });

  const onSubmit = (formData: FormValues) => {
    const dataToSubmit = {
      ...formData,
      idUsuarioLancamento: id,
      nomeOrigem: formData.nomeOrigem.toUpperCase(),
    };
    handleDefeito.mutate(dataToSubmit as any);
  };

  return (
    <>
      <ButtonRegister
        title="Cadastrar Origem"
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
              Cadastrar Origem
            </Typography>
            <IconButton onClick={handleShow}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Grid2 sx={{ mt: 3 }} container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <SelectAmvox
                  label="Origem Cadastrados"
                  options={origem.map((origens: { nomeOrigem: string }) => ({
                    label: origens.nomeOrigem,
                  }))}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="nomeOrigem"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      {...field}
                      label="Origem"
                      error={!!errors?.nomeOrigem?.message}
                      helperText={errors?.nomeOrigem?.message}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'flex-end', mb: 2, mr: 2 }}>
            <ButtonRegister
              title="Salvar"
              startIcon={<CheckIcon />}
              type="submit"
              color="success"
              sx={{ maxWidth: '300px' }}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CadastrarOrigens_Form;
