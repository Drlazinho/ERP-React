import { useState, useEffect, useCallback, useRef } from 'react';
import BarcodeNotaFiscalConfirmacao from '@/components/BarcodeNotaFiscalConfirmacao';
import { apiFabricaADM } from '@/services/apis';
import debounce from '@/utils/debounce';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { useNotasEmitidas } from '@/hooks/notas-emitidas.hook';
import NotasConfirmacaoLogistica from '@/components/BarcodeNotaFiscalConfirmacao/TabelaNotasEmitidas';
import './styles.css';
import { formatDatetoHtmlDay } from '@/utils/formatDate';
import ClearIcon from '@mui/icons-material/Clear';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { useToast } from '@/hooks/toast.hook';
import {
  atualizarNotasEmitidasPorId,
  atualizarSeparadoPorNF,
  buscarNotasEmitidasPorFiltro,
  registrarNovaSeparada,
} from './notas-emitida.service';
import {
  Box,
  Button,
  Checkbox,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
  TextField,
} from '@mui/material';
import NewTabelaDeNotasFiscaisEmitidas from './components/NewTabelaDeNotasFiscaisEmitidas';
import ExcelNotasFiscaisEmitdasButton from './components/ExcelDeNotasFicaisEmitidas';
import TuneIcon from '@mui/icons-material/Tune';
import ModalChange from './components/Modall';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import ModalLeitorSeparado from './components/ModalLeitorSeparado';
import { NotaFiscalImagemGuiaPost } from '@/services/notasFiscaisImagem.service';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormLabel from '@mui/material/FormLabel';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import './styles.css';
import {InputDateAmvox} from '@/components/InputDateAmvox/InputDateAmvox';
import { IMaskInput } from 'react-imask';

const ButtonTop = {
  borderRadius: '4px',
  border: '1px solid rgba(204, 204, 204, 0.80)',
  boxShadow: '1px 1px 3px 1px rgb(0 0 0 / 0.25)',
  backgroundColor: '#FFF',
  color: 'black',
  marginTop: '15px',
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: '#F0F0F0',
  },
};

