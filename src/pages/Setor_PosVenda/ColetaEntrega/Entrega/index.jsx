import React, { useState, useEffect, useCallback } from 'react';
import './styles.css';
import Loader from '@/components/Loader';
import { useToast } from '@/hooks/toast.hook';

import { TabelaEntregasGerenciamento } from './components/tabelaEntregaGerenciamento';
import RegistroEntregaForm from './components/registroEntregaForm';
import { apiFabrica_Posvenda } from '@/services/apis';
import debounce from '@/utils/debounce';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HeaderAmvox from '@/components/HeaderAmvox';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {
  buscarPosVendaEntregaClientes,
  buscarPosVendaEntregaClientesItem,
} from '@/pages/Setor_PosVenda/ColetaEntrega/coletaEntrega.service';
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
import AddIcon from '@mui/icons-material/Add';

import {
  formatDateSendApi,
  formatDateVisualFixColetaEntrega,
} from '@/utils/formatDateInput';
import { RiFileExcel2Fill } from 'react-icons/ri';
import formatDateTotvs from '@/utils/formatDataTotvs';
import ModalLoading from '@/components/ModalLoading';
import { useNavigate } from 'react-router';
import { useDebounce } from '@/hooks/debounce.hook';
const ExcelJS = require('exceljs');

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
  height: '90%',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

