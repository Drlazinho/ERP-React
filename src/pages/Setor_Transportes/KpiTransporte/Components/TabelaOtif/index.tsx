import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';
import { ITotalKpiOTIF } from '../Otif';

type MesData = {
  mes: string;
  quantidadeAgendada: number;
  noShow: number;
  variacao: string;
  metaPercentual: string;
};

type TabelaOtifProps = {
  data: MesData[];
  dataTotal: ITotalKpiOTIF;
};

export default function TabelaOtif({ data, dataTotal }: TabelaOtifProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell>Quantidade Agendada</TableCell>
            <TableCell>No Show</TableCell>
            <TableCell>Variação</TableCell>
            <TableCell>Meta (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((linha, index) => (
            <TableRow key={index}>
              <TableCell>{linha.mes}</TableCell>
              <TableCell>
                {linha.quantidadeAgendada.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell>{linha.noShow.toLocaleString('pt-BR')}</TableCell>
              <TableCell>{linha.variacao}</TableCell>
              <TableCell>{linha.metaPercentual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {dataTotal?.totalQtdAgendada.toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.totalNoShow.toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.mediaVariacaoPercentual.toFixed(2)}%
            </TableCell>
            <TableCell>{dataTotal.mediaMetaPercentual.toFixed(2)}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
