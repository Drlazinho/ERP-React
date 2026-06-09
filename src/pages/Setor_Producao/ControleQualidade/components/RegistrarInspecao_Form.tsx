import { useState } from 'react';
import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Box,
} from '@mui/material';
import { ButtonRegister } from '@/components/ButtonAmvox/ButtonsAmvox';
import { PostCadastrarControleDeQualidade } from '../ControleDeQualidade.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/toast.hook';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SelectAmvox from '@/components/SelectAmvox';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import CheckIcon from '@mui/icons-material/Check';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

const schema = z.object({
  dataRegistro: z.string().nonempty('Data da inspeção é obrigatória'),
  inspertor: z.string().min(1, 'Informe o inspetor'),
  linhaId: z.object({
    esteiraID: z.number(),
    nomeGalpaoLinha: z.string(),
  }),
  codigoItem: z.object({
    codigo: z.string(),
    nome: z.string(),
  }),
  quantidade: z.coerce
    .number({ invalid_type_error: 'Quantidade deve ser número' })
    .min(1, 'Informe uma quantidade válida'),
  tipoDeDefeito: z.object({
    id: z.number(),
    nomeDefeito: z.string(),
  }),
  observacao: z.string().max(100, 'Máximo de 100 caracteres').optional(),
  armazem: z.object({
    local: z.string(),
    localiz: z.string(),
  }),
  origemID: z.object({
    nomeOrigem: z.string(),
    id: z.number(),
  }),
});

type FormValues = z.infer<typeof schema>;

interface InspecaoCreateDTO {
  dataInspecao: string;
  inspetor: string;
  codigoItem: string;
  linhaId: number;
  quantidade: number;
  observacao?: string;
  armazem: string;
  idUsuarioLancamento: number;
  origemID: number;
  tipoDeDefeito: number;
}

const RegistrarInspecao_Form = ({
  ListaProdutos = [],
  LinhasProducao = [],
  Armazens = [],
  Origem = [],
  Defeitos = [],
}) => {
  const [open, setOpen] = useState(false);
  const { addToast } = useToast();
  const { id: idUsuarioLogado } = useUsuarioLocal();

  const handleShow = () => setOpen((prev) => !prev);
  const handleClear = () => reset();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();
  const { mutate: cadastrarInspecao, isPending } = useMutation<
    any,
    unknown,
    InspecaoCreateDTO
  >({
    mutationFn: (dto) => PostCadastrarControleDeQualidade(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['controle-qualidade'],
      });
      addToast({ type: 'success', title: 'Inspeção cadastrada com sucesso' });
      handleShow();
      handleClear();
    },
    onError: () => {
      addToast({ type: 'danger', title: 'Erro ao cadastrar inspeção' });
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload: InspecaoCreateDTO = {
      dataInspecao: new Date(data.dataRegistro).toISOString(),
      inspetor: data.inspertor,

      codigoItem: String(data.codigoItem.codigo),
      linhaId: data.linhaId.esteiraID,
      quantidade: data.quantidade,
      observacao: data.observacao || '',
      armazem: data.armazem.local,
      idUsuarioLancamento: Number(idUsuarioLogado),
      origemID: Number(data.origemID.id),
      tipoDeDefeito: data.tipoDeDefeito.id,
    };

    cadastrarInspecao(payload);
  };

  return (
    <>
      <ButtonRegister
        title="Novo Registro"
        startIcon={<AddIcon />}
        onClick={() => {
          handleShow();
          handleClear();
        }}
        color="error"
        sx={{ maxWidth: '300px' }}
      />

      <Dialog maxWidth={'sm'} open={open} onClose={handleShow}>
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
              Novo Registro de Inspeção
            </Typography>
            <IconButton onClick={handleShow}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography
                sx={{ fontWeight: 'bold', fontSize: '12px', color: '#333' }}
              >
                Dados da inspeção
              </Typography>
              <Typography sx={{ borderBottom: '1px solid #ccc' }} />
            </Box>

            <Grid2 sx={{ mt: 3 }} container spacing={2}>
              {/* Data da inspeção */}
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="dataRegistro"
                  control={control}
                  render={({ field }) => (
                    <InputDateAmvox
                      {...field}
                      label="Data da Inspeção"
                      error={!!errors.dataRegistro}
                      helperText={errors.dataRegistro?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="inspertor"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      {...field}
                      label="Inspetor"
                      placeholder="Informe o Inspetor"
                      error={!!errors.inspertor}
                      helperText={errors.inspertor?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="linhaId"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox
                      {...field}
                      value={field.value ?? null}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      label="Linha"
                      options={LinhasProducao}
                      getOptionLabel={(opt) => opt.nomeGalpaoLinha}
                      isOptionEqualToValue={(opt, val) =>
                        opt.esteiraID === val.esteiraID
                      }
                      placeholder="Selecione a linha"
                      error={!!errors.linhaId}
                      helperText={errors.linhaId?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Controller
                  name="codigoItem"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox
                      {...field}
                      value={field.value ?? null}
                      onChange={(_, newValue) => {
                        field.onChange(newValue);
                      }}
                      label="Produto"
                      options={ListaProdutos}
                      getOptionLabel={(opt) => `${opt.codigo} - ${opt.nome}`}
                      isOptionEqualToValue={(opt, val) =>
                        opt.codigo === val?.codigo
                      }
                      filterOptions={(options, { inputValue }) => {
                        const input = inputValue.toLowerCase();
                        return options.filter((option) =>
                          `${option.codigo} ${option.nome}`
                            .toLowerCase()
                            .includes(input)
                        );
                      }}
                      placeholder="Selecione o produto"
                      error={!!errors.codigoItem}
                      helperText={errors.codigoItem?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="quantidade"
                  control={control}
                  render={({ field }) => (
                    <InputAmvox
                      {...field}
                      label="Quantidade"
                      placeholder="Ex.: 10"
                      error={!!errors.quantidade}
                      helperText={errors.quantidade?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="origemID"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox
                      {...field}
                      value={field.value ?? null}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      label="Origem"
                      options={Origem}
                      getOptionLabel={(opt) => opt.nomeOrigem}
                      isOptionEqualToValue={(opt, val) => opt.id === val.id}
                      placeholder="Selecione a origem"
                      error={!!errors.origemID}
                      helperText={errors.origemID?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="armazem"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox
                      {...field}
                      value={field.value ?? null}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      label="Armazém de Destino"
                      options={Armazens}
                      getOptionLabel={(opt) => opt.localiz}
                      isOptionEqualToValue={(opt, val) =>
                        opt.local === val.local
                      }
                      placeholder="Selecione o armazém"
                      error={!!errors.armazem}
                      helperText={errors.armazem?.message}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Controller
                  name="tipoDeDefeito"
                  control={control}
                  render={({ field }) => (
                    <SelectAmvox
                      {...field}
                      value={field.value ?? null}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      options={Defeitos}
                      getOptionLabel={(opt) => opt.nomeDefeito}
                      isOptionEqualToValue={(opt, val) => opt.id === val.id}
                      label="Defeito"
                      placeholder="Selecione o defeito"
                      error={!!errors.tipoDeDefeito}
                      helperText={errors.tipoDeDefeito?.message}
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
                      {...field}
                      label="Observação"
                      placeholder="Ex.: Aparelho caiu durante o processo"
                      error={!!errors.observacao}
                      helperText={errors.observacao?.message}
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

export default RegistrarInspecao_Form;
