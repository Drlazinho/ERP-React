import React, { useMemo } from 'react';
import useSortableData from '../../../utils/sortable';
import { Box, Button, Chip, Tooltip } from '@mui/material';

import { AiFillDislike, AiFillLike } from 'react-icons/ai';
// import { FaCommentDollar } from 'react-icons/fa';
// import { VscError } from 'react-icons/vsc';
import { FcApproval } from 'react-icons/fc';
import { TbHandStop } from 'react-icons/tb';
import '../VirtualSupplyTabela/style.css';
import MaterialReactTable from 'material-react-table';
import VerifiedIcon from '@mui/icons-material/Verified';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';



const VirtualSupplyTabela = ({ data, rowCount, loading }) => {
  const { requestSort, sortConfig } = useSortableData(data);


  // const VirtualSupplyTabela = (props) => {
  //   const { items, requestSort, sortConfig } = useSortableData(props.margens);

  // const getClassNamesFor = (name) => {
  //   if (!sortConfig) {
  //     return;
  //   }
  //   return sortConfig.key === name ? sortConfig.direction : undefined;
  // };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'codigo',
        header: 'Código',
        size: 10,
      },
      {
        accessorKey: 'descricao',
        header: 'Descrição',
        size: 10,
      },
      {
        accessorKey: 'diasEstoque',
        header: <span>Dias <br /> Stk</span>,
        size: 10,
        Cell: ({ cell, row }) => {
          if (cell.getValue() <= 90) {
            return <> <Chip label="A" size='small' color='success' />{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;
          }
          if (cell.getValue() > 90) {
            return <> <Chip label="B" size='small' color='warning' />{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;

          }
          if (cell.getValue() > 120) {
            return <> <Chip label="C" size='small' color='error' />{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;

          }
        },

      },
      {
        accessorKey: 'disponivel',
        header: 'Disponível',
        size: 10,
      },
      {
        accessorKey: 'pendente',
        header: 'Pendente',
        size: 10,
      },
      {
        accessorKey: 'reserva',
        header: 'Reserva',
        size: 10,
      },
      {
        accessorKey: 'codigo',
        header: 'Código',
        size: 10,
      },
      {
        accessorKey: 'saldo',
        header: 'Saldo',
        Cell: ({ cell }) => {
          return (
            <span>{String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          )
        },
        size: 10,
      },
      {
        accessorKey: 'custo',
                header: <span>Custo <br /> Inv.</span>,
                size: 10,
                Cell: ({ cell }) => {
                    return (
                        <span>R$ {cell.getValue()}</span>
                    )
                },
      },
      {
        accessorKey: 'sugestaoTri',
        header: <p>Sugestão</p>,
        size: 10,
        Cell: ({ cell }) => {
            if (cell.getValue() > 0) {
                return <><VerifiedIcon color='success' /><span><b>{String(cell.getValue()).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    '.'
                )}</b></span></>
            }
            return <><BackHandOutlinedIcon color='error' /><span><b>0</b></span></>
        },
    },
    {
      accessorKey: 'vendasTri',
      header: <span>Vendas <br />90D</span>,
      size: 10,
      Cell: ({ cell }) => {
          return (
              <span>{String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
          )
      },
  },

    ]
  )



  return <MaterialReactTable columns={columns} data={formattedData}
        // rowCount={rowCount} //enable some features
        muiTopToolbarProps={{ sx: { bgcolor: '#54F070', color: '#000' } }}
        muiTableHeadCellProps={{ sx: { bgcolor: '#54F07090', color: '#000', fontSize: '12px' } }}
        enableColumnFilters={false}
        enableBottomToolbar={false}
        // pageCount={pageCount}
        state={{ isLoading: loading }}
        muiTableContainerProps={{ sx: { maxHeight: 600 } }}
        enableStickyHeader
        // manualPagination
        enableGrouping
    />;

  return (
    <table className="table table-striped table-hover">
      <thead className="table-dark mt-3 Thead-fixed">
        <tr>
          <th>
            <button
              type="button"
              onClick={() => requestSort('codigo')}
              className={getClassNamesFor('codigo')}
            >
              Código
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('descricao')}
              className={getClassNamesFor('descricao')}
            >
              Descrição
            </button>
          </th>
          <th coldSpan={2}>
            <button
              type="button"
              onClick={() => requestSort('diasEstoque')}
              className={getClassNamesFor('diasEstoque')}
            >
              Dias Stk
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('disponivel')}
              className={getClassNamesFor('disponivel')}
            >
              Disponivel
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('pendente')}
              className={getClassNamesFor('pendente')}
            >
              Pendente
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('reserva')}
              className={getClassNamesFor('reserva')}
            >
              Reserva
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('saldo')}
              className={getClassNamesFor('saldo')}
            >
              Saldo
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('custo')}
              className={getClassNamesFor('custo')}
            >
              Custo Inv.
            </button>
          </th>
          <th coldSpan={2}>
            <button
              type="button"
              onClick={() => requestSort('sugestaoTri')}
              className={getClassNamesFor('sugestaoTri')}
            >
              Sugestão
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('vendastri')}
              className={getClassNamesFor('vendastri')}
            >
              Vendas últimos 90 D - {new Date().getFullYear()}
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('vendasano')}
              className={getClassNamesFor('vendasano')}
            >
              Vendas Mesmo Período - {new Date().getFullYear() - 1}
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('invoices')}
              className={getClassNamesFor('invoices')}
            >
              Invoices
            </button>
          </th>
          <th>
            <button
              type="button"
              onClick={() => requestSort('local')}
              className={getClassNamesFor('local')}
            >
              Local
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>{item.codigo}</td>
            <td>{item.descricao}</td>
            <td>
              {
                item.diasEstoque <= 90 && <><Badge pill bg="success">A</Badge> <b>{item.diasEstoque.toFixed(0)}</b></>
              }
              {
                item.diasEstoque > 90 && item.diasEstoque <= 120 && <><Badge pill bg="warning">B</Badge> <b>{item.diasEstoque.toFixed(0)}</b></>
              }
              {
                item.diasEstoque > 120 && <><Badge pill bg="danger">C</Badge> <b>{item.diasEstoque.toFixed(0)}</b></>
              }
            </td>
            <td>
              {String(item.disponivel).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>
              {String(item.pendente).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>
              {String(item.reserva).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>{String(item.saldo).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</td>
            <td>R${item.custo}</td>
            <td>
              {(item.sugestaoTri - item.invoice).toFixed(0) > 0 ? (
                <>
                  <FcApproval style={{ color: 'green' }} size={20} />
                </>
              ) : (
                <TbHandStop style={{ color: 'red' }} size={24} />
              )}
              <b>
                {(item.sugestaoTri - item.invoice).toFixed(0) > 0
                  ? String(
                    (item.sugestaoTri - item.invoice).toFixed(0)
                  ).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  : 0}
              </b>
            </td>
            <td>
              {String(item.vendasTri).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>
              {String(item.vendasAno).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>
              {String(item.invoice).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
            </td>
            <td>{item.local}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VirtualSupplyTabela;
