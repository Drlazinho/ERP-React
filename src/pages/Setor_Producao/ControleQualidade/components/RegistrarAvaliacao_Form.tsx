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
//import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
//import { useToast } from '@/hooks/toast.hook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

//import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import SelectAmvox from '@/components/SelectAmvox';
import InputAmvox from '@/components/InputAmvox';
import CheckIcon from '@mui/icons-material/Check';

const semanaAvaliação = [
  { id: 1, semana: 'Semana 1' },
  { id: 2, semana: 'Semana 2' },
  { id: 3, semana: 'Semana 3' },
  { id: 4, semana: 'Semana 4' },
  { id: 5, semana: 'Semana 5' },
  { id: 6, semana: 'Semana 6' },
  { id: 7, semana: 'Semana 7' },
  { id: 8, semana: 'Semana 8' },
  { id: 9, semana: 'Semana 9' },
  { id: 10, semana: 'Semana 10' },
  { id: 11, semana: 'Semana 11' },
  { id: 12, semana: 'Semana 12' },
];

const schema = z.object({
  semana: z.object({
    id: z.number(),
    semana: z.string(),
  }),
  produto: z.object({
    codigo: z.number(),
    apelido: z.string(),
  }),
  qtdProduzida: z.number().min(1, 'Informe uma quantidade'),
  qtdDefeito: z.number().min(1, 'Informe uma quantidade'),
});

type FormValues = z.infer<typeof schema>;

const ListaProdutos = [
  {
    codigo: 1,
    apelido: 'Produto 1',
  },
  {
    codigo: 2,
    apelido: 'Produto 2',
  },
  {
    codigo: 3,
    apelido: 'Produto 3',
  },
  {
    codigo: 4,
    apelido: 'Produto 4',
  },
  {
    codigo: 5,
    apelido: 'Produto 5',
  },
];

const RegistrarAvaliacao_Form = () => {
  const [open, setOpen] = useState(false);
  //const { addToast } = useToast();

  const handleShow = () => {
    setOpen(!open);
  };

  const handleClear = () => {};

  const {
    //handleSubmit,
    //reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <ButtonRegister
        title="Novo Registro"
        startIcon={<AddIcon />}
        onClick={handleShow}
        color="error"
        sx={{ maxWidth: '300px' }}
      />
      <Dialog
        maxWidth={'sm'}
        fullWidth
        open={open}
        onClose={() => {
          handleShow();
          handleClear();
        }}
      >
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
            Registro de Avaliação Semanal
          </Typography>

          <IconButton onClick={handleShow}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid2 sx={{ mt: 3 }} container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="semana"
                control={control}
                render={({ field }) => (
                  <SelectAmvox
                    label="Semana"
                    options={semanaAvaliação}
                    getOptionLabel={(option) => option.semana}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    {...field}
                    //error={!!errors.semana}
                    //helperText={errors.semana?.message}
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Selecione a semana"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="produto"
                control={control}
                render={({ field }) => (
                  <SelectAmvox
                    label="Produto"
                    options={ListaProdutos}
                    getOptionLabel={(option) => option.apelido}
                    isOptionEqualToValue={(option, value) =>
                      option.codigo === value.codigo
                    }
                    {...field}
                    //error={!!errors.produto}
                    //helperText={errors.produto?.message}
                    sx={{ width: '100%' }}
                    size="small"
                    placeholder="Selecione o produto"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="qtdProduzida"
                control={control}
                render={({ field }) => (
                  <InputAmvox
                    label="Quantidade Produzida"
                    type="number"
                    {...field}
                    error={!!errors.qtdProduzida}
                    helperText={errors.qtdProduzida?.message}
                    size="small"
                  />
                )}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Controller
                name="qtdDefeito"
                control={control}
                render={({ field }) => (
                  <InputAmvox
                    label="Quantidade Defeito"
                    type="number"
                    {...field}
                    error={!!errors.qtdDefeito}
                    helperText={errors.qtdDefeito?.message}
                    size="small"
                  />
                )}
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'flex-end', mb: 2, mr: 2 }}>
          <ButtonRegister
            fullWidth
            type="submit"
            variant="contained"
            color="error"
            //onClick={handleSubmit(onSubmit)}
            //loading={loading}
            sx={{ maxWidth: '140px' }}
            startIcon={<CheckIcon />}
          >
            Registrar
          </ButtonRegister>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegistrarAvaliacao_Form;
