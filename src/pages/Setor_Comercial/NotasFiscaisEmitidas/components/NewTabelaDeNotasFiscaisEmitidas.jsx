import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import formatDateTotvs from '@/utils/formatDataTotvs.js';
import { LoadingButton } from '@mui/lab';
import { donwloadPDF } from '@/utils/downloadPdf.js';
import { ControlPoint } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ContentPasteGoIcon from '@mui/icons-material/ContentPasteGo';
import ModalGuiaNF from '@/components/ModalButtonNFEmitidas/ModalGuiaNF.jsx';
import ModalPagamentoNF from '@/components/ModalButtonNFEmitidas/ModalPagamentoNF.jsx';
import Loader from '@/components/Loader/index.jsx';
import {
  NotaFiscalImagemGuiaGetDownload,
  NotaFiscalImagemPagamentoGetDownload,
} from '@/services/notasFiscaisImagem.service.js';
import { useToast } from '@/hooks/toast.hook';

const styleG = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #28A745',
  backgroundColor: '#EEFFF2',
  pointerEvents: 'none',
};

const styleR = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #D88A8A',
  backgroundColor: '#F7E6E6',
  pointerEvents: 'none',
};

function NewTabelaDeNotasFiscaisEmitidas({
  handleSubmitGuia,
  data,
  loading,
  handleChangeEnviado,
  showModal,
  updateTabela,
}) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [loader, setLoader] = useState('');

  // const handleDowloadZip = (value) => {
  //   NotaFiscalImagemGuiaGetDownload(value).then((res) => {
  //     const guiaUrl = res.value?.arquivoLink;

  //     if (guiaUrl) {
  //       window.open(guiaUrl, '_blank');
  //     }
  //   });
  //   NotaFiscalImagemPagamentoGetDownload(value)
  //     .then((res) => {
  //       const pagamentoUrl = res.value?.arquivoLink;

  //       if (pagamentoUrl) {
  //         window.open(pagamentoUrl, '_blank');
  //       }
  //     })
  //     .finally(() => {
  //       setLoader('');
  //     });
  // };

  const handleDowloadZip = async (nfNumber) => {
    setLoader(nfNumber);
    try {
      const guiaRes = await NotaFiscalImagemGuiaGetDownload(nfNumber);
      const guiaUrl = guiaRes.value?.arquivoLink;
      if (guiaUrl) {
        const link1 = document.createElement('a');
        link1.href = guiaUrl;
        link1.target = '_blank';
        document.body.appendChild(link1);
        link1.click();
        document.body.removeChild(link1);
      }
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro Ao baixar Nota !',
        description: error.response.data,
      });
      console.error(error);
    } finally {
      setLoader('');
    }
  };

  const handleUrlPagamentos = async (nfNumber) => {
    try {
      const pagamentoRes = await NotaFiscalImagemPagamentoGetDownload(nfNumber);
      const pagamentoUrl = pagamentoRes.value?.arquivoLink;
      if (pagamentoUrl) {
        const link2 = document.createElement('a');
        link2.href = pagamentoUrl;
        link2.target = '_blank';
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader('');
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function formatCNPJ(cnpj) {
    return cnpj.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="tabelaForaLinha">
          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '25px',
              overflow: 'hidden',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              maxHeight: 750,
              maxWidth: 'auto',
              overflowY: 'auto',
              overflowX: 'auto',
            }}
          >
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: 'bold',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Nota Fiscal
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Status
                  </TableCell>
                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Pagamento/Guia
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Cubagem
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Guia
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Pagamento
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: 'bold' }}>
                    Nome
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Separação
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Romaneio
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Envio
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: 'bold' }}>
                    CNPJ
                  </TableCell>
                  <TableCell align="left" style={{ fontWeight: 'bold' }}>
                    Valor
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Data Faturamento
                  </TableCell>

                  <TableCell align="right" style={{ fontWeight: 'bold' }}>
                    Vol.
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Filial Separada
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: 'bold' }}>
                    Endereço de Localização
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      tabIndex={-1}
                      hover
                    >
                      <TableCell align="right">
                        <IconButton
                          onClick={() => {
                            showModal(item);
                          }}
                        >
                          <ControlPoint sx={{ color: 'green' }} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="center">
                        <Link
                          to={`/notafiscal/${item.nf}`}
                          title="Visualizar Espelho da Nota Fiscal"
                        >
                          <b>{item.nf}</b>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        {item.status === 'FINALIZADO' ? (
                          <Button
                            variant="outlined"
                            color="success"
                            sx={styleG}
                          >
                            {item.status}
                          </Button>
                        ) : (
                          <Button variant="outlined" color="error" sx={styleR}>
                            {item.status}
                          </Button>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {item.guia ? (
                          <Box>
                            <LoadingButton
                              variant="contained"
                              style={{
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                border: '1px solid grey',
                              }}
                              startIcon={
                                <DownloadIcon style={{ color: 'black' }} />
                              }
                              onClick={() => {
                                handleDowloadZip(item.nf);
                                handleUrlPagamentos(item.nf);
                              }}
                              loading={loader === item.nf}
                            >
                              <span className="6px" style={{ color: 'black' }}>
                                BAIXAR
                              </span>{' '}
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 1,
                                }}
                              ></Box>
                            </LoadingButton>
                          </Box>
                        ) : (
                          <Box>
                            <LoadingButton
                              disabled={true}
                              style={{ cursor: 'none' }}
                              variant="filled"
                              startIcon={
                                <DownloadIcon style={{ color: 'black' }} />
                              }
                            >
                              <span className="6px" style={{ color: 'black' }}>
                                Baixar
                              </span>{' '}
                              <Box
                                sx={{
                                  display: 'flex',
                                  flexDirection: 'row',
                                  gap: 1,
                                }}
                              ></Box>
                            </LoadingButton>
                          </Box>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        <LoadingButton
                          variant="contained"
                          startIcon={
                            <DownloadIcon style={{ color: 'black' }} />
                          }
                          style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid grey',
                          }}
                          onClick={() => navigate(`/printcubagem/${item.nf}`)}
                        >
                          <span className="6px" style={{ color: 'black' }}>
                            Cubagem
                          </span>{' '}
                        </LoadingButton>
                      </TableCell>

                      <TableCell align="center">
                        <ModalGuiaNF
                          guia={item.guia}
                          nf={item.nf}
                          handleSubmitGuia={handleSubmitGuia}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <ModalPagamentoNF
                          guia={item.guia}
                          nf={item.nf}
                          pagamento={item.pagamento}
                          updateTabela={updateTabela}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {' '}
                        {item.nome}
                      </TableCell>
                      <TableCell align="center">
                        {item.separado ? (
                          <>
                            <IconButton disabled sx={{ gap: 1 }}>
                              <ContentPasteGoIcon color="success" />{' '}
                              <Typography
                                sx={{ color: 'green', whiteSpace: 'nowrap' }}
                              >
                                Concluído
                              </Typography>
                            </IconButton>
                            <p>{item.dataSeparacao}</p>
                          </>
                        ) : (
                          <IconButton disabled sx={{ gap: 1 }}>
                            <ContentPasteGoIcon sx={{ color: '#ff0000' }} />
                            <Typography
                              sx={{ color: '#ff0000', whiteSpace: 'nowrap' }}
                            >
                              Pendente
                            </Typography>
                          </IconButton>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {item.romaneio ? (
                          <>
                            <div>
                              {' '}
                              <IconButton disabled sx={{ gap: 1 }}>
                                <FormatListBulletedIcon color="success" />{' '}
                                <Typography
                                  sx={{ color: 'green', whiteSpace: 'nowrap' }}
                                >
                                  Concluído
                                </Typography>
                              </IconButton>
                            </div>
                            <p>{formatDateTotvs(item.dataEmissaoRomaneio)}</p>
                          </>
                        ) : (
                          <IconButton disabled sx={{ gap: 1 }}>
                            <FormatListBulletedIcon sx={{ color: '#ff0000' }} />
                            <Typography
                              sx={{ color: '#ff0000', whiteSpace: 'nowrap' }}
                            >
                              Pendente
                            </Typography>
                          </IconButton>
                        )}
                      </TableCell>

                      <TableCell align="center">
                        {item.enviada ? (
                          <>
                            <div>
                              {' '}
                              <IconButton disabled sx={{ gap: 1 }}>
                                <LocalShippingIcon color="success" />{' '}
                                <Typography
                                  sx={{ color: 'green', whiteSpace: 'nowrap' }}
                                >
                                  Concluído
                                </Typography>
                              </IconButton>
                            </div>

                            <p>{formatDateTotvs(item.dataFaturamento)}</p>
                          </>
                        ) : (
                          <Tooltip title="Atualizar" placement="top">
                            <IconButton
                              onClick={() => handleChangeEnviado(item)}
                              type="button"
                              variant="outlined"
                              color="secondary"
                              sx={{ gap: 1 }}
                            >
                              {' '}
                              <LocalShippingIcon sx={{ color: '#ff0000' }} />
                              <Typography
                                sx={{ color: '#ff0000', whiteSpace: 'nowrap' }}
                              >
                                Pendente
                              </Typography>
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatCNPJ(item.cnpj)}
                      </TableCell>

                      <TableCell
                        align="left"
                        style={{
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(item.valor)}
                      </TableCell>
                      <TableCell align="right">
                        {formatDateTotvs(item.dataFaturamento)}
                      </TableCell>
                      <TableCell align="right">{item.volumes}</TableCell>
                      <TableCell align="right">{item.filial_Separad}</TableCell>
                      <TableCell align="right">{item.endLoc_Separad}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50, 100]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(+event.target.value);
                setPage(0);
              }}
            />
          </TableContainer>
        </div>
      )}
    </>
  );
}
export default NewTabelaDeNotasFiscaisEmitidas;
