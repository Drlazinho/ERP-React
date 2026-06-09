import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Box,
  Button,
  FormLabel,
  Pagination,
  Stack,
  TextField,
} from '@mui/material';
import TabelaAgendamentoCarga from './TabelaAgendamentoCarga/TabelaAgendamentoCarga';
import { getAgendamentoCarga } from '@/pages/Setor_Transportes/AgendamentoCarga/agendamentoCarga.service';
import SlidingPane from 'react-sliding-pane';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import { IconButton } from '@mui/material';
import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TitleIcon from '@mui/icons-material/Title';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import HeaderAmvox from '@/components/HeaderAmvox';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import './styles.css';
import debounce from '@/utils/debounce';
import LeitorNF from './LeitorChaveNF';
import ExcelJS from 'exceljs';
import moment from 'moment';
import { useDebounce } from '@/hooks/debounce.hook';

const interfaceObj = [
  {
    id: 0,
    numRomaneio: '',
    valorFrete: '',
    ano: '',
    mes: '',
    dtCancelamento: '',
    ordemEntregas: '',
    prazoRecLogistic: '',
    canhoto: '',
    dtEntregue: '',
    valor: '',
    dtFaturamento: '',
    codCliente: '',
    motorista: '',
    ordemCarregamento: 0,
    peso_Kg: '',
    volumes: '',
    cubagem: '',
    previsaoCarregamento: '',
    entregue: '',
    statusAgenda: '',
    observacao: '',
    dtAgenda: '',
    dtPrevisao: '',
    uf: '',
    destino: '',
    cliente: '',
    numNfe: '',
    tipoTransporteNf: '',
    solicitante: '',
    agendado: '',
    descarga: '',
    amz: '',
    tpNota: '',
    expedidoEm: '',
    horaRecebLogistica: '',
    dtRecebLogistic: '',
    chaveNf: '',
  },
];

