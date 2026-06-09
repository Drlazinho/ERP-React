import { People } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export default function TabelaIndicadoresNPS({ dataFetch }) {
  if (!dataFetch) {
    return <div>Carregando dados...</div>;
  }
  const {
    detratores,
    passivos,
    porcentagemDetratores,
    porcentagemPassivos,
    porcentagemPromotores,
    promotores,
    totalRespondentes,
  } = dataFetch;

  const data = [
    {
      label: 'Promotores',
      value: promotores,
      percentage: `${porcentagemPromotores || 0}`,
      icon: <People style={{ color: '#00C853' }} />,
    },
    {
      label: 'Neutros',
      value: passivos,
      percentage: `${porcentagemPassivos || 0}`,
      icon: <People style={{ color: '#FFAB00' }} />,
    },
    {
      label: 'Detratores',
      value: detratores,
      percentage: `${porcentagemDetratores || 0}`,
      icon: <People style={{ color: '#D50000' }} />,
    },
    {
      label: 'Total de Respondentes',
      value: totalRespondentes || 0,
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
                {item.value || 0}
              </TableCell>
              <TableCell align="center" sx={{ border: 'none' }}>
                {item.percentage || 0}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
