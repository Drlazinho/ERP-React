import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import RegistroImagem_Dialog from './RegistrarImagem_Dialog';
import { update } from 'react-spring';

const TabelaProdutos = React.memo(
  ({ lista, onHoverImage, onHoverOut, onClickImage, update }) => {
    return (
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Apelido</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>EAN</TableCell>
              <TableCell>DUN</TableCell>
              <TableCell>Sigla</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Imagem</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lista.map((item) => (
              <TableRow
                key={item.codigo}
                hover
                onMouseEnter={() => onHoverImage(item.imagem)}
                onMouseLeave={onHoverOut}
              >
                <TableCell>{item.codigo}</TableCell>
                <TableCell>{item.apelido}</TableCell>
                <TableCell>R$ {item.preco}</TableCell>
                <TableCell>{item.ean}</TableCell>
                <TableCell>{item.dun}</TableCell>
                <TableCell>{item.sigla}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>
                  <RegistroImagem_Dialog item={item} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

export default TabelaProdutos;
