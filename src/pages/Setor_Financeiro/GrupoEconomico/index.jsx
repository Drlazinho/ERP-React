import React, { useCallback, useEffect, useState } from 'react';
import './styles.css';
import {
  Box,
  Button,
  Typography,
  TextField,
  FormLabel,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import { useToast } from '../../../hooks/toast.hook';
import GraficoBarTopUsers from './components/Charts/graficoBarTopUsers';
import HeaderAmvox from '@/components/HeaderAmvox';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {
  buscarRelatFaturamentoDash,
  buscarGrupoEconomico,
} from './grupoEconomico.service';
import { useDebounce } from '@/hooks/debounce.hook';

const meses = [
  { id: 1, nome: 'Jan' },
  { id: 2, nome: 'Fev' },
  { id: 3, nome: 'Mar' },
  { id: 4, nome: 'Abr' },
  { id: 5, nome: 'Mai' },
  { id: 6, nome: 'Jun' },
  { id: 7, nome: 'Jul' },
  { id: 8, nome: 'Ago' },
  { id: 9, nome: 'Set' },
  { id: 10, nome: 'Out' },
  { id: 11, nome: 'Nov' },
  { id: 12, nome: 'Dez' },
];

export default function GrupoEconomico() {
  const [graficoFatDash, setGraficoFatDash] = useState([]);
  const [removeLoader, setRemoveLoader] = useState(false);
  const [produtosInformacao, setProdutosInformacao] = useState({
    totalQuantidade: 0,
    totalReceitaLiquida: 0,
    totalReceitaBruta: 0,
    totalDevolucoes: 0,
    totalMediaSemIpi: 0,
    totalMediaComIpi: 0,
  });
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { addToast } = useToast();

  const anoVigente = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;

  const [filtro, setFiltro] = useState({
    ano: anoVigente,
    mes: [mesAtual],
    dataInicial: null,
    dataFinal: null,
    codigoCliente: null,
    nomeCliente: null,
  });

  const debouncedFiltro = useDebounce(filtro, 1000);

  const [clienteSelecionado, setClienteSelecionado] = useState({
    grupoCliente: '',
  });
  const [cnpjsCliente, setCnpjsCliente] = useState([]);

  const formatarNumero = (num) => String(num).padStart(2, '0');

  const handleClienteClick = (cliente) => {
    if (!cliente) return;
    setClienteSelecionado({
      grupoCliente: cliente,
    });
    handleBuscarGrugoEconomico(cliente);
  };

  const handleBuscarGrugoEconomico = useCallback(
    async (codigo) => {
      setLoading(true);
      try {
        const params = {
          grupoCliente: codigo,
        };
        const response = await buscarGrupoEconomico(params);
        setCnpjsCliente(response);
      } catch (error) {
        addToast({
          type: 'danger',
          title: 'Erro ao carregar os dados',
          description: 'Erro ao carregar os dados',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  useEffect(() => {
    const mesesValidos = filtro.mes?.filter(Boolean);

    if (!filtro.dataInicial && !filtro.dataFinal && !mesesValidos.length) {
      return setRemoveLoader(true);
    }

    setRemoveLoader(false);

    const params = {
      ano: filtro.ano,
      mes: mesesValidos.join(','),
      dataInicial: filtro.dataInicial,
      dataFinal: filtro.dataFinal,
      codigoCliente: filtro.codigoCliente,
      nomeCliente: filtro.nomeCliente,
    };

    buscarRelatFaturamentoDash(params)
      .then((res) => {
        setGraficoFatDash(res || []);
        setProdutosInformacao(res.produtosInformacao);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao carregar os dados',
        })
      )
      .finally(() => setRemoveLoader(true));
  }, [debouncedFiltro, addToast]);

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    const valorSemHifen = value ? value.replace(/-/g, '') : null;

    setFiltro((prev) => ({
      ...prev,
      [name]: valorSemHifen,
      mes: value ? [] : prev.mes,
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleLimparFiltros = () => {
    setFiltro({
      ano: anoVigente,
      mes: [mesAtual],
      dataInicial: null,
      dataFinal: null,
      codigoCliente: null,
      nomeCliente: null,
    });
    setGraficoFatDash([]);
    setProdutosInformacao({
      totalQuantidade: 0,
      totalReceitaLiquida: 0,
      totalReceitaBruta: 0,
      totalDevolucoes: 0,
      totalMediaSemIpi: 0,
      totalMediaComIpi: 0,
    });
    setRemoveLoader(false);
  };

  const toggleMesSelecionado = (mesId) => {
    setFiltro((prev) => {
      const novoMes = prev.mes.includes(mesId)
        ? prev.mes.filter((m) => m !== mesId)
        : [...prev.mes, mesId];
      return { ...prev, mes: novoMes };
    });
  };

  const digitarData = filtro.dataInicial || filtro.dataFinal;

  return (
    <Box className="Principal">
      <Box position="relative" sx={{ backgroundColor: '#FBFBFB' }} gap={2}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            mb: 2,
            ml: '40px',
            mt: '40px',
          }}
        >
          <HeaderAmvox title="Grupo Econômico" />
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: '40px',
            [theme.breakpoints.down(1250)]: {
              flexWrap: 'wrap',
              justifyContent: 'center',
            },
          })}
        >
          {['dataInicial', 'dataFinal'].map((campo) => (
            <Box
              key={campo}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <FormLabel>
                {campo === 'dataInicial' ? 'Data Início' : 'Data Final'}
              </FormLabel>
              <TextField
                type="date"
                name={campo}
                value={
                  filtro[campo]
                    ? `${String(filtro[campo]).slice(0, 4)}-${String(
                        filtro[campo]
                      ).slice(4, 6)}-${String(filtro[campo]).slice(6, 8)}`
                    : ''
                }
                onChange={handleDataChange}
                sx={{
                  backgroundColor: '#fff',
                  '& .MuiInputBase-root': {
                    height: '32px',
                    borderRadius: '4px',
                    '&:focus-within': {
                      border: '1px solid #CCC',
                    },
                  },
                }}
              />
            </Box>
          ))}

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <FormLabel>Cliente</FormLabel>
            <TextField
              name="nomeCliente"
              value={filtro.nomeCliente}
              onChange={(e) => {
                setFiltro((prev) => ({
                  ...prev,
                  nomeCliente: e.target.value,
                }));
              }}
              sx={{
                backgroundColor: '#fff',
                '& .MuiInputBase-root': {
                  height: '32px',
                  borderRadius: '4px',
                  '&:focus-within': {
                    border: '1px solid #CCC',
                  },
                },
              }}
            />
          </Box>

          <Select
            value={filtro.ano}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, ano: e.target.value }))
            }
            sx={{
              height: '32px',
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '8px',
              boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#FFF',
              minWidth: '100px',
              mt: '20px',
            }}
          >
            {[anoVigente - 1, anoVigente].map((ano) => (
              <MenuItem key={ano} value={ano}>
                {ano}
              </MenuItem>
            ))}
          </Select>

          <Box
            sx={{ display: 'flex', flexWrap: 'wrap', gap: '4px', mt: '20px' }}
          >
            {meses.map((item) => (
              <Button
                key={item.id}
                variant="contained"
                onClick={() => !digitarData && toggleMesSelecionado(item.id)}
                disabled={digitarData}
                sx={{
                  height: '32px',
                  textTransform: 'capitalize',
                  borderRadius: '8px',
                  border: '1px solid rgba(0, 0, 0, 0.10)',
                  backgroundColor: filtro.mes.includes(item.id)
                    ? '#a00'
                    : '#FFF',
                  color: filtro.mes.includes(item.id) ? '#FFF' : 'black',
                  '&:hover': {
                    backgroundColor: filtro.mes.includes(item.id)
                      ? '#d32f2f'
                      : 'lightGray',
                  },
                }}
              >
                {item.nome}
              </Button>
            ))}
          </Box>
          <Button
            startIcon={<CleaningServicesIcon />}
            onClick={handleLimparFiltros}
            sx={{
              color: '#6E6E6E',
              padding: '14px',
              borderRadius: '8px',
              border: '1px solid rgba(0, 0, 0, 0.10)',
              boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.25)',
              height: '32px',
              mt: '20px',
              textTransform: 'capitalize',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            {!isSmallScreen && 'Limpar '}
          </Button>
        </Box>

        {/* <Box
          className="cardReceita"
          sx={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '25px',
            width: '100%',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Total Receita Bruta
            </Typography>
            <Typography
              sx={{
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              R$ {graficoFatDash.valorBruto}
            </Typography>
          </Box>
          <Box
            sx={{
              border: '2px solid #EAEAEA',
              display: 'flex',
              height: '100%',
            }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: '20px',
                fontWeight: '500',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Total Receita Liquida
            </Typography>
            <Typography
              sx={{
                fontWeight: '600',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              R${' '}
              {produtosInformacao.totalReceitaLiquida.toLocaleString('pt-BR')}
            </Typography>
          </Box>
        </Box> */}

        <Box mt={3} sx={{ paddingX: '40px' }}>
          {graficoFatDash.length === 0 ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                gap: 2,
                mt: 2,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '517px',
                  borderRadius: '16px',
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
                  padding: '24px',
                  overflow: 'auto',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontFamily: 'Poppins, sans-serif' }}
                >
                  Top Clientes R$
                </Typography>
                <GraficoBarTopUsers
                  data={graficoFatDash?.clientes || []}
                  onClienteClick={handleClienteClick}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: '517px',
                  borderRadius: '16px',
                  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.25)',
                  padding: '24px',
                  overflow: 'auto',
                }}
              >
                {loading ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <CircularProgress size={100} />
                  </Box>
                ) : cnpjsCliente && cnpjsCliente.length > 0 ? (
                  <>
                    {cnpjsCliente.map((item, idx) => (
                      <Box key={idx} sx={{ mb: 1 }}>
                        <Typography variant="body1" fontWeight="bold">
                          {item.nomeClienteReduzido}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          CNPJ: {item.cnpj}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Ultima Compra: {formatDate(item.ultimaCompra)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Quantidade de Notas: {item.quantidadeNotas}
                        </Typography>
                      </Box>
                    ))}
                  </>
                ) : (
                  <Typography variant="body1">
                    Selecione um cliente à esquerda
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
