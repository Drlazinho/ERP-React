import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IImportacaoItem } from '../types';
import SettingsIcon from '@mui/icons-material/Settings';
import ModalPutRetornoImport from './ModalPutRetornoImportacao';
import formatDateTotvs from '@/utils/formatDataTotvs';
interface ITabelaProps {
  data: IImportacaoItem[];
  onUpdate?: () => void;
}

export default function TabelaRetornoImportacao({
  data,
  onUpdate,
}: ITabelaProps) {
  return (
    <>
      <Box sx={{ display: 'flex', overflow: 'hidden' }}>
        <TableContainer
          component={Paper}
          sx={{
            flex: '0 0 auto',
            width: 'auto',
            borderRight: 'none',
          }}
        >
          <Table size="small" sx={{ minWidth: 100 }}>
            <TableHead sx={{ background: '#BBC5CA' }}>
              <TableRow sx={{ height: '40px' }}>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  <SettingsIcon />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow sx={{ height: '50px' }} key={row.id}>
                  <TableCell sx={{ whiteSpace: 'nowrap', height: 'inherit' }}>
                    <ModalPutRetornoImport row={row} onUpdate={onUpdate} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TableContainer
          component={Paper}
          sx={{
            flex: '1 1 auto',
            overflowX: 'auto',
          }}
        >
          <Table size="small" sx={{ minWidth: 650 }}>
            <TableHead sx={{ background: '#BBC5CA' }}>
              <TableRow sx={{ height: '40px' }}>
                <TableCell>FORNECEDOR</TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  PI
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  INVOICE
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  CÓDIGO PRO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  APELIDO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  QTD
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  BL
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  CNTR
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TIPO CNTR
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  AGENTE DE CARGA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  NAVIO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TERMINAL DE DESTINO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ETD
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ETA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TRANSITE TIME
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  VENCIMENTO DEMURRAGE
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  PRESENÇA DE CARGA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  DI
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  DATA REGISTRO DI
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  CANAL
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  LOCAL DE ENTREGA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TRANSPORTADORA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ENTREGA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  MÊS
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  NF
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ANO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  PGTO AFRMM
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  VALOR DA INVOICE
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TAXA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  FATURA EM R$
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  IMPOSTOS
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  AFRMM
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  FRETE
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ORIGEM
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TAXA DIARIA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  FRETE BRL
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  SEGURO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TAXA SEGURO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  VALOR CIF
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  PO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  DESOVADO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  ARMADOR
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TEMPO ETA X PC
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TEMPO PC X REGISTRO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TEMPO REGISTRO X ENTREGA
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  TEMPO TOTAL DESEMBARAÇO
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  VENCIMENTO ARMAZENAGEM
                </TableCell>
                <TableCell
                  sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                  align="center"
                >
                  PRAZO PARA REGISTRO(90 DIAS)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    height: '50px',
                  }}
                >
                  <TableCell sx={{ whiteSpace: 'nowrap', height: 'inherit' }}>
                    {row.fornecedor || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.pi || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.invoice || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.codPro || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.apelido || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.qtde || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.nro_BL || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.cntr || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.tipo_Cntr || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.agente_Carga || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.navio || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.terminal_Destino || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.etd) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.eta) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.transiTime || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.venc_Demurrage) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.presenc_Carga) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.di || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.dtRegistro_DI) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.canal || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.local_Entrega || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.transportadora || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.dtEntrega || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.mes || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.nf || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.ano || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.pgto_AFRMM || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.valor_Invoice || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {` ${row.taxa}` || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.fatura || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {`${row.impostos}` || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.afrmm || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.frete || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.origem || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {`${row.taxa_Diaria}` || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.frete_BLR || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.seguro ? ` ${row.seguro}` : '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {(row.taxa_Seguro && `${row.taxa_Seguro}%`) || '0%'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.valor_CIF ? `${row.valor_CIF}` : '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.po || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.desovado || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.armador || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.tmp_ETA_PC || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.tmp_Pc_Registr || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.tmp_Regist_Entreg || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {row.tmp_TTL_Desemb || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.venc_Armazengm) || '-'}
                  </TableCell>
                  <TableCell
                    sx={{ whiteSpace: 'nowrap', height: 'inherit' }}
                    align="center"
                  >
                    {formatDateTotvs(row.prz_Registr_90DD) || '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
