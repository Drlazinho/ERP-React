import { useState, useEffect, useMemo, useCallback } from 'react'

import debounce from '../../../utils/debounce'
import { useCotacao } from '../../../hooks/cotacao.hook'

import ModalLoading from '../../../components/ModalLoading'
import { useToast } from '../../../hooks/toast.hook'
import { Box, Grid2, Pagination } from '@mui/material'
import { GetArmazem } from '../../../services/armazem/armazem.service'
import { formatCurrencyBRLnocifr } from '../../../utils/formatCurrency'
import TabelaDeMargens from './components/TabelaDeMarges'
import { getMargens, getMargensExcel } from './margens.service'
import InfoCardAmvox from '@/components/InfoCardAmvox'
import HeaderAmvox from '@/components/HeaderAmvox'
import InputAmvox from '@/components/InputAmvox'
import { ButtonClear, ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
import SelectAmvox from '@/components/SelectAmvox'
const ExcelJS = require('exceljs')

export default function Margem() {
  const [produtoLista, setProdutoLista] = useState([])
  const [removeLoading, setRemoveLoading] = useState(false)
  const [armazemSelecionado, setArmazemSelecionado] = useState({ value: '40', label: '40 - Expedição' })
  const [armazemLista, setArmazemlista] = useState([])
  const [filtro, setFiltro] = useState({
    pagina: 1,
    descricao: '',
    codigo: '',
    Local: '40',
  })

  const { dollar } = useCotacao()

  const { addToast } = useToast()

  const handleFiltro = (e, value) => {
    setFiltro({ ...filtro, pagina: value })
  }


  const handleSelectChange = (_, selectedOption) => {
    setArmazemSelecionado(selectedOption)

    setFiltro((prev) => ({
      ...prev,
      Local: selectedOption?.value || '',
      pagina: 1,
    }))
  }

  const handleSelect = async () => {
    try {
      const res = await GetArmazem()
      const novosArmazens = res.value.armazens?.map((item) => ({
        value: item.local,
        label: `${item.local} - ${item.localiz}`,
      })) || []

      const listaCompleta = [
        ...novosArmazens,
      ]

      setArmazemlista(listaCompleta)
    } catch {
      addToast({
        type: 'danger',
        title: 'Erro ao Listar armazens',
        description: 'Erro ao listar Estoque, por favor tente novamente dentre de instantes!',
      })
    }
  }

  function limparSelecao() {
    setArmazemSelecionado({
      ...armazemLista,
      label: 'Todos - Sem Filtro',
      value: '0',
    })
  }

  const totalDollar = useMemo(() => {
    let precomdx_ = produtoLista.custo_brl //inventario
    let dolarprecox_ = produtoLista.preco_medio_brl

    return {
      custo_inventario_dolar: precomdx_ / dollar?.bid,
      preco_medio_dolar: dolarprecox_ / dollar?.bid,
    }
  }, [dollar?.bid, produtoLista])

  useEffect(() => {
    handleFetch()
    // const listaArmazem = armazemEstoque.map((item) => ({
    //   value: item.armazem,
    //   label: item.armazem + '  - ' + item.descricao,
    // }));
    // setArmazemlista(listaArmazem);
  }, [dollar, filtro])

  const handleFetch = useCallback(() => {
    getMargens(filtro)
      .then((res) => {
        setProdutoLista(res.data)
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Margens',
          description:
            'Erro ao listar Margens, por favor tente novamente dentre de instantes !',
        })
      )
      .finally(() => setRemoveLoading(true))

    getMargensExcel(filtro).then((res) => {
      setDadosExcel(res.data)
    })
  }, [filtro])

  const [dadosExcel, setDadosExcel] = useState([])

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('My Sheet')
    sheet.properties.defaultRowHeight = 20

    sheet.columns = [
      {
        header: 'Código',
        key: 'codigo',
        width: 15,
      },
      { header: 'Descrição', key: 'descricao', width: 60 },
      {
        header: 'Dias Stk',
        key: 'diasStk',
        width: 20,
      },
      {
        header: 'Mais de 90D',
        key: 'diasEstoque90',
        width: 20,
      },
      {
        header: 'Saldo',
        key: 'saldo',
        width: 15,
      },
      {
        header: 'Preço',
        key: 'preco',
        width: 10,
      },
      {
        header: 'Preço Medio',
        key: 'precoMedio',
        width: 10,
      },
      {
        header: 'Custo Medio Inv.',
        key: 'custoMedioInv',
        width: 10,
      },
      {
        header: 'Icon',
        key: 'icon',
        width: 10,
      },
      {
        header: 'Sugestão',
        key: 'sugestao',
        width: 10,
      },
      {
        header: 'Vendas-90D',
        key: 'vendas90',
        width: 10,
      },
      {
        header: 'Invoices',
        key: 'invoices',
        width: 10,
      },
      {
        header: 'Local',
        key: 'local',
        width: 10,
      },
    ]

    dadosExcel.estoque.map((item) => {
      const icon = () => {
        if ((item.sugestaoTri - item.invoice).toFixed(0) > 0) {
          return '+'
        } else {
          return '-'
        }
      }

      const diasEstoque90 = () => {
        if (item.diasEstoque > 90) {
          return 'S'
        } else {
          return 'N'
        }
      }

      const sugestao = () => {
        if ((item.sugestaoTri - item.invoice).toFixed(0) > 0) {
          return (item.sugestaoTri - item.invoice).toFixed(0)
        }
        return 0
      }

      sheet.addRow({
        codigo: item.codigo,
        descricao: item.descricao,
        diasStk: item.diasEstoque.toFixed(0),
        diasEstoque90: diasEstoque90(),
        saldo: formatCurrencyBRLnocifr(item.saldo),
        preco: `${formatCurrencyBRLnocifr(item.preco)}`,
        precoMedio: `${formatCurrencyBRLnocifr(item.precoMedio)}`,
        custoMedioInv: `${formatCurrencyBRLnocifr(item.custo)}`,
        icon: icon(),
        sugestao: sugestao(),
        vendas90: item.vendasTri,
        invoices: item.invoice,
        local: item.local,
      })

      return null
    })

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
      const url = window.URL.createObjectURL(blob)
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = `Margens.xlsx`
      anchor.click()
      window.URL.revokeObjectURL(url)
      setRemoveLoading(true)
    })
  }

  const handleClear = (e) => {
    limparSelecao()
    e.preventDefault()
    e.target.reset()
    setFiltro({ descricao: null, codigo: null, Local: null })
    setRemoveLoading(false)
  }

  useEffect(() => {
    setFiltro({ ...filtro, Local: 40 })
    handleSelect()
  }, [])

  return (
    <>
      <ModalLoading show={removeLoading} />
      <Box
        sx={{ px: 2 }}
      >
        <HeaderAmvox title='Margens' />
        <Grid2 container spacing={1}>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total de Invoices"
              amount={produtoLista.invoices}
              type='quantity'
              loader={!removeLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total de Vendas 90 dias"
              amount={produtoLista.vendas}
              type='quantity'
              loader={!removeLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total de Produtos"
              amount={Number(produtoLista.quantidade_produtos)}
              type='quantity'
              loader={!removeLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total de Sugestão"
              amount={Number(produtoLista.sugestao)}
              type='quantity'
              loader={!removeLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total em Reais (Preco Medio)"
              amount={parseFloat(produtoLista.preco_medio_brl)}
              type='money'
              loader={!removeLoading}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InfoCardAmvox
              title="Total em Reais (Custo Inv.)"
              amount={parseFloat(produtoLista.custo_brl_inventario)}
              type='money'
              loader={!removeLoading}
            />
          </Grid2>

        </Grid2>
        <Grid2 component={'form'} sx={{ my: 2 }} container spacing={1} onSubmit={handleClear}>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <InputAmvox
              type="text"
              label="Descricao"
              name="descricao"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({
                    ...filtro,
                    descricao: e.target.value,
                    pagina: 1,
                  })
                })
              }
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 4 }}>
            <SelectAmvox
              label="Armazém"
              options={armazemLista}
              value={armazemSelecionado}
              onChange={handleSelectChange}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value.value}
            />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 2 }}>
            <ButtonClear type='submit' />
          </Grid2>
          <Grid2 size={{ xs: 6, md: 2 }}>
            <ButtonExcel onClick={exportExcelFile}
            />
          </Grid2>
        </Grid2>
        <TabelaDeMargens
          data={produtoLista.estoque ? produtoLista.estoque : []}
          loading={!removeLoading}
          rowCount={produtoLista.totalItems}
          pageCount={produtoLista.totalPaginas}
          paginationFiltro={handleFiltro}
          paginaAtual={produtoLista.paginaAtual}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={produtoLista.totalPaginas}
            onChange={handleFiltro}
            showFirstButton
            showLastButton
            color="error"
          />
        </Box>
      </Box>
    </>
  )
}
