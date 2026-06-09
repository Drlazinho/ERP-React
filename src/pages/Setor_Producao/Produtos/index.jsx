import { useState, useEffect, useMemo, useCallback } from 'react';

import { apiFabrica_operacao } from '@/services/apis';
import debounce from '@/utils/debounce';

import foto from '@/assets/produtos/sem-foto.png';
import ModalLoading from '@/components/ModalLoading';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid2,
  Modal,
  ModalManager,
  Typography,
} from '@mui/material';
import { registrarProduto } from '@/services/produtos/produtos.service';
import { useToast } from '@/hooks/toast.hook';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import HeaderAmvox from '@/components/HeaderAmvox';
import InputAmvox from '@/components/InputAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import TabelaProdutos from './componentes/TabelaProdutos';
import ImagePreview_Card from './componentes/ImagemPreview_Card';

const OPTIONS_TYPE_PRODUTO = [
  { value: 'AUDIO', label: 'AUDIO' },
  { value: 'CLIMA', label: 'CLIMA' },
  { value: 'LAR', label: 'LAR' },
];

export default function Produto() {
  const [produtoLista, setProdutoLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const { addToast } = useToast();
  const [filtro, setFiltro] = useState({
    apelido: null,
    codigo: null,
    sigla: null,
    categoria: null,
    ean: null,
  });
  const [itemProduto, setItemProduto] = useState(null);
  const [modalAtualizarRegistroImagens, setModalAtualizarRegistroImagens] =
    useState(false);

  const handleShowModalRegistroImagem = () => {
    setModalAtualizarRegistroImagens(!modalAtualizarRegistroImagens);
  };

  const pegarImagem = useMemo(() => {
    if (!produtoLista || produtoLista.length === 0) return null;
    return foto;
  }, [produtoLista]);

  const totalDollar = useMemo(() => {
    let total = 0;
    let real = 0;
    produtoLista.forEach((item) => (total += 1));
    produtoLista.forEach((item) => (real += item.preco));

    return {
      dolar: new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
      }).format(total),
      brl: new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 }).format(
        real
      ),
    };
  }, [produtoLista]);

  const [newRenderImageProductContainer, setNewRenderImageProductContainer] =
    useState({ imageProduct: null });
  const [imageProduct, setImageProduct] = useState(null);

  useEffect(() => {}, [newRenderImageProductContainer]);

  useEffect(() => {
    apiFabrica_operacao
      .get('/Produtos', { params: filtro })
      .then((retorno) => {
        setProdutoLista(
          retorno.data.map((item) => {
            return {
              id: item.id,
              codigo: item.codigo,
              apelido: item.apelido,
              custo: item.custo.toFixed(2),
              preco: item.preco.toFixed(2),
              ean: item.ean,
              dun: item.dun,
              sigla: item.sigla,
              categoria: item.categoria,
              imagem: item.imagem,
            };
          })
        );
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Produtos!',
          description:
            'Erro ao listar Produtos, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => {
        setRemoveLoading(true);
      });
  }, [filtro]);

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      apelido: null,
      codigo: null,
      sigla: null,
      categoria: null,
      ean: null,
    });
  };

  const handleSelectChange = (_, selectedOption) => {
    setFiltro({ ...filtro, categoria: selectedOption?.value });
  };
  const handleHoverImage = useCallback((img) => {
    setImageProduct(img);
  }, []);

  const handleHoverOut = useCallback(() => {
    setImageProduct(null);
  }, []);

  const handleClickImage = useCallback((item) => {
    setItemProduto(item);
    handleShowModalRegistroImagem();
  }, []);

  return (
    <>
      <ModalLoading show={removeLoading} />

      <Grid2 container sx={{ px: 2 }} spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <HeaderAmvox title="Produtos" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <InfoCardAmvox
            title="Total de Produtos - Filtrados"
            amount={Number(totalDollar.dolar)}
          />
        </Grid2>
        <Grid2
          size={{ xs: 12 }}
          container
          component={'form'}
          onSubmit={handleClear}
        >
          <Grid2 size={{ xs: 6, md: 4, lg: 2 }}>
            <InputAmvox
              type="text"
              label="Apelido"
              name="apelido"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, apelido: e.target.value });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4, lg: 2 }}>
            <InputAmvox
              type="text"
              name="ean"
              label="Ean"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, ean: e.target.value });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4, lg: 2 }}>
            <InputAmvox
              type="text"
              label="Codigo"
              name="codigo"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, codigo: e.target.value });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4, lg: 2 }}>
            <InputAmvox
              type="text"
              label="Sigla"
              name="sigla"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, sigla: e.target.value });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 2 }}>
            <SelectAmvox
              options={OPTIONS_TYPE_PRODUTO}
              onChange={handleSelectChange}
              getOptionLabel={(option) => option.label}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, md: 4, lg: 2 }}>
            <ButtonClear type="submit" />
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12 }} container>
          <Grid2 size={{ xs: 12, sm: 9 }}>
            <TabelaProdutos
              lista={produtoLista}
              onHoverImage={handleHoverImage}
              onHoverOut={handleHoverOut}
              onClickImage={handleClickImage}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 3 }}>
            <ImagePreview_Card image={imageProduct || pegarImagem || foto} />
          </Grid2>
        </Grid2>
      </Grid2>
    </>
  );
}
