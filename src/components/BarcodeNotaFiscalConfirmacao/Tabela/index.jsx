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
import { useEntregas } from '../../../hooks/entregas-provider.hook';
import { BiError } from 'react-icons/bi';
import { BsCheckCircleFill } from 'react-icons/bs';

const NotasConfirmacao = () => {
  const { listaConfirmadas } = useEntregas();

  return (
    <Table className="mt-3">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant="subtitle2">Nota Fiscal</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Nome</Typography></TableCell>
              <TableCell><Typography variant="subtitle2">Destino</Typography></TableCell>
              <TableCell align="center"><Typography variant="subtitle2">Expedido</Typography></TableCell>
            </TableRow>
          </TableHead>
      <TableBody>
        {listaConfirmadas
          ?.map((item, index) => (
            <TableRow key={index}>
                <TableCell><Typography fontSize={14}>{item.documento}</Typography></TableCell>
                <TableCell><Typography fontSize={14}>{item.nome}</Typography></TableCell>
                <TableCell><Typography fontSize={14}>{item.destino}</Typography></TableCell>
                <TableCell align="center">
                  {item.expedido === 0 ? (
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
  );
};

export default NotasConfirmacao;
