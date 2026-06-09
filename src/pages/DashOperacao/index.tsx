import DateSelectAmvox from '@/components/DateSelectAmvox';
import HeaderAmvox from '@/components/HeaderAmvox';
import { Box, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import Grid from '@mui/material/Grid2';
import GraficoCsat from './components/GraficoCsat';
import CircularProgressWithColorX from '@/components/CircularProgressWithColorX';
import { ChangeEvent, useCallback, useState } from 'react';
import TabelaIndicadoresNPS from './components/TabelaIndicadoresNPS';
import Loading from '@/components/Loading';
import GraficoTaxaOcupacao from './components/GraficoTaxaOcupacao';
import TabelaTaxaDeOcupacao from './components/TabelaTaxaDeOcupacao';
import GraficoInvetarioGeral from './components/GraficoInventarioGeral';
import GraficoInventarioArmazem from './components/GraficoInventarioArmazem';
import { Block } from '@mui/icons-material';
import { useFetchOpPosVenda } from './hooks/useFetchOpPosVenda';
import { useFetchOpEstTxOcupacao } from './hooks/useFetchOpEstTxOcupacao';
import { useFetchOpEstInvArmazem } from './hooks/useFetchOpEstInvArmazem';
import { useFetchOpEstInvGeral } from './hooks/useFetchOpEstInvGeral';
import { useFetchOpProduzidos } from './hooks/useFetchOpProduzidos';
import { useFetchOpOTIF } from './hooks/useFetchOpOTIF';
import { useFetchOpDevolucao } from './hooks/useFetchOpDevolucao';
import { useFetchOPFrete } from './hooks/useFetchOPFrete';
import GraficoProduzidos from './components/GraficoProduzidos';
import GraficoUltimosMesesEficiencia from './components/GraficoUltimosMesesEficiencia';
import GraficoUltimosMesesQuantidade from './components/GraficoUltimosMesesQuantidade';
import GraficoUltimosMesesOTIF from './components/GraficoUltimosMesesOTIF';
import GraficoUltimosMesesFrete from './components/GraficoUltimosMesesFrete';
import GraficoUltimosMesesDevolucao from './components/GraficoUltimosMesesDevolucao';
import CountUp from 'react-countup';

export default function DashOperacao() {
  const [filtro, setFiltro] = useState({
    mesIndicador: new Date().getMonth() + 1,
    anoIndicador: new Date().getFullYear(),
  });

  const {
    data,
    isLoading: isLoadingPv,
    errorState,
  } = useFetchOpPosVenda(filtro);
  const { ocupacaoData } = useFetchOpEstTxOcupacao();
  const { invEstoqueData, isLoadingEst } = useFetchOpEstInvArmazem(filtro);
  const { invEstoqueGeralData } = useFetchOpEstInvGeral(filtro);
  const { isLoadingProduzidos, produzidosData } = useFetchOpProduzidos(filtro);
  const { otif } = useFetchOpOTIF(filtro);
  const { devolucao } = useFetchOpDevolucao(filtro);
  const { frete, isLoadingTransporte } = useFetchOPFrete(filtro);
  const navigate = useNavigate();

  const handleChangeMes = useCallback((value: number) => {
    setFiltro((prev) => ({ ...prev, mesIndicador: value }));
  }, []);

  const handleYearChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFiltro((prev) => ({ ...prev, anoIndicador: Number(e.target.value) }));
  }, []);

  const ConverterStringParaFloat = (value: string = '') => {
    const valueFormated = value.replace(',', '.');
    return parseFloat(valueFormated);
  };

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            '@media (max-width: 1300px)': {
              flexDirection: 'column',
              gap: 2,
            },
          }}
        >
          <HeaderAmvox
            title="Dashboard da Operação"
            onBack={() => navigate(-1)}
          />
          <DateSelectAmvox
            handleSelectedMes={handleChangeMes}
            selectedMes={filtro.mesIndicador}
            selectedYear={filtro.anoIndicador}
            handleYearChange={handleYearChange}
          />
        </Box>

        <Grid
          container
          spacing={2}
          justifyContent={'center'}
          sx={(theme) => ({
            marginTop: 2,
            width: '100%',
            flexWrap: 'nowrap',

            [theme.breakpoints.down(1300)]: {
              flexWrap: 'wrap',
            },
          })}
        >
          {/*Produção  */}
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#ffff',
            }}
          >
            {isLoadingProduzidos ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: 'bold' }}
                >
                  Produção
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  sx={{ fontWeight: 600, mb: 4 }}
                >
                  Produzidos
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    bgcolor: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GraficoProduzidos data={produzidosData} />
                </Box>

                <Box
                  sx={{
                    width: '100%',
                    bgcolor: '#F9FAFB',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    marginTop: '30px',
                  }}
                >
                  <Box>
                    <Typography sx={{ mb: 1, fontSize: 12 }}>
                      Eficiência
                    </Typography>
                    <CircularProgressWithColorX
                      cor={'#02C875'}
                      value={produzidosData.eficienciaMedia || 0}
                      size={60}
                      isPercentage
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 1, fontSize: 12 }}>
                      Qualidade
                    </Typography>
                    <CircularProgressWithColorX
                      cor={'#02C875'}
                      value={produzidosData.qualidadeMedia || 0}
                      size={60}
                      isPercentage
                    />
                  </Box>
                  <Box>
                    <Typography sx={{ mb: 1, fontSize: 12 }}>
                      Disponibilidade
                    </Typography>
                    <CircularProgressWithColorX
                      cor={'#02C875'}
                      value={produzidosData.disponibilidadeMedia || 0}
                      size={60}
                      isPercentage
                    />
                  </Box>
                </Box>

                <Box sx={{ mt: '30px' }}>
                  <Typography sx={{ fontWeight: 'bold', fontSize: 30 }}>
                    {produzidosData.oeeMedia
                      ? `${produzidosData.oeeMedia}%`
                      : '0%'}
                  </Typography>
                  <Typography>OEE</Typography>
                </Box>

                <Box sx={{ mt: '30px' }}>
                  <GraficoUltimosMesesEficiencia
                    data={produzidosData.eficienciaUltimosTresMeses}
                  />
                </Box>

                <Box sx={{ mt: '20px' }}>
                  <GraficoUltimosMesesQuantidade
                    data={produzidosData.quantidadeProduzidaUltimosTresMeses}
                  />
                </Box>
              </Box>
            )}
          </Grid>

          {/* Estoque */}
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#ffff',
            }}
          >
            {isLoadingEst ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: 'bold' }}
                >
                  Estoque
                </Typography>
                <Typography
                  variant="body1"
                  align="left"
                  sx={{ fontWeight: 600 }}
                >
                  Taxa de Ocupação
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    bgcolor: '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <GraficoTaxaOcupacao
                    valor1={ocupacaoData.estoqueTaxaDisponivel}
                    valor2={ocupacaoData.estoqueTaxaOcupado}
                    label1="Disponível"
                    label2="Ocupado"
                    color1="#02C875"
                    color2="#FF5555"
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 2,
                  }}
                >
                  <TabelaTaxaDeOcupacao data={ocupacaoData} />
                </Box>
                <Divider />
                <Typography
                  variant="body1"
                  align="left"
                  sx={{ fontWeight: 600 }}
                >
                  Inventário
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 2,
                  }}
                >
                  <GraficoInventarioArmazem data={invEstoqueData?.resultados} />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 1,
                  }}
                >
                  <GraficoInvetarioGeral
                    data={invEstoqueGeralData}
                    year={filtro.anoIndicador}
                  />
                </Box>
              </Box>
            )}
          </Grid>

          {/* Transporte */}
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#ffff',
            }}
          >
            {isLoadingTransporte ? (
              <Loading />
            ) : (
              <>
                <Box
                  sx={{
                    padding: 2,
                    borderRadius: 2,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    align="left"
                    sx={{ fontWeight: 'bold' }}
                  >
                    Transporte
                  </Typography>
                  <Typography
                    variant="body1"
                    align="left"
                    sx={{ fontWeight: 600, mb: 4 }}
                  >
                    Valor faturado: R${' '}
                    <CountUp
                      end={frete?.valorFaturado || 0}
                      separator="."
                      decimal=","
                      decimals={2}
                      style={{ fontSize: '20px', fontWeight: '500' }}
                    />
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      background: '#F9FAFB',
                      gap: '8px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>
                        OTIF
                      </Typography>
                      <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {otif.otif ? `${otif.otif.toFixed(2)}%` : '0%'}
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>Meta:</Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        =&gt;
                        {otif.otifMeta ? `${otif.otifMeta.toFixed(2)}%` : '0%'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>
                        Frete
                      </Typography>
                      <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {frete ? `${frete.frete?.toFixed(2)}%` : '0%'}
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>Meta:</Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        =&gt;
                        {frete?.freteMeta
                          ? `${frete.freteMeta.toFixed(2)}%`
                          : '0%'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: '20px', fontWeight: '400' }}>
                        Devolução
                      </Typography>
                      <Typography sx={{ fontSize: '24px', fontWeight: 'bold' }}>
                        {devolucao.devolucao
                          ? `${devolucao.devolucao.toFixed(2)}%`
                          : '0%'}
                      </Typography>
                      <Typography sx={{ fontSize: '14px' }}>Meta:</Typography>
                      <Typography sx={{ fontSize: '14px' }}>
                        =&gt;
                        {devolucao.devolucaoMeta
                          ? `${devolucao.devolucaoMeta.toFixed(2)}%`
                          : '0%'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 6,
                    gap: 8,
                  }}
                >
                  <GraficoUltimosMesesOTIF
                    data={(otif && otif?.otifUltimosTresMeses) || []}
                  />
                  <GraficoUltimosMesesFrete
                    data={(frete && frete?.freteUltimosTresMeses) || []}
                  />
                  <GraficoUltimosMesesDevolucao
                    data={
                      (devolucao && devolucao?.devolucaoUltimosTresMeses) || []
                    }
                  />
                </Box>
              </>
            )}
          </Grid>

          {/* Pós Venda */}
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            sx={{
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: '#ffff',
              minHeight: 800,
            }}
          >
            {errorState.error400 && (
              <Box
                sx={{
                  bgcolor: 'inherit',
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography>
                  <Block htmlColor="#F00" />
                  Sem informações registradas
                </Typography>
              </Box>
            )}
            {isLoadingPv ? (
              <Loading />
            ) : (
              <Box
                sx={{
                  padding: 2,
                  borderRadius: 2,
                  textAlign: 'center',
                  display: errorState.error400 ? 'none' : 'flex',
                  flexDirection: 'column',
                  gap: 1.5,
                }}
              >
                <Typography
                  variant="h6"
                  align="left"
                  sx={{ fontWeight: 'bold' }}
                >
                  Pós Venda
                </Typography>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 2,
                  }}
                >
                  <Typography variant="body2" align="left">
                    Satisfação Geral
                  </Typography>
                  <GraficoCsat value={data.satisfacaoGeral} />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 2,
                  }}
                >
                  <Typography variant="body2" align="left" sx={{ mb: 2 }}>
                    Net Promoter Score (NPS)
                  </Typography>
                  <CircularProgressWithColorX
                    cor={'#02C875'}
                    value={ConverterStringParaFloat(data.nps)}
                    size={150}
                  />
                </Box>
                <Box
                  sx={{
                    backgroundColor: '#F9FAFB',
                    padding: 1,
                  }}
                >
                  <TabelaIndicadoresNPS dataFetch={data} />
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
