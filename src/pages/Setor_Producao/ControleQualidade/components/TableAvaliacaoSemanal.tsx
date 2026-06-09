import { useState, useEffect } from 'react';
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
import Loader from '@/components/Loader';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';

type Column = {
  label: string;
  key: keyof TableData | keyof RowData;
};

type TableData = {
  semana: string;
  quantidadeDefeito: string;
  QuantidadeProduzida: string;
  rejeicao: string;
  avaliacaoProduto?: RowData[];
};

type RowData = {
  descricao: string;
  quantidadeDefeito: string;
  QuantidadeProduzida: string;
  rejeicao: string;
};

const columns: Column[] = [
  { label: 'Semana', key: 'semana' },
  { label: 'Quantidade Defeito', key: 'quantidadeDefeito' },
  { label: 'Quantidade Produzida', key: 'QuantidadeProduzida' },
  { label: 'Rejeição', key: 'rejeicao' },
];

const columnsRows: Column[] = [
  { label: 'Descrição', key: 'descricao' },
  { label: 'Quantidade Defeito', key: 'quantidadeDefeito' },
  { label: 'Quantidade Produzida', key: 'QuantidadeProduzida' },
  { label: 'Rejeição', key: 'rejeicao' },
];

const data = [
  {
    semana: '1',
    quantidadeDefeito: '32',
    QuantidadeProduzida: '500',
    rejeicao: '7.5%',
    avaliacaoProduto: [
      {
        descricao: 'SKD CAIXA AMPLIF. AMVOX ACA 1900 NEW X',
        quantidadeDefeito: '10',
        QuantidadeProduzida: '100',
        rejeicao: '1,5%',
      },
    ],
  },
  {
    semana: '2',
    quantidadeDefeito: '120',
    QuantidadeProduzida: '1542',
    rejeicao: '5,4%',
    avaliacaoProduto: [
      {
        descricao: 'SKD SAND E GRILL  AMVOX  AMS 800',
        quantidadeDefeito: '50',
        QuantidadeProduzida: '250',
        rejeicao: '6,4%',
      },
      {
        descricao: 'SKD SAND E GRILL  AMVOX  AMS 800 220V',
        quantidadeDefeito: '80',
        QuantidadeProduzida: '350',
        rejeicao: '8,4%',
      },
    ],
  },
  {
    semana: '3',
    quantidadeDefeito: '250',
    QuantidadeProduzida: '1258',
    rejeicao: '8,45%',
    avaliacaoProduto: [
      {
        descricao: 'SKD CAIXA AMPLIF. AMVOX ACA 600 BAGVOX',
        quantidadeDefeito: '320',
        QuantidadeProduzida: '542',
        rejeicao: '10.45%',
      },
    ],
  },
];

const MainRow = ({ row, headers }: { row: TableData; headers: Column[] }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    if (!open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    setOpen(!open);
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
          <TableCell key={column.key} align="center">
            {String(row[column.key as keyof TableData])}
          </TableCell>
        ))}
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {columnsRows.map((column) => (
                      <TableCell
                        key={column.key}
                        align="center"
                        sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading && (
                    <TableRow>
                      <TableCell align="center">
                        <CircularProgress />
                      </TableCell>
                    </TableRow>
                  )}
                  {(row.avaliacaoProduto || []).map((rowData) => (
                    <SubRow
                      key={rowData.descricao}
                      row={rowData}
                      headers={columnsRows}
                    />
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const SubRow = ({ row, headers }: { row: RowData; headers: Column[] }) => {
  return (
    <TableRow>
      {headers.map((column) => (
        <TableCell key={column.key} align="center">
          {String(row[column.key as keyof RowData])}
        </TableCell>
      ))}
    </TableRow>
  );
};

const TableAvaliacaoSemanal = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          fontFamily: 'Poppins',
          maxHeight: 580,
          overflowY: 'auto',
          borderRadius: '10px',
          '&::-webkit-scrollbar': { display: 'none' },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
      >
        <Table
          stickyHeader
          aria-label="tabela de WhatsApp"
          sx={{ bgcolor: '#FFFFFF' }}
        >
          <TableHead>
            <TableRow>
              <TableCell sx={{ backgroundColor: '#FFFFFF' }} />
              {columns.map((column) => (
                <TableCell
                  key={column.key}
                  align="center"
                  sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
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
                  <Loader />
                </TableCell>
              </TableRow>
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography variant="body2">
                    Nenhum dado encontrado
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <MainRow key={index} row={row} headers={columns} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableAvaliacaoSemanal;
