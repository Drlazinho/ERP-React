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
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

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

const columns = [
  { label: 'Código', key: 'codigo' },
  { label: 'Setor', key: 'nome' },
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
  //`${parseFloat(value).toFixed(2)}%`
};

const TableVisaoMensal = ({ data }) => {
  if (!data) {
    return (
      <Typography variant="body2" color="textSecondary">
        Nenhum dado encontrado
      </Typography>
    );
  }

  const dataArray = Array.isArray(data) ? data : [data];

  const getDadosMensais = (orcamentoMensalCentroCusto) => {
    const dadosMensais = {};
    Array.isArray(orcamentoMensalCentroCusto) &&
      orcamentoMensalCentroCusto.map((item) => {
        const mes = meses[item.mes - 1];
        dadosMensais[mes] = {
          orcado: item.valorOrcado,
          realizado: item.valorRealizado,
          porcentagem: item.valorPorcentagem,
        };
      });
    return dadosMensais;
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: 538,
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px',
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
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '1rem',
          }}
        >
          Visão Mensal
        </Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            backgroundColor: '#ffffff',
            padding: '16px',
            margin: '0 auto',
            width: '98%',
            maxWidth: '98%',
            overflowX: 'auto',
          }}
        >
          <Table stickyHeader sx={{ bgcolor: '#F4F4F4' }}>
            <TableHead sx={{ bgcolor: '#F4F4F4' }}>
              <TableRow
                sx={{
                  bgcolor: '#F4F4F4',
                }}
              >
                <TableCell />
                <TableCell />
                {meses.map((mes) => (
                  <TableCell
                    key={mes}
                    colSpan={3}
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {mes}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow
                sx={{
                  bgcolor: '#F4F4F4',
                }}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    sx={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {meses.map((mes) => (
                  <>
                    <TableCell
                      key={`${mes}-orcado`}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Orçado
                    </TableCell>
                    <TableCell
                      key={`${mes}-realizado`}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      Realizado
                    </TableCell>
                    <TableCell
                      key={`${mes}-porcentagem`}
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      (%)
                    </TableCell>
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArray.map((row) => {
                const dadosMensais = getDadosMensais(
                  row.orcamentoMensalCentroCusto
                );
                return (
                  <TableRow key={row.idCentroCusto}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.key}
                        sx={{
                          textAlign: 'center',
                          fontWeight: column.key === 'nome' ? 'bold' : 'normal',
                        }}
                      >
                        {row[column.key]}
                      </TableCell>
                    ))}

                    {meses.map((mes) => (
                      <>
                        <TableCell
                          key={`${mes}-orcado`}
                          sx={{
                            textAlign: 'center',
                            borderLeft: '2px solid #ccc',
                          }}
                        >
                          {formatCurrencyBRL(dadosMensais[mes]?.orcado || 0)}
                        </TableCell>
                        <TableCell
                          key={`${mes}-realizado`}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          {formatCurrencyBRL(dadosMensais[mes]?.realizado || 0)}
                        </TableCell>
                        <TableCell
                          key={`${mes}-porcentagem`}
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Stack
                            direction="column"
                            alignItems="center"
                            spacing={1}
                          >
                            <Chip
                              label={`${
                                formatPercentage(
                                  dadosMensais[mes]?.porcentagem
                                ) || 0
                              }`}
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
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>
    </>
  );
};

export default TableVisaoMensal;
