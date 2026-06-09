import {
  Box,
  Button,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { formatDateTime } from '@/utils/formatDateInput';
import { formatDateSendApi } from '@/utils/formatDateInput';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import xVermelho from '@/assets/xVermelho.png';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import './styles.css';
import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';
import { useNavigate } from 'react-router-dom';
import StatusCards from './Components/StatusCards';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { BuscarFactory } from '@/services/core/apiFabricaFactory.service';
import { useEffect, useMemo, useState } from 'react';
import {
  getCategoriasEmail,
  getChamadoSituacao,
} from '@/services/modalDetalhesService';
import TableChamados from './Components/TableChamados';
import { GetChamadosXFiltrado } from '@/services/chamados/chamados.service';
import { Email } from '@mui/icons-material';
import { set } from 'date-fns';
import { buscarUsuarioPorSetor } from '@/services/usuarios.service';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import Chamados from '../ChamadosAntigo/index';
import { GetApontamentoChamados } from '@/pages/Setor_Inteligencia/ApontamentosChamados/apontamentoChamados.service';
import ExcelIcon from '@/assets/excelimg.png';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useDebounce } from '@/hooks/debounce.hook';
const ExcelJS = require('exceljs');

const inputStyle = {
  borderRadius: '4px',
  border: '1px solid rgba(51, 51, 51, 0.30)',
  bgcolor: '#FFF',
  height: '38px',
  '& .MuiInputBase-root': {
    height: '100%',
  },
  '& .MuiInputBase-input': {
    height: '100%',
    padding: '8px',
  },
  slotProps: {
    input: {
      disableUnderline: true,
    },
  },
};

const formStyle = {
  fontSize: '13px',
  color: '#000',
};

const statusSelect = [
  { label: 'TODOS', value: '0' },
  { label: 'FECHADO', value: '1' },
  { label: 'ABERTO', value: '2' },
  { label: 'EM COTAÇÃO', value: '3' },
  { label: 'AGUARDANDO MATÉRIAL', value: '4' },
  { label: 'PAUSADO', value: '5' },
];

const atendimentoSelect = [
  { label: 'EM DIA', value: 'EM DIA' },
  { label: 'ATRASADO', value: 'ATRASADO' },
];

const urgenciaSelect = [
  { label: 'BAIXA', value: 'BAIXA' },
  { label: 'MÉDIA', value: 'MÉDIA' },
  { label: 'ALTA', value: 'ALTA' },
];

const InterfaceResponsavel = [
  {
    setor: '',
    nome: '',
    email: '',
  },
];

