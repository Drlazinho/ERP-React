import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { ITotalKpiFrete } from '../FreteSection';

type MesData = {
  mes: string;
  meta: string;
  realizado: string;
  nfFaturada: string;
  variacao: string;
  metaPercentual: string;
  editavel?: boolean;
};

type TabelaFreteProps = {
  data: MesData[];
  dataTotal?: ITotalKpiFrete;
};

export default function TabelaFrete({ data, dataTotal }: TabelaFreteProps) {
  const [dezembroData, setDezembroData] = useState({
    meta: '',
    realizado: '',
    nfFaturada: '',
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell>Meta (R$)</TableCell>
            <TableCell>Realizado (R$)</TableCell>
            <TableCell>NF Faturada</TableCell>
            <TableCell>Variação</TableCell>
            <TableCell>Meta (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((linha, index) => (
            <TableRow key={index}>
              <TableCell>{linha.mes}</TableCell>
              {linha.editavel ? (
                <>
                  <TableCell>
                    <TextField
                      size="small"
                      value={dezembroData.meta}
                      onChange={(e) =>
                        setDezembroData({
                          ...dezembroData,
                          meta: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={dezembroData.realizado}
                      onChange={(e) =>
                        setDezembroData({
                          ...dezembroData,
                          realizado: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      value={dezembroData.nfFaturada}
                      onChange={(e) =>
                        setDezembroData({
                          ...dezembroData,
                          nfFaturada: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>{linha.variacao}</TableCell>
                  <TableCell>{linha.metaPercentual}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{linha.meta}</TableCell>
                  <TableCell>{linha.realizado}</TableCell>
                  <TableCell>{linha.nfFaturada}</TableCell>
                  <TableCell>{linha.variacao}</TableCell>
                  <TableCell>{linha.metaPercentual}</TableCell>
                </>
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>
              {dataTotal?.totalMeta.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.totalRealizado.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.totalNfFaturada.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell>
              {dataTotal?.mediaVariacaoPercentual.toFixed(2)}%
            </TableCell>
            <TableCell>{dataTotal?.mediaMetaPercentual.toFixed(2)}%</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
