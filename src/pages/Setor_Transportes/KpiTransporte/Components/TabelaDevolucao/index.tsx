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
import { ITotalKpiDevolucao } from '../DevolucaoSection';

type MesData = {
  mes: string;
  volumeExpedido: number;
  volumeDevolvido: number;
  variacao: string;
  metaPercentual: string;
};

type TabelaDevolucaoProps = {
  data: MesData[];
  dataTotal: ITotalKpiDevolucao;
};

export default function TabelaDevolucao({
  data,
  dataTotal,
}: TabelaDevolucaoProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell>Volume expedido</TableCell>
            <TableCell>Volume devolvido</TableCell>
            <TableCell>Variação</TableCell>
            <TableCell>Meta (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((linha, index) => (
            <TableRow key={index}>
              <TableCell>{linha.mes}</TableCell>
              <TableCell>
                {linha.volumeExpedido.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell>
                {linha.volumeDevolvido.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell>{linha.variacao}</TableCell>
              <TableCell>{linha.metaPercentual}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {dataTotal?.totalVolumeExpedido.toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.totalVolumeDevolvido.toLocaleString('pt-BR', {
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