export default function AgendamentoCarga() {
  const [showSlide, setShowSlide] = useState(false);
  const [dataObj, setDataObj] = useState({
    dados: interfaceObj,
    totalPaginas: 0,
  });
  const [selectedObj, setSelectedObj] = useState(interfaceObj);
  const [filtro, setFiltro] = useState({
    DataInicial: null,
    DataFinal: null,
    numeroPagina: 1,
    tamanhoPagina: 10,
    cliente: '',
    numeroNota: '',
    chaveNotaFiscal: '',
  });
  const debounceFiltro = useDebounce(filtro, 1000);
  const navigate = useNavigate();

  const formatDateSendApi = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const formatDate = (date) => {
    if (!date) return null;
    const dateStr = date.toString();
    return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(
      6,
      8
    )}`;
  };

  const parseDate = (dateString) => {
    return dateString ? parseInt(dateString.replace(/-/g, '')) : null;
  };

  const handleDateChange = (field, value) => {
    const integerValue = parseDate(value);
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      [field]: integerValue,
    }));
  };

  const handleClose = () => {
    setShowSlide(!showSlide);
    setSelectedObj(interfaceObj);
  };

  const handleFetch = () => {
    getAgendamentoCarga(debounceFiltro).then((res) => {
      setDataObj({
        dados: res.value.agendamento,
        totalPaginas: res.value.totalPaginas,
      });
    });
  };

  const handleClearFilter = () => {
    setFiltro({
      numeroPagina: 1,
      tamanhoPagina: 10,
      cliente: '',
      chaveNotaFiscal: '',
      numeroNota: '',
      DataInicial: null,
      DataFinal: null,
    });
  };
  const handlePageChange = (event, value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      numeroPagina: value,
    }));
  };

  useEffect(() => {
    handleFetch();
  }, [debounceFiltro]);

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Chave Nf',
        key: 'chaveNf',
        width: 30,
      },
      {
        header: 'Cliente',
        key: 'cliente',
        width: 10,
      },
      {
        header: 'Destino',
        key: 'destino',
        width: 10,
      },
      {
        header: 'UF',
        key: 'uf',
        width: 30,
      },
      {
        header: 'Previsao',
        key: 'dtPrevisao',
        width: 20,
      },
      {
        header: 'DtReceb Logist',
        key: 'dtRecebLogistic',
        width: 20,
      },
      {
        header: 'Data Agenda',
        key: 'dtAgenda',
        width: 10,
      },
      {
        header: 'Observacao',
        key: 'observacao',
        width: 20,
      },
      {
        header: 'Status Agenda',
        key: 'statusAgenda',
        width: 15,
      },
      {
        header: 'Volume',
        key: 'volumes',
        width: 20,
      },
      {
        header: 'Entregue',
        key: 'entregue',
        width: 15,
      },
      {
        header: 'Dt Entrega',
        key: 'dtEntregue',
        width: 20,
      },
      {
        header: 'Data Cancelamento',
        key: 'dtCancelamento',
        width: 50,
      },
      {
        header: 'Ordem Entregas',
        key: 'ordemEntregas',
        width: 15,
      },
      {
        header: 'HoraRec Logist',
        key: 'horaRecebLogistica',
        width: 20,
      },
      {
        header: 'Expedido Em',
        key: 'expedidoEm',
        width: 50,
      },
      {
        header: 'TP NOTA',
        key: 'tpNota',
        width: 15,
      },
      {
        header: 'Amz',
        key: 'amz',
        width: 20,
      },
      {
        header: 'Descarga',
        key: 'descarga',
        width: 50,
      },
      {
        header: 'Agendado',
        key: 'agendado',
        width: 15,
      },
      {
        header: 'Solicitante',
        key: 'solicitante',
        width: 20,
      },
      {
        header: 'Tipo Transporte NF',
        key: 'tipoTransporteNf',
        width: 50,
      },
      {
        header: 'Previsao De Carreg',
        key: 'previsaoCarregamento',
        width: 15,
      },
      {
        header: 'Cub. M³',
        key: 'cubagem',
        width: 20,
      },
      {
        header: 'Peso',
        key: 'peso_Kg',
        width: 50,
      },
      {
        header: 'Ordem De Carreg',
        key: 'ordemCarregamento',
        width: 15,
      },
      {
        header: 'Motorista',
        key: 'motorista',
        width: 20,
      },
      {
        header: 'Cod Cliente',
        key: 'codCliente',
        width: 50,
      },
      {
        header: 'Data Fat',
        key: 'dtFaturamento',
        width: 50,
      },
      {
        header: 'Valor',
        key: 'valor',
        width: 15,
      },
      {
        header: 'Canhoto',
        key: 'canhoto',
        width: 20,
      },
      {
        header: 'Prazo Rec Logist',
        key: 'prazoRecLogistic',
        width: 50,
      },
      {
        header: 'Mes Faturamento',
        key: 'mes',
        width: 50,
      },
      {
        header: 'Ano',
        key: 'ano',
        width: 15,
      },
      {
        header: 'Valor Frete',
        key: 'valorFrete',
        width: 20,
      },
      {
        header: 'Nº Romaneio',
        key: 'numRomaneio',
        width: 50,
      },
    ];

    (dataObj.dados || []).map((item) => {
      sheet.addRow({
        chaveNf: item.chaveNf,
        cliente: item.cliente,
        destino: item.destino,
        uf: item.uf,
        dtPrevisao: moment(item.dtPrevisao).format('DD/MM/YYYY'),
        observacao: item.observacao,
        statusAgenda: item.statusAgenda,
        volumes: item.volumes,
        entregue: item.entregue,
        dtEntregue: item.dtEntregue,
        dtAgenda: moment(item.dtAgenda).format('DD/MM/YYYY'),
        dtRecebLogistic: moment(item.dtRecebLogistic).format('DD/MM/YYYY'),
        dtCancelamento: moment(item.dtCancelamento).format('DD/MM/YYYY'),
        ordemEntregas: item.ordemEntregas,
        horaRecebLogistica: item.horaRecebLogistica,
        expedidoEm: moment(item.expedidoEm).format('DD/MM/YYYY'),
        tpNota: item.tpNota,
        amz: item.amz,
        descarga: item.descarga,
        agendado: item.agendado,
        solicitante: item.solicitante,
        tipoTransporteNf: item.tipoTransporteNf,
        previsaoCarregamento: moment(item.previsaoCarregamento).format(
          'DD/MM/YYYY'
        ),
        cubagem: item.cubagem,
        peso_Kg: item.peso_Kg,
        ordemCarregamento: item.ordemCarregamento,
        motorista: item.motorista,
        codCliente: item.codCliente,
        dtFaturamento: moment(item.dtFaturamento).format('DD/MM/YYYY'),
        valor: item.valor,
        canhoto: item.canhoto,
        prazoRecLogistic: item.prazoRecLogistic,
        mes: item.mes,
        ano: item.ano,
        valorFrete: item.valorFrete,
        numRomaneio: item.numRomaneio,
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
      anchor.download = `Agendamentos - ${formatDateSendApi(new Date())}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
      <SlidingPane
        closeIcon={<ArrowForwardIosIcon />}
        className="some-custom-class"
        overlayClassName="overlaySlide"
        isOpen={showSlide}
        title={selectedObj.chaveNf}
        width="600px"
        onRequestClose={handleClose}
      >
        <div className="CardSlide">
          <div className="SlideName">
            <TitleIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Nome Do Motorista</b>
            </Typography>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            size="large"
            inputProps2={{
              style: {
                width: '350px',
                fontSize: 16,
                padding: 0,
                textAlign: 'center',
                color: 'white',
              },
            }}
            InputLabelProps2={{ style: { fontSize: 12 } }}
            sx={{
              border: 'none',
              '& fieldset': { border: 'none' },
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: 'white',
              },
              backgroundColor: 'grey',
              borderRadius: '10px',
              fontWeight: 'bold',
            }}
            disabled
            value={selectedObj.motorista}
          />
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <TitleIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Ordem das entregas</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.ordemEntregas}
            />
          </div>
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <CheckCircleOutlineIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Cubagem Total</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.cubagem}
            />
          </div>
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <ViewHeadlineIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Dia do cancelamento</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.dtCancelamento}
            />
          </div>
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <CheckCircleOutlineIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Data da agenda</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.dtAgenda}
            />
          </div>
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <TitleIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Destino</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.destino}
            />
          </div>
        </div>
        <div className="CardSlide">
          <div className="SlideName">
            <CheckCircleOutlineIcon
              fontSize="13"
              color="info"
              sx={{ paddingRight: '5px' }}
            />
            <Typography variant="caption">
              <b>Tipo do veiculo</b>
            </Typography>
          </div>
          <div className="ConteudoSlide">
            <TextField
              variant="outlined"
              margin="normal"
              size="small"
              inputProps={{
                style: {
                  width: '350px',
                  fontSize: 16,
                  padding: 0,
                  textAlign: 'center',
                  color: 'white',
                },
              }}
              InputLabelProps={{ style: { fontSize: 12 } }}
              sx={{
                border: 'none',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input.Mui-disabled': {
                  WebkitTextFillColor: 'white',
                },
                backgroundColor: 'grey',
                borderRadius: '10px',
                fontWeight: 'bold',
              }}
              disabled
              value={selectedObj.tipoTransporteNf}
            />
          </div>
        </div>
      </SlidingPane>

      <>
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#F2F2F2', width: '99%', margin: '0 auto' }}
          gap={2}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
            }}
          >
            <HeaderAmvox
              title="Agendamento de Carga"
              onBack={() => navigate(-1)}
            />
          </Box>

          <div className="exportAndClean">
            <LeitorNF />
            <Button
              size="small"
              variant="text"
              sx={{ textDecoration: 'underline', color: 'black' }}
              startIcon={<PiMicrosoftExcelLogoFill size={20} />}
              onClick={exportExcelFile}
            >
              Exportar Para Excel
            </Button>
            <Button variant="warning" onClick={handleClearFilter}>
              <i className="fas fa-trash me-2"></i>
              Limpar Filtro
            </Button>
          </div>

          <div className="divGeralAgendamento">
            <div className="divConsultarAgendamento">
              <div style={{ display: 'flex' }}>
                <label
                  style={{
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    paddingLeft: '18px',
                  }}
                >
                  Filtros
                </label>
              </div>
              <div className="divSelectsAgendamento">
                <div
                  style={{
                    display: 'flex',
                    gap: '15px',
                    marginLeft: '15px',
                  }}
                >
                  <Box>
                    <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                      De
                    </FormLabel>
                    <TextField
                      type="date"
                      size="small"
                      variant="filled"
                      color="success"
                      value={
                        filtro.DataInicial ? formatDate(filtro.DataInicial) : ''
                      }
                      onChange={(e) =>
                        handleDateChange('DataInicial', e.target.value)
                      }
                    />
                  </Box>

                  <Box>
                    <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                      Até
                    </FormLabel>
                    <TextField
                      type="date"
                      size="small"
                      variant="filled"
                      color="success"
                      value={
                        filtro.DataFinal ? formatDate(filtro.DataFinal) : ''
                      }
                      onChange={(e) =>
                        handleDateChange('DataFinal', e.target.value)
                      }
                    />
                  </Box>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32%',
                    paddingLeft: '15px',
                  }}
                >
                  <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                    Cliente
                  </FormLabel>
                  <TextField
                    size="small"
                    variant="filled"
                    color="success"
                    value={filtro.cliente}
                    onChange={(e) =>
                      setFiltro({
                        ...filtro,
                        cliente: e.target.value,
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32%',
                    paddingLeft: '15px',
                  }}
                >
                  <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                    Número da nota
                  </FormLabel>
                  <TextField
                    size="small"
                    variant="filled"
                    color="success"
                    value={filtro.numeroNota}
                    onChange={(e) =>
                      setFiltro({
                        ...filtro,
                        numeroNota: e.target.value,
                      })
                    }
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '32%',
                    paddingLeft: '15px',
                  }}
                >
                  <FormLabel sx={{ textAlign: 'center', color: 'black' }}>
                    Chave Nota Fiscal
                  </FormLabel>
                  <TextField
                    size="small"
                    variant="filled"
                    color="success"
                    value={filtro.chaveNotaFiscal}
                    onChange={(e) =>
                      setFiltro({
                        ...filtro,
                        chaveNotaFiscal: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Box
            margin={1}
            paddingTop={3}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            pr={4}
            pl={4}
          >
            <TabelaAgendamentoCarga
              setShowSlide={setShowSlide}
              setSelectedObj={setSelectedObj}
              data={dataObj.dados}
              handleFetch={handleFetch}
              setFiltro={setFiltro}
            />
            <Stack
              spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Pagination
                count={dataObj.totalPaginas}
                page={filtro.numeroPagina}
                onChange={handlePageChange}
                showFirstButton
                showLastButton
                color="error"
              />
            </Stack>
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
          ></Box>
        </Box>
      </>
    </>
  );
}
