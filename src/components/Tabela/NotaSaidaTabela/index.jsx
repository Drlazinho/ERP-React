import { useMemo } from "react";
import { Box } from "@mui/material";
import {MaterialReactTable} from "material-react-table";
import { formatDateTime } from "../../../utils/formatDateInput";


const NotasSaidaTabela = ({ nfLista }) => {

    const columns = useMemo(
        () => [
            {
                accessorKey: 'chaveNfe',
                header: 'CHAVE DA NOTA',
                size: 30,
            },
            {
                accessorKey: 'nf',
                header: 'NOTA FISCAL',
                size: 10,
            },
            {
                accessorKey: 'numeroSaidas',
                header: 'QUANTIDADE BIPAGEM',
                size: 10,
            },
            {
                accessorKey: 'usuario',
                header: 'USUARIO',
                size: 10,
            },
            {
                accessorKey: 'liberadoPor',
                header: 'LOCALIZAÇÃO',
                size: 10,
            },
            {
                accessorKey: 'dataSaidaPortaria',
                header: 'DATA SAIDA',
                Cell: ({ cell }) => {
                    return(
                        <Box component={'span'}>
                            {	cell.getValue() === '0001-01-01T00:00:00' ? null : formatDateTime(cell.getValue())}
                        </Box>
                    )
                },
                size: 10,
            },
        ],
        [],
    );
    return <MaterialReactTable columns={columns} data={nfLista}
    enableStickyHeader
    muiTopToolbarProps={{ sx: { bgcolor: '#c3c3c3', color: '#fff' } }}
    muiTableHeadCellProps={{ sx: { bgcolor: '#000', color: '#fff' } }}
    muiTableHeadCellFilterTextFieldProps={{ sx: { bgcolor: '#f008', color: '#fff', borderRadius: 3, } }}
    initialState={{ density: 'comfortable' }}

/>;
};
   

export default NotasSaidaTabela;