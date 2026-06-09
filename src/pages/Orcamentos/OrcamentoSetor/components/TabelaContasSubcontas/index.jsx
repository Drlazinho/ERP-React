import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  CircularProgress,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { ObterContaDetalhe } from '../../orcamentoSetor.service';
import { useToast } from '@/hooks/toast.hook';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModalEditarConta from '../ModalEditarConta';
import ModalEditarSubconta from '../ModalEditarSubconta';
import { useQuery } from '@tanstack/react-query';

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

const formatCurrencyBRL = (current) => {
  if (current === undefined || current === null || isNaN(current)) return '';
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(current);
};

const formatPercentage = (value) => {
  if (value === undefined || value === null || value === '') return '0%';
  return `${value.toFixed(2)}%`;
};

export default function TabelaContasSubcontas({ data, onUpdate }) {
  const [openContaId, setOpenContaId] = useState(null);
  const [openModalEditarConta, setOpenModalEditarConta] = useState(false);
  const [dataEdicaoConta, setDataEdicaoConta] = useState(null);
  const [openModalEditarSubconta, setOpenModalEditarSubconta] = useState(false);
  const [dataEdicaoSubconta, setDataEdicaoSubconta] = useState(null);
  const { addToast } = useToast();

  const handleOpenModalEditarConta = (rowData) => {
    setDataEdicaoConta(rowData);
    setOpenModalEditarConta(true);
  };

  const handleCloseModalEditarConta = () => {
    setOpenModalEditarConta(false);
    setDataEdicaoConta(null);
  };

  const handleOpenModalEditarSubconta = (rowData) => {
    setDataEdicaoSubconta(rowData);
    setOpenModalEditarSubconta(true);
  };

  const handleCloseModalEditarSubconta = () => {
    setOpenModalEditarSubconta(false);
    setDataEdicaoSubconta(null);
  };

  const handleClick = (idConta) => {
    setOpenContaId((prevId) => (prevId === idConta ? null : idConta));
  };

  const {
    data: detalhes = { contaDetalhe: [] },
    isLoading: isLoadingDetalhes,
    error: errorDetalhes,
    refresh: refreshDetalhes,
  } = useQuery({
    queryKey: ['detalhes-conta', openContaId],
    queryFn: () => ObterContaDetalhe(openContaId),
    staleTime: 12 * 60 * 60 * 1000,
    enabled: openContaId !== null && openContaId !== undefined,
  });

  const getDadosMensais = (orcamentoMensalConta) => {
    const dadosMensais = {};

    if (Array.isArray(orcamentoMensalConta)) {
      orcamentoMensalConta.forEach((item) => {
        const mes = meses[item.mes - 1];
        dadosMensais[mes] = {
          orcado: item.valorOrcado,
          realizado: item.valorRealizado,
          porcentagem: item.valorPorcentagem,
        };
      });
    }
    return dadosMensais;
  };

  if (!data) {
    return (
      <Typography variant="body2" color="textSecondary">
        Nenhum dado encontrado
      </Typography>
    );
  }

  const dataArray = Array.isArray(data) ? data : [data];

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#ffffff',
        }}
      >
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '1rem',
          }}
        >
          Contas e Subcontas
        </Typography>
        <TableContainer
          component={Paper}
          sx={{
            maxHeight: 538,
            overflow: 'auto',
            position: 'relative',
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#F4F4F4',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ccc',
              borderRadius: '4px',
            },
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ffffff',
              margin: '0 auto',
              width: '98%',
              maxWidth: '98%',
            }}
          >
            <Table stickyHeader sx={{ bgcolor: '#F4F4F4' }}>
              <TableHead
                sx={{
                  position: 'sticky',
                  top: 0,
                  zIndex: 25,
                  backgroundColor: '#F4F4F4',
                }}
              >
                <TableRow
                  sx={{
                    top: 56,
                    zIndex: 25,
                    backgroundColor: '#fff',
                  }}
                >
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 30,
                      backgroundColor: '#fff',
                      borderBottom: '2px solid #c3c3c3',
                    }}
                  />
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 70,
                      zIndex: 30,
                      backgroundColor: '#fff',
                      borderBottom: '2px solid #c3c3c3',
                    }}
                  />
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 150,
                      zIndex: 30,
                      backgroundColor: '#fff',
                      borderBottom: '2px solid #c3c3c3',
                    }}
                  />
                  {meses.map((mes) => (
                    <TableCell
                      key={mes}
                      colSpan={3}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        borderBottom: '2px solid #c3c3c3',
                      }}
                    >
                      {mes}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow
                  sx={{
                    zIndex: 25,
                  }}
                >
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      zIndex: 30,
                      backgroundColor: '#fff',
                    }}
                  />
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 70,
                      zIndex: 30,
                      backgroundColor: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Código
                  </TableCell>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 150,
                      zIndex: 30,
                      backgroundColor: '#fff',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Descrição
                  </TableCell>
                  {meses.map((mes) => (
                    <>
                      <TableCell
                        key={`${mes}-orcado`}
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        Orçado
                      </TableCell>
                      <TableCell
                        key={`${mes}-realizado`}
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        Realizado
                      </TableCell>
                      <TableCell
                        key={`${mes}-porcentagem`}
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        (%)
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataArray.map((conta) => {
                  const dadosMensais = getDadosMensais(
                    conta.orcamentoMensalConta
                  );

                  const subcontas =
                    openContaId === conta.idConta ? detalhes.contaDetalhe : [];

                  return (
                    <>
                      <TableRow key={conta.idConta}>
                        <TableCell
                          sx={{
                            position: 'sticky',
                            left: 0,
                            zIndex: 10,
                            backgroundColor: '#fff',
                          }}
                        >
                          <IconButton
                            onClick={() => handleClick(conta.idConta)}
                          >
                            {openContaId === conta.idConta ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                        <TableCell
                          sx={{
                            position: 'sticky',
                            left: 70,
                            zIndex: 10,
                            backgroundColor: '#fff',
                          }}
                        >
                          {conta.codigo}
                        </TableCell>
                        <TableCell
                          sx={{
                            position: 'sticky',
                            width: '170px',
                            height: '75px',
                            left: 150,
                            zIndex: 10,
                            backgroundColor: '#fff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <IconButton sx={{ fontSize: '12px' }}>
                            <ModeEditIcon
                              onClick={() => handleOpenModalEditarConta(conta)}
                              color="primary"
                              fontSize="small"
                            />
                          </IconButton>

                          {conta.nome}
                        </TableCell>
                        {meses.map((mes) => (
                          <>
                            <TableCell
                              key={`${mes}-orcado`}
                              sx={{
                                textAlign: 'center',
                                borderLeft: '2px solid #ccc',
                              }}
                            >
                              {formatCurrencyBRL(dadosMensais[mes]?.orcado)}
                            </TableCell>
                            <TableCell
                              key={`${mes}-realizado`}
                              sx={{ textAlign: 'center' }}
                            >
                              {formatCurrencyBRL(dadosMensais[mes]?.realizado)}
                            </TableCell>
                            <TableCell
                              key={`${mes}-porcentagem`}
                              sx={{ textAlign: 'center' }}
                            >
                              <Stack
                                direction="column"
                                alignItems="center"
                                spacing={1}
                              >
                                <Chip
                                  label={`${formatPercentage(
                                    dadosMensais[mes]?.porcentagem
                                  )}`}
                                  sx={{
                                    fontSize: '12px',
                                    fontWeight: 'bold',
                                    border:
                                      dadosMensais[mes]?.porcentagem > 100
                                        ? '1px solid #FF0000'
                                        : '1px solid #0288D1',
                                    borderRadius: '8px',
                                    boxShadow:
                                      '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                                    backgroundColor: '#fff',
                                    color:
                                      dadosMensais[mes]?.porcentagem > 100
                                        ? '#FF0000'
                                        : '#0288D1',
                                  }}
                                />
                              </Stack>
                            </TableCell>
                          </>
                        ))}
                      </TableRow>
                      {openContaId === conta.idConta && (
                        <>
                          {isLoadingDetalhes ? (
                            <TableRow>
                              <TableCell colSpan={meses.length * 3 + 3}>
                                <Box
                                  sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    padding: 2,
                                  }}
                                >
                                  <CircularProgress size={24} />
                                  <Typography sx={{ marginLeft: 2 }}>
                                    Carregando detalhes...
                                  </Typography>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ) : subcontas.length > 0 ? (
                            subcontas.map((subconta) => {
                              const subDadosMensais = getDadosMensais(
                                subconta.orcamentoMensal
                              );
                              return (
                                <TableRow key={subconta.idContaDetalhe}>
                                  <TableCell
                                    sx={{
                                      position: 'sticky',
                                      left: 0,
                                      zIndex: 10,
                                      backgroundColor: '#fff',
                                    }}
                                  />
                                  <TableCell
                                    sx={{
                                      position: 'sticky',
                                      left: 70,
                                      zIndex: 10,
                                      backgroundColor: '#fff',
                                    }}
                                  >
                                    {subconta.codigo}
                                  </TableCell>
                                  <TableCell
                                    sx={{
                                      position: 'sticky',
                                      left: 150,
                                      zIndex: 10,
                                      backgroundColor: '#fff',
                                      fontWeight: 'bold',
                                      color: '#0288D1',
                                    }}
                                  >
                                    <IconButton size="small">
                                      <ModeEditIcon
                                        onClick={() =>
                                          handleOpenModalEditarSubconta(
                                            subconta
                                          )
                                        }
                                        color="primary"
                                        fontSize="small"
                                      />
                                    </IconButton>
                                    {subconta.nome}
                                  </TableCell>
                                  {meses.map((mes) => (
                                    <>
                                      <TableCell
                                        key={`${mes}-orcado`}
                                        sx={{
                                          textAlign: 'center',
                                          borderLeft: '1px solid #ccc',
                                        }}
                                      >
                                        {formatCurrencyBRL(
                                          subDadosMensais[mes]?.orcado
                                        )}
                                      </TableCell>
                                      <TableCell
                                        key={`${mes}-realizado`}
                                        sx={{ textAlign: 'center' }}
                                      >
                                        {formatCurrencyBRL(
                                          subDadosMensais[mes]?.realizado
                                        )}
                                      </TableCell>
                                      <TableCell
                                        key={`${mes}-porcentagem`}
                                        sx={{ textAlign: 'center' }}
                                      >
                                        <Chip
                                          label={formatPercentage(
                                            subDadosMensais[mes]?.porcentagem
                                          )}
                                          sx={{
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            backgroundColor:
                                              subDadosMensais[mes]
                                                ?.porcentagem > 100
                                                ? '#ffebee'
                                                : '#e3f2fd',
                                            color:
                                              subDadosMensais[mes]
                                                ?.porcentagem > 100
                                                ? '#c62828'
                                                : '#1565c0',
                                            border:
                                              subDadosMensais[mes]
                                                ?.porcentagem > 100
                                                ? '1px solid #c62828'
                                                : '1px solid #1565c0',
                                            borderRadius: '8px',
                                            boxShadow:
                                              '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                                          }}
                                        />
                                      </TableCell>
                                    </>
                                  ))}
                                </TableRow>
                              );
                            })
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={meses.length * 3 + 3}
                                sx={{
                                  textAlign: 'start',
                                  color: 'gray',
                                }}
                              >
                                Nenhuma subconta encontrada
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      )}
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      </Box>
      {openModalEditarConta && dataEdicaoConta && (
        <ModalEditarConta
          open={openModalEditarConta}
          handleClose={handleCloseModalEditarConta}
          data={dataEdicaoConta}
        />
      )}

      {openModalEditarSubconta && dataEdicaoSubconta && (
        <ModalEditarSubconta
          open={openModalEditarSubconta}
          handleClose={handleCloseModalEditarSubconta}
          data={dataEdicaoSubconta}
          onUpdate={onUpdate}
          openContaId={openContaId}
        />
      )}
    </>
  );
}
