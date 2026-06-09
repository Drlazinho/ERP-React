import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import Loader from '@/components/Loader';
import { IAtendimentoItem, IAtendimentoResponse } from '../../types';

type Column = {
  label: string;
  key: string;
};

type TableData = {
  nomeUsuario: string;
  satisfacaoGeral: number;
  promotores: number;
  detratores: number;
  razoaveis: number;
  totalAvaliacoes: number;
  totalAtendimentos: number;
  percentualDeAtendimentosAvaliados: string;
  observacao: string;
};

interface TabelaTelefoneProps {
  loading?: boolean;
  data?: IAtendimentoResponse[];
}

const columns: Column[] = [
  { label: 'Agente', key: 'nomeUsuario' },
  { label: 'Satisfação', key: 'satisfacaoGeral' },
  { label: 'Promotores', key: 'promotores' },
  { label: 'Detratores', key: 'detratores' },
  { label: 'Neutro', key: 'razoaveis' },
  { label: 'Total de Avaliações', key: 'totalAvaliacoes' },
  { label: 'Total de Atendimentos', key: 'totalAtendimentos' },
  {
    label: '% de Atendimentos Avaliados',
    key: 'percentualDeAtendimentosAvaliados',
  },
  { label: 'Observação', key: 'observacao' },
];

const TabelaTelefone: React.FC<TabelaTelefoneProps> = ({
  loading,
  data = [],
}) => {
  const formatRowData = (item: IAtendimentoItem): TableData => ({
    nomeUsuario: item.nomeUsuario || 'N/A',
    satisfacaoGeral: item.satisfacaoGeral || 0,
    promotores: item.promotores || 0,
    detratores: item.detratores || 0,
    razoaveis: item.razoaveis || 0,
    totalAvaliacoes: item.totalAvaliacoes || 0,
    totalAtendimentos: item.totalAtendimentos || 0,
    percentualDeAtendimentosAvaliados:
      `${item.percentualDeAtendimentosAvaliados}%` || '0%',
    observacao: item.observacao || '',
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        fontFamily: 'Poppins',
        maxHeight: 580,
        overflowY: 'auto',
        borderRadius: '10px',
        '&::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none',
      }}
    >
      <Box>
        <Typography sx={{ fontWeight: 'bold', padding: '10px' }}>
          Telefone
        </Typography>
      </Box>
      <Table
        stickyHeader
        aria-label="tabela de telefone"
        sx={{ bgcolor: '#FFFFFF' }}
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.key}
                align="center"
                sx={{ fontWeight: 'bold', backgroundColor: '#FFFFFF' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Loader />
              </TableCell>
            </TableRow>
          ) : !data || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2">Nenhum dado encontrado</Typography>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => {
              const atendimentoItem = item as unknown as IAtendimentoItem;
              const row = formatRowData(atendimentoItem);
              return (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${column.key}-${index}`}
                      align="center"
                      sx={
                        column.key === 'percentualDeAtendimentosAvaliados'
                          ? {
                              color:
                                parseFloat(
                                  row.percentualDeAtendimentosAvaliados.replace(
                                    '%',
                                    ''
                                  )
                                ) >= 10
                                  ? 'green'
                                  : 'red',
                              fontWeight: 'bold',
                            }
                          : column.key === 'satisfacaoGeral'
                          ? {
                              color:
                                row.satisfacaoGeral >= 85 ? 'green' : 'red',
                              fontWeight: 'bold',
                            }
                          : undefined
                      }
                    >
                      {column.key === 'satisfacaoGeral'
                        ? `${row.satisfacaoGeral}%`
                        : row[column.key as keyof TableData]}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaTelefone;
