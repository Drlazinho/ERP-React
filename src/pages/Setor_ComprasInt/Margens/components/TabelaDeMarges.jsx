import React, { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Chip, Tooltip } from '@mui/material';
import { formatDateTime } from '../../../../utils/formatDateInput';
import { Link } from 'react-router-dom';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import formatDateTotvs from '../../../../utils/formatDataTotvs';
import VerifiedIcon from '@mui/icons-material/Verified';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import useSortableData from '../../../../utils/sortable';

const TabelaDeMargens = ({ data, rowCount, loading, pageCount, paginationFiltro, paginaAtual }) => {
    const { items, requestSort, sortConfig } = useSortableData(data);


    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 100,
    });

    const handleChangePage = (event, value) => {
        setPagination({
            ...pagination,
            pageIndex: value,
        });
            paginationFiltro(paginaAtual + 1)
    };

    const columns = useMemo(
        () => [
            {
                accessorKey: 'codigo',
                header: 'Codigo',
                size: 10,
            },
            {
                accessorKey: 'descricao',
                header: 'Descrição',
                size: 50
            },
            {
                accessorKey: 'diasEstoque',
                header: <span>Dias <br /> Stk</span>,
                size: 10,
                Cell: ({ cell, row }) => {
                    if (cell.getValue()  <= 90) {
                      return <> <Chip label="A" size='small' color='success'/>{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;
                    }                   
                    if (cell.getValue() > 90) {
                        return <> <Chip label="B" size='small' color='warning'/>{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;
 
                    }
                    if (cell.getValue() > 120) {
                        return <> <Chip label="C" size='small' color='error' />{' '}<span><b>{cell.getValue().toFixed(0)}</b></span> </>;
 
                    }
                  },
            },
            {
                accessorKey: 'saldo',
                header: 'Saldo',
                size: 10,
                Cell: ({ cell }) => {
                    return (
                        <span>{String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
                    )
                },
            },
            {
                accessorKey: 'preco',
                header: 'Preço',
                size: 10,
                Cell: ({ cell }) => {
                    return (
                        <span>R$ {cell.getValue()}</span>
                    )
                },
            },
            {
                accessorKey: 'precoMedio',
                header: <span>Preço <br /> Médio</span>,
                size: 10,
                Cell: ({ cell }) => {
                    return (
                        <span>R$ {cell.getValue()}</span>
                    )
                },
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
                    if(cell.getValue() > 0) {
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
            {
                accessorKey: 'local',
                header: <p>Local</p>,
                size: 10,
            },
        ],
        [],
    );


    const formattedData = items.map((item) => {
        return {
          codigo: item.codigo,
          descricao: item.descricao,
          diasEstoque: item.diasEstoque,
          saldo: item.saldo,
          preco: item.preco,
          precoMedio: item.precoMedio,
          custo: item.custo,
          sugestaoTri: `${(item.sugestaoTri - item.invoice).toFixed(0)}`,
          vendasTri: item.vendasTri,
        //   invoice: item.invoice,
          local: item.local,
        };
      });
    

    return <MaterialReactTable columns={columns} data={formattedData} 
    // rowCount={rowCount} //enable some features
        muiTopToolbarProps={{ sx: { bgcolor: '#54F070', color: '#000' } }}
        muiTableHeadCellProps={{ sx: { bgcolor: '#54F07090', color: '#000', fontSize: '12px' } }}
        enableColumnFilters={false}
        enableBottomToolbar={false}
        // pageCount={pageCount}
        initialState={{
            density: 'compact',
            // pagination: { pageSize: 100 },
            pagination 
        }}
        state={{ isLoading: loading }}
        muiTableContainerProps={{ sx: { maxHeight: 600 } }}
        enableStickyHeader
        // manualPagination
        enableGrouping
        enablePagination={false}
    />;
};

export default TabelaDeMargens;