export default function NotasFiscaisEmitidas() {
  const [notasFiscaisEmitidasLista, setNotasFiscaisEmitidasLista] = useState(
    []
  );
  const [numeroNotasFiscaisEmitidas, setNumeroNotasFiscaisEmitidas] = useState(
    []
  );
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [nfSelecionada, setNfSelecionada] = useState('');
  const [showModalLeitorSeparado, setShowModalLeitorSeparado] = useState(false);
  const [filtro, setFiltro] = useState({
    nf: null,
    nome: null,
    cnpj: null,
    dataEmissaoInicial: formatDatetoHtmlDay(),
    dataEmissaoFinal: formatDatetoHtmlDay(),
    envio: null,
    romaneio: null,
    separado: null,
  });
  const [debouncedFiltro, setDebouncedFiltro] = useState(filtro);

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/comercial/dashboardnotasfiscais');
  };

  const handleSetShow = (value) => {
    setShowModal(!showModal);
    setNfSelecionada(value);
  };

  const handleShowModalSeparado = () => {
    setShowModalLeitorSeparado(!showModalLeitorSeparado);
  };

  const { email } = useUsuarioLocal();

  const { addToast } = useToast();

  const { buscarNotaEmitada, isLoading } = useNotasEmitidas();

  const [checkedEnvio, setCheckedEnvio] = useState(false);

  const [checkedRomaneio, setCheckedRomaneio] = useState(false);

  const [checkedSeparado, setCheckedSeparado] = useState(false);

  const handleChangeEnvio = (e) => {
    const isChecked = e.target.checked;
    setCheckedEnvio(isChecked);
    setFiltro({ ...filtro, envio: isChecked ? 1 : null });
  };

  const handleChangeRomaneio = (e) => {
    const isChecked = e.target.checked;
    setCheckedRomaneio(isChecked);
    setFiltro({ ...filtro, romaneio: isChecked ? 1 : null });
  };

  const handleChangeSeparado = (e) => {
    const isChecked = e.target.checked;
    setCheckedSeparado(isChecked);
    setFiltro({ ...filtro, separado: isChecked ? 1 : null });
  };

  const [filtroTotal, setFiltroTotal] = useState({
    dataEmissao: formatDatetoHtmlDay(),
  });

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setDebouncedFiltro(filtro);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [filtro]);

  const updateTabela = () => {
    handleFetch();
  };

  const handleFetch = useCallback(() => {
    buscarNotasEmitidasPorFiltro(debouncedFiltro)
      .then((retorno) => {
        setNotasFiscaisEmitidasLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro TABELA Notas Emitidas !',
          description:
            'Erro ao carregar TABELA de Notas Emitidas, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => setLoading(false));
  }, [debouncedFiltro]);

  useEffect(() => {
    handleFetch();
  }, [debouncedFiltro]);

  const handleFetchNotas = async () => {
    try {
      const response = await apiFabricaADM.get(
        `NotasEmitidas/TotalNotasEmitidas`,
        { params: filtroTotal }
      );
      setNumeroNotasFiscaisEmitidas(response.data);
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro TABELA Notas Emitidas !',
        description: 'Erro grave - não carregou Notas emitidas no mês !!',
      });
    }
  };
  const [openHistory, setOpenHistory] = useState(true);

  const openHist = () => {
    setOpenHistory(!openHistory);
  };

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    handleFetchNotas();
  }, [filtroTotal]);

  const handleClear = (e) => {
    e.preventDefault();

    setFiltro({
      nf: null,
      nome: null,
      cnpj: null,
      dataEmissaoInicial: formatDatetoHtmlDay(),
      dataEmissaoFinal: formatDatetoHtmlDay(),
      envio: null,
      romaneio: null,
      separado: null,
    });
    setCheckedEnvio(false);
    setCheckedRomaneio(false);
    setCheckedSeparado(false);
  };

  const handleChangeEnviado = async (item) => {
    delete item.separado;

    atualizarNotasEmitidasPorId({
      ...item,
      enviada: 1,
      userLib: email,
      dataLib: new Date().toLocaleString(),
    })
      .then((retorno) => {
        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar ',
        });
        handleFetch();
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar ',
        });
      })
      .finally(() => {});
  };

  const handleAtualizacaoNF = async (body) => {
    registrarNovaSeparada(body)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao registrar Equipamento!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao registrar Equipamento!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };

  const handleAtualizacaoSeparadoPorNF = async (body) => {
    atualizarSeparadoPorNF(body)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar nota!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao registrar Equipamento!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };

  const handlePagamento = (value) => {
    const { numeroNotaFiscal, arquivo } = value;

    const formData = new FormData();

    formData.append('NumeroNotaFiscal', numeroNotaFiscal);
    formData.append('Arquivo', arquivo);

    NotaFiscalImagemPagamentoPost(formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Pagamento cadastrado com sucesso!',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Numero do pagamento incorreto',
          description: _err.response.data,
        });
      })
      .finally(() => {
        handleFetch();
      });
  };

  // const handleSubmitGuia = (value) => {
  //   const { Arquivo, NumeroNotaFiscal } = value
  //   const formDataObj = new FormData()
  //   formDataObj.append('Arquivo', Arquivo)
  //   formDataObj.append('NumeroNotaFiscal', NumeroNotaFiscal)
  //   NotaFiscalImagemGuiaPost(formDataObj).then((response) => {
  //     if (response === 'Guia registrada com sucesso.') {
  //       addToast({
  //         type: 'success',
  //         title: 'Guia registrada.',
  //         description: 'Guia registrada com sucesso.',
  //       })
  //       handleFetch()
  //     } else {
  //       addToast({
  //         type: 'danger',
  //         title: 'Houve um erro ao anexar.',
  //         description: 'Houve um erro ao anexar a guia.',
  //       })
  //     }
  //   })
  // }

  const handleSubmitGuia = async (value) => {
    const { NumeroNotaFiscal, Arquivo } = value;
    const formData = new FormData();
    formData.append('NumeroNotaFiscal', NumeroNotaFiscal);
    formData.append('Arquivo', Arquivo);
    await NotaFiscalImagemGuiaPost(formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Guia cadastrado com sucesso!',
        });
      })
      .catch((error) => {
        let errorMessage = 'Houve um erro ao anexar a guia.';

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
      })
      .finally(() => {
        handleFetch();
      });
  };

  const cnpjRef = useRef(null);
  const maskRef = useRef(null);

  useEffect(() => {
    if (cnpjRef.current) {
      maskRef.current = IMask(cnpjRef.current, {
        mask: '00.000.000/0000-00',
        lazy: false,
      });

      return () => {
        maskRef.current?.destroy();
      };
    }
  }, []);

  return (
    <>
      <ModalChange
        nfSelecionada={nfSelecionada}
        open={showModal}
        handleSubmit={handleAtualizacaoSeparadoPorNF}
        onClose={handleSetShow}
      />

      <ModalLeitorSeparado
        onClose={handleShowModalSeparado}
        open={showModalLeitorSeparado}
      />

      <div className="principal">
        <BarcodeNotaFiscalConfirmacao
          isShow={show}
          isLoading={isLoading}
          fn={buscarNotaEmitada}
          handleClose={() => setShow(false)}
        >
          <NotasConfirmacaoLogistica />
        </BarcodeNotaFiscalConfirmacao>
        <Box position={'relative'} sx={{ backgroundColor: '#F2F2F2' }} gap={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pl: 4,
            }}
          >
            <IconButton onClick={handleBack}>
              <ChevronLeftIcon />
            </IconButton>
            <img src={Amvoxlogopng} alt="Amvox" className="imgAmvox"></img>
            <div className="tituloPri">Tabela</div>
            <div
              className="tituloSec"
              style={{ cursor: 'pointer' }}
              onClick={handleNavigate}
            >
              Dashboard
            </div>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                pr: 2,
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, pr: 4, pb: 1 }}>
                <Button
                  size="small"
                  variant="outlined"
                  sx={ButtonTop}
                  startIcon={<QrCodeScannerIcon />}
                  onClick={() => setShow(true)}
                >
                  Leitor de Barra
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  sx={ButtonTop}
                  startIcon={<ManageSearchIcon />}
                  onClick={handleShowModalSeparado}
                >
                  Separar Nota
                </Button>
                <ExcelNotasFiscaisEmitdasButton
                  dataApi={notasFiscaisEmitidasLista}
                  filtroNameFile={filtro.dataEmissaoInicial}
                />
                <Button
                  size="small"
                  variant="outlined"
                  sx={ButtonTop}
                  startIcon={<TuneIcon />}
                  onClick={openHist}
                >
                  Filtros
                </Button>
              </Box>
            </Box>
          </Box>

          <div className="divTotalNF">
            <div className="cardNfEmitida">
              <Typography
                variant="h7"
                style={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {' '}
                Valor Notas Expedidas
              </Typography>

              <FormLabel
                style={{
                  // textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  fontSize: '24px',
                  textAlign: 'left',
                }}
              >
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(numeroNotasFiscaisEmitidas.valortotalNotasEmitidas)}
              </FormLabel>
            </div>
            <div className="cardNfEmitida">
              <Typography
                variant="h7"
                style={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                  textAlign: 'left',
                }}
              >
                {' '}
                Total Notas Expedidas
              </Typography>

              <FormLabel
                style={{
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  fontSize: '24px',
                  textAlign: 'left',
                  color: 'green',
                }}
              >
                {numeroNotasFiscaisEmitidas.totalNotasExpedidas}
              </FormLabel>
            </div>

            <div className="cardNfEmitida">
              <Typography
                variant="h7"
                style={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {' '}
                Notas não expedidas
              </Typography>

              <FormLabel
                style={{
                  // textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  fontSize: '24px',
                  textAlign: 'left',
                  color: 'red',
                }}
              >
                {numeroNotasFiscaisEmitidas.totalNotasNaoExpedidas}
              </FormLabel>
            </div>

            <div className="cardNfEmitida">
              <Typography
                variant="h7"
                style={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {' '}
                Emitidas do Dia
              </Typography>

              <FormLabel
                style={{
                  // textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  fontSize: '24px',
                  textAlign: 'left',
                }}
              >
                {numeroNotasFiscaisEmitidas.totalDia}
              </FormLabel>
            </div>

            <div className="cardNfEmitida">
              <Typography
                variant="h7"
                style={{
                  fontWeight: 'bold',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                }}
              >
                {' '}
                Emitidas do Mês
              </Typography>

              <FormLabel
                style={{
                  // textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
                  fontSize: '24px',
                  textAlign: 'left',
                }}
              >
                {numeroNotasFiscaisEmitidas.totalMes}
              </FormLabel>
            </div>
          </div>
          {openHistory ? (
            <div className="divGeralNotasEmitidas">
              <div className="divConsultarNotasFiscais">
                <div className="divSelects">
                  <div
                    style={{
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      maxWidth: '170px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      marginTop: '10px',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Data Inicial
                    </InputLabel>

                    <InputDateAmvox
                      label=""
                      value={filtro.dataEmissaoInicial || ''}
                      onChange={(date) => {
                        setFiltro((prev) => ({
                          ...prev,
                          dataEmissaoInicial: date,
                        }));
                        setFiltroTotal((prev) => ({
                          ...prev,
                          dataEmissao: date,
                        }));
                        setLoading(true);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  <div
                    style={{
                      flexDirection: 'column',
                      fontWeight: 'bold',
                      maxWidth: '170px',
                      paddingLeft: '10px',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                      marginTop: '10px',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Data Final
                    </InputLabel>

                    <InputDateAmvox
                      label=""
                      value={filtro.dataEmissaoFinal || ''}
                      onChange={(date) => {
                        setFiltro((prev) => ({
                          ...prev,
                          dataEmissaoFinal: date,
                        }));
                        setLoading(true);
                      }}
                      format="YYYY-MM-DD"
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Nota Fiscal
                    </InputLabel>
                    <OutlinedInput
                      id="NotaFiscal"
                      type="number"
                      value={filtro.nf || ''}
                      placeholder="Nota Fiscal"
                      onChange={(e) =>
                        setFiltro({
                          ...filtro,
                          nf: e.target.value,
                          dataEmissaoInicial: null,
                          dataEmissaoFinal: null,
                        })
                      }
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-input': {
                          padding: '10px 14px',
                          borderRadius: 2,
                        },
                        '& .MuiOutlinedInput-root': {
                          height: 40,
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>Nome</InputLabel>
                    <OutlinedInput
                      id="Nome"
                      value={filtro.nome || ''}
                      placeholder="Nome"
                      onChange={(e) =>
                        setFiltro({
                          ...filtro,
                          nome: e.target.value,
                          dataEmissaoInicial: null,
                          dataEmissaoFinal: null,
                        })
                      }
                      sx={{
                        bgcolor: '#fff',
                        borderRadius: 2,
                        '& .MuiOutlinedInput-input': {
                          padding: '10px 14px',
                        },
                        '& .MuiOutlinedInput-root': {
                          height: 40,
                        },
                      }}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                      width: '100%',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>CNPJ</InputLabel>
                    <IMaskInput
                      mask="00.000.000/0000-00"
                      inputRef={cnpjRef}
                      value={filtro.cnpj || ''}
                      unmask={true}
                      onAccept={(value) => {
                        setFiltro({
                          ...filtro,
                          cnpj: value,
                          dataEmissaoInicial: null,
                          dataEmissaoFinal: null,
                        });
                      }}
                      definition={{
                        '#': /[0-9]/,
                      }}
                      as={OutlinedInput}
                      id="Cnpj"
                      placeholder="CNPJ"
                      style={{
                        bgcolor: '#fff',
                        borderRadius: '12px',
                        padding: '10px 14px',
                        height: 40,
                        border: '1px solid #ccc',
                        boxShadow: '0px 4px 4px #ccc',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '10px',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Envio
                    </InputLabel>
                    <Checkbox
                      id="envio"
                      name="envio"
                      checked={checkedEnvio}
                      onChange={handleChangeEnvio}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingLeft: '10px',
                      paddingRight: '10px',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Romaneio
                    </InputLabel>
                    <Checkbox
                      id="romaneio"
                      name="romaneio"
                      checked={checkedRomaneio}
                      onChange={handleChangeRomaneio}
                    />
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '25px',
                    }}
                  >
                    <InputLabel style={{ fontWeight: 'bold' }}>
                      Separado
                    </InputLabel>
                    <Checkbox
                      id="separado"
                      name="separado"
                      checked={checkedSeparado}
                      onChange={handleChangeSeparado}
                    />
                  </div>
                  <Box
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      paddingRight: '25px',
                    }}
                  >
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<ClearIcon />}
                      sx={{
                        borderRadius: '8px',
                        border: '1px solid rgba(204, 204, 204, 0.80)',
                        backgroundColor: '#FFF',
                        color: 'black',
                        marginTop: '15px',
                        whiteSpace: 'nowrap',
                        '&:hover': {
                          backgroundColor: '#F0F0F0',
                        },
                      }}
                      onClick={handleClear}
                    >
                      Limpar Filtro
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          <NewTabelaDeNotasFiscaisEmitidas
            data={notasFiscaisEmitidasLista}
            handleChangeEnviado={handleChangeEnviado}
            handleSubmitGuia={handleSubmitGuia}
            showModal={handleSetShow}
            loading={loading}
            handlePagamento={handlePagamento}
            updateTabela={updateTabela}
          />
        </Box>
      </div>
    </>
  );
}
