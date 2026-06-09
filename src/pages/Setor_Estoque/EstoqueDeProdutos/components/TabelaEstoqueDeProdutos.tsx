import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { FcApproval } from 'react-icons/fc';
import { TbHandStop } from 'react-icons/tb';
import useSortableDataNew from '@/hooks/sortable.hook';
import TableCellHead from '@/components/Tabela/TableCellHead';

interface Item {
  id: string;
  codigo: string;
  ean: string;
  descricao: string;
  diasEstoque: number;
  disponivel: number;
  qtdTerceiro: number;
  pendente: number;
  reserva: number;
  preco: number;
  saldo: number;
  custo: number;
  sugestaoTri: number;
  invoice: number;
  vendasTri: number;
  vendasAno: number;
  local: string;
}

interface TabelaEstoqueProps {
  margens: Item[];
}

const TabelaEstoqueDeProdutos: React.FC<TabelaEstoqueProps> = ({ margens }) => {
  const { items, requestSort, sortConfig } = useSortableDataNew<Item>(margens);

  return (
    <TableContainer sx={{ maxHeight: 600 }} component={Paper}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow sx={{ background: '#161e1a' }}>
            <TableCellHead<Item>
              sortKey="codigo"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Código
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="ean"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Ean
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="descricao"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Descrição
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="diasEstoque"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Dias Stk
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="disponivel"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Disponível
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="qtdTerceiro"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              QTD. Terceiro
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="pendente"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Pendente
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="reserva"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Reserva
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="preco"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Preço
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="saldo"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Saldo
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="custo"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Custo Inv.
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="sugestaoTri"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Sugestão
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="vendasTri"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Vendas últimos 90 D - {new Date().getFullYear()}
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="vendasAno"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Vendas Mesmo Período - {new Date().getFullYear() - 1}
            </TableCellHead>
            <TableCellHead<Item>
              sortKey="local"
              sortConfig={sortConfig}
              requestSort={requestSort}
            >
              Local
            </TableCellHead>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.codigo}</TableCell>
              <TableCell>{item.ean}</TableCell>
              <TableCell>{item.descricao}</TableCell>
              <TableCell>
                {item.diasEstoque > 90 ? (
                  <AiFillLike style={{ color: 'green' }} size={20} />
                ) : (
                  <AiFillDislike style={{ color: 'red' }} size={20} />
                )}{' '}
                <b>{item.diasEstoque.toFixed(0)}</b>
              </TableCell>
              <TableCell>
                {String(item.disponivel).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                {String(item.qtdTerceiro).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                {String(item.pendente).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                {String(item.reserva).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                R$ {String(item.preco).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                {String(item.saldo).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>R${item.custo}</TableCell>
              <TableCell>
                {Number((item.sugestaoTri - item.invoice).toFixed(0)) > 0 ? (
                  <FcApproval style={{ color: 'green' }} size={20} />
                ) : (
                  <TbHandStop style={{ color: 'red' }} size={24} />
                )}{' '}
                <b>
                  {Number((item.sugestaoTri - item.invoice).toFixed(0)) > 0
                    ? String(item.sugestaoTri - item.invoice).replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        '.'
                      )
                    : 0}
                </b>
              </TableCell>
              <TableCell>
                {String(item.vendasTri).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>
                {String(item.vendasAno).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </TableCell>
              <TableCell>{item.local}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaEstoqueDeProdutos;
