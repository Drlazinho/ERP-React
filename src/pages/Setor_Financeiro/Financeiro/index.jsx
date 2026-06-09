import { useCallback, useEffect, useState } from 'react'
import { Box, Button, Grid, Grid2, Stack, TextField } from '@mui/material'
import { useToast } from '@/hooks/toast.hook'
import { buscarEntregasPorFiltros } from '@/services/entregas.service'
import { TabelaDoFinanceiro } from './component/TabelaDoFinanceiro'
import ExcelFinanceiro_Button from './component/ExcelFinanceiro_Button'
import HeaderAmvox from '@/components/HeaderAmvox'
import { useDebounce } from '@/hooks/debounce.hook'
import InfoCardAmvox from '@/components/InfoCardAmvox'
import InputAmvox from '@/components/InputAmvox'
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox'
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox'
import mockFinanceiro from './mockFinanceiro'

export default function Financeiro() {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(true)
  const [dataList, setDataList] = useState({
    table: [],
    cardPrevisaoEntrega: 0,
    cardPrevisaoDia: 0,
  })

  const [filtro, setFiltro] = useState({
    documento: null,
    cnpj: null,
    nome: null || '',
    dias: null,
    datainicio: null,
    datafim: null,
    emissaoInicio: null,
    emissaoFim: null,
    previsaoInicio: null,
    previsaoFim: null,
    saidaInicio: null,
    saidaFim: null,
    dataEntregueInicio: null,
    dataEntregueFim: null,
  })

  const debounceFiltro = useDebounce(filtro, 1000)

  const handleFetch = useCallback(() => {
    setLoading(true)
          setDataList({
          table: mockFinanceiro.data,
          cardPrevisaoDia: mockFinanceiro.previsaoDia,
          cardPrevisaoEntrega: mockFinanceiro.previsaoEntrega,
        })

    // buscarEntregasPorFiltros(debounceFiltro)
    //   .then((res) => {
    //     setDataList({
    //       table: res.data,
    //       cardPrevisaoDia: res.previsaoDia,
    //       cardPrevisaoEntrega: res.previsaoEntrega,
    //     })
    //   })
    //   .catch(() =>
    //     addToast({
    //       type: 'danger',
    //       title: 'Erro ao Listar Financeiro',
    //       description:
    //         'Erro ao Listar Financeiro - por favor tente novamente dentre de instantes !',
    //     })
    //   )
    //   .finally(() => setLoading(false))
  }, [addToast, debounceFiltro])

  const handleClear = (e) => {
    e.preventDefault()
    setFiltro({
      documento: '',
      cnpj: null,
      nome: '',
      dias: null,
      datainicio: null,
      emissaoInicio: null,
      emissaoFim: null,
      previsaoInicio: null,
      previsaoFim: null,
      saidaInicio: null,
      saidaFim: null,
      datafim: null,
      dataEntregueInicio: null,
      dataEntregueFim: null,
    })
  }

  const manipulationFilter = {
    datainicio: null,
    emissaoInicio: null,
    emissaoFim: null,
    previsaoInicio: null,
    previsaoFim: null,
    saidaInicio: null,
    saidaFim: null,
    datafim: null,
    dataEntregueInicio: null,
    dataEntregueFim: null,
  }

  useEffect(() => {
    handleFetch()
  }, [debounceFiltro])

  return (
    <Box sx={{ px: 2 }}>
      <HeaderAmvox title="Financeiro" />
      <Grid2 container columnSpacing={1}>
        <Grid2 item size={{ xs: 6 }}>
          <InfoCardAmvox
            title={'Previsões/Entrega'}
            amount={Number(dataList.cardPrevisaoEntrega)}
          />
        </Grid2>
        <Grid2 item size={{ xs: 6 }}>
          <InfoCardAmvox
            title={'Previsões/Hoje'}
            amount={Number(dataList.cardPrevisaoDia)}
          />
        </Grid2>
      </Grid2>
      <Grid2
        component={'form'}
        onSubmit={handleClear}
        container
        spacing={1}
        my={2}
      >
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputAmvox
            type="text"
            label="Nota Fiscal"
            name="Nota Fiscal"
            value={filtro.documento || ''}
            onChange={(e) =>
              setFiltro((prevFiltro) => ({
                ...prevFiltro,
                documento: e.target.value,
              }))
            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputAmvox
            type="text"
            label="Nome"
            name="Nome"
            value={filtro.nome || ''}
            onChange={(e) =>
              setFiltro((prevFiltro) => ({
                ...prevFiltro,
                nome: e.target.value,
              }))
            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputDateAmvox
            type="text"
            name="Nome"
            label='Emissão Inicial'
            format='YYYY-MM-DD'
            value={filtro.emissaoInicio || ''}
            onChange={(date) =>
              setFiltro({
                ...filtro,
                emissaoInicio: date,
              })
            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputDateAmvox
            type="text"
            name="Nome"
            label='Emissão Final'
            format='YYYY-MM-DD'
            value={filtro.emissaoFim || ''}
            onChange={(date) =>
              setFiltro({
                ...filtro,
                emissaoFim: date,
              })
            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputDateAmvox
            type="text"
            name="Nome"
            label="Data Entregue Inicial"
            format='YYYY-MM-DD'
            value={filtro.dataEntregueInicio || ''}
            onChange={(date) =>
              setFiltro((prev) => ({ ...prev, dataEntregueInicio: date }))

            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <InputDateAmvox
            type="text"
            name="Nome"
            label="Data Entrega Final"
            format='YYYY-MM-DD'
            value={filtro.dataEntregueFim || ''}
            onChange={(date) =>
              setFiltro((prev) => ({ ...prev, dataEntregueInicio: date }))

            }
          />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <ButtonClear type='reset' onClick={handleClear} />
        </Grid2>
        <Grid2 item size={{ xs: 6, sm: 3, md: 1.5 }}>
          <ExcelFinanceiro_Button dataApi={dataList.table} />
        </Grid2>
      </Grid2>
      <Box>
        <TabelaDoFinanceiro loading={loading} entregas={dataList.table} />
      </Box>
    </Box>
  )
}
