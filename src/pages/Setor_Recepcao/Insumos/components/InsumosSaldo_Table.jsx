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
import { ButtonCustom } from '@/components/ButtonAmvox/ButtonsAmvox'
import AtualizarValorInsumos_Form from './AtualizarValorInsumos_Form'
import CadastrarSaidaInsumos_Form from './CadastrarSaidaInsumos_Form'

export default function InsumosSaldo_Table({ data }) {

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
        <TableContainer  component={Paper} sx={{ mt: 2, maxHeight: 'calc(100vh - 335px)' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow sx={style}>
                        {[
                            { label: 'Tipo', key: 'tipo' },
                            { label: 'Fornecedor', key: 'fornecedor' },
                            { label: 'Cod. Produto', key: 'codProduto' },
                            { label: 'Nome', key: 'nome' },
                            { label: 'Custo', key: 'custo' },
                            { label: 'UM', key: 'um' },
                            { label: 'Qtd UM', key: 'qtd_UM' },
                            { label: 'Saldo', key: 'saldo' },
                            { label: null, key: null },
                            { label: null, key: null},
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
                    {[...items].map((item) => (
                        <TableRow key={item.id} hover>
                            <TableCell sx={style}>{item.tipo}</TableCell>
                            <TableCell sx={style}>{item.fornecedor}</TableCell>
                            <TableCell sx={style}>{item.codProduto}</TableCell>
                            <TableCell sx={style}>{item.nome}</TableCell>
                            <TableCell sx={style}>R$ {item.custo}</TableCell>
                            <TableCell sx={style}>{item.um}</TableCell>
                            <TableCell sx={style}>{item.qtd_UM}</TableCell>
                            <TableCell sx={style}>{item.saldo}</TableCell>
                            <TableCell sx={style}><CadastrarSaidaInsumos_Form item={item}/></TableCell>
                            <TableCell sx={style}><AtualizarValorInsumos_Form item={item}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
