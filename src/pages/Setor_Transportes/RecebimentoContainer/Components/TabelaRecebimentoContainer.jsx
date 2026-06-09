import React from 'react';
import { memo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Paper,
  Button,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Link } from 'react-router-dom';
import useSortableData from '@/utils/sortable';
import formatDateTotvs from '@/utils/formatDataTotvs';
import useSortableDataNew from '@/hooks/sortable.hook';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Row = ({ item }) => {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    if (!open) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
    setOpen(!open);
  };

  return (
    <>
      <TableRow key={item.id} hover>
        <TableCell>
          <IconButton size="small" color="primary" onClick={handleToggle}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="center">{item.container}</TableCell>
        <TableCell align="center">{item.bl}</TableCell>
        <TableCell align="center">{item.declaracao_importacao}</TableCell>
        <TableCell align="center">{formatDateTotvs(item.data)}</TableCell>
        <TableCell align="center">{item.nf}</TableCell>
        <TableCell align="center">{item.chegada}</TableCell>
        <TableCell align="center">{item.volumes_recebidos}</TableCell>
        <TableCell align="center">{item.conferente}</TableCell>
        <TableCell align="center">{item.descarregador}</TableCell>
        <TableCell align="center">{item.local}</TableCell>
        <TableCell align="center">
          <IconButton
            component={Link}
            to={`/printrpc/${item.id}`}
            color="primary"
            size="small"
          >
            <PictureAsPdfIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ padding: 1 }}>
              <Table size="small">
                <TableHead sx={{ bgcolor: '#ebebeb' }}>
                  <TableRow>
                    <TableCell />
                    <TableCell align="center">Descrição</TableCell>
                    <TableCell align="center">Código</TableCell>
                    <TableCell align="center">Volumes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CircularProgress size={24} />
                          <Typography variant="body1" sx={{ marginLeft: 2 }}>
                            Carregando ...
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    item.produtos.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell />
                        <TableCell align="center">{item.nomeProduto}</TableCell>
                        <TableCell align="center">
                          {item.codigoDeProduto}
                        </TableCell>
                        <TableCell align="center">{item.qtdVolumes}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

function TabelaRecebimentoContainerProps({ recebimentoContainerLista }) {
  const { items, requestSort, sortConfig } = useSortableDataNew(
    recebimentoContainerLista
  );

  const getClassNamesFor = (name) => {
    if (!sortConfig) return;
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 2, maxHeight: 'calc(100vh - 354px)' }}
    >
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            {[
              { label: 'Container', key: 'container' },
              { label: 'BL', key: 'bl' },
              { label: 'D.I', key: 'declaracao_importacao' },
              { label: 'Data', key: 'data' },
              { label: 'Nota Fiscal', key: 'nf' },
              { label: 'Chegada', key: 'chegada' },
              { label: 'Vol. Recebidos', key: 'volumes_recebidos' },
              { label: 'Conferente', key: 'conferente' },
              { label: 'Descarregador', key: 'descarregador' },
              { label: 'Local', key: 'local' },
              { label: 'C.P.C', key: null },
            ].map((col) => (
              <TableCell key={col.label} align="center">
                {col.key ? (
                  <Button
                    variant="text"
                    onClick={() => requestSort(col.key)}
                    sx={{
                      fontWeight:
                        sortConfig?.key === col.key ? 'bold' : 'normal',
                      color: sortConfig?.key === col.key ? 'red' : 'inherit',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                    }}
                  >
                    {col.label}
                  </Button>
                ) : (
                  <Typography fontSize="0.875rem">{col.label}</Typography>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(!Array.isArray(items) || items.length === 0) && (
            <TableRow>
              <TableCell colSpan={12} align="center">
                Nenhuma informação disponível no momento.
              </TableCell>
            </TableRow>
          )}
          {Array.isArray(items) &&
            [...items]
              .reverse()
              .map((item) => <Row key={item.id} item={item} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export const TabelaRecebimentoContainer = memo(
  TabelaRecebimentoContainerProps,
  (prevProps, nextProps) => Object.is(prevProps, nextProps)
);
