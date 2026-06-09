import React, { useMemo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import formatDateTotvs from '@/utils/formatDataTotvs.js';
import { ControlPoint } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import DownloadIcon from '@mui/icons-material/Download';
import { donwloadPDF } from '@/utils/downloadPdf.js';
import ModalGuia from './ModalGuia.jsx';
import { ModalPagamento } from './ModalPagamento.jsx';
import { NotaFiscalImagemGuiaGetDownload } from '@/services/notasFiscaisImagem.service.js';
import { NotaFiscalImagemPagamentoGetDownload } from '@/services/notasFiscaisImagem.service.js';
import ShowModalGuia from './ModalShowGuiaAnexada.jsx';

const TabelaDeNotasFiscaisEmitidas = ({
  handleSubmitGuia,
  data,
  loading,
  handleChangeEnviado,
  showModal,
}) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState('');

  const handleDowloadZip = (value) => {
    NotaFiscalImagemGuiaGetDownload(value).then((res) => {
      donwloadPDF(res, 'Guia- Nº ' + value);
    });
    NotaFiscalImagemPagamentoGetDownload(value)
      .then((res) => {
        donwloadPDF(res, 'Pagamento - Nº ' + value);
      })
      .finally(() => {
        setLoader('');
      });
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'nf',
        header: 'Nota Fiscal',
        size: 10,
        Cell: ({ cell }) => {
          return (
            <Link
              to={`/notafiscal/${cell.getValue()}`}
              title="Visualizar Espelho da Nota Fiscal"
            >
              <b>{cell.getValue()}</b>
            </Link>
          );
        },
      },
      {
        header: 'Pagamento|Guia',
        size: 60,
        Cell: ({ row }) => {
          if (row.original.guia == false) {
            return (
              <Box>
                <LoadingButton
                  disabled={true}
                  style={{ cursor: 'none' }}
                  variant="filled"
                  startIcon={<DownloadIcon style={{ color: 'black' }} />}
                >
                  <span className="6px" style={{ color: 'black' }}>
                    Baixar
                  </span>{' '}
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                  ></Box>
                </LoadingButton>
              </Box>
            );
          } else {
            return (
              <Box>
                <LoadingButton
                  variant="contained"
                  startIcon={<DownloadIcon style={{ color: 'white' }} />}
                  onClick={() => handleDowloadZip(row.original.nf)}
                >
                  <span className="6px" style={{ color: 'white' }}>
                    BAIXAR
                  </span>{' '}
                  <Box
                    sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}
                  ></Box>
                </LoadingButton>
              </Box>
            );
          }
        },
      },
      {
        header: 'Cubagem',
        size: 50,
        Cell: ({ row }) => {
          return (
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={() => navigate(`/printcubagem/${row.original.nf}`)}
            >
              Cubagem
            </Button>
          );
        },
      },
      {
        accessorKey: 'guia',
        header: 'Guia',
        Cell: ({ cell, row }) => {
          if (cell.row.original.guia == false) {
            return (
              <Button>
                <ModalGuia
                  numeroNotaFiscal={row.original.nf}
                  handleSubmitGuia={handleSubmitGuia}
                />
              </Button>
            );
          } else if (
            cell.row.original.guia == true &&
            cell.row.original.uf === 'BA'
          ) {
            return (
              <Button variant="contained" color="warning">
                <span>SEM GUIA NECESSÁRIA</span>
              </Button>
            );
          } else {
            return <ShowModalGuia numeroNotaFiscal={row.original.nf} />;
          }
        },
      },
      {
        accessorKey: 'Pagamento',
        header: 'Pagamento',
        Cell: ({ cell, row }) => {
          if (
            cell.row.original.pagamento == false &&
            cell.row.original.guia == true
          ) {
            return (
              <Button color="primary">
                <ModalPagamento numeroNotaFiscal={row.original.nf} />
              </Button>
            );
          } else if (
            cell.row.original.pagamento == true &&
            cell.row.original.guia == true
          ) {
            return (
              <Button
                color="success"
                variant="contained"
                style={{ cursor: 'none' }}
              >
                <span>PAGAMENTO EFETUADO</span>
              </Button>
            );
          } else {
            return (
              <Button
                color="success"
                variant="contained"
                style={{ cursor: 'none' }}
              >
                <span>AGUARDANDO GUIA</span>
              </Button>
            );
          }
        },
      },
      {
        accessorKey: 'nome',
        header: 'Nome',
        size: 50,
      },
      {
        accessorKey: 'enviada',
        header: 'Envio',
        Cell: ({ cell, row }) => {
          if (cell.getValue() === 1) {
            return (
              <>
                <div>
                  {' '}
                  <Button disabled>
                    <ThumbUpIcon color="success" />{' '}
                  </Button>
                </div>
                <p>{row.original.dataEnvio}</p>
              </>
            );
          } else {
            return (
              <Tooltip title="Atualizar" placement="top">
                <IconButton
                  onClick={() => handleChangeEnviado(row.original)}
                  type="button"
                  variant="outlined"
                  color="secondary"
                  sx={{ bgcolor: '#c1c1c1' }}
                >
                  {' '}
                  <ThumbDownIcon sx={{ color: '#ff0000' }} />
                </IconButton>
              </Tooltip>
            );
          }
        },
        size: 20,
      },
      {
        accessorKey: 'qtde',
        header: 'vol.',
        size: 10,
      },
      {
        accessorKey: 'emissao',
        header: 'DtFat',
        size: 10,
        Cell: ({ cell }) => {
          return <span>{formatDateTotvs(cell.getValue())}</span>;
        },
      },
      {
        accessorKey: 'dataBipeFiscal',
        header: 'DtEnvio',
        size: 10,
      },
      {
        accessorKey: 'romaneio',
        header: 'Romaneio',
        size: 10,
        Cell: ({ cell, row }) => {
          if (cell.getValue() === 'S') {
            return (
              <>
                <div>
                  {' '}
                  <Button disabled>
                    <ThumbUpIcon color="success" />{' '}
                  </Button>
                </div>
                <p>{formatDateTotvs(row.original.dataEmissaoRomaneio)}</p>
              </>
            );
          } else {
            return (
              <Button disabled>
                {' '}
                <ThumbDownIcon sx={{ color: '#ff0000' }} />
              </Button>
            );
          }
        },
      },
      {
        accessorKey: 'separado',
        header: 'Separado',
        size: 10,
        Cell: ({ cell, row }) => {
          if (cell.getValue() === 1) {
            return (
              <>
                <div>
                  {' '}
                  <Button disabled>
                    <ThumbUpIcon color="success" />{' '}
                  </Button>
                </div>
                <p>{row.original.dataSeparacao}</p>
              </>
            );
          } else {
            return (
              <Button disabled>
                {' '}
                <ThumbDownIcon sx={{ color: '#ff0000' }} />
              </Button>
            );
          }
        },
      },
      {
        accessorKey: 'filial_Separad',
        header: 'Filial Separada',
        size: 50,
      },
      {
        accessorKey: 'endLoc_Separad',
        header: 'Endereço de Localização',
        size: 100,
      },
    ],
    []
  );

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        muiTopToolbarProps={{ sx: { bgcolor: '#F6D258', color: '#fff' } }}
        muiTableHeadCellProps={{ sx: { bgcolor: '#F6D258', color: '#fff' } }}
        enableColumnFilters={false}
        muiTableHeadCellFilterTextFieldProps={{
          sx: { bgcolor: '#f5bac4', color: '#fff', borderRadius: 3 },
        }}
        pagination
        initialState={{ density: 'compact', pagination: { pageSize: 100 } }}
        enablePagination={true}
        enableBottomToolbar={true}
        state={{ isLoading: loading }}
        muiTableContainerProps={{ sx: { maxHeight: 600 } }}
        enableStickyHeader
        enableGrouping
        enableRowActions
        renderRowActions={({ row }) => (
          <Box>
            <Tooltip arrow placement="right" title="separar">
              <IconButton
                onClick={() => {
                  showModal(row.original);
                }}
              >
                <ControlPoint sx={{ color: 'green' }} />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      />
    </>
  );
};

export default TabelaDeNotasFiscaisEmitidas;
