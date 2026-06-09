import LayoutNovo from '@/components/LayoutNovo';
import { useCallback, useEffect, useState } from 'react';
import { buscarRelatFaturamento } from '@/pages/Setor_Fiscal/Faturamento/faturamento.service';
import { GiBanknote } from 'react-icons/gi';
import { useToast } from '@/hooks/toast.hook';
import { Box, Button, Grid, Grid2, TextField } from '@mui/material';
import TabelaDeFaturamento from './Tabela';
import debounce from '@/utils/debounce';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import { buscarStatusCards } from '@/pages/DashboardNovo/dashboardNovo.service';
import HeaderAmvox from '@/components/HeaderAmvox';
import InfoCardAmvox from '@/components/InfoCardAmvox';
import InfoFaturamento_Card from './components/InfoFaturamento_Card';
import InputAmvox from '@/components/InputAmvox';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import ExcelNotas from './components/ExportarExcel';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
dayjs.locale('pt-br');

export default function Faturamento() {
  const { setor } = useUsuarioLocal();
  const [loading, setLoading] = useState(true);
  const [statusCards, setStatusCards] = useState([]);
  const [relatFaturamentoDados, setRelatFaturamentoDados] = useState({
    table: [],
    value: {
      totalReceitaBruta: 0,
      totalReceitaLiquida: 0,
    },
    card: {
      faturamentoBrutoAno: 0,
      faturamentoLiquidoAno: 0,
      faturamentoDevolucaoAno: 0,
      faturamentoDevolucaoAnoPorcentagem: 0,
      faturamentoBrutoMes: 0,
      faturamentoLiquidoMes: 0,
      faturamentoDevolucaoMes: 0,
      faturamentoDevolucaoMesPorcentagem: 0,
    },
    pagination: {
      totalPaginas: 0,
      totalItems: 0,
      paginaAtual: 1,
      itemsPorPagina: 100,
    },
  });

  const hoje = new Date();
  const dataFormatada =
    hoje.getFullYear() * 10000 + (hoje.getMonth() + 1) * 100 + hoje.getDate();

  const [filtro, setFiltro] = useState({
    pagina: 1,
    itensPorPagina: 2000,
    dt_emissao_ini: dataFormatada,
    dt_emissao_fin: dataFormatada,
    cli_nome: null,
    cli_nreduz: null,
    cli_grpven: null,
    ven_nome: null,
    pro_descri: null,
    numeroNF: '',
    numeroDePedido: '',
  });
  const { addToast } = useToast();

  const handleChange = (value) => {
    setFiltro({ ...filtro, pagina: value, itensPorPagina: 100 });
  };

  const handleFetch = useCallback(() => {
    setLoading(true);
    buscarRelatFaturamento(filtro)
      .then((res) => {
        setRelatFaturamentoDados({
          table: res.value.faturamento,
          value: res.value,
          card: {
            faturamentoBrutoAno: res.value.faturamentoBrutoAno,
            faturamentoLiquidoAno: res.value.faturamentoLiquidoAno,
            faturamentoDevolucaoAno: res.value.faturamentoDevolucaoAno,
            faturamentoDevolucaoAnoPorcentagem:
              res.value.faturamentoDevolucaoAnoPorcentagem,
            faturamentoBrutoMes: res.value.faturamentoBrutoMes,
            faturamentoLiquidoMes: res.value.faturamentoLiquidoMes,
            faturamentoDevolucaoMes: res.value.faturamentoDevolucaoMes,
            faturamentoDevolucaoMesPorcentagem:
              res.value.faturamentoDevolucaoMesPorcentagem,
          },
          pagination: {
            totalPaginas: res.value.totalPaginas,
            totalItems: res.value.totalItems,
            paginaAtual: res.value.paginaAtual,
            itemsPorPagina: res.value.itemsPorPagina,
          },
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Relat Faturamento',
          description: _err.response.data.message,
        });
      })
      .finally(() => setLoading(false));

    buscarStatusCards().then((res) => {
      setStatusCards(res);
    });
  }, [filtro]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleClear = () => {
    setFiltro({
      pagina: 1,
      itensPorPagina: 2000,
      dt_emissao_ini: dataFormatada,
      dt_emissao_fin: dataFormatada,
      cli_nome: null,
      cli_nreduz: null,
      cli_grpven: null,
      ven_nome: null,
      pro_descri: null,
      numeroNF: '',
      numeroDePedido: '',
    });
  };

  const formatDateForDisplay = (date) => {
    return dayjs(date).format('DD/MM/YYYY');
  };

  return (
    <>
      <Box sx={{ px: 2 }}>
        <HeaderAmvox
          title={
            [1, 2, 7].includes(setor) ? 'Notas Faturadas' : 'Notas Fiscais'
          }
        />

        {[1, 2, 7].includes(setor) ? (
          <Grid2
            container
            spacing={1}
            sx={{
              mb: '30px',
              alignContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <Grid2 size={{ xs: 12, sm: 3 }}>
              <InfoFaturamento_Card
                title1={'Receita Bruta'}
                title2={'Receita Liquida'}
                value1={Number(relatFaturamentoDados?.value.totalReceitaBruta)}
                value2={Number(
                  relatFaturamentoDados?.value.totalReceitaLiquida
                )}
                loader={loading}
              />
            </Grid2>
            <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
              <InputDateAmvox
                label="Data Inicial"
                value={filtro.dt_emissao_ini || ''}
                onChange={(date) =>
                  setFiltro((prev) => ({
                    ...prev,
                    dt_emissao_ini: date,
                    pagina: 1,
                  }))
                }
                format="YYYYMMDD"
              />
            </Grid2>
            <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
              <InputDateAmvox
                label="Data Final"
                value={filtro.dt_emissao_fin || ''}
                onChange={(date) =>
                  setFiltro((prev) => ({
                    ...prev,
                    dt_emissao_fin: date,
                    pagina: 1,
                  }))
                }
                format="YYYYMMDD"
              />
            </Grid2>
            <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
              <ButtonClear onClick={handleClear} sx={{ width: '100%' }} />
            </Grid2>
            <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
              <ExcelNotas
                dataApi={relatFaturamentoDados.table}
                filtro={filtro}
              />
            </Grid2>
          </Grid2>
        ) : (
          <>
            <Grid2 container spacing={1}>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <InfoFaturamento_Card
                  title1={'Fat. Bruto - Ano'}
                  title2={'Fat. Bruto - Mês'}
                  value1={Number(
                    relatFaturamentoDados.card.faturamentoBrutoAno
                  )}
                  value2={Number(
                    relatFaturamentoDados.card.faturamentoBrutoMes
                  )}
                  loader={loading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <InfoFaturamento_Card
                  title1={'Fat. Liq - Ano'}
                  title2={'Fat. Liq - Mês'}
                  value1={Number(
                    relatFaturamentoDados.card.faturamentoLiquidoAno
                  )}
                  value2={Number(
                    relatFaturamentoDados.card.faturamentoLiquidoMes
                  )}
                  loader={loading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <InfoFaturamento_Card
                  title1={'Devolução - Ano'}
                  title2={'Devolução - Mês'}
                  value1={Number(
                    relatFaturamentoDados.card.faturamentoDevolucaoAno
                  )}
                  value2={Number(
                    relatFaturamentoDados.card.faturamentoDevolucaoMes
                  )}
                  loader={loading}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 3 }}>
                <InfoFaturamento_Card
                  title1={'% de Devolução - Ano'}
                  title2={'% de Devolução - Mês'}
                  value1={Number(
                    relatFaturamentoDados.card
                      .faturamentoDevolucaoAnoPorcentagem
                  )}
                  value2={Number(
                    relatFaturamentoDados.card
                      .faturamentoDevolucaoMesPorcentagem
                  )}
                  loader={loading}
                  type="quantity"
                />
              </Grid2>
            </Grid2>
            <Grid2
              component={'form'}
              container
              spacing={1}
              onSubmit={handleClear}
              sx={{ my: 2 }}
            >
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="Grupo de Venda"
                  type="number"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({ ...filtro, cli_grpven: e.target.value });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="Vendedor"
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({ ...filtro, ven_nome: e.target.value });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="Descrição"
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({
                        ...filtro,
                        pro_descri: e.target.value,
                        pagina: 1,
                      });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="Cliente"
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({
                        ...filtro,
                        cli_nome: e.target.value,
                        pagina: 1,
                      });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="NF"
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({
                        ...filtro,
                        numeroNF: e.target.value,
                        pagina: 1,
                      });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputAmvox
                  label="Pedido"
                  type="text"
                  onChange={(e) =>
                    debounce(() => {
                      setFiltro({
                        ...filtro,
                        numeroDePedido: e.target.value,
                        pagina: 1,
                      });
                    })
                  }
                />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputDateAmvox
                  label="Data Inicial"
                  value={filtro.dt_emissao_ini || ''}
                  onChange={(date) =>
                    setFiltro((prev) => ({
                      ...prev,
                      dt_emissao_ini: date,
                      pagina: 1,
                    }))
                  }
                  format="YYYYMMDD"
                />{' '}
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <InputDateAmvox
                  label="Data Final"
                  value={filtro.dt_emissao_fin || ''}
                  onChange={(date) =>
                    setFiltro((prev) => ({
                      ...prev,
                      dt_emissao_fin: date,
                      pagina: 1,
                    }))
                  }
                  format="YYYYMMDD"
                />{' '}
              </Grid2>

              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <ButtonClear onClick={handleClear} sx={{ width: '100%' }} />
              </Grid2>
              <Grid2 item size={{ xs: 6, sm: 3, xl: 1.5 }}>
                <ExcelNotas
                  dataApi={relatFaturamentoDados.table}
                  filtro={filtro}
                />
              </Grid2>
            </Grid2>
          </>
        )}

        <Grid2 item sx={12}>
          <TabelaDeFaturamento
            data={relatFaturamentoDados.table}
            dataTotal={relatFaturamentoDados.value}
            rowCount={relatFaturamentoDados.pagination.totalItems}
            pageCount={relatFaturamentoDados.pagination.totalPaginas}
            loading={loading}
            changePagination={handleChange}
            paginaAtual={relatFaturamentoDados.pagination.paginaAtual}
          />
        </Grid2>
      </Box>
    </>
  );
}
