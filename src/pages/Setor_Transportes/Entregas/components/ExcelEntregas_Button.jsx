import React from 'react'
import formatDateTotvs from '@/utils/formatDataTotvs'
import { formatDateSendApi } from '@/utils/formatDateInput'
import { ButtonExcel } from '@/components/ButtonAmvox/ButtonsAmvox'
const ExcelJS = require('exceljs')

export default function ExcelEntregas_Button({ dataApi = [] }) {
  const exportExcelFile = () => {

    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('My Sheet')
    sheet.properties.defaultRowHeight = 20

    sheet.columns = [
      {
        header: 'Nota Fiscal',
        key: 'documento',
        width: 15,
      },
      { header: 'Nome', key: 'nome', width: 60 },
      {
        header: 'Dest.',
        key: 'destino',
        width: 20,
      },
      {
        header: 'Dias',
        key: 'dias',
        width: 10,
      },
      {
        header: 'Opção',
        key: 'opcao',
        width: 10,
      },
      {
        header: 'Emissão',
        key: 'emissao',
        width: 20,
      },
      {
        header: 'Produção.',
        key: 'saida',
        width: 15,
      },
      {
        header: 'Previsão',
        key: 'previsao',
        width: 10,
      },
      {
        header: 'Entregue',
        key: 'entregue',
        width: 10,
      },
      {
        header: 'Cond. pgto',
        key: 'condPgto',
        width: 10,
      },
      {
        header: 'Exp.',
        key: 'expedido',
        width: 10,
      },
      {
        header: 'Frete',
        key: 'classificFrete',
        width: 10,
      },
      {
        header: 'Romaneio',
        key: 'romaneio',
        width: 10,
      },
    ]

    dataApi.map((item) => {
      const opcao10 = (item) => {
        if (item.dias > 10) {
          return '> 10 dias'
        }
        if (item.dias < 10) {
          return '< 10 dias'
        }
      }
      const expedido = () => {
        if (item.expedido === 0) {
          return 'Não'
        }
        if (item.enviada === 1) {
          return 'Sim'
        }
      }
      const frete = (item) => {
        switch (item.classificFrete) {
          case '0001':
            return '1 - VENDA'
          case '0002':
            return '2 - POS VENDA'
          case '0003':
            return '3 - VENDA FUNCIONÁRIO'
          case '0004':
            return '4 - RETIRADA FOB/FRATOS'
          case '0005':
            return '5 - BONIF. FUNCIONÁRIO'
          default:
            break
        }
      }

      sheet.addRow({
        documento: item.documento,
        nome: item.nome,
        destino: item.destino,
        dias: item.dias,
        opcao: opcao10(item),
        emissao: formatDateTotvs(item.emissao),
        saida: formatDateTotvs(item.saida),
        previsao: formatDateTotvs(item.previsao),
        entregue: formatDateTotvs(item.entregue),
        condPgto: item.condPgto,
        expedido: expedido(),
        classificFrete: frete(item),
        romaneio: item.romaneio,
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
      anchor.download = `Entrega - ${formatDateSendApi(new Date())}.xlsx`
      anchor.click()
      window.URL.revokeObjectURL(url)
    })
  }

  return (
    <ButtonExcel
      onClick={exportExcelFile}
    />
  )
}
