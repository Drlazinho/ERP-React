import HeaderAmvox from '@/components/HeaderAmvox';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import {
  Box,
  Grid2,
  Skeleton,
  Typography,
} from '@mui/material';
import { startTransition, useCallback, useState } from 'react';
import { formatDateToHtmlMonth } from '@/utils/formatDate';
import InputAmvox from '@/components/InputAmvox';
import debounce from '@/utils/debounce';
import SelectAmvox from '@/components/SelectAmvox';
import Breadcrumb from './components/Breadcrumb';
import DateFilter from './components/DateFilter';
import {
  ButtonClear,
  ButtonCustom,
} from '@/components/ButtonAmvox/ButtonsAmvox';
import ExcelEntregas_Button from './components/ExcelEntregas_Button';
import { Search } from '@mui/icons-material';
import { Entregas_Tabela } from './components/Entregas_tabela';
import BarcodeNotaFiscalConfirmacao from '@/components/BarcodeNotaFiscalConfirmacao';
import NotasConfirmacao from '@/components/BarcodeNotaFiscalConfirmacao/Tabela';
import { useEntregasQuery } from './hooks/useEntregasQuery';
import { useEntregas } from '@/hooks/entregas-provider.hook';
import { EntregasItem, IFiltroEntregas } from './entregas.service';
import { apiFabrica_operacao } from '@/services/apis';
import { useToast } from '@/hooks/toast.hook';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import { queryClient } from '@/libs/react-query';
import { AxiosError } from 'axios';
import mockEntregas from './mockEntregas'

type OptionType = {
  value: string;
  label: string;
};

const OPTIONS_FRETE = [
  { value: '0000', label: 'Selecionar Frete' },
  { value: '0001', label: '1 - Frete de Venda' },
  { value: '0002', label: '2 - Frete Pos-Venda' },
  { value: '0003', label: '3 - Venda Funcionario' },
  { value: '0004', label: '4 - Retirada Fob/Fratos' },
  { value: '0005', label: '5 - Bonificação MKT' },
  { value: '0006', label: '6 - Frete Quiosque' },
  { value: '0007', label: '7 - Mostruario/Represent' },
  { value: '0008', label: '8 - Retirada' },
  { value: '0009', label: '9 - Feira/Expos/Conven' },
  { value: '0010', label: '10 - Lotação' },
  { value: '0011', label: '11 - Fracionado' },
  { value: '0012', label: '12 - Rota' },
  { value: '0013', label: '13 - Veiculo Dedicado' },
  { value: '0014', label: '14 - Transferência Interna' },
  { value: '0015', label: '15 - Transferência Externa' },
  { value: '0016', label: '16 - Correios' },
  { value: '0017', label: '17 - Palletizada' },
  { value: '0018', label: '18 - Diretoria' },
];

const initialState = {
  documento: null,
  cnpj: null,
  nome: null,
  dias: null,
  datainicio: null,
  datafim: null,
  emissaoInicio: formatDateToHtmlMonth(new Date()),
  emissaoFim: null,
  previsaoInicio: null,
  previsaoFim: null,
  saidaInicio: null,
  saidaFim: null,
  classificFrete: null,
  romaneio: null,
};

