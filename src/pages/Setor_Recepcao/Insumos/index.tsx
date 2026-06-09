import HeaderAmvox from '@/components/HeaderAmvox'
import TabsAmvox from '@/components/TabsAmvox'
import { Box } from '@mui/material'
import SaldoInsumos_Tab from './views/SaldoInsumos_Tab'
import HistoricoInsumos_Tab from './views/HistoricoInsumos_Tab'

export default function Insumos() {
  return (
    <Box sx={{ pl: 2 }}>
        <HeaderAmvox title='Insumos'/>
        <TabsAmvox
          tabs={[
            { label: 'Saldo de Insumos', content: <SaldoInsumos_Tab/> },
            { label: 'Histórico de Movimentação de Insumos', content: <HistoricoInsumos_Tab />},
          ]}
        />
    </Box>

)
}
