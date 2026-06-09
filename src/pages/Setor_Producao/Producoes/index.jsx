import { useState, useEffect, useMemo, useCallback } from 'react';
import foto from '@/assets/produtos/sem-foto.png';
import {
  GetProducao,
  GetLinhasProducao,
  GetProducaoNumeroOp,
} from './producoes.service';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import moment from 'moment';
import Loader from '@/components/Loader';
import {
  Box,
  Chip,
  Divider,
  Grid2,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import HeaderAmvox from '@/components/HeaderAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from 'react-router';
import { ContainerSeletorUnidades } from '@/pages/Setor_Estoque/ChecagemDeNota/style';

export default function Producoes() {
  const [producaoLista, setProducaoLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dateDia] = useState(new Date());
  const [filtro, setFiltro] = useState({
    dataproducao: new Date().toLocaleDateString('en-CA'),
    linha: null,
  });
  const [producaoOp, setProducaoOp] = useState([]);
  const [esteiras, setEsteiras] = useState([]);
  const [esteiraSelecionada, setEsteiraSelecionada] = useState(null);
  const [value, setValue] = useState(2);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const routes = [
      '/producao/dashProducao',
      '/producao/paradaLinha',
      '/producao/producoes',
    ];
    navigate(routes[newValue]);
  };

  const totalProducao = useMemo(() => {
    let total = 0;
    let totalLinha = 0;
    let totalMes = 0;
    producaoLista.forEach((item) => (total += item.id !== 0));
    producaoLista.forEach((item) => (totalLinha += item.soma));
    producaoLista.forEach((item) => (totalMes = item.totalmes));

    return {
      producao: total,
      producaoLinha: totalLinha,
      producaoMes: totalMes,
    };
  }, [producaoLista]);

  const handleFetch = useCallback(() => {
    setLoading(true);
    GetProducao(filtro)
      .then((retorno) => {
        setProducaoLista(
          retorno.map((item) => {
            return {
              codigo: item.codigo,
              qrcode: item.qrCode,
              linha: item.linha,
              soma: item.soma,
              totalmes: item.totalMes,
              dataproducao: item.dataProducao,
              apelido: item.apelido,
              nomeLinha: item.nomeLinha,
              imagem: item.imagem || foto,
            };
          })
        );
      })
      .catch()
      .finally(() => setLoading(false));
  }, [filtro, dateDia]);

  const handleFetchProducaoOp = async () => {
    try {
      const response = await GetProducaoNumeroOp(filtro);
      setProducaoOp(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [filtro, dateDia]);

  useEffect(() => {
    handleFetchProducaoOp();
    GetLinhasProducao()
      .then((retorno) => {
        setEsteiras([
          { label: 'TODAS', value: null },
          ...retorno.map((item) => ({
            label: item.nomeGalpaoLinha,
            value: item.esteiraID,
          })),
        ]);
      })
      .catch();
  }, []);

  const handleSelectChange = (_, selectedOption) => {
    setEsteiraSelecionada(selectedOption);

    setFiltro((prev) => ({
      ...prev,
      linha: selectedOption?.value || null,
    }));
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro({
      dataproducao: new Date().toLocaleDateString('en-CA'),
      linha: null,
    });
    setEsteiraSelecionada(null);
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              alignItems: 'flex-start',
              overflowX: 'auto',
            },
          })}
        >
          <HeaderAmvox title="Produção/Linhas" />
          <Tabs
            value={value}
            onChange={handleChange}
            sx={{
              marginTop: '20px',
              marginBottom: '20px',
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

        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12 }} container>
            <Grid2 size={{ xs: 6, sm: 4 }}>
              <InfoCardAmvox
                type="quantity"
                title="Total Produzido"
                amount={Number(totalProducao.producaoLinha)}
              />
            </Grid2>
            <Grid2 size={{ xs: 6, sm: 4 }}>
              <InfoCardAmvox
                type="quantity"
                title="Linhas Utilizadas"
                amount={Number(totalProducao.producao)}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <InfoCardAmvox
                type="quantity"
                title="Acumulado Mes"
                amount={Number(totalProducao.producaoMes)}
              />
            </Grid2>
          </Grid2>
          <Grid2
            size={{ xs: 12 }}
            sx={{ mt: 1 }}
            component={'form'}
            container
            onSubmit={handleClear}
          >
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <InputDateAmvox
                label="Data"
                format="YYYY-MM-DD"
                value={filtro.dataproducao || ''}
                onChange={(date) =>
                  setFiltro((prev) => ({ ...prev, dataproducao: date }))
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
              <SelectAmvox
                options={esteiras}
                value={esteiraSelecionada}
                onChange={handleSelectChange}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <ButtonClear type="submit" />
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={{ xs: 12 }}>
            <Box
              sx={{
                height: 'calc(100vh - 320px)',
                width: '100%',
                overflow: 'auto',
                position: 'relative',
              }}
            >
              {loading ? (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                  }}
                >
                  <Loader />
                </Box>
              ) : producaoLista.length === 0 ? (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '20%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Typography variant="h6" color="error">
                    Nenhum dado encontrado
                  </Typography>
                </Box>
              ) : (
                producaoLista.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      bgcolor: 'background.paper',
                      color: 'text.primary',
                      borderRadius: 2,
                      boxShadow: 3,
                      p: 2,
                      mb: 2,
                      display: 'flex',
                      gap: 2,
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <Box
                      id="imagem"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                      }}
                    >
                      <img
                        src={item.imagem}
                        height={90}
                        width={90}
                        style={{ borderRadius: 8 }}
                      />
                    </Box>

                    <Box
                      id="informacoes"
                      sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box
                        id="titulo"
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="subtitle1">
                          Código:&nbsp;
                          <Chip
                            label={item.codigo}
                            color="info"
                            size="small"
                            sx={{ mr: 1 }}
                          />
                          {item.qrcode}
                        </Typography>
                        <Typography variant="subtitle2" color="success.main">
                          Data:&nbsp;
                          {moment(item.dataproducao).format('DD/MM/YYYY HH:mm')}
                        </Typography>
                      </Box>

                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body1">
                          Apelido:&nbsp;
                          <Chip
                            label={item.apelido}
                            color="success"
                            size="small"
                            sx={{ color: '#fff', mr: 1 }}
                          />
                        </Typography>
                        {(() => {
                          const opItem = producaoOp.find(
                            (op) => op.codigo === item.codigo
                          );
                          return opItem ? (
                            <Typography variant="body2" sx={{ mt: 0.5 }}>
                              OP:{' '}
                              <Chip
                                label={opItem.op}
                                size="small"
                                color="primary"
                              />
                            </Typography>
                          ) : null;
                        })()}
                      </Box>

                      <Divider sx={{ mt: 1, mb: 1 }} />

                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 1,
                        }}
                      >
                        <Chip
                          label={item.nomeLinha}
                          color="error"
                          size="small"
                          sx={{ color: '#fff' }}
                        />
                        <Typography variant="body2">
                          Quantidade:&nbsp;
                          <Chip
                            label={item.soma}
                            color="success"
                            size="small"
                            sx={{ color: '#fff' }}
                          />
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))
              )}
            </Box>
          </Grid2>
        </Grid2>
      </Box>
    </>
  );
}
