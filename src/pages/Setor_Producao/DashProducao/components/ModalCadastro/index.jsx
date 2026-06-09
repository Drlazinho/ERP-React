import * as React from 'react';
import { useCallback, useState } from 'react';

import {
  IconButton,
  MenuItem,
  TextField,
  FormLabel,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Typography,
  Button,
  Box,
  Autocomplete,
  Select,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';
import { registrarMetaProducao } from '../../dashboardProducao.service';
import { useToast } from '../../../../../hooks/toast.hook';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { NumericFormat } from 'react-number-format';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
  p: 4,
  borderRadius: '16px',
};

export default function ModalCadastro({ onUpdate }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = React.useState(false);
  const { addToast } = useToast();
  const { id, email } = useUsuarioLocal();
  const [tabelaDespesas, setTabelaDespesas] = useState([]);
  const [itemTabela, setItemTabela] = useState({});
  const [formData, setFormData] = React.useState({
    metaProducao: '',
    quantidadeProduzida: '',
    quantidadeRejeitos: '',
    dataEficiencia: '',
    horasDisponíveis: '',
    horasTrabalhadas: '',
  });

  const adicionarTabela = () => {
    if (
      itemTabela.metaProducao &&
      itemTabela.dataEficiencia &&
      itemTabela.quantidadeProduzida &&
      itemTabela.quantidadeRejeitos &&
      itemTabela.horasDisponíveis &&
      itemTabela.horasTrabalhadas
    ) {
      const itemJaExiste = tabelaDespesas.some(
        (item) => item.dataEficiencia === itemTabela.dataEficiencia
      );

      if (itemJaExiste) {
        alert(
          'Esta data de eficiência ja foi adicionada! Escolha uma data diferente.'
        );
        return;
      }

      setTabelaDespesas((prev) => [
        ...prev,
        {
          metaProducao: itemTabela.metaProducao,
          quantidadeProduzida: itemTabela.quantidadeProduzida,
          quantidadeRejeitos: itemTabela.quantidadeRejeitos,
          horasDisponíveis: itemTabela.horasDisponíveis,
          dataEficiencia: itemTabela.dataEficiencia,
          horasTrabalhadas: itemTabela.horasTrabalhadas,
        },
      ]);

      setItemTabela({
        metaProducao: '',
        quantidadeProduzida: '',
        quantidadeRejeitos: '',
        horasDisponíveis: '',
        horasTrabalhadas: '',
        dataEficiencia: '',
      });
    }
  };

  const deletarItemDaTabela = (index) => {
    setTabelaDespesas((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClear = () => setTabelaDespesas([]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const formatarValor = (valor) => {
        if (typeof valor === 'string') {
          return Number(valor.replace('h', '').replace(',', '.'));
        }
        return Number(valor);
      };

      const params = {
        listaMetaProducao: (tabelaDespesas || []).map((item) => ({
          metaProducao: Number(item.metaProducao),
          quantidadeProduzida: Number(item.quantidadeProduzida),
          dataEficiencia: item.dataEficiencia,
          quantidadeRejeitos: Number(item.quantidadeRejeitos),
          horasDisponíveis: formatarValor(item.horasDisponíveis),
          horasTrabalhadas: formatarValor(item.horasTrabalhadas),
          usuarioRegistro: email,
          usuarioID: id,
        })),
      };

      setLoading(true);
      try {
        await registrarMetaProducao(params);
        handleClose();
        handleClear();
        onUpdate();

        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Eficiência cadastrada com sucesso !!',
        });
      } catch (error) {
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
          title: 'Erro!',
          description: errorMessage,
        });
      } finally {
        setLoading(false);
      }
    },
    [formData, onUpdate, id, email, tabelaDespesas]
  );

  function formatarData(data) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          padding: '8px 16px',
          justifyContent: 'center',
          borderRadius: '8px',
          bgcolor: '#517396',
          boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
          color: '#FFF',
          textTransform: 'capitalize',
          transition: 'background-color 0.5s ease, transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            bgcolor: '#517396',
            transition:
              'background-color 0.5s ease, transform 0.3s ease-in-out',
          },
        }}
      >
        Cadastrar Meta
      </Button>
      <Modal open={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: '30px',
            }}
          >
            <Typography variant="h6">Cadastrar Meta</Typography>
            <IconButton
              onClick={() => {
                handleClear();
                handleClose();
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
              mb: '30px',
            }}
          >
            <TextField
              required
              type="date"
              label="Data"
              value={itemTabela.dataEficiencia}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({ ...itemTabela, dataEficiencia: e.target.value })
              }
            />

            <TextField
              required
              type="number"
              label="Meta Produção"
              value={itemTabela.metaProducao}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({ ...itemTabela, metaProducao: e.target.value })
              }
            />

            <TextField
              required
              type="number"
              label="Quantidade Produzida"
              value={itemTabela.quantidadeProduzida}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({
                  ...itemTabela,
                  quantidadeProduzida: e.target.value,
                })
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              gap: '16px',
              mb: '30px',
            }}
          >
            <NumericFormat
              customInput={TextField}
              required
              label="Quantidade Rejeitados"
              value={itemTabela.quantidadeRejeitos}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({
                  ...itemTabela,
                  quantidadeRejeitos: e.target.value,
                })
              }
            />
            <NumericFormat
              customInput={TextField}
              required
              label="Horas Disponíveis"
              value={itemTabela.horasDisponíveis}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="h"
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({
                  ...itemTabela,
                  horasDisponíveis: e.target.value,
                })
              }
            />
            <NumericFormat
              customInput={TextField}
              required
              label="Horas Trabalhadas"
              value={itemTabela.horasTrabalhadas}
              valueIsNumericString
              decimalSeparator=","
              allowNegative={false}
              suffix="h"
              InputLabelProps={{ shrink: true }}
              onChange={(e) =>
                setItemTabela({
                  ...itemTabela,
                  horasTrabalhadas: e.target.value,
                })
              }
            />

            <Button
              type="submit"
              size="small"
              variant="outlined"
              color="error"
              onClick={adicionarTabela}
              startIcon={<AddIcon />}
            >
              Adicionar
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '32px',
              alignItems: 'flex-start',
              gap: '24px',
              borderRadius: '16px',
              border: '1px solid #ccc',
              mb: '24px',
              mt: '24px',
            }}
          >
            <Box
              sx={{
                borderRadius: '8px',
                border: '1px solid #ccc',
                display: 'flex',
              }}
            >
              <TableContainer
                style={{
                  maxHeight: 300,
                  overflowY: 'auto',
                }}
              >
                <Table
                  stickyHeader
                  sx={{ minWidth: 1146, maxHeight: 336 }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableCell align="center">Data Eficiência</TableCell>
                    <TableCell align="center">Meta Produção</TableCell>
                    <TableCell align="center">Quantidade Produzida</TableCell>
                    <TableCell align="center">Quantidade Rejeitados</TableCell>
                    <TableCell align="center">Horas Disponíveis</TableCell>
                    <TableCell align="center">Horas Trabalhadas</TableCell>

                    <TableCell />
                  </TableHead>
                  <TableBody>
                    {tabelaDespesas.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {formatarData(item.dataEficiencia)}
                        </TableCell>
                        <TableCell align="center">
                          {item.metaProducao}
                        </TableCell>
                        <TableCell align="center">
                          {item.quantidadeProduzida}
                        </TableCell>

                        <TableCell align="center">
                          {item.quantidadeRejeitos}
                        </TableCell>
                        <TableCell align="center">
                          {item.horasDisponíveis}
                        </TableCell>
                        <TableCell align="center">
                          {item.horasTrabalhadas}
                        </TableCell>

                        <TableCell sx={{ borderBottom: 'none' }}>
                          <Button
                            variant="outlined"
                            onClick={(e) => deletarItemDaTabela(index, e)}
                            sx={{
                              display: 'flex',
                              height: '48px',
                              padding: '16px',
                              justifyContent: 'center',
                              alignItems: 'center',
                              gap: '8px',
                              borderRadius: '8px',
                              border: '2px solid #A00',
                              transition:
                                'background-color 0.5s ease, transform 0.3s ease-in-out',
                              '&:hover': {
                                bgcolor: '#760000',
                                color: '#fff',
                                borderColor: '#fff',
                                transform: 'scale(1.1)',
                                transition:
                                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                              },
                            }}
                          >
                            <DeleteOutlineIcon
                              sx={{
                                color: '#A00',
                                '&:hover': {
                                  color: '#fff',
                                  transform: 'scale(1.1)',
                                  transition:
                                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                                },
                              }}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || tabelaDespesas.length === 0}
              sx={{
                bgcolor: '#517396',
                borderRadius: '8px',
                boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
                textTransform: 'capitalize',
                transition:
                  'background-color 0.5s ease, transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  bgcolor: '#517396',
                  transition:
                    'background-color 0.5s ease, transform 0.3s ease-in-out',
                },
              }}
            >
              {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
