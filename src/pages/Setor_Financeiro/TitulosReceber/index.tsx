import {
  useState,
  useEffect,
  useCallback,
  startTransition,
  lazy,
  Suspense,
  ChangeEvent,
} from 'react';
import debounce from '@/utils/debounce';
import Loader from '@/components/Loader';

import { useToast } from '@/hooks/toast.hook';
import {
  buscarTitulosReceberPorFiltro,
  IGetTitulosReceberResponse,
  ITitulosReceberFiltrosParams,
} from '@/pages/Setor_Financeiro/TitulosReceber/titulosReceber.service';
const TabelaTitulosReceber = lazy(() => import('./tabelaTitulosReceber'));

// import ModalLoading from '@/components/ModalLoading';
// import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook';
// import { useLocation } from 'react-router';
import { Box, Grid2 } from '@mui/material';
import HeaderAmvox from '@/components/HeaderAmvox';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import ExcelTitulosReceber_Button from './components/ExcelTitulosReceber_Button';
import PaginationAmvox from '@/components/PaginationAmvox';

export default function TitulosReceber() {
  // const { showModalAccess, LiberarAcesso, setRouteName, error } =
  //   useContext(RestricaoContext);
  const [titulosReceberLista, setTitulosReceberLista] =
    useState<IGetTitulosReceberResponse>({
      avencer: 0,
      saldo: 0,
      saldoReal: 0,
      titulos: [],
      valorOriginal: 0,
      vencido: 0,
      vencidoReal: 0,
      horarioAtualizacao: '',
      totalDeItens: 0,
      totalDePaginas: 0,
    });
  const [isLoading, setIsLoading] = useState(false);

  // const location = useLocation().pathname;

  const initialFiltro: ITitulosReceberFiltrosParams = {
    nomeCliente: '',
    portador: '',
    dataFim: '2031-12-12',
    dataInicio: '2010-01-01',
    itensPorPagina: 100,
    numeroDaPagina: 1,
    codigoCliente: '',
  };

  const [filtro, setFiltro] =
    useState<ITitulosReceberFiltrosParams>(initialFiltro);

  const { addToast } = useToast();

  const handlePagination = (_event: ChangeEvent<unknown>, value: number) => {
    setFiltro({ ...filtro, numeroDaPagina: value });
  };

  useEffect(() => {
    // setRouteName(location);
    handleFetch();
  }, [filtro]);

  const handleFetch = useCallback(async () => {
    setIsLoading(true);
    await buscarTitulosReceberPorFiltro(filtro)
      .then((res) => {
        startTransition(() => {
          setTitulosReceberLista(res);
        });
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Títulos a Receber',
          description:
            'Erro ao Listar Títulos a Receber - por favor tente novamente dentre de instantes !',
        })
      )
      .finally(() => setIsLoading(false));
  }, [filtro]);

  const handleClear = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.currentTarget.reset();
    setFiltro(initialFiltro);
    setIsLoading(false);
  };

  return (
    <Box sx={{ px: 2, pb: 4 }}>
      <HeaderAmvox title="Títulos a Receber" />

      <Grid2 container spacing={1} sx={{ mb: 2 }}>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="Valor Original"
            amount={Number(titulosReceberLista.valorOriginal)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="Saldo"
            amount={Number(titulosReceberLista.saldo)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="Saldo Real"
            amount={Number(titulosReceberLista.saldoReal)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="Vencido"
            amount={Number(titulosReceberLista.vencido)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="Vencido Real"
            amount={Number(titulosReceberLista.vencidoReal)}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }}>
          <InfoCardAmvox
            type="money"
            loader={isLoading}
            title="A Vencer"
            amount={Number(titulosReceberLista.avencer)}
          />
        </Grid2>
      </Grid2>

      <Grid2
        container
        spacing={1}
        sx={{ my: 2, alignItems: 'flex-end' }}
        component="form"
        onSubmit={handleClear}
      >
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Cliente"
            name="nomeCliente"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  nomeCliente: e.target.value,
                  dataInicio: null,
                });
              })
            }
            placeholder="Nome ou código do cliente"
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
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Portador"
            name="portador"
            onChange={(e) =>
              debounce(() => {
                setFiltro({
                  ...filtro,
                  nomeCliente: e.target.value,
                  dataInicio: '',
                });
              })
            }
            placeholder="Código do portador"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputDateAmvox
            label="Início Venc. Real"
            format="YYYY-MM-DD"
            value={filtro.dataInicio || ''}
            onChange={(date) =>
              setFiltro((prev) => ({ ...prev, dataInicio: date }))
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputDateAmvox
            label="Fim Venc. Real"
            format="YYYY-MM-DD"
            value={filtro.dataFim || ''}
            onChange={(date) =>
              setFiltro((prev) => ({ ...prev, dataFim: date }))
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Natureza"
            name="natureza"
            value={filtro.natureza}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, natureza: e.target.value }))
            }
            placeholder="Código da Natureza"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Número"
            name="numero"
            value={filtro.numero}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, numero: e.target.value }))
            }
            placeholder="Número do título"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Tipo"
            name="tipo"
            value={filtro.tipo}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, tipo: e.target.value }))
            }
            placeholder="Tipo do título"
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6, md: 3, lg: 2 }}>
          <InputAmvox
            label="Núm. Banco"
            name="numBco"
            value={filtro.numBco}
            onChange={(e) =>
              setFiltro((prev) => ({ ...prev, numBco: e.target.value }))
            }
            placeholder="Número bancário"
          />
        </Grid2>

        <Grid2 size={{ xs: 6, md: 'auto' }}>
          <ButtonClear type="submit" />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 'auto' }}>
          <ExcelTitulosReceber_Button dados={titulosReceberLista} />
        </Grid2>
      </Grid2>

      <Suspense fallback={<Loader />}>
        <TabelaTitulosReceber
          data={titulosReceberLista.titulos}
          isLoading={isLoading}
        />
      </Suspense>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <PaginationAmvox
          count={titulosReceberLista.totalDePaginas}
          onChange={handlePagination}
        />
      </Box>
    </Box>
  );
}
