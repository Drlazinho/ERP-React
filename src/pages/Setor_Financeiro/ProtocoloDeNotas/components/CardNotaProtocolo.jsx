import { Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatDateTime } from '../../../../utils/formatDateInput';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import KeyboardTabIcon from '@mui/icons-material/KeyboardTab';

export default function CardNotaProtocolo({
  notaFiscalLista,
  setEmailCancelado,
  listaDeNotasSelecionada,
  handleBaixarNota,
  detalhesDaNota,
  handleAddNotaNaLista,
  showModalEditarNota,
  handleShowModalAtualizarNotaIndv,
  isAddListView = false,
}) {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const listaRecuperadaString = localStorage.getItem('listaDeDonwload');
    const listaRecuperada = JSON.parse(listaRecuperadaString);

    if (Array.isArray(listaRecuperada)) {
      setLista(listaRecuperada);
    } else {
      console.error('Dados inválidos recuperados do armazenamento local'); // Lidar com dados inválidos
    }
  }, []);

  const salvarIDdoDonwload = (id) => {
    setLista((oldState) => [...oldState, id]);
    salvarNoLocalStorage(lista);
  };

  const salvarNoLocalStorage = (body) => {
    const listaString = JSON.stringify(body);
    localStorage.setItem('listaDeDonwload', listaString);
  };

  return (
    <>
      {notaFiscalLista
        ?.map((item, index) => {
          const nota = item;

          return (
            <Box
              sx={{
                width: '100%',
                padding: 3,
                border: '2px solid #000',
                position: 'relative',
                color: '#000',
              }}
              key={item.id}
            >
              <Tooltip title="Altera informações da Nota">
                <IconButton
                  size="small"
                  color="error"
                  sx={{
                    marginTop: '0px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  onClick={(e) => {
                    showModalEditarNota(item);
                  }}
                >
                  <Edit sx={{ width: '25px' }} />
                </IconButton>
              </Tooltip>
              <Typography>
                <b>
                  Nota Fiscal:{' '}
                  <span style={{ fontWeight: 'bolder' }}>{item.numero}</span>
                </b>
              </Typography>
              <Typography>
                <b>Chave Nota:</b> {item.nota}
              </Typography>
              <Typography>
                <b>Emissor:</b> {item.emissor}
              </Typography>
              <Typography>
                <b>CNPJ:</b> {item.emissoR_CNPJ}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Typography>
                  <b>Data Registro:</b> {formatDateTime(item.datA_REGISTRO)}
                </Typography>
                <Typography>
                  <b>Data Vencimento:</b> {formatDateTime(item.datA_VENCIMENTO)}
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
                  color: '#000',
                }}
              >
                <Typography>
                  <b>Setor:</b> {item.setor}
                </Typography>
                <Typography>
                  <b>Tipo:</b> {item.tipo}
                </Typography>
                <Typography>
                  <b>Inserido por:</b> {item.user}
                </Typography>
                <Typography>
                  <b>UF:</b> {item.uf}
                </Typography>
                <Typography>
                  <b>Valor:</b> {item.valoR_NOTA}
                </Typography>
                <Typography>
                  <b>Status:</b> {item.status}
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
                  <b>obs:</b> {item.observacao}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  {item.setoR_PENDENTE.length > 0 ? (
                    item.setoR_PENDENTE.map((setor, index) => (
                      <Chip
                        label={setor}
                        size="small"
                        key={index}
                        color="error"
                      />
                    ))
                  ) : (
                    <Chip
                      label={'SEM PENDÊNCIA'}
                      size="small"
                      key={index}
                      color="success"
                    />
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'end',
                  gap: 2,
                  marginTop: 2,
                }}
              >
                {isAddListView && (
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<KeyboardTabIcon />}
                    onClick={(e) => {
                      handleAddNotaNaLista(item);
                    }}
                  >
                    Adicionar a Lista
                  </Button>
                )}

                <Button
                  size="small"
                  variant="contained"
                  color={lista?.includes(item.id) ? 'warning' : 'primary'}
                  startIcon={<FileDownloadIcon />}
                  onClick={(e) => {
                    handleBaixarNota(item.id, item.nota, item),
                      salvarIDdoDonwload(item.id);
                  }}
                >
                  {lista?.includes(item.id)
                    ? 'Download Feito'
                    : 'Download Não Feito'}
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NoteAltIcon />}
                  onClick={(e) => {
                    handleShowModalAtualizarNotaIndv(item.id),
                      setEmailCancelado(item.useremail);
                  }}
                >
                  Atualizar
                </Button>
              </Box>
            </Box>
          );
        })
        .reverse()}
    </>
  );
}
