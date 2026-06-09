import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Typography, Button, Grid } from '@mui/material';

import LayoutNovo from '@/components/LayoutNovo';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import Inventory2Icon from '@mui/icons-material/Inventory2';
import ControleEstoqueTiTable from './Components/ControleTiTable';

import { buscarInsumosPorFiltro } from '@/pages/Setor_Recepcao/Insumos/insumos.service';

import ModalCadastro from './Components/ModalCadastro';
import ModalCadastroFornecedor from './Components/ModalCadastroFornecedor';
import ModalEntradaDeInsumos from './Components/ModalEntradaInsumo';

import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { registrarInsumosMovimentacao } from '@/pages/Setor_Recepcao/Insumos/insumosMovimentacao.service';
import { consultaSetores } from '@/services/setores/setores.service';

import { useToast } from '@/hooks/toast.hook';

const DataProps = {
  id: '',
  tipo: '',
  fornecedor: '',
  codProduto: '',
  nome: '',
  custo: '',
  um: '',
  qtd_UM: '',
  saldo: '',
};

export default function ControleDeEstoqueTI() {
  const [data, setData] = useState({ DataProps });
  const [nomeProdutoLista, setnomeProdutoLista] = useState([]);
  const [listaSetores, setListaSetores] = useState({});

  const { addToast } = useToast();

  const { email } = useUsuarioLocal();
  const navigate = useNavigate();

  const handleFetchInsumos = () => {
    buscarInsumosPorFiltro(email)
      .then((response) => {
        setData(response);
        setnomeProdutoLista(response);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const cadastrarSaida = async (value) => {
    registrarInsumosMovimentacao(value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Saída cadastrada com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: 'Erro ao fazer cadastro',
        });
      });
    handleFetchInsumos();
  };

  const handleSetores = () => {
    consultaSetores()
      .then((res) => {
        setListaSetores(res);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar as setores',
        });
      });
  };

  useEffect(() => {
    handleFetchInsumos();
    handleSetores();
  }, []);

  return (
    <>
      <Box sx={{ position: 'relative' }}>
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
            <Inventory2Icon size={35} />
            <Typography variant="h4">
              Controle de Estoque Inteligencia
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(-1)}
            startIcon={<KeyboardBackspaceIcon />}
          >
            Voltar
          </Button>
        </Box>
        <Grid container spacing={1} mb={'10px'}>
          <Grid item>
            <ModalCadastro handleFetchInsumos={handleFetchInsumos} />
          </Grid>
          <Grid item>
            <ModalCadastroFornecedor handleFetchInsumos={handleFetchInsumos} />
          </Grid>
          <Grid item>
            <ModalEntradaDeInsumos
              handleFetchInsumos={handleFetchInsumos}
              nomeProdutoLista={nomeProdutoLista}
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              startIcon={<CheckCircleOutlineIcon />}
              onClick={() => navigate('historicoDeMovimentacaoTI')}
            >
              Verificar Histórico de Movimentos TI
            </Button>
          </Grid>
        </Grid>
        <ControleEstoqueTiTable
          data={data}
          cadastrarSaida={cadastrarSaida}
          listaSetores={listaSetores}
          handleFetchInsumos={handleFetchInsumos}
        />
      </Box>
    </>
  );
}
