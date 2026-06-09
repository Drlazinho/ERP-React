import { People } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IPosVendaOperacaoResponse } from '../types';

interface ITabelaIndicadoresNPS {
  dataFetch: IPosVendaOperacaoResponse;
}

export default function TabelaIndicadoresNPS({
  dataFetch
}: ITabelaIndicadoresNPS) {
  const {
    detratores,
    neutros,
    porcentagemDetratores,
    porcentagemNeutros,
    porcentagemPromotores,
    promotores,
    totalRespondentes,
  } = dataFetch;

  const data = [
    {
      label: 'Promotores',
      value: promotores,
      percentage: `${porcentagemPromotores}%`,
      icon: <People style={{ color: '#00C853' }} />,
    },
    {
      label: 'Neutros',
      value: neutros,
      percentage: `${porcentagemNeutros}%`,
      icon: <People style={{ color: '#FFAB00' }} />,
    },
    {
      label: 'Detratores',
      value: detratores,
      percentage: `${porcentagemDetratores}%`,
      icon: <People style={{ color: '#D50000' }} />,
    },
    {
      label: 'Total de Respondentes',
      value: totalRespondentes,
      icon: <People style={{ color: '#616161' }} />,
    },
  ];

  return (
    <TableContainer
      sx={{
        width: '100%',
        borderRadius: 2,
        overflow: 'auto',
      }}
    >
      <Table sx={{ border: 'none' }} size="small">
        <TableHead>
          <TableRow sx={{ border: 'none' }}>
            <TableCell sx={{ border: 'none' }}></TableCell>
            <TableCell sx={{ border: 'none' }}>Categoria</TableCell>
            <TableCell align="center" sx={{ border: 'none' }}>
              Quantidade
            </TableCell>
            <TableCell align="center" sx={{ border: 'none' }}>
              %
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none' }}>{item.icon}</TableCell>
              <TableCell sx={{ border: 'none' }}>{item.label}</TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                {item.value}
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                {item.percentage}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
