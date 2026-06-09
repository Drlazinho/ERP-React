import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    IconButton,
    Typography,
} from '@mui/material'
import useSortableDataNew from '@/hooks/sortable.hook'
import formatDateTotvs from '@/utils/formatDataTotvs'
import { formatDateTime } from '@/utils/formatDateInput'

export default function HistoricoInsumos_Table({ data }) {

    const style = {
        whiteSpace: 'nowrap',
        fontSize: '10px',
        textAlign: 'left'
    }

    const { items, requestSort, sortConfig } = useSortableDataNew(data)

    const getClassNamesFor = (name) => {
        if (!sortConfig) return
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return (
        <TableContainer  component={Paper} sx={{ mt: 2, maxHeight: 'calc(100vh - 275px)' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow sx={style}>
                        {[
                            { label: 'Produto', key: 'produto' },
                            { label: 'Movimentação', key: 'tipoMovimentacao' },
                            { label: 'Data Mov.', key: 'dataMov' },
                            { label: 'Qtd. Mov.', key: 'qtdMov' },
                            { label: 'Saldo Novo', key: 'saldoNovo' },
                            { label: 'Saldo Anterior', key: 'saldoAnterior' },
                            { label: 'Setor', key: 'setor' },
                            { label: 'Destino', key: 'descricao' },
                            { label: 'Usuário', key: 'usuario' },
                            { label: 'Usuario Sistema', key: 'usuarioSistema' },
                        ].map((col) => (
                            <TableCell sx={style} key={col.label}>
                                {col.key ? (
                                    <Button
                                        variant="text"
                                        onClick={() => requestSort(col.key)}
                                        sx={{
                                            fontWeight: sortConfig?.key === col.key ? 'bold' : 'normal',
                                            color: sortConfig?.key === col.key ? 'red' : 'inherit',
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {col.label}
                                    </Button>
                                ) : (
                                    <Typography fontSize="0.875rem">{col.label}</Typography>
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...items].reverse().map((item) => (
                        <TableRow key={item.id} hover>
                            <TableCell sx={style}>{item.produto}</TableCell>
                            <TableCell sx={style}>{item.tipoMovimentacao}</TableCell>
                            <TableCell sx={style}>{formatDateTime(item.dataMov)}</TableCell>
                            <TableCell sx={style}>{item.qtdMov}</TableCell>
                            <TableCell sx={style}>{item.saldoNovo}</TableCell>
                            <TableCell sx={style}>{item.saldoAnterior}</TableCell>
                            <TableCell sx={style}>{item.setor}</TableCell>
                            <TableCell sx={style}>{item.descricao}</TableCell>
                            <TableCell sx={style}>{item.usuario}</TableCell>
                            <TableCell sx={style}>{item.usuarioSistema}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
