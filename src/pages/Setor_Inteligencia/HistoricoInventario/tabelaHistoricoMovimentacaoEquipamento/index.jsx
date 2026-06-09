import { Box } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { useMemo } from "react"
import { formatDateTime } from "@/utils/formatDateInput";

const HistoricoMovimentacaoEquipamentoTabela = ({ data }) => {

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 10,
            },
            {
                accessorKey: 'tipo',
                header: 'TIPO',
                size: 10,
            },
            {
                accessorKey: 'marca',
                header: 'MARCA',
                size: 10,
            },
            {
                accessorKey: 'patrimonio',
                header: 'PATRIMÔNIO',
                size: 10,
            },
            {
                accessorKey: 'descricao',
                header: 'DESCRIÇÃO',
                size: 10,
            },
            {
                accessorKey: 'dataRegistro',
                header:'DATA REGISTRO',
                Cell: ({ cell }) => {
                    return(
                        <Box component={'span'}>
                            {	cell.getValue() === '0001-01-01T00:00:00' ? null : formatDateTime(cell.getValue())}
                        </Box>
                    )
                },
                size:10,
            },
            {
                accessorKey: 'nome',
                header: 'NOME',
                size: 10,
            },
            {
                accessorKey: 'matricula',
                header: 'MATRÍCULA',
                size: 10,
            },
            {
                accessorKey: 'setor',
                header: 'SETOR',
                size: 10,
            },
            {
                accessorKey: 'observacao',
                header: 'OBSERVAÇÃO',
                size: 10,
            },
        ],
        [],
    );
    return<MaterialReactTable columns={columns} data={data}
    enableStickyHeader
    muiTopToolbarProps={{ sx: { bgcolor: '#c3c3c3', color: '#fff' } }}
    muiTableHeadCellProps={{ sx: { bgcolor: '#000', color: '#fff' } }}
    muiTableHeadCellFilterTextFieldProps={{ sx: { bgcolor: '#f008', color: '#fff', borderRadius: 3, } }}
    initialState={{ density: 'comfortable', sorting: [{ id: 'status', asc: false }] }}
   
    />;
};

export default HistoricoMovimentacaoEquipamentoTabela;