export default function Entregas() {
  const { addToast } = useToast();
  const { email } = useUsuarioLocal();
  const [filtro, setFiltro] = useState<IFiltroEntregas>(initialState);
  const [filtroAtivo, setFiltroAtivo] = useState<
    'emissao' | 'previsao' | 'saida'
  >('emissao');
  const [selectedFrete, setSelectedFrete] = useState<OptionType | null>(null);
  const [show, setShow] = useState(false);
  const { data, isLoading: dataIsLoading } = useEntregasQuery(filtro);
  const { buscarEntrega, isLoading } = useEntregas();

  const handleSelectChange = (
    _: React.SyntheticEvent,
    selected: OptionType | null
  ) => {
    startTransition(() => {
      setFiltro({ ...filtro, classificFrete: selected?.value });
    });
  };

  const handleChangeExpedicao = async (item: EntregasItem) => {
    if (item.expedido === 0 && item.saida !== '') {
      const updatedPriority = { expedido: 1 };
      const updatedUsuarioSetor = {
        userlog: email + ' | ' + new Date().toLocaleString(),
      };

      try {
        await apiFabrica_operacao.put(`/Entregas/${item.id}`, {
          ...updatedPriority,
          ...updatedUsuarioSetor,
        });
        queryClient.invalidateQueries({ queryKey: ['entregas'] });
        addToast({
          type: 'success',
          title: 'Status Expedido - Atualizado',
          description: `Alteração da NF ${item.documento} bem sucedida`,
        });
      } catch (err) {
        const error = err as AxiosError;
        console.error(error);
        addToast({
          type: 'warning',
          title: 'Erro ao atualizar NF',
          description: `Erro ao atualizar NF ${item.documento}`,
        });
      }
    }
  };

  const handlerClear = (e: React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault();
    e.currentTarget.reset();
    startTransition(() => {
      setFiltro(initialState);
      setSelectedFrete(null);
    });
  };
  const handlerClearDate = () => {
    startTransition(() => {
      setFiltro(initialState);
      setSelectedFrete(null);
    });
  };

  const handleClose = useCallback(() => setShow(false), []);

  const [breadcrumbData, setBreadcrumbData] = useState<EntregasItem>(
    {} as EntregasItem
  );

  const handleRowHover = useCallback((rowData: EntregasItem) => {
    setBreadcrumbData(rowData);
  }, []);

  return (
    <Box sx={{ px: 2 }}>
      <BarcodeNotaFiscalConfirmacao
        handleClose={handleClose}
        isLoading={isLoading}
        isShow={show}
        fn={buscarEntrega}
      >
        <NotasConfirmacao />
      </BarcodeNotaFiscalConfirmacao>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <HeaderAmvox title="Entregas" />
        <Typography>{breadcrumbData.userLog}</Typography>
      </Box>

      <Grid2 container spacing={1}       component={'form'}
        onSubmit={handlerClear}>
        {/* Cards View */}
        <Grid2 size={{ xs: 12 }} container>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InfoCardAmvox
              type="quantity"
              amount={Number(mockEntregas?.entregue)}
              title="Entregas"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InfoCardAmvox
              type="quantity"
              amount={Number(mockEntregas?.mediaDiaria)}
              title="Média/dias"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InfoCardAmvox
              type="quantity"
              amount={Number(mockEntregas?.aSair)}
              title="A sair"
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InfoCardAmvox
              type="quantity"
              amount={Number(mockEntregas?.aEntregar)}
              title="A entregar"
            />
          </Grid2>
        </Grid2>

        {/* Filtros */}
        <Grid2 size={{ xs: 12 }} container>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InputAmvox
              type="number"
              label="Nota Fiscal"
              name="notafiscal"
              onChange={(e) =>
                debounce(() => {
                  startTransition(() => {
                    setFiltro({
                      ...filtro,
                      documento: e.target.value,
                      emissaoInicio: null,
                    });
                  });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InputAmvox
              type="text"
              label="Nome"
              name="nome"
              onChange={(e) =>
                debounce(() => {
                  startTransition(() => {
                    setFiltro({
                      ...filtro,
                      nome: e.target.value,
                    });
                  });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <InputAmvox
              type="text"
              label="Romaneio"
              name="nome"
              onChange={(e) =>
                debounce(() => {
                  startTransition(() => {
                    setFiltro({
                      ...filtro,
                      romaneio: e.target.value,
                      emissaoInicio: null,
                    });
                  });
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 3 }}>
            <SelectAmvox<OptionType>
              options={OPTIONS_FRETE}
              value={selectedFrete}
              onChange={(e, selected) => {
                setSelectedFrete(selected);
                handleSelectChange(e, selected);
              }}
              getOptionLabel={(option) => option.label}
            />
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12 }} container>
          <Grid2 size={{ xs: 12, xl: 8.5 }}>
            <DateFilter
              valueStart={filtro[`${filtroAtivo}Inicio`] || ''}
              valueEnd={filtro[`${filtroAtivo}Fim`] || ''}
              valueFilterType={filtroAtivo}
              onChange={({ filterType, start, end }) => {
                startTransition(() => {
                  setFiltro({
                    ...filtro,
                    [`${filterType}Inicio`]: start,
                    [`${filterType}Fim`]: end,
                  });
                  setFiltroAtivo(filterType);
                });
              }}
              handlerClear={handlerClearDate}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, xl: 3.5 }} container>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <ButtonClear type='submit'/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <ExcelEntregas_Button dataApi={data?.data} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <ButtonCustom
                onClick={() => setShow(true)}
                title="Leitor Barras"
                startIcon={<Search />}
              />
            </Grid2>
          </Grid2>
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          <Breadcrumb data={breadcrumbData} />
        </Grid2>

        <Grid2 size={{ xs: 12 }}>
          {dataIsLoading ? (
            <Skeleton height={800} />
          ) : (
            <Entregas_Tabela
              entregas={mockEntregas?.data ? mockEntregas?.data : []}
              onRowHover={handleRowHover}
              statusLogistica={handleChangeExpedicao}
            />
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
}
