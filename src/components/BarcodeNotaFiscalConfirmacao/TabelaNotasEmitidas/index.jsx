import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
} from '@mui/material';
import { BiError } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';
import { useNotasEmitidas } from '../../../hooks/notas-emitidas.hook';

const NotasConfirmacaoLogistica = ({ ...props }) => {
  const { listaConfirmadas } = useNotasEmitidas();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '500px',
        overflow: 'hidden',
      }}
    >
      <Table className="mt-3" sx={{ tableLayout: 'fixed' }}>
        <TableHead
          sx={{ backgroundColor: '#f5f5f5', borderBottom: '1px solid #ccc' }}
        >
          <TableRow>
            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 14 }}>
              Cliente
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 14 }}>
              Nota Fiscal
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold', fontSize: 14 }}>
              Destino
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: 'bold', fontSize: 14, textAlign: 'center' }}
            >
              Verificada
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <Box
        sx={{
          overflowY: 'auto',
          flexGrow: 1,
        }}
      >
        <Table className="mt-3" sx={{ tableLayout: 'fixed' }}>
          <TableBody>
            {listaConfirmadas
              ?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="center" sx={{ fontSize: 14 }}>
                    {item.cliente}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 14 }}>
                    {item.doc}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: 14 }}>
                    {item.ufDest}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: 14, textAlign: 'center' }}
                  >
                    {item.enviada === 0 ? (
                      <BiError size={20} style={{ color: 'orange' }} />
                    ) : (
                      <BsCheckCircleFill size={24} style={{ color: 'green' }} />
                    )}
                  </TableCell>
                </TableRow>
              ))
              .reverse()}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default NotasConfirmacaoLogistica;
