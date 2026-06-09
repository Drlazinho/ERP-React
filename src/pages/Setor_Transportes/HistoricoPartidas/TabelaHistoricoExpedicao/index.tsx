import { memo } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  TableBody,
  TextField,
} from '@mui/material';
import moment from 'moment';

export interface Expedicao {
  id: number;
  chegada: string;
  prioridade: string;
  doca: string;
  destino: string;
  uf: string;
  motorista: string;
  veiculo: string;
  cubagem: string;
  tipO_CARGA: string;
  transportadora: string;
  status: string;
}

interface TabelaExpedicaoHistoricoProps {
  data?: Expedicao[];
}

const TabelaExpedicaoHistoricoComponent = ({
  data,
}: TabelaExpedicaoHistoricoProps) => {
  const lista = Array.isArray(data) ? data : [];

  const renderColorStatus = (status: string): string | undefined => {
    switch (status) {
      case 'EM DOCA':
      case 'EM CARREGAMENTO':
      case 'EM DESCARGA':
        return '#FFC470';
      case 'ACESSANDO O PATIO':
      case 'CANCELADO':
        return '#DD5746';
      case 'LIBERADO':
        return '#799351';
      case 'AGUARD. SEPARAÇÃO':
        return '#f8a835';
      default:
        return undefined;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Hora De Chegada</TableCell>
            <TableCell align="center">Prioridade</TableCell>
            <TableCell align="center">Doca</TableCell>
            <TableCell align="center">Destino/Cliente</TableCell>
            <TableCell align="center">UF</TableCell>
            <TableCell align="center">Motorista</TableCell>
            <TableCell align="center">Veiculo</TableCell>
            <TableCell align="center">Cub</TableCell>
            <TableCell align="center">Tipo Carga</TableCell>
            <TableCell align="center">Tipo Transporte</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lista.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell align="center">
                {moment(row.chegada).format('DD/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell align="center">{row.prioridade}</TableCell>
              <TableCell align="center">
                <b>{row.doca}</b>
              </TableCell>
              <TableCell align="center">{row.destino}</TableCell>
              <TableCell align="center">{row.uf}</TableCell>
              <TableCell align="center">{row.motorista}</TableCell>
              <TableCell align="center">{row.veiculo}</TableCell>
              <TableCell align="center">{row.cubagem}</TableCell>
              <TableCell align="center">{row.tipO_CARGA}</TableCell>
              <TableCell align="center">
                <img
                  width="160"
                  height="60"
                  src={`data:image/png;base64, ${row.transportadora}`}
                  alt="logo"
                />
              </TableCell>
              <TableCell align="center">
                <TextField
                  variant="outlined"
                  margin="normal"
                  size="small"
                  slotProps={{
                    input: {
                      style: {
                        fontSize: 10,
                        padding: 4,
                        textAlign: 'center',
                        color: renderColorStatus(row.status),
                      },
                    },
                    inputLabel: {
                      style: {
                        fontSize: 12,
                      },
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: `2px solid ${renderColorStatus(row.status)}`,
                        borderRadius: '16px',
                      },
                    },
                    '& .MuiInputBase-input.Mui-disabled': {
                      WebkitTextFillColor: renderColorStatus(row.status),
                    },
                  }}
                  disabled
                  value={row.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const TabelaExpedicaoHistorico = memo(
  TabelaExpedicaoHistoricoComponent,
  (prevProps, nextProps) => Object.is(prevProps, nextProps)
);
