import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router';
import { useState } from 'react';
import Header from './components/Header';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { CircularProgress } from '@mui/material';
import { useToast } from '../../../hooks/toast.hook';
import CountUp from 'react-countup';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { ObterCentroCusto, ObterContaDetalhe } from './orcamentoSetor.service';
import { useQuery } from '@tanstack/react-query';
import ModalCadastrarSubcontas from './components/ModalCadastrarSubcontas';
import ModalcadastrarConta from './components/ModalCadastrarConta';
import ModalcadastrarSubcontasMeses from './components/ModalCadastrarSubcontasMensal';
import WalletBoxPorcetagem from '@/components/WalletBoxPorcentagem';
import TableVisaoMensal from './components/TabelaVisaoMensal';
import TabelaContasSubcontas from './components/TabelaContasSubcontas';

const OrcamentoSetor = () => {
  const [closeTabela, setCloseTabela] = useState(true);

  const { addToast } = useToast();
  const { id, ano } = useParams();

  const navigate = useNavigate();
  const handlevoltar = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!id) {
      navigate('/financeiro/orcamentosSetores');
    }
  });

  const {
    data: OrcamentoContas = [],
    isLoading: isLoadingContas,
    error: errorContas,
    refetch,
  } = useQuery({
    queryKey: ['orcamentos-setor', id],
    queryFn: () => ObterCentroCusto(id),
    staleTime: 12 * 60 * 60 * 1000,
    enabled: !!id,
  });

  return (
    <>
      <Box sx={{ position: 'relative', padding: '0 20px' }}>
        <Header title="Orçamento" />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            {OrcamentoContas.nome && (
              <Typography
                sx={{
                  fontWeight: 'bold',
                  color: '#333',
                  fontSize: '20px',
                  marginBottom: '16px',
                }}
              >
                Centro de Custo:
                <span style={{ color: '#333' }}> {OrcamentoContas.nome}</span>
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              justifyContent: 'flex-end',
              marginBottom: '16px',
              flexWrap: 'wrap',
            }}
          >
            <ModalcadastrarConta
              idCentroCusto={id}
              data={OrcamentoContas.orcadoAnual}
              ano={ano}
            />

            {OrcamentoContas.contas && OrcamentoContas.contas.length > 0 && (
              <ModalCadastrarSubcontas
                ano={ano}
                contas={OrcamentoContas.contas}
              />
            )}

            {/* {OrcamentoContas.contas && OrcamentoContas.contas.length > 0 && (
              <ModalcadastrarSubcontasMeses
                ano={ano}
                contas={OrcamentoContas.contas || []}
              />
            )} */}
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
              height: 'auto',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Valor Orçado
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={OrcamentoContas.orcadoAnual}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
            </Typography>
          </Box>
          <Box
            sx={(theme) => ({
              display: 'flex',
              width: '100%',
              flexDirection: 'column',
              padding: '16px',
              height: 'auto',
              backgroundColor: '#ffffff',
              gap: '16px',
              marginBottom: '2rem',
              borderRadius: '8px',
              boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
            })}
          >
            <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>
              Valor Realizado
            </Typography>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>
              R${' '}
              <CountUp
                end={OrcamentoContas.realizadoAnual}
                separator="."
                decimal=","
                decimals={2}
                style={{ fontSize: '30px', fontWeight: '500' }}
              />
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
              Porcentagem
            </Typography>

            <Stack direction="row" spacing={2}>
              <Chip
                label={
                  OrcamentoContas.porcentagemAnual
                    ? `${OrcamentoContas.porcentagemAnual.toFixed(2)}%`
                    : '0%'
                }
                size="medium"
                sx={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  padding: '8px',
                  border:
                    OrcamentoContas.porcentagemAnual > 100
                      ? '1px solid #FF0000'
                      : '1px solid #0288D1',
                  borderRadius: '8px',
                  boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.194)',
                  backgroundColor: '#fff',
                  color:
                    OrcamentoContas.porcentagemAnual > 100
                      ? '#FF0000'
                      : '#0288D1',
                }}
              />
            </Stack>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '16px',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handlevoltar}
            sx={{
              marginBottom: '16px',
              borderRadius: '8px',
            }}
          >
            Voltar
          </Button>

          <Box sx={{ display: 'flex', gap: '16px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={closeTabela === true}
                  onChange={(e) => setCloseTabela(e.target.checked)}
                />
              }
              label="Exibir Tabela Visão Mensal"
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: '100%',
            marginTop: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px',
          }}
        >
          {isLoadingContas ? (
            <CircularProgress />
          ) : (
            <>
              {closeTabela && <TableVisaoMensal data={OrcamentoContas} />}
              {OrcamentoContas?.contas?.length > 0 && (
                <TabelaContasSubcontas
                  data={OrcamentoContas?.contas}
                  onUpdate={refetch}
                />
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default OrcamentoSetor;
