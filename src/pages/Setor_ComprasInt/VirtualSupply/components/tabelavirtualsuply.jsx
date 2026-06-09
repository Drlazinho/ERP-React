import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Chip } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import ModalInvoice from './InvoiceModal';
import ModalCarteira from '../PedidosCarteiraModal';

const TabelaVirtualSupply = ({
  data,
  loading,
  setShowModal,
  setDadosFromTable,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCarteira, setIsOpenCarteira] = useState(false);
  const [dadosEnvio, setDadosEnvio] = useState();
  const handleChange = (obj) => {
    setDadosEnvio(obj.codigo);
    setIsOpen(true);
  };
  const handleChangeCarteira = (obj) => {
    setDadosEnvio(obj.codigo);
    setIsOpenCarteira(true);
  };

  const handleClose = () => setIsOpen(false);
  const handleCloseCarteira = () => setIsOpenCarteira(false);

  const columns = useMemo(() => [
    {
      accessorKey: 'codigo',
      header: 'Código',
      size: 20,
    },
    {
      accessorKey: 'descricao',
      header: 'Descrição',
      size: 10,
    },
    {
      accessorKey: 'diasEstoque',
      header: <span>Dias Stk</span>,
      size: 10,
      Cell: ({ cell, row }) => {
        if (cell.getValue() <= 90) {
          return (
            <>
              {' '}
              <Chip label="A" size="small" color="success" />{' '}
              <span>
                <b>{cell.getValue().toFixed(0)}</b>
              </span>{' '}
            </>
          );
        }
        if (cell.getValue() > 90 && cell.getValue() < 120) {
          return (
            <>
              {' '}
              <Chip label="B" size="small" color="warning" />{' '}
              <span>
                <b>{cell.getValue().toFixed(0)}</b>
              </span>{' '}
            </>
          );
        }
        if (cell.getValue() >= 120) {
          return (
            <>
              {' '}
              <Chip label="C" size="small" color="error" />{' '}
              <span>
                <b>{cell.getValue().toFixed(0)}</b>
              </span>{' '}
            </>
          );
        }
      },
    },
    {
      accessorKey: 'disponivel',
      header: 'Disponível',
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'qtdTerceiro',
      header: 'QTD.Terceiro',
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'pendente',
      header: 'Pendente',
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'reserva',
      header: 'Reserva',
      size: 10,
    },
    {
      accessorKey: 'saldo',
      header: 'Saldo',
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'custo',
      header: <span>Custo Inv.</span>,
      size: 10,
      Cell: ({ cell }) => {
        return <span>R$ {cell.getValue()}</span>;
      },
    },
    {
      accessorKey: 'sugestaoTri',
      header: <p>Sugestão</p>,
      size: 10,
      Cell: ({ cell }) => {
        if (cell.getValue() > 0) {
          return (
            <>
              <VerifiedIcon color="success" />
              <span>
                <b>
                  {String(cell.getValue()).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    '.'
                  )}
                </b>
              </span>
            </>
          );
        }
        return (
          <>
            <BackHandOutlinedIcon color="error" />
            <span>
              <b>0</b>
            </span>
          </>
        );
      },
    },
    {
      accessorKey: 'vendasTri',
      header: (
        <span>
          Vendas Últimos <br />
          90D - {new Date().getFullYear()}{' '}
        </span>
      ),
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'vendasAno',
      header: (
        <span>
          Vendas Mesmo <br />
          Período - {new Date().getFullYear() - 1}{' '}
        </span>
      ),
      size: 10,
      Cell: ({ cell }) => {
        return (
          <span>
            {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          </span>
        );
      },
    },
    {
      accessorKey: 'invoice',
      header: 'P.O',
      size: 10,
      Cell: ({ cell, row }) => {
        return (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignContent: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span>
                {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </span>
            </Box>
            <Box>
              <IconButton
                disabled={row.original.invoice == 0}
                aria-label="edit"
                onClick={(e) => {
                  handleChange(row.original);
                }}
              >
                <InfoOutlinedIcon />
              </IconButton>
            </Box>
          </Box>
        );
      },
    },
    // {
    //   accessorKey: 'id',
    //   header: (
    //     <span>
    //       Pedidos <br />
    //       em carteira
    //     </span>
    //   ),
    //   size: 10,
    //   Cell: ({ cell, row }) => {
    //     return (
    //       <Box>
    //         {/* <Box>
    //           <span>
    //             {String(cell.getValue()).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
    //           </span>
    //         </Box> */}
    //         <Box>
    //           <IconButton
    //             // disabled={row.original.pedidos_em_carteira == 0}
    //             aria-label="edit"
    //             onClick={(e) => {
    //               handleChangeCarteira(row.original);
    //             }}
    //           >
    //             <InfoOutlinedIcon />
    //           </IconButton>
    //         </Box>
    //       </Box>
    //     );
    //   },
    // },
    {
      accessorKey: 'invoiceValorDesconsiderado',
      header: (
        <span>
          Produtos da Invoice <br />
          Desconsiderados
        </span>
      ),
      size: 10,
      Cell: ({ cell }) => {
        return <span> {cell.getValue()}</span>;
      },
    },
    // {
    //   accessorKey: 'invoiceValorParcial',
    //   header: (
    //     <span>
    //       Produtos da Invoice <br />
    //       Parcial
    //     </span>
    //   ),
    //   size: 10,
    //   Cell: ({ cell }) => {
    //     return <span> {cell.getValue()}</span>;
    //   },
    // },
    {
      accessorKey: 'local',
      header: 'Local',
      size: 10,
    },
    {
      header: 'Ações',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      muiTableFooterCellProps: {
        align: 'center',
      },
      Cell: ({ cell, row }) => {
        return (
          <>
            <IconButton
              onClick={() => {
                setDadosFromTable(row.original);
                setShowModal(true);
              }}
              type="button"
            >
              <ModeEditIcon color="primary" />
            </IconButton>
          </>
        );
      },
    },
  ]);

  const formattedData = Array.isArray(data)
    ? data.map((item) => {
        return {
          id: item.id,
          codigo: item.codigo,
          descricao: item.descricao,
          diasEstoque: item.diasEstoque,
          disponivel: item.disponivel,
          qtdTerceiro: item.qtdTerceiro,
          pendente: item.pendente,
          reserva: item.reserva,
          saldo: item.saldo,
          custo: item.custo,
          sugestaoTri: `${(item.sugestaoTri - item.invoice).toFixed(0)}`,
          vendasTri: item.vendasTri,
          vendasAno: item.vendasAno,
          invoice: item.invoice,
          invoiceValorDesconsiderado: item.invoiceValorDesconsiderado,
          invoiceValorParcial: item.invoiceValorParcial,
          local: item.local,
        };
      })
    : [];

  return (
    <>
      <ModalInvoice
        dados={dadosEnvio}
        isOpen={isOpen}
        handleClose={handleClose}
      />
      <ModalCarteira
        dados={dadosEnvio}
        isOpenCarteira={isOpenCarteira}
        handleCloseCarteira={handleCloseCarteira}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={formattedData}
          initialState={{ density: 'compact', pagination: { pageSize: 100 } }}
          muiTopToolbarProps={{
            sx: {
              bgcolor: '#F3F3F3',
              color: 'white',
              borderRadius: '16px 16px 0 0',
            },
          }}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: 'white',
              color: 'black',
            },
          }}
          muiTableBodyProps={{
            sx: {
              '& tr:nth-of-type(odd)': {
                backgroundColor: 'white',
              },
              '& tr:nth-of-type(even)': {
                backgroundColor: '#F3F3F3',
              },
            },
          }}
          localization={MRT_Localization_PT_BR}
          enableColumnFilters={false}
          muiTableBodyCellProps={{
            sx: { fontSize: '11px' },
          }}
          state={{ isLoading: loading }}
          muiTableContainerProps={{
            sx: { maxHeight: 600 },
          }}
          enableStickyHeader
        />
      )}
    </>
  );
};

export default TabelaVirtualSupply;
