import React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ModalEditar from '../../ModalEditar';

const getMonthName = (monthNumber) => {
  const months = [
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
  return months[monthNumber - 1] || 'Mês inválido';
};
const formatPercentage = (value) => {
  return `${value}%`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatNumberSeparator = (value) => {
  if (value === null || value === undefined) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

const columns = [
  { label: 'Mês', key: 'mes', format: (value) => getMonthName(value) },
  { label: 'Eficiência', key: 'eficienciaMedia', format: formatPercentage },
  {
    label: 'Disponibilidade',
    key: 'disponibilidadeMedia',
    format: formatPercentage,
  },
  { label: 'Qualidade', key: 'qualidadeMedia', format: formatPercentage },
  { label: 'OEE', key: 'oeeMedia', format: formatPercentage },
  {
    label: 'Meta Produção',
    key: 'metaProducaoTotal',
    format: formatNumberSeparator,
  },

  {
    label: 'Produzido',
    key: 'quantidadeProduzidaTotal',
    format: formatNumberSeparator,
  },
  {
    label: 'Saldo',
    key: 'quantidadePendenteTotal',
    format: formatNumberSeparator,
  },
];

const columnsRow = [
  { label: 'Data Eficiência', key: 'dataEficiencia', format: formatDate },
  {
    label: 'Eficiência',
    key: 'porcentagemEficiencia',
    format: formatPercentage,
  },
  {
    label: 'Disponibilidade',
    key: 'disponibilidade',
    format: formatPercentage,
  },
  { label: 'Qualidade', key: 'qualidade', format: formatPercentage },
  { label: 'OEE', key: 'oee', format: formatPercentage },
  {
    label: 'Meta Produção',
    key: 'metaProducao',
    format: formatNumberSeparator,
  },

  {
    label: 'Produzido',
    key: 'quantidadeProduzida',
    format: formatNumberSeparator,
  },
  { label: 'Saldo', key: 'quantidadePendente', format: formatNumberSeparator },
];

const Row = ({ row, headers, onUpdate }) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [dataEdicao, setDataEdicao] = useState(null);

  const handleToggle = () => {
    if (!open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    setOpen(!open);
  };

  const handleOpenModal = (rowData) => {
    setDataEdicao(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDataEdicao(null);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton size="small" color="primary" onClick={handleToggle}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {headers.map((column) => (
          <TableCell
            align="center"
            key={column.key}
            style={{
              color:
                column.key === 'quantidadePendenteTotal' && row[column.key] < 0
                  ? 'red'
                  : 'inherit',
            }}
          >
            {column.format ? column.format(row[column.key]) : row[column.key]}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={headers.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#ebebeb' }}>
                  <TableRow>
                    <TableCell />
                    {columnsRow.map((column) => (
                      <TableCell
                        align="center"
                        key={column.key}
                        style={{ fontWeight: 'bold' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={columnsRow.length + 1} align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CircularProgress size={24} />
                          <Typography variant="body1" sx={{ marginLeft: 2 }}>
                            Carregando ...
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    row.metaProducao.map((meta, index) => (
                      <TableRow key={index}>
                        <TableCell align="left">
                          <IconButton size="small">
                            <ModeEditIcon
                              onClick={() => handleOpenModal(meta)}
                            />
                          </IconButton>
                        </TableCell>
                        {columnsRow.map((column) => (
                          <TableCell
                            align="center"
                            key={column.key}
                            style={{
                              color:
                                column.key === 'quantidadePendente' &&
                                meta[column.key] < 0
                                  ? 'red'
                                  : 'inherit',
                            }}
                          >
                            {column.format
                              ? column.format(meta[column.key])
                              : meta[column.key]}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
        {isModalOpen && (
          <ModalEditar
            open={isModalOpen}
            onClose={handleCloseModal}
            data={dataEdicao}
            onUpdate={onUpdate}
          />
        )}
      </TableRow>
    </>
  );
};

const RelatorioMensalTable = ({ data, onUpdate }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {columns.map((column) => (
              <TableCell
                align="center"
                key={column.key}
                style={{ fontWeight: 'bold' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!Array.isArray(data) || data.length === 0) && (
            <TableRow>
              <TableCell colSpan={columns.length + 1} align="center">
                Nenhuma informação disponível no momento.
              </TableCell>
            </TableRow>
          )}
          {Array.isArray(data) &&
            data.map((row, index) => (
              <Row
                key={index}
                row={row}
                headers={columns}
                onUpdate={onUpdate}
              />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RelatorioMensalTable;
