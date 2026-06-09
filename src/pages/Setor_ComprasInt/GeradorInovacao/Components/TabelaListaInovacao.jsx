import React from 'react';
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
  Collapse,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { RiFileExcel2Line } from 'react-icons/ri';
import {
  GetObterQrCodeGrupo,
  ExportarExcel,
} from '../GerarCodigoBarra.service';

const columns = [
  {
    accessorKey: 'proforma',
    header: 'Proforma',
  },
  {
    accessorKey: 'codProduto',
    header: 'Código do Produto',
  },
  {
    accessorKey: 'nomeProduto',
    header: 'Nome do Produto',
  },
  {
    accessorKey: 'nacionalidade',
    header: 'Nacionalidade',
  },
  {
    accessorKey: 'voltagem',
    header: 'Voltagem',
  },
  {
    accessorKey: 'codFornecedor',
    header: 'Código do Fornecedor',
  },
  {
    accessorKey: 'mes',
    header: 'Mês',
  },
  {
    accessorKey: 'ano',
    header: 'Ano',
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
  },
  {
    accessorKey: 'qrInicial',
    header: 'Número Serial Inicial',
  },
  {
    accessorKey: 'qrFinal',
    header: 'Número Serial Final',
  },
];

const columnsRow = [
  {
    accessorKey: 'proforma',
    header: 'Proforma',
  },
  {
    accessorKey: 'codProduto',
    header: 'Código do Produto',
  },
  {
    accessorKey: 'nomeProduto',
    header: 'Nome do Produto',
  },
  {
    accessorKey: 'voltagem',
    header: 'Voltagem',
  },
  {
    accessorKey: 'codFornecedor',
    header: 'Código Fornecedor',
  },
  {
    accessorKey: 'qrcodeGerado',
    header: 'Código Gerado',
  },
  {
    accessorKey: 'nacionalidade',
    header: 'Nacionalidade',
  },
  {
    accessorKey: 'lote',
    header: 'Lote',
  },
  {
    accessorKey: 'mes',
    header: 'Mês',
  },
  {
    accessorKey: 'ano',
    header: 'Ano',
  },
  {
    accessorKey: 'dtGeraQr',
    header: 'Data Geração',
    format: (value) => formatarData(value),
  },
];

const formatarData = (dataString) => {
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const Row = ({ row, headers, index }) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [qrCodes, setQrCodes] = React.useState([]);

  const handleObterQrCode = async () => {
    try {
      setLoading(true);

      const params = {
        proforma: row.proforma,
        codProduto: row.codProduto,
        voltagem: row.voltagem,
        codFornecedor: row.codFornecedor,
        nacionalidade: row.nacionalidade,
        mes: row.mes,
        ano: row.ano,
        lote: row.lote,
      };

      const response = await GetObterQrCodeGrupo(params);
      setQrCodes(response || []);
      setOpen(true);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!open) {
      handleObterQrCode();
    } else {
      setOpen(!open);
    }
  };

  const handleExportarExcel = async (row) => {
    const params = {
      proforma: row.proforma,
      codProduto: row.codProduto,
      voltagem: row.voltagem,
      codFornecedor: row.codFornecedor,
      nacionalidade: row.nacionalidade,
      mes: row.mes,
      ano: row.ano,
      lote: row.lote,
    };
    try {
      const blob = await ExportarExcel(params);

      if (blob.size === 0) {
        throw new Error('Arquivo recebido está vazio');
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Relatorio-QrCode-${new Date().toISOString().slice(0, 10)}.xlsx`
      );

      document.body.appendChild(link);
      link.click();

      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      addToast({
        type: 'danger',
        description: error.message || 'Erro ao gerar relatório Excel',
      });

      console.error('Falha no download:', {
        error: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            size="small"
            color="primary"
            onClick={handleToggle}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} />
            ) : open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            size="medium"
            color="success"
            onClick={() => handleExportarExcel(row)}
            aria-label="delete"
          >
            <RiFileExcel2Line />
          </IconButton>
        </TableCell>
        {headers.map((column) => (
          <TableCell key={`${column.accessorKey}-${index}`} align="center">
            {row[column.accessorKey]}
          </TableCell>
        ))}
      </TableRow>
      {open && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ width: '100%', maxHeight: 500, overflow: 'auto' }}>
                <Table size="small">
                  <TableHead
                    sx={{
                      bgcolor: '#ebebeb',
                    }}
                  >
                    <TableRow>
                      <TableCell />
                      {columnsRow.map((column) => (
                        <TableCell
                          align="center"
                          key={column.key}
                          style={{ fontWeight: 'bold' }}
                        >
                          {column.header}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {qrCodes.length > 0 ? (
                      qrCodes.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell />
                          {columnsRow.map((column) => (
                            <TableCell
                              align="center"
                              key={`${column.accessorKey}-${index}`}
                            >
                              {column.format
                                ? column.format(item[column.accessorKey])
                                : item[column.accessorKey]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columnsRow.length + 1}
                          align="center"
                        >
                          Nenhum QR Code encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
const TabelaListaInovacao = ({ data = [], loading }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        fontFamily: 'Poppins',
        height: 538,
        overflow: 'auto',
        borderRadius: '10px',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
        position: 'relative',
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{ bgcolor: '#F4F4F4' }}
        stickyHeader
      >
        <TableHead
          sx={{ bgcolor: '#F4F4F4', position: 'sticky', top: 0, zIndex: 1 }}
        >
          <TableRow sx={{ bgcolor: '#F4F4F4' }}>
            <TableCell
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#ccc',
                color: '#333',
                position: 'sticky',
                left: 0,
                zIndex: 2,
              }}
            />
            <TableCell
              sx={{
                fontWeight: 'bold',
                backgroundColor: '#ccc',
                color: '#333',
                position: 'sticky',
                left: 48,
                zIndex: 2,
              }}
            >
              Exportar Excel
            </TableCell>
            {columns.map((column) => (
              <TableCell
                key={column.accessorKey}
                align="center"
                sx={{
                  fontWeight: 'bold',
                  backgroundColor: '#ccc',
                  color: '#333',
                }}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <Row key={index} row={row} headers={columns} index={index} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2" color="textSecondary">
                  Nenhum dado encontrado
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaListaInovacao;
