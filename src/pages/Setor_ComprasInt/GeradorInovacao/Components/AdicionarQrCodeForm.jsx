import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormHelperText,
  FormLabel,
  Grid2,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

import {
  BuscarFornecedoresChina,
  BuscarProdutosSemImagem,
  PostObterQrCode,
  GetObterVoltagem,
  GetObterNacionalidade,
  GetObterMes,
  GetObterAno,
} from '../GerarCodigoBarra.service';
import { useToast } from '@/hooks/toast.hook';
import { QrCode } from '@mui/icons-material';

const schema = z.object({
  codProduto: z.string().min(1, 'Código do produto é obrigatório'),
  siglaProduto: z.string().min(1, 'Produto é obrigatório'),
  fornecedor: z.string().min(1, 'Fornecedor é obrigatório'),
  proforma: z.string().min(1, 'Proforma é obrigatório'),
  ano: z.object({
    idInovacaoAno: z.number().min(1, 'Selecione um ano'),
    ano: z.number(),
  }),
  mes: z.object({
    idInovacaoMes: z.number().min(1, 'Selecione um mês'),
    mes: z.string(),
  }),
  voltagem: z.object({
    idInovacaoVoltagem: z.number().min(1, 'Selecione uma voltagem'),
    voltagem: z.string(),
  }),
  nacionalidade: z.object({
    idInovacaoNacionalidade: z.number().min(1, 'Selecione uma nacionalidade'),
    nacionalidade: z.string(),
  }),
  quantidade: z.number().min(1, 'Informe uma quantidade'),
});

