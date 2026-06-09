import {
  useState,
  useEffect,
  useCallback,
  // useContext,
  startTransition,
  Suspense,
  lazy,
  ChangeEvent,
} from 'react';
import debounce from '@/utils/debounce';
import Loader from '@/components/Loader';
import { useToast } from '@/hooks/toast.hook';
const NovaTabelaTitulosPagar = lazy(() => import('./tabelaTitulosPagar'));
// import formatDateTotvs from '@/utils/formatDataTotvs'
// import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook'
// import { useLocation } from 'react-router'
import {
  buscarTitulosPagarPorFiltro,
  IGetTitulosPagar,
  ITitulosPagarFiltrosParams,
} from '@/pages/Setor_Financeiro/TitulosPagar/titulosPagar.service';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import HeaderAmvox from '@/components/HeaderAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import { Box, Grid2 } from '@mui/material';
import ExcelTitulosPagar_Button from './components/ExcelTitulosPagar_Button';
import PaginationAmvox from '@/components/PaginationAmvox';

export default function TitulosPagar() {
  // const { showModalAccess, LiberarAcesso, setRouteName, error } =
  //   useContext(RestricaoContext)
  // const location = useLocation().pathname
  const [titulosPagarLista, setTitulosPagarLista] = useState<IGetTitulosPagar>({
    valorTotal: 0,
    valorOriginal: 0,
    titulos: [],
    totalDeItens: 0,
    totalDePaginas: 0,
    valorVencido: 0,
    valorAVencer: 0,
  });

  const [removeLoading, setRemoveLoading] = useState(false);

  const initialFiltro: ITitulosPagarFiltrosParams = {
    nomeCliente: '',
    portador: '',
    dataFim: '2031-12-12',
    dataInicio: '2010-01-01',
    itensPorPagina: 100,
    numeroDaPagina: 1,
    codigoCliente: '',
  };

  const [filtro, setFiltro] =
    useState<ITitulosPagarFiltrosParams>(initialFiltro);

  const { addToast } = useToast();

  useEffect(() => {
    // setRouteName(location)
    handleFetch();
  }, [filtro]);

  const handleFetch = useCallback(async () => {
    await buscarTitulosPagarPorFiltro(filtro)
      .then((res) => {
        startTransition(() => {
          setTitulosPagarLista(res);
        });
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Títulos a Pagar',
          description:
            'Erro ao Listar Títulos a Pagar - por favor tente novamente dentre de instantes !',
        })
      )
      .finally(() => setRemoveLoading(true));
  }, [filtro]);

  const handlePagination = (_event: ChangeEvent<unknown>, value: number) => {
    setFiltro({ ...filtro, numeroDaPagina: value });
  };

  const handleClear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro(initialFiltro);
  };

  return (
    <Box sx={{ px: 2 }}>
      <HeaderAmvox title="Títulos a Pagar" />
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCardAmvox
            loader={!removeLoading}
            title="Valor Orig. Total"
            type="money"
            amount={Number(titulosPagarLista.valorOriginal)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCardAmvox
            loader={!removeLoading}
            title="Saldo Total"
            type="money"
            amount={Number(titulosPagarLista.valorTotal)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCardAmvox
            loader={!removeLoading}
            title="Vencidos"
            type="money"
            amount={Number(titulosPagarLista.valorVencido)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
          <InfoCardAmvox
            loader={!removeLoading}
            title="A Vencer"
            type="money"
            amount={Number(titulosPagarLista.valorAVencer)}
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        spacing={1}
        sx={{ my: 2 }}
        component={'form'}
        onSubmit={handleClear}
      >
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Cliente"
            label="Cliente"
            name="cliente"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  nomeCliente: e.target.value,
                  dataInicio: null,
                });
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Código Cliente"
            label="Código Cliente"
            name="codigoCliente"
            className="form-control"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  codigoCliente: e.target.value,
                  dataInicio: null,
                });
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Portador"
            label="Portador"
            name="portador"
            className="form-control"
            onChange={(e) =>
              debounce(() => {
                setFiltro({ ...filtro, portador: e.target.value });
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputDateAmvox
            label="Inicio Venc.Real"
            format="YYYY-MM-DD"
            value={filtro.dataInicio || ''}
            onChange={(date) => {
              setFiltro({
                ...filtro,
                dataInicio: date,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputDateAmvox
            label="Fim Venc.Real"
            format="YYYY-MM-DD"
            value={filtro.dataFim || ''}
            onChange={(date) => {
              setFiltro({
                ...filtro,
                dataFim: date,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Natureza"
            label="Natureza"
            className="form-control"
            value={filtro.natureza}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                natureza: e.target.value,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Numero"
            label="Numero"
            className="form-control"
            value={filtro.numero}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                numero: e.target.value,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            placeholder="Tipo"
            label="Tipo"
            className="form-control"
            value={filtro.tipo}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                tipo: e.target.value,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 2 }}>
          <InputAmvox
            type="text"
            label="NumBco"
            placeholder="NumBco"
            className="form-control"
            value={filtro.numBco}
            onChange={(e) => {
              setFiltro({
                ...filtro,
                numBco: e.target.value,
              });
            }}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 1 }}>
          <ButtonClear type="submit" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 1 }}>
          <ExcelTitulosPagar_Button />
        </Grid2>
      </Grid2>
      <Suspense fallback={<Loader />}>
        <NovaTabelaTitulosPagar
          data={titulosPagarLista?.titulos}
          isLoading={!removeLoading}
        />
      </Suspense>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <PaginationAmvox
          count={titulosPagarLista.totalDePaginas}
          onChange={handlePagination}
        />
      </Box>
    </Box>
  );
}
