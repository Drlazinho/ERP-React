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
import { IMediaGeralItem } from '../../types';

interface TabelaTelefoneProps {
  loading?: boolean;
  data?: IMediaGeralItem[];
}

const columns = [
  { label: 'Agente', key: 'nome' },
  { label: '% WhatsApp', key: 'whatsapp' },
  { label: '% Telefone', key: 'telefone' },
  { label: '% Média Geral', key: 'media' },
];

const formatPercentage = (value?: number) => {
  if (value === undefined || value === null) return '-';
  return `${value.toFixed(2)}%`;
};

const TabelaTelefone: React.FC<TabelaTelefoneProps> = ({
  loading,
  data = [],
}) => {
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
              const whatsappValue = item.mediasPorMeioComunicacao?.find(
                (m) => m.key === 'Whatsapp'
              )?.value;
              const telefoneValue = item.mediasPorMeioComunicacao?.find(
                (m) => m.key === 'Telefone'
              )?.value;
              const mediaValue = item.media;

              const getCellStyle = (value?: number) => ({
                color: value !== undefined && value >= 85 ? 'green' : 'red',
                fontWeight: 'bold',
              });

              return (
                <TableRow key={index}>
                  <TableCell align="center">{item.nome || '-'}</TableCell>
                  <TableCell align="center" sx={getCellStyle(whatsappValue)}>
                    {formatPercentage(whatsappValue)}
                  </TableCell>
                  <TableCell align="center" sx={getCellStyle(telefoneValue)}>
                    {formatPercentage(telefoneValue)}
                  </TableCell>
                  <TableCell align="center" sx={getCellStyle(mediaValue)}>
                    {mediaValue !== undefined && mediaValue !== null
                      ? `${mediaValue.toFixed(2)}%`
                      : '-'}
                  </TableCell>
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