export default function ChamadosRemake() {
  const { email, setor } = useUsuarioLocal();
  const navigate = useNavigate();
  const [listasituacao, setListasituacao] = useState([]);
  const [listaStatus, setListaStatus] = useState([]);
  const [responsavel, setResponsavel] = useState(InterfaceResponsavel);
  const [cardData, setCardData] = useState({
    qtdAberto: 0,
    qtdEmdia: 0,
    qtdAtrasados: 0,
    qtdFechado: 0,
  });

  const [filtro, setFiltro] = useState({
    id: null,
    status: 2,
    EmailUsuario: email,
    titulo: '',
    categoria: 0,
    prioridade: '',
    setorSolicitante: 0,
    IdResponsavel: 0,
    atendimento: '',
    dataInicio: null,
    dataFinal: null,
    nomeDeUsuario: '',
    situacao: null,
  });

  const debounceUsuario = useDebounce(filtro.nomeDeUsuario);
  const debounceTitulo = useDebounce(filtro.titulo);
  const debounceAtendimento = useDebounce(filtro.atendimento);
  const debounceNumeroChamado = useDebounce(filtro.id);

  const filtroDebounce = useMemo(
    () => ({
      id: debounceNumeroChamado || null,
      status: filtro.status || 2,
      EmailUsuario: email,
      titulo: debounceTitulo || '',
      categoria: filtro.categoria || 0,
      prioridade: filtro.prioridade || '',
      setorSolicitante: filtro.setorSolicitante || 0,
      IdResponsavel: filtro.IdResponsavel || 0,
      atendimento: debounceAtendimento || '',
      dataInicio: filtro.dataInicio || null,
      dataFinal: filtro.dataFinal || null,
      nomeDeUsuario: debounceUsuario || '',
      situacao: filtro.situacao || null,
    }),
    [
      debounceNumeroChamado,
      filtro.status,
      email,
      debounceTitulo,
      filtro.categoria,
      filtro.prioridade,
      filtro.setorSolicitante,
      filtro.IdResponsavel,
      debounceAtendimento,
      filtro.dataInicio,
      filtro.dataFinal,
      debounceUsuario,
      filtro.situacao,
    ]
  );

  const [data, setData] = useState([]);

  const [setorName, setSetorName] = useState([]);

  const getResponsavel = () => {
    buscarUsuarioPorSetor(email).then((res) => {
      setResponsavel(res.usuarios);
    });
  };

  const handleGetChamado = async () => {
    try {
      const result = await GetApontamentoChamados(email);
      if (result?.value) {
        setCardData((prev) => ({
          ...prev,
          ...result.value,
        }));
      }
    } catch (error) {
      console.error('Erro ao buscar chamados:', error);
    }
  };

  const handleGetFiltros = async () => {
    try {
      const result = await getCategoriasEmail(email);
      setListaStatus(result);
    } catch (error) {
      console.error('Erro ao buscar filtros:', error);
    }
  };

  const handleGetSituacao = async () => {
    try {
      const result = await getChamadoSituacao();
      setListasituacao(result);
    } catch (error) {
      console.error('Erro ao buscar situações:', error);
    }
  };

  const handleGetData = async () => {
    try {
      const [chamadosResult, setoresResult] = await Promise.all([
        GetChamadosXFiltrado(filtroDebounce),
        BuscarFactory('/Setores'),
      ]);

      if (chamadosResult) setData(chamadosResult);
      if (setoresResult) setSetorName(setoresResult);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const listaStatusObj = listaStatus.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaSituacaoObj = listasituacao.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const listaSetorObj = setorName.map((item) => ({
    value: item.id,
    label: item.setor,
  }));

  const listaResponsavelObj = responsavel.map((item) => ({
    value: item.id,
    label: item.nome,
  }));

  const handleChangeDadosCategoria = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      categoria: value,
    }));
  };

  const handleChangeDadosStatus = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      status: value,
    }));
  };

  const handleChangeDadosAtendimento = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      atendimento: value,
    }));
  };

  const handleChangeDadosUrgencia = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      prioridade: value,
    }));
  };

  const handleChangeDadosSetorSolicitante = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      setorSolicitante: value,
    }));
  };

  const handleChangeDadosSituacao = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      situacao: value,
    }));
  };

  const handleChangeDadosResp = (value) => {
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      IdResponsavel: value,
    }));
  };

  useEffect(() => {
    if (email) {
      handleGetChamado();
      handleGetFiltros();
      handleGetSituacao();
      handleGetData();
      getResponsavel();

      const intervalId = setInterval(() => {
        handleGetData();
      }, 60000);

      return () => clearInterval(intervalId);
    }
  }, [email, filtroDebounce]);

  const setorEncontrado = setorName.find((item) => item.id === setor);
  const nomeSetor = setorEncontrado
    ? setorEncontrado.setor
    : 'Setor Desconhecido';

  const handleClear = () => {
    setFiltro({
      id: null,
      status: 2,
      EmailUsuario: email,
      titulo: '',
      categoria: 0,
      prioridade: '',
      setorSolicitante: 0,
      IdResponsavel: 0,
      dataInicio: null,
      dataFinal: null,
      nomeDeUsuario: '',
      situacao: null,
    });
  };

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Nº Chamado',
        key: 'id',
        width: 8,
      },
      {
        header: 'Título',
        key: 'titulo',
        width: 30,
      },
      {
        header: 'Status',
        key: 'status',
        width: 10,
      },
      {
        header: 'Dias',
        key: 'dias',
        width: 10,
      },
      {
        header: 'Categoria',
        key: 'categoria',
        width: 30,
      },
      {
        header: 'Última Atualização',
        key: 'atualizacao',
        width: 20,
      },
      {
        header: 'Data Abertura',
        key: 'abertura',
        width: 20,
      },
      {
        header: 'Nível de Urgência',
        key: 'urgencia',
        width: 10,
      },
      {
        header: 'Solicitante',
        key: 'solicitante',
        width: 20,
      },
      {
        header: 'Setor Solicitante',
        key: 'setorSolicitante',
        width: 15,
      },
      {
        header: 'Responsável',
        key: 'responsavel',
        width: 20,
      },

      {
        header: 'Setor Demandado',
        key: 'setorDemandado',
        width: 15,
      },
      {
        header: 'Situação',
        key: 'situacao',
        width: 20,
      },
      {
        header: 'Descrição',
        key: 'descricao',
        width: 50,
      },
    ];

    data.map((item) => {
      let mensagem = '';
      if (item.categoria === 'APOIO AO USUARIO' && item.dias > 1) {
        mensagem = 'ATRASADO';
      } else if (item.categoria === 'MANUTENÇÃO' && item.dias > 2) {
        mensagem = 'ATRASADO';
      } else if (item.categoria === 'INFRAESTRUTURA' && item.dias > 2) {
        mensagem = 'ATRASADO';
      } else if (item.categoria === 'COMPRAS' && item.dias > 20) {
        mensagem = 'ATRASADO';
      } else if (item.categoria === 'SISTEMAS' && item.dias > 5) {
        mensagem = 'ATRASADO';
      } else if (item.categoria === 'DESENVOLVIMENTO' && item.dias > 20) {
        mensagem = 'ATRASADO';
      } else {
        mensagem = 'EM DIA';
      }

      const diasExibidos = `${item.dias} - ${mensagem}`;

      sheet.addRow({
        id: item.id,
        titulo: item.titulo,
        status: item.status,
        dias: diasExibidos,
        categoria: item.categoria,
        atualizacao: formatDateTime(item.dataAtualizacao),
        abertura: formatDateTime(item.dataAbertura),
        urgencia: item.urgencia,
        solicitante: item.responsavelDemandante,
        setorSolicitante: item.setorDemandante,
        responsavel: item.responsavelDemandado,
        setorDemandado: item.setorDemandado,
        situacao: item.situacao,
        descricao: item.descricao,
        emailRespDemandante: item.emailRespDemandante,
        emailRespDemandado: item.emailRespDemandado,
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
      anchor.download = `Chamados - ${formatDateSendApi(new Date())}.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <Box className="Principal">
      <Box
        position="relative"
        sx={{ backgroundColor: '#f3f4f6', gap: 2 }}
        padding="0px 30px 20px 60px"
      >
        <HeaderAmvox
          title={`Chamados ${nomeSetor}`}
          onBack={() => {
            navigate(-1);
          }}
        />
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            flexDirection: { xs: 'column', md: 'row' },
            mb: '8px',
          }}
        >
          <StatusCards value={cardData.qtdAberto} text="Aberto" color="#000" />
          <StatusCards
            value={cardData.qtdEmdia}
            text="Aberto em dia"
            color="#2BA8EF"
          />
          <StatusCards
            value={cardData.qtdAtrasados}
            text="Aberto em atraso"
            color="#EA3336"
          />
          <StatusCards
            value={cardData.qtdFechado}
            text="Fechado"
            color="#10A957"
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: '8px',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%',
            mb: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Data Inicio</FormLabel>
            <TextField
              type="date"
              sx={inputStyle}
              value={filtro.dataInicio || ''}
              onChange={(e) =>
                setFiltro({ ...filtro, dataInicio: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Data Final</FormLabel>
            <TextField
              type="date"
              sx={inputStyle}
              value={filtro.dataFinal || ''}
              onChange={(e) =>
                setFiltro({ ...filtro, dataFinal: e.target.value })
              }
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <FormLabel sx={formStyle}>Nº Chamado</FormLabel>
            <TextField
              type="number"
              sx={inputStyle}
              value={filtro.id || ''}
              onChange={(e) => {
                const value = e.target.value;
                setFiltro({ ...filtro, id: value === '' ? null : value });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Título</FormLabel>
            <TextField
              sx={inputStyle}
              value={filtro.titulo}
              onChange={(e) => setFiltro({ ...filtro, titulo: e.target.value })}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Categoria</FormLabel>
            <Select
              variant="outlined"
              value={filtro.categoria || ''}
              onChange={(e) => handleChangeDadosCategoria(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione uma categoria
              </MenuItem>

              {listaStatusObj.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Status</FormLabel>
            <Select
              variant="outlined"
              value={filtro.status || ''}
              onChange={(e) => handleChangeDadosStatus(e.target.value)}
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              {statusSelect.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Atendiimento</FormLabel>
            <Select
              variant="outlined"
              value={filtro.atendimento || ''}
              onChange={(e) => handleChangeDadosAtendimento(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione um atendimento
              </MenuItem>
              {atendimentoSelect.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Prioridade</FormLabel>
            <Select
              variant="outlined"
              value={filtro.prioridade || ''}
              onChange={(e) => handleChangeDadosUrgencia(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione a prioridade
              </MenuItem>

              {urgenciaSelect.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Situção</FormLabel>
            <Select
              variant="outlined"
              value={filtro.situacao || ''}
              onChange={(e) => handleChangeDadosSituacao(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione a situação
              </MenuItem>

              {listaSituacaoObj.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Setor Solicitante</FormLabel>
            <Select
              variant="outlined"
              value={filtro.setorSolicitante || ''}
              onChange={(e) =>
                handleChangeDadosSetorSolicitante(e.target.value)
              }
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione o setor
              </MenuItem>

              {listaSetorObj
                .sort((a, b) => {
                  if (!a || !b || !a.label || !b.label) return 0;
                  return a.label.localeCompare(b.label);
                })
                .map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Responsável</FormLabel>
            <Select
              variant="outlined"
              value={filtro.IdResponsavel || ''}
              onChange={(e) => handleChangeDadosResp(e.target.value)}
              displayEmpty
              sx={{
                backgroundColor: '#fff',
                display: 'flex',
                width: '100%',
                height: '38px',
                border: '1px solid rgba(51, 51, 51, 0.30)',
                borderRadius: '4px',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'lightgray',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'gray',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'black',
                },
              }}
            >
              <MenuItem value="" disabled>
                Selecione o responsável
              </MenuItem>

              {listaResponsavelObj
                .sort((a, b) => {
                  if (!a || !b || !a.label || !b.label) return 0;
                  return a.label.localeCompare(b.label);
                })
                .map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel sx={formStyle}>Solicitante</FormLabel>
            <TextField
              sx={inputStyle}
              value={filtro.nomeDeUsuario || ''}
              onChange={(e) =>
                setFiltro({ ...filtro, nomeDeUsuario: e.target.value })
              }
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <IconButton onClick={handleClear}>
              <FilterAltOffIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'end' }}>
            <IconButton onClick={exportExcelFile}>
              <img src={ExcelIcon} alt="Excel logo"></img>
            </IconButton>
          </Box>
        </Box>
        <Box>
          <TableChamados dadosTabela={data} handleGetData={handleGetData} />
        </Box>
      </Box>
    </Box>
  );
}
