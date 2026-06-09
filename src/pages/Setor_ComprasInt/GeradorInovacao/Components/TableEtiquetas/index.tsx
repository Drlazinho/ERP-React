import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { CircularProgress } from '@mui/material';

interface Column {
  label: string;
  key: string;
  minWidth?: number;
}

interface Etiqueta {
  id: string;
  qrCode: string;
  apelidoProduto: string;
  ean: string;
  codigoSap: string;
  dataGeracao: string;
}

interface TableEtiquetasProps {
  data: Etiqueta[];
  loading: boolean;
}

const columns: Column[] = [
  { label: 'QRCode', key: 'qrCode' },
  { label: 'Descrição', key: 'apelidoProduto' },
  { label: 'EAN', key: 'ean' },
  { label: 'SAP', key: 'codigoSap' },
  { label: 'Data Geração', key: 'dataGeracao' },
];

const TableEtiquetas = ({ data, loading }: TableEtiquetasProps) => {
  const formatarData = (dataISO: string) =>
    new Date(dataISO).toLocaleDateString('pt-BR');

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          fontFamily: 'Poppins',
          maxHeight: 538,
          overflowY: 'auto',
          borderRadius: '10px',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="collapsible table"
          sx={{ bgcolor: '#F4F4F4' }}
        >
          <TableHead sx={{ bgcolor: '#F4F4F4' }}>
            <TableRow sx={{ bgcolor: '#F4F4F4' }}>
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  style={{ minWidth: column.minWidth }}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: '#ccc',
                    color: '#333',
                  }}
                >
                  {column.label}
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
            ) : Array.isArray(data) && data.length > 0 ? (
              data.map((row) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell align="center">{row.qrCode}</TableCell>
                    <TableCell align="center">{row.apelidoProduto}</TableCell>
                    <TableCell align="center">{row.ean}</TableCell>
                    <TableCell align="center">{row.codigoSap}</TableCell>
                    <TableCell align="center">
                      {formatarData(row.dataGeracao)}
                    </TableCell>
                  </TableRow>
                );
              })
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
    </>
  );
};

export default TableEtiquetas;