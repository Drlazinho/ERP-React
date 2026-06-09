import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Stack, CircularProgress, alpha, styled } from '@mui/material';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import SearchIcon from '@mui/icons-material/Search';
import GraficoFatLiquido from './Graficos/graficoFatLiquido';
import GraficoFatBruto from './Graficos/graficoFatBruto';
import GraficoTitulosAReceber from './Graficos/graficoTitulosAReceber';

export default function WalletBoxDash({
  title,
  valorMes,
  ValorAno,
  icon,
  color,
  color1,
  setorNome,
  setorTo,
  status,
  loader,
  haveChart,
  isNotMoney,
  dadosGraficoLiquido,
  dadosGraficoBruto,
  dadosGraficoTitulosAReceber,
  porcentagem,
  porcentagemNegativa,
  showPercentMessage = true,
  isNotShowMes,
  isEstoque,
  moedaValorMes = 'BRL',
  moedaValorAno = 'BRL',
}) {
  const IconWrapperStyle = styled('div')(({ theme }) => ({
    width: 24,
    height: 24,
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    color: theme.palette.success.main,
    backgroundColor: alpha(theme.palette.success.main, 0.16),
  }));

  const [showMaintenanceMessage, setShowMaintenanceMessage] = useState(false);

  useEffect(() => {
    if (status === 0) {
      const timer = setTimeout(() => {
        setShowMaintenanceMessage(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 1.5,
        borderRadius: 4,
        border: 1,
        borderColor: color,
        background: '#fff',
      }}
    >
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Link
          component="p"
          variant="body2"
          fontWeight={700}
          to={setorTo}
          style={{ color: color1, textDecoration: 'none', fontWeight: 'bold' }}
        >
          {title}
        </Link>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          justifyContent: 'center',
          flexWrap: 'wrap',
          mt: 2,
        }}
      >
        {status === 1 ? (
          loader ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {/* Valor do Mês */}
              {valorMes !== undefined && (
                <Typography
                  component="p"
                  variant="h6"
                  fontWeight={700}
                  style={{ color: color1 }}
                  align="center"
                >
                  {!isNotMoney && (moedaValorMes === 'USD' ? 'U$ ' : 'R$ ')}
                  <CountUp
                    end={valorMes}
                    separator="."
                    decimal=","
                    decimals={isNotMoney ? 0 : 2}
                  />
                  {!isNotShowMes && (
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ paddingLeft: '3px' }}
                      style={{ color: color1 }}
                    >
                      Mês
                    </Typography>
                  )}
                </Typography>
              )}

              {/* Valor do Ano */}
              {ValorAno !== undefined && (
                <Typography
                  component="p"
                  variant="h6"
                  fontWeight={700}
                  style={{ color: color1 }}
                  align="center"
                >
                  {!isNotMoney && (moedaValorAno === 'USD' ? 'U$ ' : 'R$ ')}
                  <CountUp
                    end={ValorAno}
                    separator="."
                    decimal=","
                    decimals={isNotMoney ? 0 : 2}
                  />
                  {!isNotShowMes && (
                    <Typography
                      variant="body2"
                      component="span"
                      sx={{ paddingLeft: '3px' }}
                      style={{ color: color1 }}
                    >
                      {isEstoque ? 'Mês anterior' : 'Ano'}
                    </Typography>
                  )}
                </Typography>
              )}

              {/* Gráficos */}
              {haveChart && (
                <Box sx={{ mt: 2 }}>
                  {dadosGraficoLiquido && (
                    <GraficoFatLiquido
                      dadosGrafico={dadosGraficoLiquido}
                      color={color}
                    />
                  )}
                  {dadosGraficoBruto && (
                    <GraficoFatBruto
                      dadosGrafico={dadosGraficoBruto}
                      color={color}
                    />
                  )}
                  {dadosGraficoTitulosAReceber && (
                    <GraficoTitulosAReceber
                      dadosGrafico={dadosGraficoTitulosAReceber}
                      color={color}
                    />
                  )}
                </Box>
              )}

              {/* Mensagem de porcentagem opcional */}
              {showPercentMessage && porcentagem !== undefined && (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={0.5}
                  mt={2}
                >
                  <IconWrapperStyle
                    sx={{
                      ...(porcentagemNegativa && {
                        color: 'red',
                        bgcolor: 'white',
                      }),
                    }}
                  >
                    {porcentagemNegativa ? (
                      <TrendingDownIcon color='error' fontSize="small" />
                    ) : (
                      <TrendingUpIcon fontSize="small" />
                    )}
                  </IconWrapperStyle>
                  <Typography variant="subtitle2" component="span">
                    {`${porcentagem}%`}
                  </Typography>
                  <Typography variant="body2" component="span">
                    &nbsp;do que no mês passado
                  </Typography>
                </Stack>
              )}
            </>
          )
        ) : showMaintenanceMessage ? (
          <>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <SearchIcon sx={{ fontSize: 48, color: '#808080', mb: 1 }} />
                <Typography variant="body2" color="textSecondary">
                  Este conteúdo está em manutenção. Estamos trabalhando para que
                  ele volte a estar disponível o mais breve possível.
                  Agradecemos sua compreensão!
                </Typography>
              </Box>
            </Box>
          </>
        ) : (
          <CircularProgress color="inherit" />
        )}
      </Box>
    </Paper>
  );
}