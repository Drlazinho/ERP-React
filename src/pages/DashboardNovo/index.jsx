import React, { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useWindowDimensions from '../../hooks/viewportWindows';
import ReactCardFlip from 'react-card-flip';
import styles from './DashboardNovo.module.css';

import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import Amvoxlogopng from '../../assets/Amvoxlogopng.png';

import BarChartIcon from '@mui/icons-material/BarChart';
import {
  buscarfaturamentoAcumuladoProducao,
  buscarfaturamentoAcumuladoEntregues,
  buscarAcumuladoFaturamento,
  buscarStatusCards,
  buscarAcumuladoTitulosReceber,
  buscarAcumuladoTitulosPagar,
  buscarAcumuladoLogisticaContainer,
  buscarAcumuladoEstoque,
  buscarAcumuladoImportacao,
  buscarfaturamentoGraficoApiAnual,
  buscarAcumuladoChamados,
  buscarfaturamentoGraficoApiUltimos30,
} from './dashboardNovo.service';
import WalletBoxDash from '../../components/WalletBoxDash';
import GraficoLinhaFaturamento30Dias from './components/graficoLinhaFaturamento30Dias';
import GraficoLinhaFaturamentoAnual from './components/graficoLinhaFaturamentoAnual';
import GraficoLinhaFaturamento30DiasProd from './components/graficoLinhaFaturamento30DiasProd';
import GraficoLinhaFaturamentoAnualProd from './components/graficoLinhaFaturamentoAnualProd';
import LayoutNovo from '../../components/LayoutNovo';

import GraficoPizza from './components/GraficoPizza';
import HeaderDashboard from './components/HeaderDashboard';
import NotInfo from './components/NotInfo';

export default function DashboardNovo() {
  const [loaderAcumuladoCards, setLoaderAcumuladoCards] = useState(true);
  const [statusCards, setStatusCards] = useState([]);
  const [producao, setProducao] = useState([]);
  const [logisticaEntrega, setLogisticaEntrega] = useState([]);
  const [acumuladoFaturamento, setAcumuladoFaturamento] = useState([]);
  const [titulosReceber, setTitulosReceber] = useState([]);
  const [titulosPagar, setTitulosPagar] = useState([]);
  const [logisticaContainer, setLogisticaContainer] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [containerAguardando, setContainerAguardando] = useState([]);
  const [faturamentoValoresAnual, setFaturamentoValoresAnual] = useState([]);
  const [faturamentoValores30dias, setFaturamentoValores30dias] = useState([]);
  const [chamados, setChamados] = useState([]);

  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { width } = useWindowDimensions();
  const cotacaoDolar = 0;

  const handleFaturamentoAcumuladoProducao = async () => {
    await buscarfaturamentoAcumuladoProducao().then((res) => setProducao(res));
  };

  const handleFaturamentoAcumuladoEntregues = async () => {
    await buscarfaturamentoAcumuladoEntregues().then((res) =>
      setLogisticaEntrega(res)
    );
  };

  const handleFaturamentoAcumulado = async () => {
    await buscarAcumuladoFaturamento().then((res) =>
      setAcumuladoFaturamento(res)
    );
  };

  const handleStatusCards = async () => {
    await buscarStatusCards().then((res) => setStatusCards(res));
  };

  const handleTitulosReceber = async () => {
    await buscarAcumuladoTitulosReceber().then((res) => setTitulosReceber(res));
  };

  const handleTitulosPagar = async () => {
    await buscarAcumuladoTitulosPagar().then((res) => setTitulosPagar(res));
  };

  const handleLogisticaContainer = async () => {
    await buscarAcumuladoLogisticaContainer().then((res) =>
      setLogisticaContainer(res)
    );
  };

  const handleEstoque = async () => {
    await buscarAcumuladoEstoque().then((res) => setEstoque(res));
  };

  const handleContainerAguardando = async () => {
    await buscarAcumuladoImportacao().then((res) =>
      setContainerAguardando(res)
    );
  };

  const handleFaturamentoAcumuladoAnual = async () => {
    await buscarfaturamentoGraficoApiAnual().then((res) =>
      setFaturamentoValoresAnual(res)
    );
  };

  const handleChamados = async () => {
    await buscarAcumuladoChamados().then((res) => setChamados(res));
  };

  const handleFaturamentoAcumulado30dias = async () => {
    await buscarfaturamentoGraficoApiUltimos30().then((res) =>
      setFaturamentoValores30dias(res)
    );
  };

  useEffect(() => {
    handleFaturamentoAcumuladoProducao();
    handleFaturamentoAcumuladoEntregues();
    handleFaturamentoAcumulado();
    handleStatusCards();
    handleTitulosReceber();
    handleTitulosPagar();
    handleLogisticaContainer();
    handleEstoque();
    handleContainerAguardando();
    handleFaturamentoAcumuladoAnual();
    handleChamados();
    handleFaturamentoAcumulado30dias();
    setLoaderAcumuladoCards(false);
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (!isPaused) {
        setIsFlipped((prev) => !prev);
      }
    }, 30000);
    return () => clearInterval(intervalo);
  }, [isPaused]);

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const manualFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <>
      <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped}>
        {/* ANUAL */}
        <Box key="front">
          <HeaderDashboard
            logoSrc={Amvoxlogopng}
            title="Dashboard Anual"
            isPaused={isPaused}
            togglePause={togglePause}
            manualFlip={manualFlip}
            buttonLabel="Dashboard Mensal"
            colorA="#939393"
            colorB="#128262"
          />
          {/* grafico faturamento Anual */}
          <Box
            className="row mt-4"
            sx={{
              width: '100%',
              border: '1px solid #CCCCCC80',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: 1,
              marginLeft: '3px',
              marginBottom: '10px',
            }}
          >
            <Typography sx={{ marginLeft: '10px', fontWeight: 'bold' }}>
              <BarChartIcon /> Faturamento
            </Typography>
            <GraficoLinhaFaturamentoAnual
              apiFaturamentoAnual={faturamentoValoresAnual}
            />
          </Box>

          <Grid2 className={styles.container} spacing={2}>
            {/* Fat.Bruto anual */}
            <Grid2 className={styles.item1}>
              <WalletBoxDash
                title={'Faturamento Bruto'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(
                  acumuladoFaturamento?.acumuladoFaturamentoBruto?.ano
                )}
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                status={statusCards[0]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoBruto
                    ?.indicadoresComparativoMes
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoBruto
                    ?.porcentagemNegativa
                }
                showPercentMessage={false}
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Fat.liquido anual */}
            <Grid2 className={styles.item2}>
              <WalletBoxDash
                title={'Faturamento Líquido'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido?.ano
                )}
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                status={statusCards[1]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido
                    ?.indicadoresComparativoMes
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido
                    ?.porcentagemNegativa
                }
                showPercentMessage={false}
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos a receber anual */}
            <Grid2 className={styles.item3}>
              <WalletBoxDash
                title={'Títulos a Receber'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(titulosReceber?.avencerAno)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosReceber'}
                status={statusCards[2]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={titulosReceber?.indicadoresMesAvencer}
                porcentagemNegativa={
                  titulosReceber?.porcentagemNegativaMesAvencer
                }
                showPercentMessage={false}
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos a pagar anual */}
            <Grid2 className={styles.item4}>
              <WalletBoxDash
                title={'Títulos a Pagar'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(titulosPagar?.valorOriginalAno)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosPagar'}
                porcentagem={titulosPagar?.indicadoresMESValorOriginal}
                porcentagemNegativa={
                  titulosPagar?.porcentagemNegativaMESValorOriginal
                }
                showPercentMessage={false}
                status={statusCards[3]?.status}
                loader={loaderAcumuladoCards}
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos vencidos anual */}
            <Grid2 className={styles.item5}>
              <WalletBoxDash
                title={'Títulos Vencidos'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(titulosReceber?.vencidoAno)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosReceber'}
                porcentagem={titulosReceber?.indicadoresMesVencido}
                porcentagemNegativa={
                  titulosReceber?.porcentagemNegativaMesVencido
                }
                status={statusCards[4]?.status}
                loader={loaderAcumuladoCards}
                showPercentMessage={false}
              ></WalletBoxDash>
            </Grid2>

            {/*Produzido anual */}
            <Grid2 className={styles.item6}>
              <WalletBoxDash
                title={'Produzido'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(producao?.ano)}
                setorNome={'Produção'}
                setorTo={'/producao/producoes'}
                porcentagem={producao?.porcentagemIndicadores}
                porcentagemNegativa={producao?.porcentagemNegativa}
                status={statusCards[5]?.status}
                loader={loaderAcumuladoCards}
                showPercentMessage={false}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Produtos a entregar anual*/}
            <Grid2 className={styles.item7}>
              <WalletBoxDash
                title={'Produtos a entregar'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(logisticaEntrega?.anoEntregar)}
                setorNome={'Logística'}
                setorTo={'/transporte/entregas'}
                porcentagem={logisticaEntrega?.indicadorMesAentregar}
                porcentagemNegativa={logisticaEntrega?.porcentagemNegativa}
                status={statusCards[6]?.status}
                loader={loaderAcumuladoCards}
                showPercentMessage={false}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Produtos em estoque anual*/}
            <Grid2 className={styles.item8}>
              <NotInfo
                title="Produtos em Estoque"
                redirectTo="/estoque/estoqueDeProdutos"
                borderColor="#7086FD"
                color={'#333333'}
              />
            </Grid2>

            {/* Estoque anual */}
            <Grid2 className={styles.item9}>
              <WalletBoxDash
                title={'Valor em Estoque'}
                color={'#7086FD'}
                color1={'#333333'}
                valorMes={estoque?.valorEstoqueEmDolar}
                moedaValorMes="USD"
                icon={'dolar'}
                ValorAno={estoque?.valorEstoqueEmReal}
                setorNome={'Estoque'}
                setorTo={'/estoque/estoqueDeProdutos'}
                porcentagem={estoque?.indicadoresMesAnterior}
                porcentagemNegativa={estoque?.porcentagemNegativa}
                status={statusCards[8]?.status}
                loader={loaderAcumuladoCards}
                isNotShowMes
              ></WalletBoxDash>
            </Grid2>

            {/* Devoluções anual */}
            <Grid2 className={styles.item10}>
              <WalletBoxDash
                title={'Devoluções'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao?.ano
                }
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao
                    ?.indicadoresMesAnterior
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao
                    ?.porcentagemNegativa
                }
                status={statusCards[9]?.status}
                showPercentMessage={false}
                loader={loaderAcumuladoCards}
              ></WalletBoxDash>
            </Grid2>

            {/* Containers recebidos anual */}
            <Grid2 className={styles.item11}>
              <WalletBoxDash
                title={'Containers Recebidos'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(logisticaContainer?.ano)}
                setorNome={'Logística'}
                setorTo={'/transporte/recebimentoContainer'}
                porcentagem={logisticaContainer?.indicadoresMensalLogistica}
                porcentagemNegativa={logisticaContainer?.porcentagemNegativa}
                status={statusCards[10]?.status}
                loader={loaderAcumuladoCards}
                showPercentMessage={false}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Containers aguardando anual */}
            <Grid2 className={styles.item12}>
              <WalletBoxDash
                title={'Containers Aguardando'}
                color={'#7086FD'}
                color1={'#333333'}
                ValorAno={Number(containerAguardando?.anoAguardando)}
                setorNome={'Importação'}
                setorTo={'/importacao/entradaDeImportacao'}
                porcentagem={containerAguardando?.indicadorMesAguardando}
                status={statusCards[11]?.status}
                showPercentMessage={false}
                loader={loaderAcumuladoCards}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Grafico Pizza chamados anual */}
            <Grid2 className={styles.item13}>
              <GraficoPizza
                valor1={chamados?.acumuladoChamadosFechados?.fechadosAno}
                valor2={chamados?.acumuladoChamadosAbertos?.abertoNoAno}
                title="Chamados Ano:"
                label1="Fechados"
                label2="Abertos "
                color1="#2DBB76"
                color2="#B8B8B8"
                color3="#7086FD"
                redirectTo="/inteligencia/geral/chamadosNovo"
              />
            </Grid2>

            {/* Grafico Pizza chamados SLA anual */}
            <Grid2 className={styles.item14}>
              <GraficoPizza
                valor1={
                  chamados?.acumuladoChamadosSLA
                    ?.chamadosFechadosNoPrazoUltimosMeses
                }
                valor2={
                  chamados?.acumuladoChamadosSLA
                    ?.chamadosFechadosEmAtrasoUltimosMeses
                }
                title="SLA Chamados Fechados Ano:"
                label1="No Prazo"
                label2="Atrasado"
                color1="#4B8DF8"
                color2="#B8B8B8"
                color3="#7086FD"
                redirectTo="/inteligencia/geral/chamadosNovo"
              />
            </Grid2>

            {/* grafico Prods Anual */}
            <Box className={styles.item15}>
              <Box
                sx={{
                  border: '1px solid #CCCCCC80',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: ' 5px',
                }}
              >
                <GraficoLinhaFaturamentoAnualProd
                  apiFaturamentoAnual={producao}
                  apiFaturamentoAnualEntregue={logisticaEntrega}
                />
              </Box>
            </Box>
          </Grid2>
        </Box>
        {/* Fim do anual */}

        {/* MENSAL */}
        <Box key="back">
          <HeaderDashboard
            logoSrc={Amvoxlogopng}
            title="Dashboard Mensal"
            isPaused={isPaused}
            togglePause={togglePause}
            manualFlip={manualFlip}
            buttonLabel="Dashboard Anual"
            colorA="#939393"
          />
          {/* grafico faturamento mensal */}
          <Box
            className="row mt-4"
            sx={{
              width: '100%',
              border: '1px solid #CCCCCC80',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: 1,
              marginLeft: '3px',
              marginBottom: '10px',
            }}
          >
            <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }}>
              <BarChartIcon /> Faturamento
            </Typography>
            <GraficoLinhaFaturamento30Dias
              apiFaturamento30dias={faturamentoValores30dias}
            />
          </Box>

          <Grid2 className={styles.container}>
            {/* Fat Bruto mensal */}
            <Grid2 className={styles.item1}>
              <WalletBoxDash
                title={'Faturamento Bruto'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(
                  acumuladoFaturamento?.acumuladoFaturamentoBruto?.mes
                )}
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                status={statusCards[0]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoBruto
                    ?.indicadoresComparativoMes
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoBruto
                    ?.porcentagemNegativa
                }
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Fat.liquido mensal */}
            <Grid2 className={styles.item2}>
              <WalletBoxDash
                title={'Faturamento Líquido'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido?.mes
                )}
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                status={statusCards[1]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido
                    ?.indicadoresComparativoMes
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoLiquido
                    ?.porcentagemNegativa
                }
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos a receber mensal */}
            <Grid2 className={styles.item3}>
              <WalletBoxDash
                title={'Títulos a Receber'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(titulosReceber?.avencerMes)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosReceber'}
                status={statusCards[2]?.status}
                loader={loaderAcumuladoCards}
                porcentagem={titulosReceber?.indicadoresMesAvencer}
                porcentagemNegativa={
                  titulosReceber?.porcentagemNegativaMesAvencer
                }
                haveChart
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos a pagar mensal */}
            <Grid2 className={styles.item4}>
              <WalletBoxDash
                title={'Títulos a Pagar'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(titulosPagar?.valorOriginalMes)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosPagar'}
                porcentagem={titulosPagar?.indicadoresMESValorOriginal}
                porcentagemNegativa={
                  titulosPagar?.porcentagemNegativaMESValorOriginal
                }
                status={statusCards[3]?.status}
                loader={loaderAcumuladoCards}
              ></WalletBoxDash>
            </Grid2>

            {/* Titulos vencidos mensal */}
            <Grid2 className={styles.item5}>
              <WalletBoxDash
                title={'Títulos Vencidos'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(titulosReceber?.vencidoMes)}
                setorNome={'Financeiro'}
                setorTo={'/financeiro/titulosReceber'}
                porcentagem={titulosReceber?.indicadoresMesVencido}
                porcentagemNegativa={
                  titulosReceber?.porcentagemNegativaMesVencido
                }
                status={statusCards[4]?.status}
                loader={loaderAcumuladoCards}
              ></WalletBoxDash>
            </Grid2>

            {/* Produzido mensal */}
            <Grid2 className={styles.item6}>
              <WalletBoxDash
                title={'Produzido'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(producao?.mes)}
                setorNome={'Produção'}
                setorTo={'/producao/producoes'}
                porcentagem={producao?.porcentagemIndicadores}
                porcentagemNegativa={producao?.porcentagemNegativa}
                status={statusCards[5]?.status}
                loader={loaderAcumuladoCards}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Produtos a entregar mensal*/}
            <Grid2 className={styles.item7}>
              <WalletBoxDash
                title={'Produtos a entregar'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(logisticaEntrega?.mesEntregar)}
                setorNome={'Logística'}
                setorTo={'/transporte/entregas'}
                porcentagem={logisticaEntrega?.indicadorMesAentregar}
                porcentagemNegativa={logisticaEntrega?.porcentagemNegativa}
                status={statusCards[6]?.status}
                loader={loaderAcumuladoCards}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Produtos em estoque mensal*/}
            <Grid2 className={styles.item8}>
              <WalletBoxDash
                title={'Produtos em Estoque'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                ValorAno={Number(estoque?.quantidadeProdutosEstoqueMesAnterior)}
                valorMes={Number(estoque?.quantidadeProdutosEstoque)}
                setorNome={'Estoque'}
                setorTo={'/estoque/estoqueDeProdutos'}
                porcentagem={estoque?.indicadoresMesAnterior}
                porcentagemNegativa={estoque?.porcentagemNegativa}
                status={statusCards[7]?.status}
                loader={loaderAcumuladoCards}
                isNotMoney
                isEstoque
              ></WalletBoxDash>
            </Grid2>

            {/* Estoque mensal */}
            <Grid2 className={styles.item9}>
              <WalletBoxDash
                title={'Valor em Estoque'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={estoque?.valorEstoqueEmDolar}
                moedaValorMes="USD"
                icon={'dolar'}
                ValorAno={estoque?.valorEstoqueEmReal}
                setorNome={'Estoque'}
                setorTo={'/estoque/estoqueDeProdutos'}
                porcentagem={estoque?.indicadoresMesAnterior}
                porcentagemNegativa={estoque?.porcentagemNegativa}
                status={statusCards[8]?.status}
                loader={loaderAcumuladoCards}
                isNotShowMes
              ></WalletBoxDash>
            </Grid2>

            {/* Devoluções mensal */}
            <Grid2 className={styles.item10}>
              <WalletBoxDash
                title={'Devoluções'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao?.mes
                }
                setorNome={'Faturamento'}
                setorTo={'/fiscal/faturamento'}
                porcentagem={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao
                    ?.indicadoresMesAnterior
                }
                porcentagemNegativa={
                  acumuladoFaturamento?.acumuladoFaturamentoDevolucao
                    ?.porcentagemNegativa
                }
                status={statusCards[9]?.status}
                loader={loaderAcumuladoCards}
              ></WalletBoxDash>
            </Grid2>

            {/* Containers Recebidos mensal */}
            <Grid2 className={styles.item11}>
              <WalletBoxDash
                title={'Containers Recebidos'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(logisticaContainer?.mes)}
                setorNome={'Logística'}
                setorTo={'/transporte/recebimentoContainer'}
                porcentagem={logisticaContainer?.indicadoresMensalLogistica}
                porcentagemNegativa={logisticaContainer?.porcentagemNegativa}
                status={statusCards[10]?.status}
                loader={loaderAcumuladoCards}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Containers Entregues mensal */}
            <Grid2 className={styles.item12}>
              <WalletBoxDash
                title={'Containers Aguardando'}
                color={'#CCCCCC80'}
                color1={'#333333'}
                valorMes={Number(containerAguardando?.mesAguardando)}
                setorNome={'Importação'}
                setorTo={'/importacao/entradaDeImportacao'}
                porcentagem={containerAguardando?.indicadorMesAguardando}
                status={statusCards[11]?.status}
                loader={loaderAcumuladoCards}
                isNotMoney
              ></WalletBoxDash>
            </Grid2>

            {/* Grafico Pizza chamados anual */}
            <Grid2 className={styles.item13}>
              <GraficoPizza
                valor1={chamados?.acumuladoChamadosFechados?.fechadosMes}
                valor2={chamados?.acumuladoChamadosAbertos?.abertosNoMes}
                title="Chamados Mês:"
                label1="Fechados"
                label2="Abertos"
                color1="#2DBB76"
                color2="#B8B8B8"
                color3="#CCCCCC80"
                redirectTo="/inteligencia/geral/chamadosNovo"
              />
            </Grid2>

            {/* Grafico Pizza chamados SLA mensal */}
            <Grid2 className={styles.item14}>
              <GraficoPizza
                valor1={chamados?.acumuladoChamadosSLA?.chamadoEmAbertoNoPrazo}
                valor2={
                  chamados?.acumuladoChamadosSLA?.chamadosEmAbertoAtrasado
                }
                title="SLA Chamados Mês:"
                label1="No prazo "
                label2="Atrasados"
                color1="#4B8DF8"
                color2="#B8B8B8"
                color3="#CCCCCC80"
                redirectTo="/inteligencia/geral/chamadosNovo"
              />
            </Grid2>

            {/* grafico faturamento mensal */}
            <Box className={styles.item15}>
              <Box
                sx={{
                  border: '1px solid #CCCCCC80',
                  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: ' 5px',
                }}
              >
                <GraficoLinhaFaturamento30DiasProd
                  apiFaturamento30dias={producao}
                  apiFaturamentoEntrega30dias={logisticaEntrega}
                />
              </Box>
            </Box>
          </Grid2>
        </Box>
        {/* Fim do mensal */}
      </ReactCardFlip>
    </>
  );
}
