import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CircularProgress } from '@mui/material';

export default function TabelaQRcodes({ data, loading }) {
  const qrCodes = data || [];

  return (
    <TableContainer
      sx={{
        width: '100%',
        borderRadius: 2,
        overflow: 'auto',
        maxHeight: 600,
      }}
    >
      <Table sx={{ border: 'none' }} size="small">
        <TableHead>
          <TableRow sx={{ border: 'none' }}>
            <TableCell
              sx={{ border: 'none', fontWeight: 'bold', fontSize: 16 }}
            >
              QR Codes não bipados
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : qrCodes.length > 0 ? (
            qrCodes.map((qrCode, index) => (
              <TableRow key={index} sx={{ border: 'none' }} hover>
                <TableCell
                  sx={{
                    borderTop: '1px solid #ccc',
                    fontSize: 16,
                    padding: 1,
                  }}
                >
                  {qrCode}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Nenhum QR Code nao bipado</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