export default function AdicionarQrCodeForm({ update }) {
  const { addToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { id } = useUsuarioLocal();
  const [produtoSelecionado, setProdutoSelecionado] = React.useState(null);

  const handleClear = () => {
    reset();
  };

  const { data: ListaProdutos = [] } = useQuery({
    queryKey: ['listaProdutos'],
    queryFn: BuscarProdutosSemImagem,
  });

  const { data: ListaFornecedoresChina = [] } = useQuery({
    queryKey: ['listaFornecedoresChina'],
    queryFn: BuscarFornecedoresChina,
  });

  const { data: ListaAno = [] } = useQuery({
    queryKey: ['listaAno'],
    queryFn: GetObterAno,
  });

  const { data: ListaMes = [] } = useQuery({
    queryKey: ['listaMes'],
    queryFn: GetObterMes,
  });

  const { data: ListaVoltagem = [] } = useQuery({
    queryKey: ['listaVoltagem'],
    queryFn: GetObterVoltagem,
  });

  const { data: ListaNacionalidade = [] } = useQuery({
    queryKey: ['listaNacionalidade'],
    queryFn: GetObterNacionalidade,
  });

  const newQrCode = useMutation({
    mutationFn: PostObterQrCode,
    onSuccess: (response) => {
      update();
      addToast({
        type: 'success',
        title: 'Cadastro Realizado',
      });
      setOpen(false);
      handleClear();
    },
    onError: (error) => {
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
        title: 'Erro',
        description: errorMessage,
      });
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ano: { idInovacaoAno: 0, ano: 0 },
      mes: { idInovacaoMes: 0, mes: '' },
      voltagem: { idInovacaoVoltagem: 0, voltagem: '' },
      nacionalidade: { idInovacaoNacionalidade: 0, nacionalidade: '' },
      quantidade: 0,
    },
  });

  const onSubmit = (data) => {
    const codProduto = getValues('codProduto');
    const voltagemSelecionada = getValues('voltagem');
    const mesSelecionado = getValues('mes');
    const anoSelecionado = getValues('ano');
    const nacionalidadeSelecionada = getValues('nacionalidade');

    const payload = {
      codProduto,
      fornecedor: data.fornecedor,
      voltagem: voltagemSelecionada || { idInovacaoVoltagem: 0, voltagem: '' },
      mes: mesSelecionado || { idInovacaoMes: 0, mes: '' },
      ano: anoSelecionado || { idInovacaoAno: 0, ano: 0 },
      nacionalidade: nacionalidadeSelecionada || {
        idInovacaoNacionalidade: 0,
        nacionalidade: '',
      },
      proforma: data.proforma,
      quantidade: data.quantidade,
      userId: id,
    };

    newQrCode.mutate(payload);
  };

  return (
    <>
      <Button
        size="small"
        variant="contained"
        onClick={() => setOpen(true)}
        color="error"
        startIcon={<QrCode />}
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
        maxWidth="md"
        fullWidth
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Registrar QRCode</DialogTitle>
          <DialogContent>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12 }}>
                <FormLabel>Produto</FormLabel>
                <Controller
                  name="siglaProduto"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      fullWidth
                      options={ListaProdutos}
                      getOptionLabel={(option) =>
                        `${option.codigo} - ${option.nome}`
                      }
                      value={produtoSelecionado}
                      onChange={(_, newValue) => {
                        setProdutoSelecionado(newValue);
                        if (newValue) {
                          setValue('siglaProduto', newValue.sigla);
                          setValue('codProduto', newValue.codigo);
                        } else {
                          setValue('siglaProduto', '');
                          setValue('codProduto', '');
                        }
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option?.codigo === value?.codigo
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.codProduto}
                          helperText={errors.codProduto?.message}
                        />
                      )}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={{ xs: 12 }}>
                <FormLabel>Fornecedor</FormLabel>
                <Controller
                  name="fornecedor"
                  control={control}
                  render={({ field }) => {
                    const selectedSupplier = ListaFornecedoresChina.find(
                      (p) => p.id.toString().padStart(6, '0') === field.value
                    );

                    return (
                      <Autocomplete
                        fullWidth
                        options={ListaFornecedoresChina}
                        getOptionLabel={(option) =>
                          `${option.id.toString().padStart(6, '0')} - ${
                            option.nome
                          }`
                        }
                        value={selectedSupplier || null}
                        onChange={(_, newValue) => {
                          if (newValue) {
                            const fornecedorFormatado = newValue.id
                              .toString()
                              .padStart(6, '0');
                            setValue('fornecedor', fornecedorFormatado, {
                              shouldValidate: true,
                            });
                          } else {
                            setValue('fornecedor', '', {
                              shouldValidate: true,
                            });
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={!!errors.fornecedor}
                            helperText={errors.fornecedor?.message}
                            value={
                              selectedSupplier
                                ? `${selectedSupplier.id
                                    .toString()
                                    .padStart(6, '0')} - ${
                                    selectedSupplier.nome
                                  }`
                                : ''
                            }
                          />
                        )}
                      />
                    );
                  }}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Voltagem</FormLabel>
                <Controller
                  name="voltagem"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={ListaVoltagem}
                      getOptionLabel={(option) => option.voltagem || ''}
                      isOptionEqualToValue={(option, value) =>
                        option.idInovacaoVoltagem === value.idInovacaoVoltagem
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.voltagem}
                          helperText={errors.voltagem?.message}
                          placeholder="Digite a voltagem"
                        />
                      )}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Mês</FormLabel>
                <Controller
                  name="mes"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={ListaMes}
                      getOptionLabel={(option) => option.mes || ''}
                      isOptionEqualToValue={(option, value) =>
                        option.idInovacaoMes === value.idInovacaoMes
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.mes}
                          helperText={errors.mes?.message}
                          placeholder="Digite o mês"
                        />
                      )}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Ano</FormLabel>
                <Controller
                  name="ano"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={ListaAno}
                      getOptionLabel={(option) => String(option.ano || '')}
                      isOptionEqualToValue={(option, value) =>
                        option.idInovacaoAno === value.idInovacaoAno
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.ano}
                          helperText={errors.ano?.message}
                          placeholder="Digite o ano"
                        />
                      )}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Nacionalidade</FormLabel>
                <Controller
                  name="nacionalidade"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      options={ListaNacionalidade}
                      getOptionLabel={(option) => option.nacionalidade || ''}
                      isOptionEqualToValue={(option, value) =>
                        option.idInovacaoNacionalidade ===
                        value.idInovacaoNacionalidade
                      }
                      onChange={(_, data) => field.onChange(data)}
                      value={field.value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors.nacionalidade}
                          helperText={errors.nacionalidade?.message}
                          placeholder="Digite a nacionalidade"
                        />
                      )}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Proforma</FormLabel>
                <Controller
                  name="proforma"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="text"
                      error={!!errors.proforma}
                      helperText={errors.proforma?.message}
                      placeholder="Digite o Proforma"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value);
                      }}
                    />
                  )}
                />
              </Grid2>

              <Grid2 size={{ xs: 12, sm: 6 }}>
                <FormLabel>Quantidade</FormLabel>
                <Controller
                  name="quantidade"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      type="number"
                      error={!!errors.quantidade}
                      helperText={errors.quantidade?.message}
                      placeholder="Digite a quantidade"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpen(false);
                reset();
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
