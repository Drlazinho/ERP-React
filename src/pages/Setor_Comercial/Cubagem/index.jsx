import React, { useState, useEffect } from 'react';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import { useNavigate } from 'react-router';
import { useToast } from '@/hooks/toast.hook';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {
  buscarCubagem,
  putCubagem,
} from '@/pages/Setor_Comercial/Cubagem/cubagem.service';
import CubagemTemplate from './CubagemTemplate';

import './styles.css';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import TabelaCubagem from './TabelaCubagem';
import { Message } from '@mui/icons-material';
import HeaderAmvox from '@/components/HeaderAmvox';

const style = {
  width: '100%',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '10px',
  boxShadow: 10,
  alignItems: 'center',
  marginTop: 3,
  p: 4,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

const style2 = {
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  justifyContent: 'center',
  mb: 2,
  marginTop: 4,
  border: '0px solid #333333',
  boxShadow: '1px 2px 4px 1px rgba(0, 0, 0, 0.25)',
  padding: '16px',
  borderRadius: '8px',
  gap: 1.5,
  backgroundColor: '#FFFFFF',
};

const inicialData = {
  numeroPedido: '',
  programado: '',
  despacho: '',
  vendaOrdem: '',
  suframa: '',
  agendado: '',
  paletizado: '',
  bonificado: '',
  quantidadePecas: '',
  pesoLiquido: '',
  pesoBruto: '',
  quantidadeVolumes: '',
  cubagem: '',
  totalValorPedido: '',
  totalComImposto: '',
};

const Cubagem = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const handleLogoClick = () => navigate('/principal');
  const [loading, setLoading] = useState(false);
  const [listagemProdutos, setListagemProdutos] = useState([]);
  const [data, setData] = useState(inicialData);
  const [isSearched, setIsSearched] = useState(false);
  const [searchedPedidos, setSearchedPedidos] = useState([]);

  const formatCurrencyBRLnocifr = (current) => {
    if (current === undefined || current === null || isNaN(current)) return '';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(current);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchedPedidos.includes(data.numeroPedido)) {
      addToast({
        type: 'warning',
        title: 'Pedido já pesquisado',
        description: 'Esse número de pedido já foi pesquisado anteriormente.',
      });
      return;
    }

    setLoading(true);

    const payload = {
      numeroPedido: data.numeroPedido,
      produtos: listagemProdutos.map((produto) => ({
        codigo: produto.codigo || '',
        descricaoProduto: produto.descricaoProduto || '',
        pesoBruto: produto.pesoBruto || 0,
        pesoLiquido: produto.pesoLiquido || 0,
        quantidadeVolumes: produto.quantidadeVolumes || 0,
        quantidadePecas: produto.quantidadePecas || 0,
        frete: produto.frete || 0,
        cubagem: produto.cubagem || 0,
        precoUnitario: produto.precoUnitario || 0,
        ipi: produto.ipi || 0,
        icms: produto.icms || 0,
        valorSemImpostos: produto.valorSemImpostos || 0,
        valorComImpostos: produto.valorComImpostos || 0,
      })),
      endereco: data.endereco || '',
      quantidadeVolumes: data.quantidadeVolumes || 0,
      quantidadePecas: data.quantidadePecas || 0,
      pesoBruto: data.pesoBruto || 0,
      pesoLiquido: data.pesoLiquido || 0,
      cnpj: data.cnpj || '',
      cubagem: data.cubagem || 0,
      totalValrPedidoSemImpostos: data.totalValrPedidoSemImpostos || 0,
      totalValorPedidocomImposto: data.totalValorPedidocomImposto || 0,
    };

    try {
      const result = await buscarCubagem(payload);
      setData(result);
      setListagemProdutos(result.produtos || []);
      setSearchedPedidos((prev) => [...prev, data.numeroPedido]);
      setIsSearched(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setData(inicialData);
    setListagemProdutos([]);
    setSearchedPedidos([]);
  };

  const handleUpdateListagemProdutos = (novaListagem) => {
    setListagemProdutos(novaListagem);
  };

  const handleCalcularCubagem = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await putCubagem({
        numeroPedido: data.numeroPedido,
        produtos: listagemProdutos,
        endereco: data.endereco,
        cnpj: data.cnpj,
      });
      setData(result);

      addToast({
        type: 'success',
        title: 'Cubagem calculada',
        description: 'Os dados foram enviados com sucesso!',
      });
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data.numeroPedido && isSearched) {
      setIsSearched(false);
    }
  }, [data.numeroPedido]);

  const handlePrepareCubagem = () => {
    const cubagemData = {
      programado: data.programado,
      despacho: data.despacho,
      vendaOrdem: data.vendaOrdem,
      suframa: data.suframa,
      agendado: data.agendado,
      paletizado: data.paletizado,
      bonificado: data.bonificado,
    };
  };

  return (
    <>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Poppins, sans-serif',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginBottom: '24px',
          }}
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
              title="Cálculo de Cubagem"
              onBack={() => navigate(-1)}
            />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }} className="search">
          <TextField
            type="text"
            size="small"
            label="N° do Pedido"
            variant="filled"
            value={data.numeroPedido}
            sx={{ borderRadius: '10px', flex: '5 1 auto', marginRight: 10 }}
            onChange={(e) =>
              setData({
                ...data,
                numeroPedido: e.target.value.toUpperCase(),
              })
            }
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ flex: '1 1 auto' }}
            onClick={handleSearch}
            disabled={!data.numeroPedido || loading}
          >
            {loading ? 'Carregando...' : 'Pesquisar'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{ flex: '1 1 auto' }}
            onClick={handleClear}
          >
            Limpar
          </Button>
        </Box>

        <Box
          sx={{
            ...style,
          }}
        >
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#333333',
              fontSize: '12px',
              marginBottom: 2,
            }}
          >
            N° do Pedido: {data.numeroPedido}
          </Typography>
          <TabelaCubagem
            data={data.produtos}
            loading={loading}
            onUpdateListagem={handleUpdateListagemProdutos}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              width: '100%',
              marginTop: 2,
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ flex: '0 1 auto' }}
              onClick={handleCalcularCubagem}
              disabled={!isSearched}
            >
              Calcular Cubagem
            </Button>
          </Box>
        </Box>

        <Box sx={{ ...style }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#333333',
              fontSize: '12px',
              marginBottom: 2,
            }}
          >
            Opções:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            className="opcoes"
          >
            <TextField
              label="Programado"
              size="small"
              type="date"
              fullWidth
              sx={{
                flex: '0 1 200px',
                '& .MuiInputBase-root': {
                  height: '55px',
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              value={data.programado || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  programado: e.target.value,
                })
              }
              inputProps={{
                style: { height: '48px', width: '100%' },
              }}
            />
            <TextField
              label="Re Despacho"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={data.despacho || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  despacho: e.target.value,
                })
              }
            />
            <TextField
              label="Venda Ordem"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              InputLabelProps={{
                shrink: true,
              }}
              value={data.vendaOrdem || ''}
              onChange={(e) =>
                setData({
                  ...data,
                  vendaOrdem: e.target.value,
                })
              }
            />

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.suframa}
                    onChange={(e) =>
                      setData({
                        ...data,
                        suframa: e.target.checked,
                      })
                    }
                  />
                }
                label="Suframa"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.agendado}
                    onChange={(e) =>
                      setData({
                        ...data,
                        agendado: e.target.checked,
                      })
                    }
                  />
                }
                label="Agendado"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.paletizado}
                    onChange={(e) =>
                      setData({
                        ...data,
                        paletizado: e.target.checked,
                      })
                    }
                  />
                }
                label="Paletizado"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={data.bonificado}
                    onChange={(e) =>
                      setData({
                        ...data,
                        bonificado: e.target.checked,
                      })
                    }
                  />
                }
                label="Bonificado"
              />
            </FormGroup>
          </Box>
        </Box>

        <Box sx={{ ...style }}>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: '#333333',
              fontSize: '12px',
              marginBottom: 2,
            }}
          >
            Total:
          </Typography>
          <Box
            sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}
            className="opcoes"
          >
            <TextField
              label="Total Peças"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={data.quantidadePecas ? data.quantidadePecas : ''}
            />
            <TextField
              label="total Peso Liquido"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={data.pesoLiquido ? data.pesoLiquido : ''}
            />
            <TextField
              label="Total Peso Bruto"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={data.pesoBruto ? data.pesoBruto.toFixed(2) : ''}
            />
            <TextField
              label="Total Qtd Volume"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={data.quantidadeVolumes ? data.quantidadeVolumes : ''}
            />
            <TextField
              label="Total Cubagem"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={data.cubagem ? data.cubagem : ''}
            />
            <TextField
              label="Total Sem Imposto"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={formatCurrencyBRLnocifr(data.totalValrPedidoSemImpostos)}
            />
            <TextField
              label="Total Com Imposto"
              fullWidth
              sx={{ flex: '0 1 200px' }}
              value={formatCurrencyBRLnocifr(data.totalValorPedidocomImposto)}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            width: '100%',
            marginTop: 2,
            justifyContent: 'flex-end',
          }}
        >
          <CubagemTemplate
            data={data}
            isSearched={isSearched}
            cubagemData={handlePrepareCubagem()}
          />
        </Box>
      </Box>
    </>
  );
};

export default Cubagem;
