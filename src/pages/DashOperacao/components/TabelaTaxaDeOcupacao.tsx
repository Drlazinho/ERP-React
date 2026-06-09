import { Circle } from '@mui/icons-material';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ITaxaOcupacaoResponse } from '../types';

interface ITabelaProps {
  data: ITaxaOcupacaoResponse;
}

export default function TabelaTaxaDeOcupacao({ data }: ITabelaProps) {
  function Color(v: number) {
    if (v <= 50) return '#02C875';
    if (v > 50 && v < 70) return '#FFB855';
    if (v >= 70) return '#FF5555';
  }

  const Array = [
    {
      name: 'Sede',
      value: data.estoqueTaxaSedeOcupacao,
      color: Color(data.estoqueTaxaSedeOcupacao),
    },
    {
      name: 'Cordebras',
      value: data.estoqueTaxaCordebrasOcupacao,
      color: Color(data.estoqueTaxaCordebrasOcupacao),
    },
    {
      name: 'Pós venda SP MAERSK',
      value: data.estoqueTaxaPosvendaSPOcupacao,
      color: Color(data.estoqueTaxaPosvendaSPOcupacao),
    },
    {
      name: 'Pós venda BA',
      value: data.estoqueTaxaPosvendaBAOcupacao,
      color: Color(data.estoqueTaxaPosvendaBAOcupacao),
    },
    {
      name: 'Logic',
      value: data.estoqueTaxaLogicOcupacao,
      color: Color(data.estoqueTaxaLogicOcupacao),
    },
    {
      name: 'Blocado Sede',
      value: data.estoqueTaxaBlocadoSedeOcupacao,
      color: Color(data.estoqueTaxaBlocadoSedeOcupacao),
    },
  ];

  return (
    <TableContainer sx={{ maxWidth: '100%', borderRadius: 2 }}>
      <Table sx={{ border: 'none' }} size="small">
        <TableHead>
          <TableRow sx={{ border: 'none' }}>
            <TableCell sx={{ border: 'none', fontWeight: 'bold' }}>
              Endereço
            </TableCell>
            <TableCell
              sx={{ border: 'none', fontWeight: 'bold' }}
              align="right"
            >
              Ocupação
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.map((item, index) => (
            <TableRow key={index} sx={{ border: 'none' }}>
              <TableCell sx={{ border: 'none', maxWidth: '100%' }}>
                {item.name}
              </TableCell>
              <TableCell sx={{ border: 'none', flexGrow: 1 }} align="right">
                <Circle sx={{ color: item.color, fontSize: 14, mr: 1 }} />
                {item.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