export default function EntregaPosVenda() {
  const { addToast } = useToast();
  const [modalRegistro, setModalRegistro] = useState(false);
  const [registro, setRegistro] = useState(null);
  const [registroParaAtualizar, setRegistroParaAtualizar] = useState(null);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [removeLoadingAtualizar, setRemoveLoadingAtualizar] = useState(false);
  const [posVendaEntregaLista, setPosVendaEntregaLista] = useState();
  const dataHoje = new Date();
  const formatDataHoje = formatDateSendApi(dataHoje);

  const emailLocalStorage = JSON.parse(
    window.localStorage.getItem('@fabrica-user')
  );
  const emailUsuario = emailLocalStorage.email;

  const [filtro, setFiltro] = useState({
    dataRegistro: formatDataHoje,
    dataAtualizacao: null,
    protocolo: null,
    notaFiscal: null,
    situacao: null,
  });
  const debounceFiltro = useDebounce(filtro, 1000);

  const handleShowModal = () => {
    setModalRegistro(!modalRegistro);
    if (modalRegistro === true) {
      setRegistro(null);
      setRegistroParaAtualizar(null);
    }
  };
  const navigate = useNavigate();
  const registrarEntrega = async (value) => {
    await apiFabrica_Posvenda
      .post(`PosVendaEntregaClientes`, value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Registrado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: _err.response.data.title,
        });
      });
    handleShowModal();
  };

  const itemAtualizarRegistro = async (value) => {
    const { ordemServico } = value;
    await buscarPosVendaEntregaClientesItem(ordemServico)
      .then((retorno) => {
        setRegistroParaAtualizar(retorno);
        setModalRegistro(true);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Entrega-Pós-Venda !',
          description:
            'Erro ao listar os Entrega-Pos-venda, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => {
        handleShowModal(), setRemoveLoadingAtualizar(false);
      });
  };

  const atualizarRegistro = async (value) => {
    const {
      ordemServico,
      dataPrevisao,
      dataSaida,
      dataEntrega,
      email,
      ...novoValue
    } = value;

    const newObjeto = {
      dataSaida: formatDateVisualFixColetaEntrega(dataSaida),
      dataPrevisao: formatDateVisualFixColetaEntrega(dataPrevisao),
      dataEntrega: formatDateVisualFixColetaEntrega(dataEntrega),
      ordemServico: value.ordemServico,
      email: emailUsuario,
      ...novoValue,
    };

    await apiFabrica_Posvenda
      .put(`PosVendaEntregaClientes?OrdemServico=${ordemServico}`, newObjeto)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Registro atualizado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description:
            'Erro ao atualizar, Tente Novamente!' + _err.response.data.title,
        });
      })
      .finally(() => handleFetch(), handleShowModal());
  };

  function handleBack() {
    navigate(-1);
  }

  const handleFetch = useCallback(() => {
    buscarPosVendaEntregaClientes(debounceFiltro)
      .then((retorno) => {
        setPosVendaEntregaLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Coleta-Pós-Venda !',
          description:
            'Erro ao listar os Coleta-Pos-venda, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => setRemoveLoading(true));
  }, [debounceFiltro]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  const handleClear = (e) => {
    e.preventDefault();

    setFiltro({
      dataRegistro: formatDataHoje,
      dataAtualizacao: null,
      notaFiscal: null,
      ordemServico: null,
      dataSaida: null,
      situacao: null,
    });
    document.getElementById('DataRegistro').value = formatDataHoje;
    document.getElementById('DataAtualizacao').value = '';
    document.getElementById('Protocolo').value = '';
    document.getElementById('situacao-select').value = '';
  };

  const situacaoLista = [
    'AGUARDANDO CADASTRO NA TOTVS',
    'AGUARDANDO COLETA',
    'AGUARDANDO FATURAMENTO',
    'AGUARDANDO EMBARQUE',
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
    'CANCELADO',
    'OUTROS',
  ];

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Ordem de Serviço',
        key: 'ordemServico',
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
        header: 'Origem',
        key: 'origem',
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
        header: 'Programação',
        key: 'dataSaida',
        width: 20,
      },
      {
        header: 'D.Previsão',
        key: 'dataPrevisao',
        width: 15,
      },
      {
        header: 'D.Entrega',
        key: 'dataEntrega',
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

    posVendaEntregaLista.entregas.map((item) => {
      sheet.addRow({
        ordemServico: item.ordemServico,
        cliente: item.cliente,
        notaFiscal: item.notaFiscal,
        municipio: item.municipio,
        uf: item.uf,
        origem: item.origem,
        dataRegistro: formatDateTotvs(item.dataRegistro),
        dataAtualizacao: formatDateTotvs(item.dataAtualizacao),
        dataSaida: formatDateTotvs(item.dataSaida),
        dataPrevisao: formatDateTotvs(item.dataPrevisao),
        dataEntrega: formatDateTotvs(item.dataEntrega),
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
      anchor.download = `pos-venda-entrega.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <ModalLoading show={removeLoading} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <HeaderAmvox title="Entrega" onBack={() => navigate(-1)} />
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
            onClick={handleShowModal}
          >
            Registrar Entrega
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
          Entrega Mensal
          <FormLabel
            style={{
              // textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              fontSize: '24px',
              textAlign: 'left',
              fontWeight: '600',
            }}
          >
            {posVendaEntregaLista?.totalMes}
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
          Entrega Diária
          <FormLabel
            style={{
              // textAlign: 'center',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
              fontSize: '24px',
              textAlign: 'left',
              fontWeight: '600',
            }}
          >
            {posVendaEntregaLista?.totalDia}
          </FormLabel>
        </Box>
      </Box>

      <MuiModal open={modalRegistro} onClose={handleShowModal}>
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
              {registroParaAtualizar != null
                ? 'Atualizar Entrega'
                : 'Registrar Entrega'}
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModal();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <RegistroEntregaForm
              registrarEntrega={registrarEntrega}
              atualizarRegistro={atualizarRegistro}
              cancelarRegistro={handleShowModal}
              registroParaAtualizar={registroParaAtualizar}
            />
          </Box>
        </Box>
      </MuiModal>

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
              defaultValue={filtro.dataRegistro ?? ''}
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
            flexDirection: 'column',
            paddingLeft: '10px',
            maxWidth: '180px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <InputLabel>Programação</InputLabel>
          <Grid item xs={5} sm={1.5} maxWidth={'150px'}>
            <TextField
              id="DataAtualizacao"
              type="date"
              value={filtro.dataSaida || ''}
              onChange={(e) =>
                setFiltro({
                  ...filtro,
                  dataSaida: e.target.value,
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
          <InputLabel>Ordem Serviço</InputLabel>
          <OutlinedInput
            id="Protocolo"
            type="number"
            value={filtro.ordemServico ?? ''}
            onChange={(e) =>
              setFiltro({
                ...filtro,
                ordemServico: e.target.value,
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
            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          <InputLabel>Nota Fiscal</InputLabel>
          <OutlinedInput
            id="Protocolo"
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
        <div className="col-4 col-sm-3 col-lg-2">
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
                value={filtro.situacao ?? ''}
                onChange={(e) =>
                  setFiltro({
                    ...filtro,
                    situacao: e.target.value,
                    dataRegistro: null,
                  })
                }
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
        </div>
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
            Limpar filtro
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
        {posVendaEntregaLista?.entregas.length > 0 ? (
          <div
            className="tabelaEntregasMobileToPC"
            style={{
              height: 600,
              width: '100%',
              overflow: 'scroll',
              flexGrow: '3',
            }}
          >
            <TabelaEntregasGerenciamento
              posVendaEntregaLista={posVendaEntregaLista?.entregas}
              itemAtualizarRegistro={itemAtualizarRegistro}
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
