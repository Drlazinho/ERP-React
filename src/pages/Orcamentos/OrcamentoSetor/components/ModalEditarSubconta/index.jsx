import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  Typography,
  IconButton,
  CircularProgress,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/toast.hook';
import CloseIcon from '@mui/icons-material/Close';
import { PatchEditarSubconta } from '../../orcamentoSetor.service';
import SaveIcon from '@mui/icons-material/Save';
import { update } from 'react-spring';

const meses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  valoresMensais: z.array(
    z.object({
      mes: z.number(),
      valorOrcado: z.number().min(0, 'Valor não pode ser negativo'),
      valorRealizado: z.number().min(0, 'Valor não pode ser negativo'),
    })
  ),
});

const ModalEditarSubconta = ({
  open,
  handleClose,
  data,
  onUpdate,
  openContaId,
}) => {
  const { addToast } = useToast();
  const [editandoMes, setEditandoMes] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: data?.nome || '',
      valoresMensais:
        data?.orcamentoMensal
          ?.map((item) => ({
            mes: item.mes,
            valorOrcado: item.valorOrcado,
            valorRealizado: item.valorRealizado,
          }))
          .sort((a, b) => a.mes - b.mes) ||
        Array(12)
          .fill()
          .map((_, i) => ({
            mes: i + 1,
            valorOrcado: 0,
            valorRealizado: 0,
          })),
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData) =>
      PatchEditarSubconta({
        id: data.idContaDetalhe,
        nome: formData.nome.toUpperCase(),
        valoresMensais: formData.valoresMensais.map((item) => ({
          mes: item.mes,
          valorOrcado: Number(item.valorOrcado),
          valorRealizado: Number(item.valorRealizado),
        })),
      }),
    onSuccess: () => {
      onUpdate();
      queryClient.invalidateQueries(['detalhes-conta', openContaId]);
      handleClose();
      addToast({
        type: 'success',
        title: 'Subconta atualizada com sucesso!',
      });
    },
    onError: (error) => {
      addToast({
        type: 'error',
        title: 'Erro ao atualizar subconta',
        description: error.message,
      });
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value || 0);
  };

  const handleMonetaryChange = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    return numericValue ? parseFloat(numericValue) / 100 : 0;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      scroll="paper"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Editar Subconta: {data?.codigo}</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid2 container spacing={3} sx={{ mb: 3 }}>
            <Grid2 size={12}>
              <Controller
                name="nome"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nome da Subconta"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      style: { textTransform: 'uppercase' },
                    }}
                    onChange={(e) =>
                      field.onChange(e.target.value.toUpperCase())
                    }
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                )}
              />
            </Grid2>
          </Grid2>

          <TableContainer component={Paper}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Mês</TableCell>
                  <TableCell align="right">Valor Orçado</TableCell>
                  <TableCell align="right">Valor Realizado</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <Controller
                  name="valoresMensais"
                  control={control}
                  render={({ field }) => (
                    <>
                      {field.value.map((mesData, index) => (
                        <TableRow key={mesData.mes}>
                          <TableCell>{meses[mesData.mes - 1]}</TableCell>
                          <TableCell align="right">
                            {editandoMes === index ? (
                              <TextField
                                fullWidth
                                variant="outlined"
                                valueIsNumericString
                                value={
                                  mesData.valorOrcado !== undefined
                                    ? new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      }).format(
                                        parseFloat(mesData.valorOrcado || 0)
                                      )
                                    : ''
                                }
                                sx={{
                                  '& .MuiInputBase-root': {
                                    height: '40px',
                                  },
                                }}
                                onChange={(e) => {
                                  const newValores = [...field.value];
                                  newValores[index].valorOrcado =
                                    handleMonetaryChange(e.target.value);
                                  field.onChange(newValores);
                                }}
                              />
                            ) : (
                              formatCurrency(mesData.valorOrcado)
                            )}
                          </TableCell>
                          <TableCell align="right">
                            {editandoMes === index ? (
                              <TextField
                                fullWidth
                                variant="outlined"
                                valueIsNumericString
                                value={
                                  mesData.valorRealizado !== undefined
                                    ? new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                      }).format(
                                        parseFloat(mesData.valorRealizado || 0)
                                      )
                                    : ''
                                }
                                sx={{
                                  '& .MuiInputBase-root': {
                                    height: '40px',
                                  },
                                }}
                                onChange={(e) => {
                                  const newValores = [...field.value];
                                  newValores[index].valorRealizado =
                                    handleMonetaryChange(e.target.value);
                                  field.onChange(newValores);
                                }}
                              />
                            ) : (
                              formatCurrency(mesData.valorRealizado)
                            )}
                          </TableCell>
                          <TableCell>
                            {editandoMes === index ? (
                              <Button
                                size="small"
                                onClick={() => setEditandoMes(null)}
                              >
                                Salvar
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                onClick={() => setEditandoMes(index)}
                              >
                                Editar
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={
              mutation.isPending ? <CircularProgress size={20} /> : <SaveIcon />
            }
            disabled={mutation.isPending}
          >
            Salvar Alterações
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ModalEditarSubconta;
