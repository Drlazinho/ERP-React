import { useEffect, useState, useMemo } from 'react';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useNavigate } from 'react-router';
import { useFetchParadaLinha } from './hooks/useFetchParadaLinha';
import { useFetchMotivoParada } from './hooks/useFetchMotivoParada';
import {
  Box,
  Button,
  Typography,
  FormLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  Tab,
  Tabs,
} from '@mui/material';
import GraficoParadaLinha from './components/GraficoParadaLinha';
import TabelaParadaLinha from './components/TabelaParadaLinha';
import { useDebounce } from '@/hooks/debounce.hook';
import ModalMotivo from './components/ModalMotivo';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EditNoteIcon from '@mui/icons-material/EditNote';

const ParadaLinha = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);
  const [pagina, setPagina] = useState(0);
  const [filtro, setFiltro] = useState({
    op: '',
    codigo_Prod: '',
    idMotParada: null,
    dtInicioParada: null,
    dtFinalParada: null,
    numeroDaPagina: 1,
    itensPorPagina: 10,
  });

  useEffect(() => {
    setPagina(filtro.numeroDaPagina - 1);
  }, [filtro.numeroDaPagina]);

  const handleChangePage = (_event, newPage) => {
    setPagina(newPage - 1);
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      numeroDaPagina: newPage,
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const routes = [
      '/producao/dashProducao',
      '/producao/paradaLinha',
      '/producao/producoes',
    ];
    navigate(routes[newValue]);
  };

  const handleClear = () => {
    setFiltro({
      op: '',
      codigo_Prod: '',
      idMotParada: null,
      dtInicioParada: null,
      dtFinalParada: null,
      numeroDaPagina: 1,
      itensPorPagina: 10,
    });
  };

  const debouncedOp = useDebounce(filtro.op);
  const debouncedCodProd = useDebounce(filtro.codigo_Prod);
  const debouncedMotivo = useDebounce(filtro.idMotParada);
  const debouncedDtInicio = useDebounce(filtro.dtInicioParada);
  const debouncedDtFinal = useDebounce(filtro.dtFinalParada);

  const filtroDebounced = useMemo(
    () => ({
      op: debouncedOp,
      codigo_Prod: debouncedCodProd,
      idMotParada: debouncedMotivo,
      dtInicioParada: debouncedDtInicio,
      dtFinalParada: debouncedDtFinal,
      numeroDaPagina: filtro.numeroDaPagina,
      itensPorPagina: filtro.itensPorPagina,
    }),
    [
      debouncedOp,
      debouncedCodProd,
      debouncedMotivo,
      debouncedDtInicio,
      debouncedDtFinal,
      filtro.numeroDaPagina,
      filtro.itensPorPagina,
    ]
  );

  const { data, loading, refetch } = useFetchParadaLinha(filtroDebounced);
  const motivoParada = useFetchMotivoParada() || [];

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            overflowX: 'auto',
            [theme.breakpoints.down(1150)]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          })}
        >
          <HeaderAmvox title="Parada de Linha" onBack={() => navigate(-1)} />
          <ModalMotivo />
        </Box>
        <Box
          sx={(theme) => ({
            display: 'flex',
            gap: 1,
            alignItems: 'center',
            width: '100%',
            justifyContent: 'flex-end',
          })}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              overflowX: 'auto',
              '& .MuiTab-root': {
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                minHeight: 'auto',
                padding: '8px 16px',
                fontSize: '0.875rem',
                textTransform: 'none',
                color: '#666',
                '&.Mui-selected': {
                  color: '#aa0000',
                  fontWeight: 'bold',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: '#aa0000',
              },
              '& .MuiTab-iconWrapper': {
                margin: 0,
                fontSize: '1.5rem',
                '&.Mui-selected': {
                  color: '#aa0000',
                },
              },
            }}
          >
            <Tab
              label="Dashboard Produção"
              icon={<PrecisionManufacturingIcon />}
            />
            <Tab label="Parada de Linha" icon={<PendingActionsIcon />} />
            <Tab label="Produções" icon={<EditNoteIcon />} />
          </Tabs>
        </Box>

        <Box
          sx={(theme) => ({
            mt: 1,
            display: 'flex',
            gap: 2,
            width: '100%',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'center',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '20%',
              gap: 2,
              [theme.breakpoints.down('md')]: {
                width: '100%',
              },
            })}
          >
            <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
              Tempo de parada
            </Typography>
            <Typography sx={{ fontWeight: '600', fontSize: '20px' }}>
              {data?.tempoDeParadaEmMinutos}
            </Typography>
            <Typography sx={{ fontWeight: '600', fontSize: '16px' }}>
              minutos
            </Typography>
          </Box>

          <Box
            sx={{
              background: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 2,
              border: '1px solid #ccc',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              width: '100%',
              gap: 2,
              overflow: 'auto',
            }}
          >
            <Typography sx={{ fontWeight: '500', fontSize: '16px' }}>
              Parada por motivo
            </Typography>
            <GraficoParadaLinha
              data={data?.paradasPorMotivo}
              loading={loading}
            />
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            background: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            padding: 2,
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
            gap: 2,
            mt: 2,
            [theme.breakpoints.down(950)]: {
              flexWrap: 'wrap',
            },
          })}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormLabel sx={{ fontWeight: '500', fontSize: '12px' }}>
              Data Inicial
            </FormLabel>
            <TextField
              size="small"
              type="date"
              value={filtro.dtInicioParada || ''}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  dtInicioParada: e.target.value,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormLabel sx={{ fontWeight: '500', fontSize: '12px' }}>
              Data Final
            </FormLabel>
            <TextField
              size="small"
              type="date"
              value={filtro.dtFinalParada || ''}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  dtFinalParada: e.target.value,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormLabel sx={{ fontWeight: '500', fontSize: '12px' }}>
              Motivo da Parada
            </FormLabel>
            <Select
              size="small"
              value={filtro.idMotParada}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  idMotParada: e.target.value,
                });
              }}
            >
              <MenuItem value={0}>Todos</MenuItem>
              {motivoParada &&
                motivoParada.map((item) => (
                  <MenuItem key={item.idMotParada} value={item.idMotParada}>
                    {item.motivo}
                  </MenuItem>
                ))}
            </Select>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormLabel sx={{ fontWeight: '500', fontSize: '12px' }}>
              OP
            </FormLabel>
            <TextField
              size="small"
              value={filtro.op}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  op: e.target.value,
                });
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <FormLabel sx={{ fontWeight: '500', fontSize: '12px' }}>
              Código produto
            </FormLabel>
            <TextField
              size="small"
              value={filtro.codigo_Prod}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  codigo_Prod: e.target.value,
                });
              }}
            />
          </Box>

          <Button
            variant="contained"
            color="inherit"
            onClick={handleClear}
            sx={{ mt: 2, width: '60%' }}
          >
            Limpar
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TabelaParadaLinha
            data={data?.paradas || []}
            loading={loading}
            update={refetch}
          />
          <Pagination
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
            page={pagina + 1}
            count={data?.totalDePaginas}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
};

export default ParadaLinha;
