import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
} from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { CircularProgress } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import CountUp from 'react-countup';

import { ObterMeta } from './orcamentoSetores.service';
import { useToast } from '../../../hooks/toast.hook';

import Header from './components/Header';
import TableAcumulado from './components/TableAcumulado';

import ModalCadastrarSetor from './components/ModalCadastrarSetor';
import ModalCadastraMeta from './components/ModalCadastraMeta';
import ModalAtualizarMeta from './components/ModalAtualizarMeta';
import WalletBoxPorcetagem from '@/components/WalletBoxPorcentagem';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { userMaster } from './userMaster';

const OrcamentosSetores = () => {
  const { setor, nivel, nome, id: idUser } = useUsuarioLocal();

  const anoVigente = new Date().getFullYear();
  const mesAtual = new Date().getMonth() + 1;
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    ano: anoVigente,
  });
  const [dataMeta, setDataMeta] = useState([]);
  const { addToast } = useToast();
  const [modal1Aberto, setModal1Aberto] = useState(false);
  const [modal2Aberto, setModal2Aberto] = useState(false);

  const handleLimparFiltros = () => {
    setFiltro({
      ano: anoVigente,
    });
  };

  const atualizarTabela = () => {
    handleGetDados();
  };

  const handleGetDados = async () => {
    setLoading(true);

    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
    try {
      if (userMaster.some((user) => user.id === idUser)) {
        const response = await ObterMeta(filtro);
        setDataMeta(response);
      } else {
        addToast({
          type: 'danger',
          title: 'OS DADOS NÃO CARREGAM POIS SEU USUARIO NÃO TEM PERMISSÃO',
        });
      }
    } catch (error) {
      let errorMessage = 'Erro ao editar meta';

      if (error.response && error.response.data) {
        if (typeof error.response.data === 'object') {
          errorMessage =
            JSON.stringify(error.response.data) ||
            error.message ||
            error.response.data.title;
        } else {
          errorMessage = error.response.data;
        }
      }

      addToast({
        type: 'danger',
        title: 'Erro',
        description: errorMessage,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    handleGetDados();
  }, [filtro, setDataMeta]);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          padding: '0 20px',
          marginBottom: '200px',
        }}
      >
        <Header title="Orçamentos Setores" />

        <Box
          sx={(theme) => ({
            display: 'flex',
            width: '100%',
            padding: '16px',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            gap: '16px',
            marginBottom: '2rem',
            borderRadius: '8px',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            [theme.breakpoints.down(1355)]: {
              flexWrap: 'wrap',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              gap: '24px',
              alignItems: 'center',
              [theme.breakpoints.down(600)]: {
                flexWrap: 'wrap',
              },
            })}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '300px',
              }}
            >
              <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
                Orçamento Anual:
              </Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
                R${' '}
                <CountUp
                  end={dataMeta.metaFaturamento}
                  separator="."
                  decimal=","
                  decimals={2}
                  style={{ fontSize: '30px', fontWeight: '500' }}
                />
              </Typography>
            </Box>

            {dataMeta.metaFaturamento > 0 && (
              <ModalAtualizarMeta
                idMeta={dataMeta.idMeta}
                faturamento={dataMeta.metaFaturamento}
                anoMeta={dataMeta.ano || filtro.ano}
                onUpdate={atualizarTabela}
              />
            )}
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'row',
              gap: '30px',
              width: '100%',
              justifyContent: 'flex-end',
              alignItems: 'center',
              [theme.breakpoints.down(1355)]: {
                justifyContent: 'flex-start',
              },
              [theme.breakpoints.down(675)]: {
                flexWrap: 'wrap',
              },
            })}
          >
            {/* Box para o Ano */}

            <Select
              value={filtro.ano}
              onChange={(e) =>
                setFiltro((prevFiltro) => ({
                  ...prevFiltro,
                  ano: e.target.value,
                }))
              }
              sx={{
                fontFamily: 'Poppins, sans-serif',
                borderRadius: '8px',
                boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
                backgroundColor: '#FFF',
                height: '38px',
              }}
            >
              {[...Array(11)].map((_, index) => {
                const ano = new Date().getFullYear() - 5 + index;
                return (
                  <MenuItem key={ano} value={ano}>
                    {ano}
                  </MenuItem>
                );
              })}
            </Select>

            <ModalCadastraMeta
              anoMeta={dataMeta.ano || filtro.ano}
              onUpdate={atualizarTabela}
            />
            {dataMeta.metaFaturamento > 0 && (
              <ModalCadastrarSetor
                idMeta={dataMeta.idMeta}
                onUpdate={atualizarTabela}
              />
            )}
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
            width: '100%',
            justifyContent: 'space-between',
            [theme.breakpoints.down(1175)]: {
              flexWrap: 'wrap',
            },
          })}
        >
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '16px',
              height: '200px',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Orçado Acumulado
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={dataMeta.orcadoAcumulado}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Até o mês atual
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '16px',
              height: '200px',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Realizado Acumulado
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={dataMeta.realizadoAcumulado}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label={
                  dataMeta.porcentagemRealizadoAcumulado
                    ? `${dataMeta.porcentagemRealizadoAcumulado.toFixed(2)}%`
                    : '0%'
                }
                size="small"
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border:
                    dataMeta.porcentagemRealizadoAcumulado > 100
                      ? '1px solid #FF0000'
                      : '1px solid #0288D1',
                  borderRadius: '8px',
                  boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                  backgroundColor: '#fff',
                  color:
                    dataMeta.porcentagemRealizadoAcumulado > 100
                      ? '#FF0000'
                      : '#0288D1',
                }}
              />
            </Stack>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Até o mês atual
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '16px',
              height: '200px',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Orçado Anual
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={dataMeta.orcamentoAnual}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Orçado para o ano
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '16px',
              height: '200px',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Realizado Anual
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={dataMeta.realizadoAnual}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
            </Typography>
            <Stack direction="row" spacing={2}>
              <Chip
                label={
                  dataMeta.porcentagemRealizadoAnual
                    ? `${dataMeta.porcentagemRealizadoAnual.toFixed(2)}%`
                    : '0%'
                }
                size="small"
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  border:
                    dataMeta.porcentagemRealizadoAnual > 100
                      ? '1px solid #FF0000'
                      : '1px solid #0288D1',
                  borderRadius: '8px',
                  boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                  backgroundColor: '#fff',
                  color:
                    dataMeta.porcentagemRealizadoAnual > 100
                      ? '#FF0000'
                      : '#0288D1',
                }}
              />
            </Stack>
            <Typography sx={{ fontSize: '16px', fontWeight: '500' }}>
              Realizado para o ano
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            width: '100%',
            marginTop: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <TableAcumulado
              data={dataMeta?.centrosCusto ?? []}
              ano={dataMeta.ano}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrcamentosSetores;
