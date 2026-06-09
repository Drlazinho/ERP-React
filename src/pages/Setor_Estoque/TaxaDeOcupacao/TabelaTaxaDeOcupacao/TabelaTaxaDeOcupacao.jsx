import React, { memo, useState } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useMemo } from 'react';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';
import { useToast } from '../../../../hooks/toast.hook';
import '../styles.css';
import Loader from '../../../../components/Loader';
import CircleIcon from '@mui/icons-material/Circle';
import { excluirGalpao } from '../taxaDeOcupacao.service';
import CloseIcon from '@mui/icons-material/Close';
import {
  atualizarCapacidade,
  getHistoricoOcupacao,
} from '../taxaDeOcupacao.service';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { formatDatewithHour } from '../../../../utils/formatDateInput';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import { LoadingButton } from '@mui/lab';
import useUsuarioLocal from '../../../../hooks/usuarioLocal.hook';
import {
  Box,
  Button,
  TextField,
  Select,
  Modal as MuiModal,
  FormLabel,
  Typography,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

function TabelaTaxaDeOcupacaoProps({
  listaResultados,
  handleFetch,
  permissionFilter,
}) {
  const { setor } = useUsuarioLocal();
  const [showModalCapacidade, setShowModalCapacidade] = useState(false);
  const [showModalExcluir, setShowModalExcluir] = useState(false);
  const [showModalHistorico, setShowModalHistorico] = useState(false);
  const [exclusao, setExclusao] = useState({});
  const [historico, setHistorico] = useState([]);
  const [capacidade, setCapacidade] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToast();

  function renderColorStatus(ocupacao) {
    switch (true) {
      case ocupacao <= 50:
        return '#219C90';
      case ocupacao > 51 && ocupacao < 84:
        return '#FFC700';
      case ocupacao >= 85:
        return '#EE4E4E';
      default:
        return undefined;
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: 'galpao',
        header: 'Filial',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'endereco',
        header: 'Endereço',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'capacidade',
        header: 'Capacidade',
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
          return <p>{`${row.original.ocupacao}/${cell.getValue()}`}</p>;
        },
      },
      {
        accessorKey: 'ocupacCalc',
        header: 'Situação',
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
            <p>
              {`${cell.getValue()}% `}
              <CircleIcon
                fontSize="small"
                sx={{ color: renderColorStatus(cell.getValue()) }}
              />
            </p>
          );
        },
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
                  setCapacidade(row.original);
                  setShowModalCapacidade(!showModalCapacidade);
                }}
                disabled={permissionFilter(setor)}
                type="button"
              >
                <ModeEditIcon
                  color={permissionFilter(setor) ? '' : 'primary'}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  setExclusao(row.original);
                  setShowModalExcluir(!showModalExcluir);
                }}
                disabled={permissionFilter(setor)}
                type="button"
              >
                <DeleteForeverIcon
                  color={permissionFilter(setor) ? '' : 'error'}
                />
              </IconButton>
              <IconButton
                onClick={() => {
                  handleHistorico(row.original);
                  setShowModalHistorico(!showModalHistorico);
                }}
                type="button"
              >
                <VisibilityIcon color="secondary" />
              </IconButton>
            </>
          );
        },
      },
    ],
    []
  );

  const columnsHistorico = useMemo(
    () => [
      {
        accessorKey: 'estoqOcup',
        header: 'Galpão',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'produto',
        header: 'Produto',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'quantidadeMovimentada',
        header: 'Qtd Movimentada',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'saldoIncial',
        header: 'Saldo Inicial',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'saldoFinal',
        header: 'Saldo Final',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'tipoMovimentacao',
        header: 'Tipo Mov',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'userMovimentacao',
        header: 'Movimentado por',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
      },
      {
        accessorKey: 'dataMovimentacao',
        header: 'Data da movimentação',
        size: 'small',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        muiTableFooterCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => {
          return <p>{formatDatewithHour(cell.getValue())}</p>;
        },
      },
    ],
    []
  );

  const handleChange = (e) => {
    setCapacidade({
      ...capacidade,
      capacidade: e.target.value,
    });
  };

  const AtualizarCapacidade = (obj) => {
    setIsLoading(true);
    atualizarCapacidade(obj).then((res) => {
      setIsLoading(false);
      setCapacidade({});
      addToast({
        title: `${res.value.message}`,
      });
      handleFetch();
      handleCloseCapacidade();
    });
  };

  const handleHistorico = (obj) => {
    setIsLoading(true);
    getHistoricoOcupacao(obj).then((res) => {
      setHistorico(res);
    });
  };

  const handleCloseHistorico = () => {
    setShowModalHistorico(!showModalHistorico);
    setHistorico([]);
  };

  const handleCloseCapacidade = () => {
    setShowModalCapacidade(!showModalCapacidade);
    setCapacidade({});
  };

  const handleClose = () => {
    setShowModalExcluir(!showModalExcluir);
    setExclusao({});
  };

  const excluirGalpaoFunc = (obj) => {
    setIsLoading(true);
    excluirGalpao(obj.id).then((res) => {
      setIsLoading(false);
      setExclusao({});
      addToast({
        title: `${res.value.message}`,
      });
      handleFetch();
      handleClose();
    });
  };

  return (
    <>
      <MuiModal open={showModalExcluir} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Deseja exluir o endereço: {exclusao.endereco}?
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: 'blue',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              onClick={() => {
                handleClose();
              }}
            >
              <span>Fechar</span>
            </Button>
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'red',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              variant="contained"
              onClick={() => {
                excluirGalpaoFunc(exclusao);
              }}
            >
              <span>Excluir Galpão</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <MuiModal open={showModalCapacidade} onClose={handleCloseCapacidade}>
        <Box sx={{ ...style, width: '600px' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Deseja Alterar a capacidade do endereço: {capacidade.endereco}?
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseCapacidade();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              gap: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <FormLabel>Capacidade</FormLabel>
              <TextField
                type="text"
                value={capacidade.capacidade}
                onChange={handleChange}
              />
            </div>
          </Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="outlined"
              style={{
                color: 'blue',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              onClick={() => {
                handleCloseCapacidade();
              }}
            >
              <span>Fechar</span>
            </Button>
            <LoadingButton
              loading={isLoading}
              style={{
                backgroundColor: 'blue',
                color: 'white',
                width: '200px',
                marginTop: '20px',
                marginBottom: '20px',
              }}
              variant="contained"
              onClick={() => {
                AtualizarCapacidade(capacidade);
              }}
            >
              <span>Atualizar Capacidade</span>
            </LoadingButton>
          </div>
        </Box>
      </MuiModal>

      <MuiModal open={showModalHistorico} onClose={handleCloseHistorico}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Historico De Movimentação
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleCloseHistorico();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <MaterialReactTable
              data={historico}
              columns={columnsHistorico}
              enableColumnFilters={false}
              enableStickyHeader
              sx={{
                'tbody tr:hover': {
                  backgroundColor: 'white',
                },
              }}
              initialState={{ density: 'compact', pagination: { pageSize: 5 } }}
              muiTableContainerProps={{ sx: { maxHeight: 400 } }}
              muiTopToolbarProps={{ sx: { bgcolor: 'white', color: 'white' } }}
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
                    backgroundColor: '#ECECEC',
                  },
                },
              }}
              localization={MRT_Localization_PT_BR}
            />
          </Box>
        </Box>
      </MuiModal>

      {listaResultados ? (
        <MaterialReactTable
          data={listaResultados}
          columns={columns}
          enableColumnFilters={false}
          enableStickyHeader
          sx={{
            'tbody tr:hover': {
              backgroundColor: 'white',
            },
          }}
          initialState={{ density: 'compact', pagination: { pageSize: 10 } }}
          muiTableContainerProps={{ sx: { maxHeight: 600 } }}
          muiTopToolbarProps={{ sx: { bgcolor: '#f77b7b', color: 'white' } }}
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
                backgroundColor: '#ECECEC',
              },
            },
          }}
          localization={MRT_Localization_PT_BR}
        />
      ) : (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      )}
    </>
  );
}

export const TabelaTaxaDeOcupacao = memo(
  TabelaTaxaDeOcupacaoProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
