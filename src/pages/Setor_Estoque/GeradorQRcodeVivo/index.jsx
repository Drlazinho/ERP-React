import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  FormLabel,
  Tab,
  Tabs,
  Typography,
  Checkbox,
  FormControlLabel,
  Pagination,
  Icon,
} from '@mui/material';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router';
import HeaderAmvox from '@/components/HeaderAmvox';
import TableEtiquetas from './Components/TableEtiquetas';
import TableEtiquetasMaster from './Components/TableEtiquetasMaster';
import {
  GeradorNumSerie,
  ExportarExcel,
  CadastrarProduto,
  BuscarProdutos,
  BuscarNumeroSerie,
} from './GerarCodigoBarra.service';
import { useToast } from '@/hooks/toast.hook';
import TableProdutos from './Components/TableProdutos';
import { useDebounce } from '@/hooks/debounce.hook';
import Produto from '@/pages/Setor_Producao/Produtos';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import NotaFiscal from '@/pages/NotaFiscal';

const style = {
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: 1,
  alignItems: 'center',
  marginTop: 3,
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const GeradorQRcodeVivo = () => {
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [data, setData] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedEtiquetas, setSelectedEtiquetas] = useState([]);
  const [qrCodesConcatenados, setQrCodesConcatenados] = useState('');
  const [qrCodeMaster, setQrCodeMaster] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageProdutos, setCurrentPageProdutos] = useState(1);
  const { id } = useUsuarioLocal();
  const itemsPerPage = 10;
  const itemsPerPageProdutos = 10;
  const [formData, setFormData] = useState({
    codigoSap: '',
    quantidade: '',
    codigoProduto: '',
    codigoSapProduto: '',
  });
  const [filtro, setFiltro] = useState({
    codigoSap: '',
    ean: '',
    expedido: 2,
    dataInicio: '',
    dataFim: '',
    notaFiscalDeReferencia: '',
  });

  const [filtroProdutos, setFiltroProdutos] = useState({
    codigoProduto: '',
    prodApelido: '',
    ean: '',
    codSapVivo: '',
  });

  const debouncedFiltroProdutos = useDebounce(filtroProdutos, 800);
  const debouncedFiltro = useDebounce(filtro, 1700);
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const currentDataProdutos = produtos.slice(
    (currentPageProdutos - 1) * itemsPerPageProdutos,
    currentPageProdutos * itemsPerPageProdutos
  );

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);

    handleClear();
    handleClearFiltro();
    handleFiltroProdutos();

    setCurrentPage(1);
    setCurrentPageProdutos(1);
  };

  const handleClear = () => {
    setFormData({
      codigoSap: '',
      codigoSapProduto: '',
      quantidade: '',
      codigoProduto: '',
    });
  };

  const handleClearFiltro = () => {
    setFiltro({
      codigoSap: '',
      ean: '',
      expedido: 2,
      dataInicio: '',
      dataFim: '',
      notaFiscalDeReferencia: '',
    });
    setCurrentPage(1);
  };

  const handleFiltroProdutos = () => {
    setFiltroProdutos({
      codigoProduto: '',
      prodApelido: '',
      ean: '',
      codSapVivo: '',
    });
  };

  const handleSelectionChange = (selectedRows) => {
    setSelectedEtiquetas(selectedRows);

    const qrCodesString = selectedRows.map((row) => row.qrCode).join('');
    setQrCodesConcatenados(qrCodesString);
  };
  const handleClearFiltroQrCode = () => {
    setQrCodesConcatenados('');
    setSelectedEtiquetas([]);
  };

  const handleGerarSerie = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        codigoSap: String(formData.codigoSap),
        quantidade: Number(formData.quantidade),
        userIdGeracaoQrCode: id,
      };

      const res = await GeradorNumSerie(params);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Número de série criado com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao gerar número de série:', error);

      let errorMessage = 'Erro ao gerar número de série';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data, null, 2) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
      handleBuscarNumeroSerie();
    }
  }, [formData, id]);

  // Buscar Numero de Serie
  const handleBuscarNumeroSerie = useCallback(async () => {
    try {
      const res = await BuscarNumeroSerie(filtro);
      setData(res);
      setCurrentPage(1);
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    }
  }, [debouncedFiltro]);

  // Cadastro de Produto
  const handleCadastrarProduto = useCallback(async () => {
    setLoading(true);

    const params = {
      codigoSap: formData.codigoSapProduto,
      codigoProduto: formData.codigoProduto,
    };

    try {
      const res = await CadastrarProduto(params);

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Produto cadastrado com sucesso!',
      });
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
      handleBuscarProdutos();
    }
  }, [formData]);

  // Buscar Produtos
  const handleBuscarProdutos = useCallback(async () => {
    try {
      const res = await BuscarProdutos(filtroProdutos);
      setProdutos(res);
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    }
  }, [debouncedFiltroProdutos]);

  useEffect(() => {
    handleBuscarProdutos();
  }, [handleBuscarProdutos]);

  useEffect(() => {
    handleBuscarNumeroSerie();
  }, [handleBuscarNumeroSerie]);

  // Gerar Excel
  // const handleDownload = useCallback(async () => {
  //   const params = {
  //     codigoSap: formData.codigoSap,
  //     quantidade: Number(formData.quantidade),
  //   };

  //   try {
  //     const res = await ExportarExcel(params);
  //     const url = window.URL.createObjectURL(new Blob([res]));
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.setAttribute(
  //       'download',
  //       `Numero-de-serie-${formData.quantidade}.xlsx`
  //     );
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     let errorMessage = 'Erro ao editar meta';

  //     if (error.response && error.response.data) {
  //       if (typeof error.response.data === 'object') {
  //         errorMessage =
  //           JSON.stringify(error.response.data) ||
  //           error.message ||
  //           error.response.data.title;
  //       } else {
  //         errorMessage = error.response.data;
  //       }
  //     }

  //     addToast({
  //       type: 'danger',
  //       title: 'Erro',
  //       description: errorMessage,
  //     });
  //   }
  // }, [formData]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          padding: '0 20px',
          marginBottom: '330px',
        }}
      >
        <HeaderAmvox
          onBack={() => navigate(-1)}
          title="Gerador de Etiquetas - Vivo"
        />

        <Box
          sx={(theme) => ({
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            margin: '50px 0 30px 30px',
          })}
        >
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: '#ccc',
              },
            }}
            sx={{
              display: 'flex',
              '@media (max-width: 600px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Tab
              label="Caixa Unitária"
              sx={{
                color: '#333',
                '&.Mui-selected': {
                  color: '#AA0000',
                  fontWeight: '800',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  boxShadow: '1px 1px 5px 2px rgba(255,255,255,0.58)',
                  background: '#fff',
                },
              }}
            />

            <Tab
              label="Cadastro de Produtos"
              sx={{
                color: '#333',
                '&.Mui-selected': {
                  color: '#AA0000',
                  fontWeight: '800',
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  boxShadow: '1px 1px 5px 2px rgba(255,255,255,0.58)',
                  background: '#fff',
                },
              }}
            />
          </Tabs>
        </Box>

        {tabIndex === 0 ? (
          <>
            {/* <Box
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'flex-end',
                [theme.breakpoints.down('sm')]: {
                  justifyContent: 'center',
                },
              })}
            >
              <Button
                startIcon={<RiFileExcel2Fill />}
                onClick={handleDownload}
                variant="contained"
                color="success"
                sx={{
                  height: 48,
                  mt: 3,
                  maxWidth: 200,
                  width: '100%',
                  gap: 1,
                }}
              >
                Download Excel
              </Button>
            </Box> */}
            <Box sx={{ ...style, display: 'flex', gap: 2 }}>
              <Box
                sx={(theme) => ({
                  width: '100%',
                  display: 'flex',
                  padding: '0 20px',
                  gap: 2,
                  alignItems: 'center',
                  [theme.breakpoints.down(1000)]: {
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  },
                })}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código SAP
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={formData.codigoSap}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 8);

                      setFormData({ ...formData, codigoSap: value });
                    }}
                    placeholder="Digite o Código SAP"
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Quantidade
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={formData.quantidade}
                    onChange={(e) =>
                      setFormData({ ...formData, quantidade: e.target.value })
                    }
                    placeholder="Digite a quantidade"
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ height: 48, mt: 3, maxWidth: 250, width: '100%' }}
                  disabled={
                    !formData.codigoSap || !formData.quantidade || loading
                  }
                  onClick={() => handleGerarSerie()}
                >
                  {loading ? 'Gerando...' : 'Gerar'}
                </Button>

                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    height: 48,
                    mt: 3,
                    maxWidth: 200,
                    width: '100%',
                  }}
                  onClick={handleClear}
                >
                  Limpar
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 4, width: '100%', padding: '0 20px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Filtros:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Data Inicio
                  </FormLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtro.dataInicio}
                    onChange={(e) =>
                      setFiltro({ ...filtro, dataInicio: e.target.value })
                    }
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Data Final
                  </FormLabel>
                  <TextField
                    type="date"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtro.dataFim}
                    onChange={(e) =>
                      setFiltro({ ...filtro, dataFim: e.target.value })
                    }
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Nota Fiscal
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtro.notaFiscalDeReferencia}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 8);

                      setFiltro({ ...filtro, notaFiscalDeReferencia: value });
                    }}
                    placeholder="Digite a Nota Fiscal"
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código SAP
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtro.codigoSap}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 8);

                      setFiltro({ ...filtro, codigoSap: value });
                    }}
                    placeholder="Digite o Código SAP"
                  />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    EAN
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtro.ean}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 15);

                      setFiltro({ ...filtro, ean: value });
                    }}
                    placeholder="Digite o Código SAP"
                  />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filtro.expedido === '1'}
                        onChange={() =>
                          setFiltro({
                            ...filtro,
                            expedido: filtro.expedido === '1' ? '2' : '1',
                          })
                        }
                      />
                    }
                    label="Expedido"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filtro.expedido === '0'}
                        onChange={() =>
                          setFiltro({
                            ...filtro,
                            expedido: filtro.expedido === '0' ? '2' : '0',
                          })
                        }
                      />
                    }
                    label="Não Expedido"
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleClearFiltro}
                  color="inherit"
                  sx={{
                    height: 45,
                    mt: 3,
                    maxWidth: 200,
                    width: '100%',
                  }}
                >
                  Limpar
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Box sx={{ mt: 4, overflow: 'auto', width: '100%' }}>
                <TableEtiquetas
                  data={currentData}
                  loading={loading}
                  onSelectionChange={handleSelectionChange}
                />
                <Pagination
                  sx={{
                    marginTop: 4,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  count={Math.ceil(data.length / itemsPerPage)}
                  page={currentPage}
                  onChange={(event, page) => {
                    setCurrentPage(page);
                  }}
                  showFirstButton
                  showLastButton
                  color="primary"
                  key={`pagination-${currentPage}`}
                />
              </Box>
              <Box
                sx={{
                  mt: 4,
                  background: '#fff',
                  overflow: 'auto',
                  width: '50%',
                  border: '1px solid #ccc',
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  height: '535px',
                  overflowY: 'auto',
                }}
              >
                <Box sx={{ borderBottom: '1px solid #ccc', marginBottom: 2 }}>
                  <Typography
                    variant="h6"
                    component="p"
                    textAlign={'center'}
                    color={'#000'}
                  >
                    Etiquetas Selecionadas: {selectedEtiquetas.length}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                  {selectedEtiquetas.map((etiqueta, index) => (
                    <Box
                      sx={{
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        padding: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        component="p"
                        textAlign={'center'}
                        color={'#000'}
                      >
                        QR Code: {etiqueta.qrCode}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Box
                  sx={{
                    mt: 2,
                    width: '100%',
                    display: 'flex',
                    gap: 2,
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {qrCodesConcatenados && (
                    <>
                      <Typography
                        variant="body1"
                        component="p"
                        textAlign={'center'}
                        color={'#000'}
                        fontWeight={700}
                      >
                        QR Code Master:
                      </Typography>

                      <TextField
                        fullWidth
                        type="text"
                        variant="outlined"
                        size="medium"
                        sx={{
                          bgcolor: '#fff',
                          '& .MuiOutlinedInput-input': {
                            bgcolor: '#fff',
                          },
                        }}
                        value={qrCodesConcatenados}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <Button
                        variant="contained"
                        onClick={() => {
                          navigator.clipboard
                            .writeText(qrCodesConcatenados)
                            .then(() => {
                              alert('Código copiado com sucesso!');
                            })
                            .catch((err) => {
                              console.error('Falha ao copiar: ', err);
                              alert('Erro ao copiar o código');
                            });
                        }}
                        sx={{
                          minWidth: '120px',
                          width: '200px',
                          bgcolor: '#1976d2',
                          mt: 1,
                          '&:hover': { bgcolor: '#1565c0' },
                        }}
                      >
                        <CopyAllIcon /> Copiar
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ ...style, display: 'flex', gap: 2 }}>
              <Box
                sx={(theme) => ({
                  width: '100%',
                  display: 'flex',
                  padding: '0 20px',
                  gap: 2,
                  alignItems: 'center',
                  [theme.breakpoints.down(1000)]: {
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  },
                })}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código do Produto
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={formData.codigoProduto}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/[^a-zA-Z0-9]/g, '');
                      setFormData({
                        ...formData,
                        codigoProduto: value.toUpperCase(),
                      });
                    }}
                    placeholder="Digite o Código do Produto"
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código SAP
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={formData.codigoSapProduto}
                    slotProps={{
                      input: {
                        inputMode: 'numeric',
                        pattern: '[0-9]{9}',
                      },
                    }}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 8);

                      setFormData({ ...formData, codigoSapProduto: value });
                    }}
                    placeholder="Digite o Código SAP"
                  />
                </Box>

                <Button
                  variant="contained"
                  color="success"
                  sx={{ height: 48, mt: 3, maxWidth: 250, width: '100%' }}
                  onClick={handleCadastrarProduto}
                  disabled={
                    loading ||
                    !formData.codigoProduto ||
                    !formData.codigoSapProduto
                  }
                >
                  {loading ? 'Carregando...' : 'Gerar'}
                </Button>

                <Button
                  variant="contained"
                  color="inherit"
                  sx={{
                    height: 48,
                    mt: 3,
                    maxWidth: 200,
                    width: '100%',
                  }}
                  onClick={handleClear}
                >
                  Limpar
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 4, width: '100%', padding: '0 20px' }}>
              <Typography sx={{ fontWeight: 'bold' }}>Filtros:</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mt: 2,
                  width: '100%',
                  flexWrap: 'wrap',
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Descrição
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtroProdutos.prodApelido}
                    onChange={(e) => {
                      setFiltroProdutos({
                        ...filtroProdutos,
                        prodApelido: e.target.value,
                      });
                    }}
                    placeholder="Digite a Descrição"
                  />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código do Produto
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtroProdutos.codigoProduto}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/[^a-zA-Z0-9]/g, '');

                      setFiltroProdutos({
                        ...filtroProdutos,
                        codigoProduto: value.toUpperCase(),
                      });
                    }}
                    placeholder="Digite o Código do Produto"
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    EAN
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtroProdutos.ean}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 15);

                      setFiltroProdutos({ ...filtroProdutos, ean: value });
                    }}
                    placeholder="Digite a EAN"
                  />
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
                    Código SAP
                  </FormLabel>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="medium"
                    sx={{
                      bgcolor: '#fff',
                      '& .MuiOutlinedInput-input': {
                        padding: '10px 14px',
                        borderRadius: 2,
                      },
                      '& .MuiOutlinedInput-root': {
                        height: 48,
                      },
                    }}
                    value={filtroProdutos.codSapVivo}
                    onChange={(e) => {
                      let value = e.target.value;

                      value = value.replace(/\D/g, '').slice(0, 8);

                      setFiltroProdutos({
                        ...filtroProdutos,
                        codSapVivo: value,
                      });
                    }}
                    placeholder="Digite o Código SAP"
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleFiltroProdutos}
                  color="inherit"
                  sx={{
                    height: 45,
                    mt: 3,
                    maxWidth: 200,
                    width: '100%',
                  }}
                >
                  Limpar
                </Button>
              </Box>
            </Box>

            <Box sx={{ mt: 3, width: '100%' }}>
              <TableProdutos data={produtos} loading={loading} />
              <Pagination
                sx={{
                  marginTop: 4,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                count={Math.ceil(produtos.length / itemsPerPageProdutos)}
                page={currentPageProdutos}
                onChange={(event, page) => {
                  setCurrentPage(page);
                }}
                showFirstButton
                showLastButton
                color="primary"
                key={`pagination-${currentPageProdutos}`}
              />
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default GeradorQRcodeVivo;
