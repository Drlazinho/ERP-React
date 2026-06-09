import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';

import { useToast } from '@/hooks/toast.hook';
import HeaderAmvox from '@/components/HeaderAmvox';
import { apiFabrica_Posvenda } from '@/services/apis';
import {
  buscarPosVendaColetaClientes,
  buscarPosVendaColetaItemImagem,
  registrarPosVendaColetaClientes,
} from '@/pages/Setor_PosVenda/ColetaEntrega/coletaEntrega.service';
import { TabelaColetaGerenciamento } from './components/tabelaColetaGerenciamento';
import Loader from '@/components/Loader';
import debounce from '@/utils/debounce';
import { RiFileExcel2Fill } from 'react-icons/ri';
import formatDateTotvs from '@/utils/formatDataTotvs';
import {
  formatDateSendApi,
  formatDateVisualFixColetaEntrega,
} from '@/utils/formatDateInput';
import ModalLoading from '@/components/ModalLoading';
import RegistroColetaNewForm from './components/registroColeta';
import RegistroImagensForm from './components/registroImagem';
import AtualizarRegistroColetaForm from './components/atualizarRegistro';
import {
  Box,
  Typography,
  Button,
  IconButton,
  FormLabel,
  InputLabel,
  OutlinedInput,
  Grid,
  TextField,
  Select,
  FormControl,
  MenuItem,
  Modal as MuiModal,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
const ExcelJS = require('exceljs');
import { useDebounce } from '@/hooks/debounce.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: '80%',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

export default function ColetaPosVenda() {
  const { addToast } = useToast();
  const [modalAtualizarRegistro, setModalAtualizarRegistro] = useState(false);
  const [modalRegistro, setModalRegistro] = useState(false);
  const [modalAtualizarRegistroImagens, setModalAtualizarRegistroImagens] =
    useState(false);
  const [registro, setRegistro] = useState(null);
  const [registroParaAtualizar, setRegistroParaAtualizar] = useState([{}]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeLoadingAtualizar, setRemoveLoadingAtualizar] = useState(false);
  const [posVendaColetaLista, setPosVendaColetaLista] = useState();

  const emailLocalStorage = JSON.parse(
    window.localStorage.getItem('@fabrica-user')
  );
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  const emailUsuario = emailLocalStorage.email;

  const dataHoje = new Date();
  const formatDataHoje = formatDateSendApi(dataHoje);

  const [filtro, setFiltro] = useState({
    dataRegistro: formatDataHoje,
    dataAtualizacao: null,
    protocolo: null,
    notaFiscal: null,
    situacao: null,
  });
  const debounceFiiltro = useDebounce(filtro, 1000);

  const handleShowModalRegistro = () => {
    setModalRegistro(!modalRegistro);
  };

  const handleShowModalRegistroImgens = () => {
    setModalAtualizarRegistroImagens(!modalAtualizarRegistroImagens);
  };

  const handleAtualizarRegistroModal = () => {
    setModalAtualizarRegistro(!modalAtualizarRegistro);
  };

  const registrarColeta = async (value, infoImages) => {
    registrarPosVendaColetaClientes(value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Registrado com sucesso',
        });
        registrarImagemColeta(infoImages);
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: _err.response.data.title,
        });
      })
      .finally(() => {
        handleShowModalRegistro();
      });
  };

  const registrarImagemColeta = async (value) => {
    const { anexo1, anexo2, anexo3, protocolo } = value;

    const formData = new FormData();
    formData.append('anexo1', anexo1);
    formData.append('anexo2', anexo2);
    formData.append('anexo3', anexo3);
    formData.append('protocolo', protocolo);

    await apiFabrica_Posvenda
      .put(`PosVendaColetaClientes/Anexo?Protocolo=${protocolo}`, formData)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Imagens enviada com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: _err.response.data.title,
        });
      })
      .finally(() => {
        setModalAtualizarRegistroImagens(false);
      });
  };

  const itemRegistroImagem = (value) => {
    setRegistro(value);
    handleShowModalRegistroImgens();
  };

  const itemAtualizarRegistro = async (value) => {
    const { protocolo } = value;
    setRemoveLoadingAtualizar(true);
    await buscarPosVendaColetaItemImagem(protocolo)
      .then((retorno) => {
        setRegistroParaAtualizar(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Coleta-Pós-Venda !',
          description:
            'Erro ao listar os Coleta-Pos-venda, por favor tente novamente dentro de instantes !',
        });
      })
      .finally(() => {
        handleAtualizarRegistroModal(), setRemoveLoadingAtualizar(false);
      });
  };

  const atualizarRegistro = async (value) => {
    const {
      protocolo,
      dataAutoriz,
      dataPrevisao,
      dataColeta,
      dataPrevisaoEntrega,
      email,
      ...novoValue
    } = value;

    const newObjeto = {
      dataAutoriz: formatDateVisualFixColetaEntrega(dataAutoriz),
      dataPrevisao: formatDateVisualFixColetaEntrega(dataPrevisao),
      dataColeta: formatDateVisualFixColetaEntrega(dataColeta),
      dataPrevisaoEntrega:
        formatDateVisualFixColetaEntrega(dataPrevisaoEntrega),
      email: emailUsuario,
      ...novoValue,
    };

    await apiFabrica_Posvenda
      .put(`PosVendaColetaClientes?Protocolo=${protocolo}`, newObjeto)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Registro atualizado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: _err.response.data.title,
        });
      })
      .finally(() => {
        handleFetch(), handleAtualizarRegistroModal();
      });
  };

  const handleFetch = useCallback(() => {
    buscarPosVendaColetaClientes(debounceFiiltro)
      .then((retorno) => {
        setPosVendaColetaLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Coleta-Pós-Venda !',
          description:
            'Erro ao listar os Coleta-Pos-venda, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => {
        setRemoveLoading(true);
      });
  }, [debounceFiiltro]);

  useEffect(() => {
    handleFetch();
  }, [debounceFiiltro]);

  const handleClear = (e) => {
    e.preventDefault();
    setFiltro({
      dataRegistro: formatDataHoje,
      dataAtualizacao: null,
      protocolo: null,
      notaFiscal: null,
      situacao: null,
    });
  };

  const situacaoLista = [
    'AGUARDANDO CADASTRO NA TOTVS',
    'AGUARDANDO COLETA',
    'AGUARDANDO FATURAMENTO',
    'AGUARDANDO EMBARQUE',
    'CANCELADO',
    'CLIENTE AUSENTE',
    'COLETA AUTORIZADA',
    'EM COTAÇÃO',
    'EM TRANSLADO PARA O CLIENTE',
    'EM TRANSLADO PARA A FÁBRICA',
    'EM TRANSLADO PARA CD SP',
    'EM TRANSLADO PARA O POSTO',
    'ENDEREÇO NÃO LOCALIZADO',
    'FINALIZADO',
    'PENDÊNCIA DO ATENDIMENTO',
    'RECUSA',
    'SEM REGISTRO',
    'OUTROS',
  ];

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Protocolo',
        key: 'protocolo',
        width: 15,
      },
      { header: 'Cliente', key: 'cliente', width: 60 },
      {
        header: 'N. Fiscal',
        key: 'notaFiscal',
        width: 20,
      },
      {
        header: 'Cidade',
        key: 'municipio',
        width: 20,
      },
      {
        header: 'UF',
        key: 'uf',
        width: 20,
      },
      {
        header: 'D.Registro',
        key: 'dataRegistro',
        width: 10,
      },
      {
        header: 'D.Atualização',
        key: 'dataAtualizacao',
        width: 10,
      },
      {
        header: 'D.Autorização',
        key: 'dataAutoriz',
        width: 20,
      },
      {
        header: 'D.Previsão',
        key: 'dataPrevisao',
        width: 15,
      },
      {
        header: 'D.Coleta',
        key: 'dataColeta',
        width: 10,
      },
      {
        header: 'D.Previsão Entrega',
        key: 'dataPrevisaoEntrega',
        width: 10,
      },
      {
        header: 'Classificação',
        key: 'classificacao',
        width: 10,
      },
      {
        header: 'Situação',
        key: 'situacao',
        width: 10,
      },
      {
        header: 'Transportadora',
        key: 'transportadora',
        width: 10,
      },
    ];

    posVendaColetaLista.coletas.map((item) => {
      sheet.addRow({
        protocolo: item.protocolo,
        cliente: item.cliente,
        notaFiscal: item.notaFiscal,
        municipio: item.municipio,
        uf: item.uf,
        dataRegistro: formatDateTotvs(item.dataRegistro),
        dataAtualizacao: formatDateTotvs(item.dataAtualizacao),
        dataAutoriz: formatDateTotvs(item.dataAutoriz),
        dataPrevisao: formatDateTotvs(item.dataPrevisao),
        dataColeta: formatDateTotvs(item.dataColeta),
        dataPrevisaoEntrega: formatDateTotvs(item.dataPrevisaoEntrega),
        classificacao: item.classificacao,
        situacao: item.situacao,
        transportadora: item.transportadora,
      });

      return null;
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `pos-venda-coleta.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <ModalLoading show={removeLoading} />
      <MuiModal open={modalRegistro} onClose={handleShowModalRegistro}>
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
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Registro de Coleta
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModalRegistro();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <RegistroColetaNewForm
              registrarColeta={registrarColeta}
              cancelarRegistro={handleShowModalRegistro}
            />
          </Box>
        </Box>
      </MuiModal>

      <MuiModal
        open={modalAtualizarRegistroImagens}
        onClose={handleShowModalRegistroImgens}
      >
        <Box sx={{ ...style, width: '50%', height: '60%' }}>
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
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Atualizar imagens
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModalRegistroImgens();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <RegistroImagensForm
              registrarImagemColeta={registrarImagemColeta}
              atualizarRegistro={atualizarRegistro}
              cancelarRegistro={handleShowModalRegistroImgens}
              registroSelecionado={registro}
            />
          </Box>
        </Box>
      </MuiModal>

      <MuiModal
        open={modalAtualizarRegistro}
        onClose={handleAtualizarRegistroModal}
        style={{
          backdropFilter: 'blur(1px)',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ ...style, width: '60%', height: '80%' }}>
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
              sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
            >
              Atualizar Coleta
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleAtualizarRegistroModal();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <AtualizarRegistroColetaForm
              atualizarRegistro={atualizarRegistro}
              cancelarRegistro={handleAtualizarRegistroModal}
              registroParaAtualizar={registroParaAtualizar}
            />
          </Box>
        </Box>
      </MuiModal>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <HeaderAmvox title="Coleta" onBack={() => navigate(-1)} />
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          pr: 2,
          position: 'absolute',
          top: 25,
          right: 0,
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            height: '40px',
            padding: '8px 24px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            startIcon={<AddIcon />}
            sx={{
              borderRadius: '4px',
              background: '#0288D1',
              boxShadow:
                '0px 1px 5px 0px rgba(0, 0, 0, 0.12), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.20)',
              color: '#FFF',
              width: '250px',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 600,
              fontFamily: 'Poppins, sans-serif',
              lineHeight: '14px',
              '&:hover': {
                background:
                  'linear-gradient(180deg, #039BE5 23.5%, #0288D1 56%, #0277BD 100%)',
                border: '2px solid #039BE5',
              },
            }}
            size="large"
            onClick={handleShowModalRegistro}
          >
            Registrar Coleta
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '16px', marginTop: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 calc(50% - 16px)',
            height: '100px',
            padding: '24px',
            flexDirection: 'column',
            borderRadius: '12px',
            marginBottom: '40px',
            backgroundColor: '#fff',
            boxShadow: '1px 1px 3px 1px rgb(0 0 0 / 0.25)',
            textAlign: 'left',
            fontWeight: '600',
            marginLeft: '30px',
            color: 'black',
          }}
        >
          Coleta Mensal
          <FormLabel
            style={{
              // textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              fontSize: '24px',
              textAlign: 'left',
              fontWeight: '600',
            }}
          >
            {Number(posVendaColetaLista?.totalMes)}
          </FormLabel>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 calc(50% - 16px)',
            height: '100px',
            padding: '24px',
            flexDirection: 'column',
            borderRadius: '12px',
            marginBottom: '40px',
            backgroundColor: '#fff',
            boxShadow: '1px 1px 3px 1px rgb(0 0 0 / 0.25)',
            textAlign: 'left',
            fontWeight: '600',
            marginRight: '30px',
            color: 'black',
          }}
        >
          Coleta Diária
          <FormLabel
            style={{
              // textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              fontSize: '24px',
              textAlign: 'left',
              fontWeight: '600',
            }}
          >
            {Number(posVendaColetaLista?.totalDia)}
          </FormLabel>
        </Box>
      </Box>

      <div
        style={{
          display: 'flex',
        }}
      >
        <div
          style={{
            flexDirection: 'column',
            paddingLeft: '10px',
            maxWidth: '180px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <InputLabel>Data de Registro</InputLabel>
          <Grid item xs={5} sm={1.6} maxWidth={'150px'}>
            <TextField
              id="DataRegistro"
              size="small"
              type="date"
              value={filtro.dataRegistro ?? ''}
              fullWidth
              sx={{
                bgcolor: 'transparent',
                borderRadius: 2,
                background: '#fff',
              }}
              onChange={(e) =>
                setFiltro({
                  ...filtro,
                  dataRegistro: e.target.value,
                })
              }
            />
          </Grid>
        </div>
        <div
          style={{
            flexDirection: 'column',
            paddingLeft: '10px',
            maxWidth: '180px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <InputLabel>Data de Atualização</InputLabel>
          <Grid item xs={5} sm={1.5} maxWidth={'150px'}>
            <TextField
              id="DataAtualizacao"
              type="date"
              value={filtro.dataAtualizacao ?? ''}
              onChange={(e) =>
                setFiltro({
                  ...filtro,
                  dataAtualizacao: e.target.value,
                  dataRegistro: null,
                })
              }
              size="small"
              fullWidth
              sx={{
                bgcolor: 'transparent',
                borderRadius: 2,
                background: '#fff',
              }}
            />
          </Grid>
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
          <InputLabel>Protocolo</InputLabel>
          <OutlinedInput
            id="Protocolo"
            type="number"
            value={filtro.protocolo ?? ''}
            onChange={(e) =>
              setFiltro({
                ...filtro,
                protocolo: e.target.value,
                dataRegistro: null,
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
          <InputLabel>Nota Fiscal</InputLabel>
          <OutlinedInput
            id="Nota Fiscal"
            type="number"
            value={filtro.notaFiscal ?? ''}
            onChange={(e) =>
              setFiltro({
                ...filtro,
                notaFiscal: e.target.value,
                dataRegistro: null,
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

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingLeft: '10px',
          }}
        >
          <InputLabel>Situação</InputLabel>
          <FormControl variant="outlined" size="small" fullWidth>
            <Select
              size="small"
              labelId="situacao-select-label"
              id="situacao-select"
              value={filtro.situacao || ''}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  situacao: e.target.value,
                  dataRegistro: null,
                });
              }}
              displayEmpty
              sx={{
                backgroundColor: 'white',
                borderRadius: 2,
              }}
            >
              <MenuItem value="" disabled>
                Selecione
              </MenuItem>
              {situacaoLista.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '28px',
            paddingRight: '10px',
            paddingLeft: '15px',
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<DeleteIcon />}
            sx={{
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              background: '#FFF',
              color: 'black',
              whiteSpace: 'nowrap',
              boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              '&:hover': {
                backgroundColor: '#F0F0F0',
              },
            }}
            onClick={handleClear}
          >
            Limpar Filtro
          </Button>
        </Box>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '28px',
            paddingRight: '20px',
            paddingLeft: '5px',
          }}
        >
          <Button
            size="small"
            variant="outlined"
            startIcon={<RiFileExcel2Fill />}
            sx={{
              borderRadius: '4px',
              border: '1px solid rgba(0, 0, 0, 0.23)',
              background: '#FFF',
              color: 'black',
              whiteSpace: 'nowrap',
              boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
              '&:hover': {
                backgroundColor: '#F0F0F0',
              },
            }}
            onClick={exportExcelFile}
          >
            Excel
          </Button>
        </Box>
      </div>
      <div className="row-content mobileReverse mt-3">
        {posVendaColetaLista != undefined ? (
          <div
            className="tabelaEntregasMobileToPC"
            style={{
              height: 600,
              width: '100%',
              overflow: 'scroll',
              flexGrow: '3',
            }}
          >
            <TabelaColetaGerenciamento
              posVendaColetaLista={posVendaColetaLista?.coletas}
              itemAtualizarRegistro={itemAtualizarRegistro}
              itemRegistroImagem={itemRegistroImagem}
              loader={removeLoadingAtualizar}
            />

            <div className="col-md-12">{!removeLoading && <Loader />}</div>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}
