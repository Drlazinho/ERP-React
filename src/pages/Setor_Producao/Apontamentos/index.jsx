import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from '@/utils/debounce';
import Linhas from '@/repositories/linhas';
import { FiSquare } from 'react-icons/fi';
import { AiOutlineMinus } from 'react-icons/ai';
import useWindowDimensions from '@/hooks/viewportWindows';
import {
  buscarApontamentosPorFiltro,
  buscarTotalApontamentosPorFiltro,
  checarMediaHora,
} from '@/pages/Setor_Producao/Apontamentos/apontamentos.service';
import { formatDatetoHtmlDay } from '@/utils/formatDate';
import Alert from '@mui/material/Alert';
import { useToast } from '@/hooks/toast.hook';
import { MdNetworkCheck } from 'react-icons/md';
import ModalLoading from '@/components/ModalLoading';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import HistoryApontamentosGrid from './components/HistoryApontamentosGrid';
import { consultaProdutosImagem } from '@/services/produtos.service';
import foto from '@/assets/produtos/sem-foto.png';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import FactoryIcon from '@mui/icons-material/Factory';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import GraficoColunaMediaHora from './components/GraficicoColuna';
import CardV4 from './components/CardV4';
import { buscarLinhasProducao } from '@/services/producao/producao.service';
import linhas from '@/repositories/linhas';
import HeaderAmvox from '@/components/HeaderAmvox'
dayjs.locale('pt-br');

