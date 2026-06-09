import { useState, useEffect, useCallback, useContext } from 'react';
import { useToast } from '@/hooks/toast.hook';
import {
  atualizarInvEquipamento,
  buscarInvColaborador,
  buscarInvEquipamento,
  buscarInvEquipamentoStatus,
  registrarInvColaborador,
  registrarInvEquipamento,
  registrarMovimentacaoEquipamento,
} from '@/pages/Setor_Inteligencia/Inventario/invEquipamento.service';
import { Box, Button, Skeleton, Typography } from '@mui/material';
import InvEquipamentoTabela from '@/components/Tabela/InvEquipamentoTabela';
import { Add, ComputerOutlined, Start } from '@mui/icons-material';
import ModalRegistrarInvEquipamento from './RegistroEquipamento';
import ModalRegistrarInvColaborador from './RegistroColaborador';
import ModalRegistrarMovEquipamento from './RegistroMovimentacaoEquipamento';
import ModalAtualizarEquipamento from './AtualizarEquipamento';
import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function Inventario() {
  const { showModalAccess, LiberarAcesso, setRouteName, error } =
    useContext(RestricaoContext);

  const [ListaDeEquipamentos, setListaDeEquipamentos] = useState([]);
  const [listaColaborador, setListaColaborador] = useState([]);
  const [listaStatus, setListaStatus] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [filtro, setFiltro] = useState({ nome: '' });
  const { addToast } = useToast();

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  /* Registrar equipamento */
  const [openRegistroInvEquipamento, setOpenRegistroInvEquipamento] =
    useState(false);
  const handleOpenRegistroInvEquipamento = () =>
    setOpenRegistroInvEquipamento(true);
  const handleCloseRegistroInvEquipamento = () =>
    setOpenRegistroInvEquipamento(false);

  /*Atualizar equipamento */
  const [dadosEquipamento, setDadosEquipamentos] = useState([]);
  const [openAtualizarInvEquipamento, setOpenAtualizarInvEquipamento] =
    useState(false);
  const handleOpenAtualizarInvEquipamento = (value) => {
    setDadosEquipamentos(value), setOpenAtualizarInvEquipamento(true);
  };
  const handleCloseAtualizarInvEquipamento = () =>
    setOpenAtualizarInvEquipamento(false);

  const handleRegistroInvEquipamento = (value) => {
    registrarInvEquipamento(value)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao registrar Equipamento!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao registrar Equipamento!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };

  const handleAtualizacaoInvEquipamento = (value) => {
    atualizarInvEquipamento(value)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao atualizar Equipamento!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao atualizar Equipamento!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };

  const handleFetch = useCallback(() => {
    buscarInvEquipamento()
      .then((retorno) => {
        setListaDeEquipamentos(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os Equipamentos',
          description: error.response.data.message,
        });
      })
      .finally(() => setRemoveLoading(true));

    buscarInvEquipamentoStatus()
      .then((retorno) => {
        setListaStatus(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os Equipamentos',
          description: error.response.data.message,
        });
      });
    buscarInvColaborador()
      .then((retorno) => {
        setListaColaborador(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os Equipamentos',
          description: error.response.data.message,
        });
      });
  }, []);

  /* Registrar Colaborador */
  const [openRegistroInvColaborador, setOpenRegistroInvColaborador] =
    useState(false);
  const handleOpenRegistroInvColaborador = () =>
    setOpenRegistroInvColaborador(true);
  const handleCloseRegistroInvColaborador = () =>
    setOpenRegistroInvColaborador(false);
  const handleRegistroInvColaborador = (value) => {
    registrarInvColaborador(value)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao registrar Colaborador!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao registrar Colaborador!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };
  const handleFiltroColaborador = (value) => {
    setFiltro({ ...filtro, nome: value });
  };
  useEffect(
    (filtro) => {
      buscarInvColaborador(filtro)
        .then((retorno) => {
          setListaColaborador(retorno);
        })
        .catch((_err) => {
          addToast({
            type: 'danger',
            title: 'Erro ao listar os Colaboradores',
            description: error.response.data.message,
          });
        })
        .finally(() => setRemoveLoading(true));
    },
    [filtro]
  );

  const [openRegistroMovimentacao, setOpenRegistroMovimentacao] =
    useState(false);
  const [idEquipamento, setIdEquipamento] = useState(0);
  const handleOpenRegistroMovimentacao = (value) => {
    setIdEquipamento(value), setOpenRegistroMovimentacao(true);
  };
  const handleCloseRegistroMovimentacao = (value) =>
    setOpenRegistroMovimentacao(false);

  const handleRegistroMovimentacaoEquipamento = (value) => {
    registrarMovimentacaoEquipamento(value)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao registrar movimentação!',
        });
      })
      .catch((error) => {
        addToast({
          type: 'danger',
          title: 'Erro ao registrar movimentação!',
          description: error.response.data.message,
        });
      })
      .finally(() => handleFetch());
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <>
      <div className="position-relative">
        {/*Registro Equipamento*/}
        <ModalRegistrarInvEquipamento
          open={openRegistroInvEquipamento}
          onClose={handleCloseRegistroInvEquipamento}
          handleSubmit={handleRegistroInvEquipamento}
        />
        {/*Atualizar Equipamento*/}
        <ModalAtualizarEquipamento
          open={openAtualizarInvEquipamento}
          onClose={handleCloseAtualizarInvEquipamento}
          listaStatus={listaStatus}
          handleSubmit={handleAtualizacaoInvEquipamento}
          dadosEquipamento={dadosEquipamento}
        />

        {/*Registro Colaborador */}
        <ModalRegistrarInvColaborador
          open={openRegistroInvColaborador}
          onClose={handleCloseRegistroInvColaborador}
          handleSubmit={handleRegistroInvColaborador}
          handleFiltro={handleFiltroColaborador}
          listaColaborador={listaColaborador}
        />
        {/*Registro Movimentação */}
        <ModalRegistrarMovEquipamento
          open={openRegistroMovimentacao}
          onClose={handleCloseRegistroMovimentacao}
          handleSubmit={handleRegistroMovimentacaoEquipamento}
          idEquipamento={idEquipamento}
          listaColaborador={listaColaborador}
        />

        {/*Registro Movimentação */}
        <ModalRegistrarMovEquipamento
          open={openRegistroMovimentacao}
          onClose={handleCloseRegistroMovimentacao}
          handleSubmit={handleRegistroMovimentacaoEquipamento}
          idEquipamento={idEquipamento}
          listaColaborador={listaColaborador}
        />

        <Box sx={{ position: 'relative', width: '98%', margin: '0 auto' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 2,
              '@media (max-width: 600px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                textShadow: '-1px -1px 6px #000000',
                color: 'rgb(248, 249, 250)',
                p: [2],
              }}
            >
              <ComputerOutlined size={28} />
              <Typography variant="h4">Inventario Equipamento</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                variant="contained"
                color="error"
                sx={{
                  '@media (max-width: 600px)': { width: '90%' },
                  marginBottom: '5px',
                }}
                startIcon={<Add />}
                onClick={handleOpenRegistroInvEquipamento}
              >
                Registrar Equipamento
              </Button>
              <Button
                variant="contained"
                color="success"
                sx={{
                  '@media (max-width: 600px)': { width: '90%' },
                  marginBottom: '5px',
                }}
                startIcon={<Add />}
                onClick={handleOpenRegistroInvColaborador}
              >
                Registrar Colaborador
              </Button>
              <Link to={'historicoDeInventario'}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    '@media (max-width: 600px)': { width: '90%' },
                    marginBottom: '5px',
                  }}
                  endIcon={<Start />}
                >
                  Histórico Inventario
                </Button>
              </Link>
            </Box>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={handleBack}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Voltar
          </Button>

          <Box
            sx={{
              width: '100%',
              overflow: 'scroll',
              flexGrow: '3',
            }}
          >
            {removeLoading ? (
              <InvEquipamentoTabela
                data={ListaDeEquipamentos}
                showModal={handleOpenRegistroMovimentacao}
                openModal={handleOpenAtualizarInvEquipamento}
              />
            ) : (
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={'100%'}
                height={600}
              />
            )}
          </Box>
        </Box>
      </div>
    </>
  );
}
