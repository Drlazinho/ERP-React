import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Skeleton,
} from '@mui/material';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';
import useSortableDataNew from '@/hooks/sortable.hook';
import TableCellHead from '@/components/Tabela/TableCellHead';

interface Item {
  id: number;
  filial: string;
  cliente: string;
  nome_Cliente: string;
  prefixo: string;
  numero: string;
  parcela: string;
  tipo: string;
  natureza: string;
  moeda: number;
  cotacao: number;
  valor_Orig: number;
  saldo: number;
  emissao: string;
  vencto_Real: string;
  historico: string;
  portador: string;
  numBco: string;
  dias_atraso: number;
  dtUltimaAtualizacao: string;
  hrUltimaAtualizacao: string;
}

interface TabelaTitulosProps {
  data: Item[];
  isLoading: boolean;
}

function formatarData(data: string) {
  if (!data) return '';
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
}

const formatarHora = (hora: string) => {
  if (!hora) return '';
  return hora.replace(/-/g, ':');
};

const columns = [
  {
    label: 'Filial',
    key: 'filial',
    render: (item: Item) => (
      <span style={{ fontWeight: 'bold' }}>{item.filial}</span>
    ),
  },
  {
    label: 'Fornecedor',
    key: 'cliente',
    render: (item: Item) => (
      <>
        {item.cliente}
        <br />
        {item.nome_Cliente}
      </>
    ),
  },
  { label: 'Prefixo', key: 'prefixo' },
  { label: 'Nº', key: 'numero' },
  { label: 'Parcela', key: 'parcela' },
  { label: 'Tipo', key: 'tipo' },
  { label: 'Natureza', key: 'natureza' },
  { label: 'Moeda', key: 'moeda' },
  { label: 'Cotação', key: 'cotacao' },
  {
    label: 'Valor Original',
    key: 'valor_Orig',
    render: (item: Item) => (
      <span
        style={{
          fontWeight: item.saldo !== item.valor_Orig ? 'bold' : 'normal',
        }}
      >
        R$ {item.valor_Orig}
      </span>
    ),
  },
  {
    label: 'Saldo',
    key: 'saldo',
    render: (item: Item) => (
      <span
        style={{
          fontWeight: item.saldo !== item.valor_Orig ? 'bold' : 'normal',
        }}
      >
        R$ {item.saldo}
      </span>
    ),
  },
  { label: 'Emissão', key: 'emissao' },
  { label: 'Vencto. Real', key: 'vencto_Real' },
  { label: 'Histórico', key: 'historico' },
  { label: 'Portador', key: 'portador' },
  { label: 'Banco', key: 'numBco' },
  { label: 'Dias Atraso', key: 'dias_atraso' },
  {
    label: 'Última Atualização',
    key: 'ultimaAtualizacao',
    render: (item: Item) =>
      `${formatarData(item.dtUltimaAtualizacao)} ${formatarHora(
        item.hrUltimaAtualizacao
      )}`,
  },
];

const VirtuosoTableComponents: TableComponents<Item> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      sx={{
        overflowX: 'auto',
        '& .MuiTableCell-root': {
          fontSize: '12px',
          whiteSpace: 'nowrap',
        },
      }}
    />
  )),
  Table: (props) => (
    <Table
      {...props}
      stickyHeader
      size="small"
      sx={{
        borderCollapse: 'separate',
        minWidth: '100%',
        width: 'auto',
      }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow: ({ item, ...props }) => (
    <TableRow
      {...props}
      sx={{
        backgroundColor:
          item?.saldo !== item?.valor_Orig ? 'rgba(255, 0, 0, 0.1)' : 'inherit',
        '&:hover': {
          backgroundColor:
            item?.saldo !== item?.valor_Orig
              ? 'rgba(255, 0, 0, 0.15)'
              : 'rgba(0, 0, 0, 0.04)',
        },
      }}
    />
  ),
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

export default function NovaTabelaTitulosPagar({
  data,
  isLoading,
}: TabelaTitulosProps) {
  const { items, sortConfig, requestSort } = useSortableDataNew<Item>(data);

  const fixedHeaderContent = () => (
    <TableRow sx={{ background: '#161e1a' }}>
      {columns.map((col) => (
        <TableCellHead<Item>
          key={col.key}
          sortKey={col.key as keyof Item}
          sortConfig={sortConfig}
          requestSort={requestSort}
        >
          {col.label}
        </TableCellHead>
      ))}
    </TableRow>
  );

  const rowContent = (_index: number, row: Item) => (
    <>
      {columns.map((col) => (
        <TableCell
          key={col.key}
          sx={{
            fontSize: '12px',
            whiteSpace: 'nowrap',
          }}
        >
          {col.render ? col.render(row) : (row as any)[col.key]}
        </TableCell>
      ))}
    </>
  );

  return (
    <Paper
      sx={{
        height: 'calc(100vh - 460px)',
        width: '100%',
        overflow: 'hidden',
        '& .MuiTableCell-root': {
          fontSize: '12px',
        },
      }}
    >
      {isLoading && <Skeleton width={'100%'} height={'calc(100vh - 460px)'} />}
      {!items && (
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            padding: 4,
          }}
        >
          Títulos a Pagar sem registro no dia
        </Typography>
      )}
      <TableVirtuoso
        data={items}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
