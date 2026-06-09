import { Cancel, CheckCircle } from "@mui/icons-material";
import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '50%',
    height: '50%',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const RegistrarNotaFiscal = ({ }) => {


    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <TableContainer component={Paper} sx={{ minWidth: '100%', height: 200, overflow: 'scroll' }} >
                    <Table stickyHeader size="small" aria-label="simple table">
                        <TableHead sx={{ bgcolor: '#d3d3d3' }}>
                            <TableRow>
                                <TableCell sx={{ color: '#fff', bgcolor: '#000' }}>Nota</TableCell>
                                <TableCell align="right" sx={{ color: '#fff', bgcolor: '#000' }}>Liberado?</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listaNf.map((item) => (
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{item.nf}
                                    </TableCell>

                                    <TableCell align="right">        {
                                        item.numeroSaidas === 1 ? (<CheckCircle color='success' />
                                        ) : (<Cancel color='#f00' />)
                                    }</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    );
}