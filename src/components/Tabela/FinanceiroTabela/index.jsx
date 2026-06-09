import React, { memo, useEffect, useState } from 'react';
import useSortableData from '../../../utils/sortable';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { Link } from 'react-router-dom';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { AiFillDislike, AiFillLike } from 'react-icons/ai';
import { ImHappy2 } from 'react-icons/im';
import { RiEmotionUnhappyFill } from 'react-icons/ri';
import { MaterialReactTable } from 'material-react-table';
import { createTheme, ThemeProvider, useTheme } from '@mui/material';

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tooltip,
} from '@mui/material';
import './styles.css';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { width } from '@mui/system';
import { useMemo } from 'react';

function FinanceiroTabelaProps({ ...props }) {
  const { items, requestSort, sortConfig } = useSortableData(props.entregas);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const [visibleColumns, setVisibleColumns] = useState({
    notafiscal: true,
    nome: true,
    destino: true,
    emissao: true,
    saida: true,
    previsao: true,
    entregue: true,
    dias: true,
    opcao: true,
    condPgto: true,
    expedido: true,
  });

  const [tableExpanded, setTableExpanded] = useState(true);

  const toggleColumnVisibility = (columnName) => {
    setVisibleColumns({
      ...visibleColumns,
      [columnName]: !visibleColumns[columnName],
    });
  };

  const toggleTableExpansion = () => {
    setTableExpanded(!tableExpanded);
  };
  const columns = useMemo(
    () => [
      { accessorKey: 'nota', header: 'Nota Fiscal', Cell: ({ cell }) => {
        return (
          <Link
            to={`/notafiscal/${cell.getValue()}`}
            title="Visualizar Espelho da Nota Fiscal"
          >
            <b>{cell.getValue()}</b>
          </Link>
        )
      }, },
      { accessorKey: 'nome', header: 'Nome' },
      { accessorKey: 'destino', header: 'Dest.' },
      { accessorKey: 'emissao', header: 'Emis.' },
      { accessorKey: 'producao', header: 'Prod.' },
      { accessorKey: 'previsao', header: 'Prev.' },
      { accessorKey: 'entregue', header: 'Entregue' },
      { accessorKey: 'dias', header: 'Dias' },
      { accessorKey: 'opcao', header: 'Opção' },
      { accessorKey: 'condpgto', header: 'Cond.pgto' },
      { accessorKey: 'exp', header: 'Exp.' },
    ],
    []
  );

   const formattedData = items.map((item) => {
    return {
      nota: item.documento,
      nome: item.nome,
      destino: item.destino,
      emissao: item.emissao,
      producao: item.saida == '' ? '--/--/--' : formatDateTotvs(item.saida),
      previsao: item.previsao == '' ? '--/--/--' : formatDateTotvs(item.previsao),
      entregue: item.entregue == '' ? '--/--/--' : formatDateTotvs(item.entregue),
      dias: item.dias == '' ? '0' : item.dias,
      opcao:
        item.dias < 10 ? (
          <ImHappy2 style={{ color: 'green' }} />
        ) : (
          <RiEmotionUnhappyFill style={{ color: 'red' }} size={20} />
        ),
      condpgto: item.condPgto == '' ? '--/--/--' : item.condPgto,
      exp:
        item.expedido === 0 ? (
          <AiFillDislike style={{ color: 'red' }} />
        ) : (
          <AiFillLike style={{ color: 'green' }} />
        ),
    };
  });
  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table

        
        },
      }),
    [globalTheme]
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <MaterialReactTable
        style={{ width: '90%' }}
        data={formattedData}
        columns={columns}
        muiTopToolbarProps={{ sx: { bgcolor: '#333D29', color: '#fff' } }}
        muiTableBodyProps={{
         sx: {
           //stripe the rows, make odd rows a darker color
           '& tr:nth-of-type(odd)': {
             backgroundColor: 'white',
           },
           '& tr:nth-of-type(even)': {
             backgroundColor: 'lightgray',
           },
         },
       }}
        muiTableHeadCellProps={{
          //simple styling with the `sx` prop, works just like a style prop in this example
          sx: {
            backgroundColor: '#333D29',
            color:'white'

          },
        }}
       
      />{' '}
    </ThemeProvider>
  );
}

export const FinanceiroTabela = memo(
  FinanceiroTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);

//dias >10 fica vermelho
//expedido 1 ou 0 pra vermelho e verde
