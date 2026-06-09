import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import formatDateTotvs from '../../../../utils/formatDataTotvs';

import ModalCubagemSelect from './modalCubagemSelect';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="right">{row.numeroPedido}</TableCell>
        <TableCell component="th" scope="row">
          {row.cliente}
        </TableCell>
        <TableCell align="right">{row.cnpj}</TableCell>
        <TableCell align="right">{formatDateTotvs(row.data)}</TableCell>
        <TableCell align="right">R$ {row.valor}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Produtos
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: 'bold' }}>Código</TableCell>
                    <TableCell style={{ fontWeight: 'bold' }}>
                      Descrição
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Quant.
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Valor Unit.
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Valor Total
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Item
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} align="right">
                      Local
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.produtos.map((listaProduto) => (
                    <TableRow key={listaProduto.codigo}>
                      <TableCell component="th" scope="row">
                        {listaProduto.codigo}
                      </TableCell>
                      <TableCell>{listaProduto.descricao}</TableCell>
                      <TableCell align="right">
                        {listaProduto.quantidade}
                      </TableCell>
                      <TableCell align="right">
                        R$ {listaProduto.valorUnitario}
                      </TableCell>
                      <TableCell align="right">
                        R$ {listaProduto.valorTotal}
                      </TableCell>
                      <TableCell align="right">{listaProduto.item}</TableCell>
                      <TableCell align="right">{listaProduto.local}</TableCell>
                    </TableRow>
                  ))}
                  <TableCell
                    align="right"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      borderBottom: 'unset',
                    }}
                  >
                    <ModalCubagemSelect lista={props} />
                  </TableCell>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TabelaDePedidos({ data = [], handleSubmitPedido }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Nº Pedido
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }}>Cliente</TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              CNPJ
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Data
            </TableCell>
            <TableCell style={{ fontWeight: 'bold' }} align="right">
              Valor Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!Array.isArray(data) || data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align="center">
                Nenhum pedido encontrado
              </TableCell>
            </TableRow>
          ) : (
            data.map((row) => (
              <Row
                key={row.name}
                row={row}
                handleSubmitPedido={handleSubmitPedido}
              />
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
