import React, { memo } from 'react'
import useSortableData from '../../../../utils/sortable'
import { Link } from 'react-router-dom'
import { AiFillDislike, AiFillLike } from 'react-icons/ai'
import { ImHappy2 } from 'react-icons/im'
import { RiEmotionUnhappyFill } from 'react-icons/ri'
import { MaterialReactTable } from 'material-react-table'
import formatDateTotvs from '../../../../utils/formatDataTotvs'
import { useMemo } from 'react'

function FinanceiroTabelaProps({ entregas, loading, handlePagamento }) {
  const { items, requestSort, sortConfig } = useSortableData(entregas)

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nota',
        header: 'Nota Fiscal',
        Cell: ({ cell }) => {
          return (
            <Link
              to={`/notafiscal/${cell.getValue()}`}
              title="Visualizar Espelho da Nota Fiscal"
            >
              {cell.getValue()}
            </Link>
          )
        },
        size: 90
      },
      { accessorKey: 'nome', header: 'Nome', size: 400 },
      { accessorKey: 'destino', header: 'Dest.', size: 90 },
      { accessorKey: 'emissao', header: 'Emis.', size: 90 },
      { accessorKey: 'producao', header: 'Prod.', size: 90 },
      { accessorKey: 'previsao', header: 'Prev.', size: 90 },
      { accessorKey: 'entregue', header: 'Entregue', size: 90 },
      { accessorKey: 'opcao', header: 'Dias/Opção', size: 90 },
      { accessorKey: 'condpgto', header: 'Cond.pgto' },
      { accessorKey: 'exp', header: 'Exp.', size: 90 },
    ],
    []
  )

  const formattedData = items.map((item) => {
    return {
      nota: item.documento,
      nome: item.nome,
      destino: item.destino,
      emissao: item.emissao == '' ? '--/--/--' : formatDateTotvs(item.emissao),
      producao: item.saida == '' ? '--/--/--' : formatDateTotvs(item.saida),
      previsao:
        item.previsao == '' ? '--/--/--' : formatDateTotvs(item.previsao),
      entregue:
        item.entregue == '' ? '--/--/--' : formatDateTotvs(item.entregue),
      opcao:
        item.dias < 10 ? (
          <>
            <ImHappy2 style={{ color: 'green' }} /> {item.dias}
          </>
        ) : (
          <>
            <RiEmotionUnhappyFill style={{ color: 'red' }} size={20} />{' '}
            {item.dias}
          </>
        ),
      condpgto: item.condPgto == '' ? '------' : item.condPgto,
      guia: item.guia,
      pagamento: item.pagamento,
      exp:
        item.expedido === 0 ? (
          <AiFillDislike style={{ color: 'red' }} />
        ) : (
          <AiFillLike style={{ color: 'green' }} />
        ),
    }
  })

  return (
    <MaterialReactTable
      data={formattedData}
      columns={columns}
      enableColumnFilters={false}
      enableStickyHeader
      enableRowVirtualization // <- virtualização ativada aqui
      rowVirtualizerOptions={{
        overscan: 10,
        estimateSize: () => 48, // altura média de uma linha
      }}
      initialState={{ density: 'compact', pagination: { pageSize: 50 } }}
      state={{ isLoading: loading }}
      muiTableContainerProps={{ sx: { maxHeight: 600 } }}
      muiTopToolbarProps={{ sx: { bgcolor: '#333D2999', color: '#fff' } }}
      muiTableHeadCellProps={{
        sx: {
          backgroundColor: '#333D29',
          color: 'white',
        },
      }}
      muiTableBodyProps={{
        sx: {
          '& tr:nth-of-type(odd)': {
            backgroundColor: 'white',
          },
          '& tr:nth-of-type(even)': {
            backgroundColor: '#ECECEC',
          },
        },
      }}
    />
  )
}

export const TabelaDoFinanceiro = memo(
  FinanceiroTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps)
  }
)

//dias >10 fica vermelho
//expedido 1 ou 0 pra vermelho e verde
