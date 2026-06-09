import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModalEdicao from './ModalEdicao';
import { update } from 'react-spring';

const columns = [
  { label: 'Motivo', key: 'motivo' },
  { label: 'OP', key: 'ordemDeProducao' },
  { label: 'Produto', key: 'codigoProduto' },
  { label: 'Inicio de Parada', key: 'dataInicioParada' },
  { label: 'Final de Parada', key: 'dataFinalParada' },
  { label: 'Duração em minutos', key: 'duracao' },
  { label: 'Linha', key: 'userAbertura' },
  { label: 'Galpão', key: 'userFechamento' },
  { label: 'Observação', key: 'observacao' },
];

function formatarDataHora(dataString) {
  if (!dataString) return '';

  try {
    const data = new Date(dataString);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');
    const segundos = String(data.getSeconds()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
  } catch (e) {
    return dataString;
  }
}

const TabelaParadaLinha = ({ data, loading, update }) => {
  const [open, setOpen] = useState(false);
  const [dataEdicao, setDataEdicao] = useState(null);

  const handleOpenModal = (rowData) => {
    setDataEdicao(rowData);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setDataEdicao(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          fontFamily: 'Poppins',
          maxHeight: 538,
          overflowY: 'auto',
          borderRadius: '10px',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="tabela de paradas"
          sx={{ bgcolor: '#FFFFFF' }}
        >
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell
                align="center"
                sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
              >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2">Carregando...</Typography>
                </TableCell>
              </TableRow>
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2">
                    Nenhuma parada encontrada
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row) => (
                <TableRow key={`${row.id}-${row.dataInicioParada}`}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.key}`} align="center">
                      {column.key.includes('data')
                        ? formatarDataHora(row[column.key])
                        : row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenModal(row)}
                    >
                      <ModeEditIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalEdicao
        open={open}
        handleCloseModal={handleCloseModal}
        data={dataEdicao || { motivo: '' }}
        update={update}
      />
    </>
  );
};

export default TabelaParadaLinha;
