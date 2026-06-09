import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Box } from '@mui/joy';
import { MaterialReactTable } from 'material-react-table';
import Formate from '../../../utils/formatDataPonto';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import formatCnpj from './components/NotaFiscal/formatCnpj';
import { Button, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';

export default function FiscalTabela(props) {
  const [isFilterRow, setIsFilterRow] = useState();
  const [isFiltrado, setIsFiltrado] = useState(false);
  const [expandLine, setExpandLine] = useState(false)
  const [titleButtonExpand, setTitleButtonExpand] = useState('+')
  useEffect(() => {
    setIsFiltrado(props.isFiltrado);
  }, [props.isFiltrado]);

  useEffect(() => {
    setIsFilterRow(props.isFilterRow);
  }, [props.isFilterRow]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'pdf',
        header: '',
        size: 20,
      },
      {
        accessorKey: 'cnpj',
        header: 'CNPJ',
        size: 20,
        filterable: true,
      },
      {
        accessorKey: 'chaveNotaFiscal',
        header: 'N.F/Chave',
        size: 20,
      },
      {
        accessorKey: 'cnpjEmissor',
        header: 'CNPJ Emissor',
        size: 20,
      },
      {
        accessorKey: 'nomeEmissor',
        header: 'Nome Emissor',
        size: 20,
      },

      {
        accessorKey: 'dataHoraEmissao',
        header: 'Data/Hora Emissão',
        size: 20,
      },
      {
        accessorKey: 'dataAutorizacao',
        header: 'Data Autorização',
        size: 20,
      },
      {
        accessorKey: 'modelo',
        header: 'Modelo',
        size: 20,
        Cell: ({ cell }) => {
          return cell.getValue() === '55' ? '55 - NF-e' : cell.getValue() === '57' ? '57 - Ct-e' : cell.getValue() === '67' ? '67 - Ct-e OS' : ''
        },
      },
      {
        accessorKey: 'valorIcms',
        header: 'ICMS',
        size: 20,
        Cell: ({ cell }) => {
          if (cell.getValue() !== '' && cell.getValue() !== null) {
            return `R$ ${cell.getValue()}`
          }
          else {
            return `---`
          }
        },
      },
      {
        accessorKey: 'valor',
        header: 'Valor',
        size: 20,
        Cell: ({ cell }) => {
          if (cell.getValue() !== '') {
            return `R$ ${cell.getValue()}`
          } else {
            return `---`
          }
        },
      },
      {
        accessorKey: 'cancelado',
        header: 'Cancelado',
        size: 20,
        Cell: ({ cell }) => {
          if (cell.getValue() === 'X') {
            return <CancelIcon sx={{ color: '#ff0000' }} />
          } else {
            return `-`
          }
        },
        
      },
      {
        accessorKey: 'dataVencimento',
        header: 'Data Vencimento',
        size: 20,
        Cell: ({ cell }) => {
          if (cell.getValue() !== '') {
            return cell.getValue()
          } else {
            return `-`
          }
        },
      },
      {
        accessorKey: 'natureza',
        header: 'Natureza',
        size: 20,
      },
      {
        accessorKey: 'situacao',
        header: 'Situação',
        size: 20,
      },
    ],
    []
  );

  const cnpjsFilial = props.dataFilial.map(objeto => objeto.cnpj);
  const Data = props.data
    .filter((item) => !cnpjsFilial.includes(item.cnpjEmissor))
    .map((item) => {
      return {
        cnpj: item.cnpj,
        chaveNotaFiscal: <span>{!expandLine ? item.chaveNotaFiscal.slice(25, 34) : item.chaveNotaFiscal} <button onClick={() => { setExpandLine(!expandLine) }} className='btn btn-primary btn-sm ' type='button' >{titleButtonExpand}</button></span>,
        cnpjEmissor: formatCnpj(item.cnpjEmissor),
        nomeEmissor: item.nomeEmissor,
        dataHoraEmissao: `${Formate(item.dataEmissao)} - ${item.horaEmissao}`,
        dataAutorizacao: Formate(item.dataAutorizacao),
        modelo: item.modelo,
        dataVencimento: Formate(item.dataVencimento),
        valorIcms: item.valorIcms,
        valor: `${item.valor}`,
        natureza: item.natureza,
        cancelado: item.cancelado,
        situacao: item.situacao,
        pdf: (
          <Button
            disabled={item.xml === null}
            variant='contained'
            onClick={() => {
              // handleNotaXml(item.chaveNotaFiscal);
              props.donwloadNotaPdf(item.chaveNotaFiscal)
              // props.consultarNotaPdf(item.chaveNotaFiscal);
            }}
          >
              <Typography variant='body1' color={'#fff'}><DescriptionIcon size={20} color='#fff' /> PDF</Typography>
          </Button>
        ),
      };
    });

  return (
    <MaterialReactTable
      data={isFiltrado ? props.dataFiltrada : Data}
      columns={columns}
      state={{ isLoading: props.loading }}
      muiTopToolbarProps={{
        sx: { bgcolor: '#0088A3', color: '#fff', fontFamily: 'arial' },
      }}
      muiTableContainerProps={{ sx: { maxHeight: 600 } }}
      enableStickyHeader
      muiTableHeadCellProps={{
        sx: {
          bgcolor: '#0088A3',
          color: '#fff',
          fontWeight: 'normal',
          fontFamily: 'arial',
          fontSize: '15px',
        },
      }}
      initialState={{ density: 'compact', pagination: { pageSize: 200 } }}
      muiTableBodyCellProps={{
        sx: {
          fontSize: '11px',
          fontFamily: 'arial',
        },
      }}
    />
  );
}
