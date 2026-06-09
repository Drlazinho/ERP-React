import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import 'react-sliding-pane/dist/react-sliding-pane.css';
import SidebarNovo from '@/components/LayoutNovo/SidebarNovo';
import HeaderAmvox from '@/components/HeaderAmvox';
import './styles.css';
import CardApontamentoChamado from './CardApontamento';
import { GetApontamentoChamados } from '@/pages/Setor_Inteligencia/ApontamentosChamados/apontamentoChamados.service';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router';
import CardIndicatorRed from './CardIndicator';

export default function ApontamentoChamados() {
  const navigate = useNavigate();
  const email = 'tidesenvolvimento3@amvox.com.br';
  const [apontamentos, setApontamentos] = useState([]);

  const fetchApontamentos = async () => {
    try {
      GetApontamentoChamados(email).then((r) => {
        setApontamentos(r.value);
      });
    } catch (error) {
      console.error('Erro ao buscar apontamentos:', error);
    }
  };

  useEffect(() => {
    fetchApontamentos();
  }, []);

  return (
    <>
      <div className="principalApontamento">
        <Box
          position={'relative'}
          sx={{ backgroundColor: '#F2F2F2', width: '97%', margin: '0 auto' }}
          gap={1}
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
              title="Apontamentos de Chamados"
              onBack={() => navigate(-1)}
            />
          </Box>
          <Grid container sx={{ marginTop: '15px' }}>
            <Grid container sx={{ display: 'flex', width: 'auto' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '590px',
                  height: '223px',
                  borderRadius: '16px',
                  gap: '34px',
                  ml: '34px',
                  boxShadow: '0px 1px 5.8px 0px rgba(0, 0, 0, 0.25)',
                  color: 'white',
                }}
              >
                <Box>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdAberto}
                    titulo="Chamados abertos"
                  />
                </Box>
                <Box>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdEmdia}
                    titulo="Em dia"
                  />
                </Box>
              </Box>
            </Grid>

            <Grid container sx={{ display: 'flex', width: 'auto' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '590px',
                  height: '223px',
                  borderRadius: '16px',
                  gap: '34px',
                  ml: '20px',
                  mb: '30px',
                  boxShadow: '0px 1px 5.8px 0px rgba(0, 0, 0, 0.25)',
                  color: 'white',
                }}
              >
                <Box>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdTotal}
                    titulo="Chamados total"
                  />
                </Box>
                <Box>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdAtrasados}
                    titulo="Atrasados"
                  />
                </Box>
              </Box>
            </Grid>

            <Grid container xs={1} sx={{ display: 'flex', width: 'auto' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  width: '590px',
                  height: '223px',
                  borderRadius: '16px',
                  ml: '15px',
                  gap: '34px',
                  boxShadow: '0px 1px 5.8px 0px rgba(0, 0, 0, 0.25)',
                  color: 'white',
                }}
              >
                <Box sx={{ ml: '10px' }}>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdFechado}
                    titulo="Chamados fechados"
                  />
                </Box>
                <Box sx={{ mr: '10px' }}>
                  <CardIndicatorRed
                    numeroChamados={apontamentos.qtdNaoAtribuido}
                    titulo="Não atribuidos"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaCompras}
                titulo="Compras em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosqtdEmdiaCompras}
                titulo="Compras atrasados"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaManutencao}
                titulo="Manutenção em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosManutencao}
                titulo="Manutenção atrasados"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaApoioUser}
                titulo="Apoio ao usuário em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosApoioUser}
                titulo="Apoio ao usuário atrasados"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaInfra}
                titulo="Infraestrutura em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosInfra}
                titulo="Infraestrutura atrasados"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaSistemas}
                titulo="Sistemas em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosSistemas}
                titulo="Sistemas atrasados"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdEmdiaDesenvolvimento}
                titulo="Desenvolvimento em dia"
              />
            </Grid>
            <Grid item xs={3.5} md={1.97}>
              <CardApontamentoChamado
                numeroChamados={apontamentos.qtdAtrasadosDesenvolvimento}
                titulo="Desenvolvimento atrasados"
              />
            </Grid>
          </Grid>

          <Box
            margin={1}
            paddingTop={3}
            justifyContent={'center'}
            alignItems={'center'}
            gap={2}
            pr={4}
            pl={4}
          ></Box>
        </Box>
      </div>
    </>
  );
}
