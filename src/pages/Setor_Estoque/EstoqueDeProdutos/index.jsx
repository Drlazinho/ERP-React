import { useState, useEffect, useMemo, useCallback } from 'react';
import debounce from '../../../utils/debounce';
import { useCotacao } from '../../../hooks/cotacao.hook';
import { useToast } from '../../../hooks/toast.hook';
import { Box, Grid2, Pagination } from '@mui/material';
import { GetArmazem } from '../../../services/armazem/armazem.service';
import { buscarEstoque, buscarEstoqueExcelAndCard } from './estoque.service';
import TabelaEstoqueDeProdutos from './components/TabelaEstoqueDeProdutos';
import ModalLoading from '@/components/ModalLoading';
import HeaderAmvox from '@/components/HeaderAmvox';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import InputAmvox from '@/components/InputAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import ExcelEstoque_Button from './components/ExcelEstoque_Button';

export default function Estoque() {
  const [produtoLista, setProdutoLista] = useState([]);
  const [armazemSelecionado, setArmazemSelecionado] = useState({
    value: 'INVENTARIO',
    label: 'INVENTÁRIO',
  });
  const [armazemListaSelect, setArmazemListaSelect] = useState([]);
  const [dadosExcel, setDadosExcel] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    pagina: 1,
    descricao: '',
    codigo: '',
    Local: 'INVENTARIO',
  });

  const { dollar } = useCotacao();
  const handleSelectChange = (_, selectedOption) => {
    setArmazemSelecionado(selectedOption);

    setFiltro((prev) => ({
      ...prev,
      Local: selectedOption?.value || '',
      pagina: 1,
    }));
  };

  function limparSelecao() {
    setArmazemSelecionado({
      ...armazemListaSelect,
      label: 'Todos - Sem Filtro',
      value: '0',
    });
  }

  const handleFiltro = (e, value) => {
    setFiltro({ ...filtro, pagina: value });
  };

  const { addToast } = useToast();

  const handleSelect = async () => {
    try {
      const res = await GetArmazem();
      const novosArmazens =
        res.value.armazens?.map((item) => ({
          value: item.local,
          label: `${item.local} - ${item.localiz}`,
        })) || [];

      const listaCompleta = [
        ...novosArmazens,
        { value: 'INVENTARIO', label: 'INVENTÁRIO' },
        { value: '', label: 'TODOS OS ARMAZENS' },
      ];

      setArmazemListaSelect(listaCompleta);
    } catch {
      addToast({
        type: 'danger',
        title: 'Erro ao Listar armazens',
        description:
          'Erro ao listar Estoque, por favor tente novamente dentre de instantes!',
      });
    }
  };

  const handleFetch = useCallback(async () => {
    setRemoveLoading(false);

    try {
      const estoqueResponse = await buscarEstoque(filtro);
      setProdutoLista(estoqueResponse.data);
    } catch {
      addToast({
        type: 'danger',
        title: 'Erro ao Listar Estoque',
        description:
          'Erro ao listar Estoque, por favor tente novamente dentro de instantes!',
      });
    }

    try {
      const estoqueCardResponse = await buscarEstoqueExcelAndCard(
        filtro.Local,
        filtro.codigo,
        filtro.descricao
      );
      setDadosExcel(estoqueCardResponse);
    } catch (error) {
      console.error('Erro ao buscar dados do Estoque Card:', error);
    } finally {
      setRemoveLoading(true);
    }
  }, [filtro]);

  const handleClear = (e) => {
    limparSelecao();
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro({ descricao: null, codigo: null, Local: null });
    setRemoveLoading(false);
  };

  useEffect(() => {
    handleFetch();
  }, [dollar, filtro]);

  useEffect(() => {
    handleSelect();
  }, []);

  return (
    <>
      <ModalLoading show={removeLoading} />
      <Box sx={{ px: 2 }}>
        <HeaderAmvox title="Estoque de Produtos" />
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="money"
              title="Total em Real Custo Inventario"
              amount={produtoLista?.custo_brl_inventario}
              currency="BRL"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="money"
              title="Total em Dólar Custo Inventario"
              amount={produtoLista.custo_USD}
              currency="USD"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="quantity"
              title="Total Produtos"
              amount={Number(produtoLista?.quantidade_produtos)}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="quantity"
              title="QTD. em Poder de Terceiro"
              amount={produtoLista?.qtdTerceiro}
              currency="BRL"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="quantity"
              title="Total Produtos Disponíveis"
              amount={produtoLista?.produtos_disponiveis}
              currency="BRL"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="quantity"
              title="Total Produtos Reservas"
              amount={produtoLista?.produtos_reservados}
              currency="BRL"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="money"
              title="Preço Médio de Venda"
              amount={parseFloat(produtoLista?.preco_medio_brl)}
              currency="BRL"
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <InfoCardAmvox
              loader={!removeLoading}
              type="money"
              title="Preço Médio em Dólar (Preço Medio)"
              amount={parseFloat(produtoLista.preco_medio_USD)}
              currency="USD"
            />
          </Grid2>
        </Grid2>
        <Grid2
          component={'form'}
          sx={{ my: 2 }}
          onSubmit={handleClear}
          container
          spacing={1}
        >
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputAmvox
              type="text"
              label="Descrição"
              name="descricao"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({
                    ...filtro,
                    descricao: e.target.value,
                    pagina: 1,
                  });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <InputAmvox
              type="text"
              label="Código"
              name="codigo"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({
                    ...filtro,
                    codigo: e.target.value,
                    pagina: 1,
                  });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 3 }}>
            <SelectAmvox
              label="Armazém"
              options={armazemListaSelect}
              value={armazemSelecionado}
              onChange={handleSelectChange}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 1.5 }}>
            <ButtonClear type="submit" />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 1.5 }}>
            <ExcelEstoque_Button dados={dadosExcel} />
          </Grid2>
        </Grid2>
        <TabelaEstoqueDeProdutos
          margens={produtoLista?.estoque ? produtoLista?.estoque : []}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={produtoLista?.totalPaginas}
            onChange={handleFiltro}
            showFirstButton
            showLastButton
            color={'primary'}
          />
        </Box>
      </Box>
    </>
  );
}
