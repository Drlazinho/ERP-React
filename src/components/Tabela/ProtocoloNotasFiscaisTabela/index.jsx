import React, { memo, useState } from 'react';
import useSortableData from '../../../utils/sortable';
import './style.css';
import Badge from '@mui/material/Badge';
import { formatDateTime } from '../../../utils/formatDateInput';
import { Box, Button, IconButton, Typography } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';
import { Edit } from '@mui/icons-material';

function ProtocoloNotasFiscaisTabelaProps({
  notaFiscalLista,
  handleBaixarNota,
  detalhesDaNota,
  handleCheckarNota,
  showModal,
}) {
  const { items, requestSort, sortConfig } = useSortableData(notaFiscalLista);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      {items
        .map((item, index) => (
          <Box
            sx={{ width: '100%', padding: 3, border: '2px solid #000' }}
            key={item.id}
          >
            <IconButton
              size="small"
              color="error"
              sx={{ marginTop: '0px' }}
              onClick={(e) => {
                showModal(item);
              }}
            >
              <Edit sx={{ width: '18px' }} />
            </IconButton>
            <Typography>
              <b>
                Nota Fiscal:{' '}
                <span style={{ fontWeight: 'bolder' }}>{item.numero}</span>
              </b>
            </Typography>
            <Typography>
              <b>Chave Nota:</b> {item.nota}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                <b>Data Registro:</b>
                {formatDateTime(item.datA_REGISTRO)}
              </Typography>
              <Typography>
                <b>Data Vencimento:</b>
                {formatDateTime(item.datA_VENCIMENTO)}
              </Typography>
              <Typography>
                <b>Situação:</b> {item.situacao}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                <b>Setor:</b>
                {item.setor}
              </Typography>
              <Typography>
                <b>Tipo:</b>
                {item.tipo}
              </Typography>
              <Typography>
                <b>Inserido por:</b>
                {item.user}
              </Typography>
              <Typography>status: {item.status}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Typography>
                <b>obs:</b> {item.observacao}
              </Typography>
              <Box sxs={{ display: 'flex', flexDirection: 'column' }}>
                {item.setoR_PENDENTE.length > 0 ? (
                  item.setoR_PENDENTE.map((setor, index) => (
                    <Badge
                      key={index}
                      color="error"
                      sx={{ width: 'fit-content' }}
                    >
                      {setor}
                    </Badge>
                  ))
                ) : (
                  <Badge color="success" sx={{ width: 'fit-content' }}>
                    SEM PENDÊNCIA
                  </Badge>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'end',
                gap: 2,
              }}
            >
              <Button
                size="small"
                variant="contained"
                startIcon={<KeyboardTabIcon />}
                onClick={(e) => {
                  handleCheckarNota(item);
                }}
              >
                Adicionar a Lista
              </Button>
              <Button
                size="small"
                variant="contained"
                startIcon={<FileDownloadIcon />}
                onClick={(e) => {
                  handleBaixarNota(item.id, item.nota, item);
                }}
              >
                Download
              </Button>
              <Button
                size="small"
                variant="contained"
                endIcon={<NoteAltIcon />}
                onClick={(e) => detalhesDaNota(item.id)}
              >
                Atualizar
              </Button>
            </Box>
          </Box>
        ))
        .reverse()}
    </>
    // <table className="table table-striped table-hover">
    //   <thead className="table-dark w-100 mt-3 position-sticky top-0 z-index-2">
    //     <tr>
    //       {/* <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('nota')}
    //           className={getClassNamesFor('nota')}
    //         >
    //           Nota
    //         </button>
    //       </th> */}
    //       <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('datA_REGISTRO')}
    //           className={getClassNamesFor('datA_REGISTRO')}
    //         >
    //           Data Registro
    //         </button>
    //       </th>
    //       <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('datA_VENCIMENTO')}
    //           className={getClassNamesFor('datA_VENCIMENTO')}
    //         >
    //           Data Vencimento
    //         </button>
    //       </th>
    //       <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('setor')}
    //           className={getClassNamesFor('setor')}
    //         >
    //           Setor
    //         </button>
    //       </th>
    //       <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('user')}
    //           className={getClassNamesFor('user')}
    //         >
    //           User
    //         </button>
    //       </th>
    //       {/* <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('aprovador')}
    //           className={getClassNamesFor('aprovador')}
    //         >
    //           Aprovador
    //         </button>
    //       </th> */}
    //       <th>
    //         <button
    //           type="button"
    //           onClick={() => requestSort('tipo')}
    //           className={getClassNamesFor('tipo')}
    //         >
    //           Tipo
    //         </button>
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr>
    //       <td colSpan={7}>

    //       </td>
    //     </tr>
    //   </tbody>
    // </table>
  );
}
export const ProtocoloNotasFiscaisTabela = memo(
  ProtocoloNotasFiscaisTabelaProps,
  (prevProps, nextProps) => {
    Object.is(prevProps, nextProps);
  }
);