export default function Apontamentos() {
  const [apontamentoLista, setApontamentoLista] = useState([]);
  const [listaLinhas, setListaLinhas] = useState([]);
  const [apontamentoTotal, setApontamentoTotal] = useState([]);
  const [mediaHora, setMediaHora] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [removeLoading, setRemoveLoading] = useState(false);
  const [imagemProduto, setImagemProduto] = useState(foto);

  const [filtro, setFiltro] = useState({
    qrcode: null,
    qtd: null,
    dataProducao: formatDatetoHtmlDay(),
    linha: 0,
    dataFinal: formatDatetoHtmlDay(),
  });

  const { addToast } = useToast();

  const totalProducao = useMemo(() => {
    let totalLinha = 0;

    if (Array.isArray(apontamentoLista)) {
      apontamentoLista.forEach((item) => (totalLinha += item.id !== 0));
    }

    return {
      producaoLinha: totalLinha,
    };
  }, [apontamentoLista]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleFetch = useCallback(() => {
    setRemoveLoading(false);

    buscarApontamentosPorFiltro(filtro)
      .then((retorno) => {
        if (!retorno?.value?.apontamentos) {
          throw new Error(
            'Estrutura de retorno inválida - apontamentos não encontrados'
          );
        }

        const apontamentos = retorno.value.apontamentos || [];
        setApontamentoLista(apontamentos);

        if (
          retorno.value.totalDia !== undefined &&
          retorno.value.totalMes !== undefined
        ) {
          setApontamentoTotal({
            totalDia: retorno.value.totalDia,
            totalMes: retorno.value.totalMes,
          });
        }

        if (apontamentos.length > 0) {
          return Promise.all([
            consultaProdutosImagem({ apelido: apontamentos[0].apelido })
              .then((res) => {
                setImagemProduto(
                  res[0]?.imagem
                    ? `data:image/png;base64,${res[0].imagem}`
                    : foto
                );
              })
              .catch((err) => {
                console.error('Erro ao buscar imagem:', err);
                setImagemProduto(foto);
              }),

            checarMediaHora(apontamentos[0].codigo)
              .then((res) => {
                setMediaHora(res);
              })
              .catch((err) => {
                console.error('Erro ao buscar média hora:', err);
              }),
          ]);
        }
      })
      .catch((err) => {
        console.error('Erro em buscarApontamentosPorFiltro:', err);
        addToast({
          type: 'danger',
          title: 'Erro nas buscas de informações de apontamentos!',
          description: 'Avisar TI - Verificar o Sistema Network web',
        });
      })
      .finally(() => {
        setRemoveLoading(true);
      });

    buscarTotalApontamentosPorFiltro(filtro)
      .then((retorno) => {
        if (retorno) {
          setApontamentoTotal((prev) => ({
            ...prev,
            ...retorno,
          }));
        }
      })
      .catch((err) => {
        console.error('Erro em buscarTotalApontamentosPorFiltro:', err);
        addToast({
          type: 'danger',
          title: 'Erro ao listar Apontamentos!',
          description:
            'Erro ao listar os Apontamentos, por favor tente novamente dentre de instantes!',
        });
      });

    buscarLinhasProducao()
      .then((retorno) => {
        if (retorno?.value?.producao_esteira) {
          const linhasUnicas = retorno.value.producao_esteira.filter(
            (item, index, self) =>
              index ===
              self.findIndex((t) => t.nome_Esteira === item.nome_Esteira)
          );
          setListaLinhas(linhasUnicas);
        }
      })
      .catch((err) => {
        console.error('Erro em buscarLinhasProducao:', err);
        addToast({
          type: 'danger',
          title: 'Erro ao listar Linhas!',
          description:
            err.message || 'Erro desconhecido ao buscar linhas de produção',
        });
      });
  }, [filtro, addToast]);

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      qrcode: null,
      dataProducao: formatDatetoHtmlDay(),
      dataFinal: formatDatetoHtmlDay(),
      linha: 0,
      qtd: null,
    });
  };

  // Função para formatar a data no formato DD/MM/YYYY para exibição visual
  const formatDateForDisplay = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  const handleLinhaChange = (e) => {
    e.preventDefault();

    const novaLinha = Number(e.target.value);
    if (!isNaN(novaLinha)) {
      setFiltro((prevFiltro) => ({
        ...prevFiltro,
        linha: novaLinha,
      }));
    }
  };

  useEffect(() => {
    buscarLinhasProducao()
      .then((retorno) => {
        setListaLinhas(retorno.value.producao_esteira);
      })
      .catch((err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Linhas !',
          description: err.value,
        });
      });
  }, []);

  useEffect(() => {}, [apontamentoTotal]);

  return (
    <>
      <ModalLoading show={removeLoading} />
      <Box position={'relative'}>
        <HeaderAmvox
          title={'Apontamentos / Qrcodes '}
        />
        <Grid
          component={'form'}
          container
          columnSpacing={2}
          px={1}
          onSubmit={handleClear}
        >
          <Grid item xs={6} md={2}>
            <TextField
              label="Buscar Qrcode"
              size="small"
              variant="filled"
              fullWidth
              sx={{ bgcolor: '#fff', borderRadius: 2 }}
              onChange={(e) =>
                debounce(() => {
                  setFiltro({
                    ...filtro,
                    qrcode: e.target.value,
                  });
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* <Grid item xs={6} md={2.5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={
                  filtro.dataProducao
                    ? dayjs(filtro.dataProducao, 'YYYY-MM-DD').toDate()
                    : null
                }
                onChange={(date) =>
                  debounce(() => {
                    const formattedDate = date
                      ? dayjs(date).format('YYYY-MM-DD')
                      : null;
                    setFiltro({
                      ...filtro,
                      dataProducao: formattedDate,
                    });
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Data Inicial"
                    variant="filled"
                    size="small"
                    fullWidth
                    sx={{ bgcolor: '#fff', borderRadius: 2 }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid> */}
          <Grid item xs={6} md={2.5}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <DatePicker
                label="Data Final"
                value={filtro.dataFinal ? dayjs(filtro.dataFinal) : null}
                onChange={(newValue) => {
                  setFiltro({
                    ...filtro,
                    dataFinal: newValue ? newValue.format('YYYY-MM-DD') : null,
                  });
                }}
                slotProps={{
                  textField: {
                    variant: 'filled',
                    size: 'small',
                    fullWidth: true,
                    sx: { bgcolor: '#fff', borderRadius: 2 },
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={2.5}>
            <FormControl
              variant="filled"
              size="small"
              fullWidth
              sx={{ background: '#fff', borderRadius: 2 }}
            >
              <InputLabel id="demo-simple-select-label">Linha</InputLabel>
              <Select
                sx={{ borderRadius: 2 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="linha"
                value={filtro.linha}
                onChange={handleLinhaChange}
              >
                {listaLinhas.map((item) => (
                  <MenuItem key={item.nome_Esteira} value={item.numeroEsteira}>
                    {item.nome_Esteira}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={2.5}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<DeleteIcon />}
              type="submit"
              fullWidth
              size="medium"
            >
              Clear
            </Button>
          </Grid>
        </Grid>

        <Grid container columnSpacing={2} px={1} py={1} gap={0.5}>
          <Grid item sx={6} md={4} xs={12} sm={12}>
            <CardV4
              colorPrimary={'#008000'}
              data={Number(apontamentoTotal.totalDia)}
              icon={'engrenagens'}
              title={'Total Produzido'}
            />
          </Grid>
          <Grid item sx={6} md={4} xs={12} sm={12}>
            <CardV4
              colorPrimary={'#0000FF'}
              data={Number(totalProducao.producaoLinha)}
              icon={'braçoMecanico'}
              title={'Total por Linha'}
            />
          </Grid>
          <Grid item sx={12} md={3.9} sm={12} xs={12}>
            <CardV4
              colorPrimary={'#800000'}
              data={Number(apontamentoTotal.totalMes)}
              icon={'fabrica'}
              title={'Acumulado Mês'}
            />
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              component={'div'}
              sx={{ height: 600, width: '100%', overflow: 'scroll', mt: 2 }}
            >
              {Array.isArray(apontamentoLista)
                ? apontamentoLista.map((item, index) => (
                    <HistoryApontamentosGrid
                      key={index}
                      apelido={item.apelido}
                      codigo={item.codigo}
                      linha={item.linha}
                      dataProducao={item.dataProducao}
                      // qtd={item.qtd}
                      imagem={imagemProduto}
                    />
                  ))
                : []}
            </Box>
          </Grid>

          <Grid item md={8} xs={12} sm={12}>
            <Box mb={2} sx={{ mt: 2 }}>
              <GraficoColunaMediaHora
                apiApontamentosHora={mediaHora?.result}
                backcolor="#f76c1a"
                height={600}
              />
            </Box>
          </Grid>
        </Grid> */}
      </Box>
    </>
  );
}
