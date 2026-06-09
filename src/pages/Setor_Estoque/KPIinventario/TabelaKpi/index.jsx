import * as React from 'react';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Collapse,
  IconButton,
} from '@mui/material';
import { CiCircleCheck, CiCircleInfo } from 'react-icons/ci';
import { IoAlertCircle, IoAlertCircleSharp } from 'react-icons/io5';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { ModalEditar } from '../ModalEditar';

const nomesMeses = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

function Row(props) {
  const { row, handleFetch } = props;
  const [open, setOpen] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [dataEdicao, setDataEdicao] = React.useState(null);

  const handleOpenModal = (rowData) => {
    setDataEdicao(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDataEdicao(null);
  };

  return (
    <>
      <TableRow key={row.mes}>
        <TableCell component="th" scope="row">
          {nomesMeses[row.mes - 1]}
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row?.resultados?.map((item) => (
          <TableCell
            key={item.armazem}
            style={{
              backgroundColor: item.qtdContada < 90 ? '#FECACA' : '#BBF7D0',
            }}
          >
            {item.acuracidade}
          </TableCell>
        ))}
        <TableCell
          style={{
            backgroundColor: row.acuracidadeGeral < 90 ? '#FECACA' : '#BBF7D0',
          }}
        >
          {row.acuracidadeGeral}
        </TableCell>
        <TableCell
          style={{
            backgroundColor: row.acuracidadeGeral < 90 ? '#FECACA' : '#BBF7D0',
          }}
          sx={{
            display: 'flex',
            justifyContent: 'start',
            gap: '0.5rem',
          }}
        >
          <IconButton
            sx={{ color: '#1565c0', cursor: 'pointer' }}
            size="small"
            onClick={() => handleOpenModal(row)}
          >
            <ModeEditIcon />
          </IconButton>
          {/* <IconButton sx={{ color: '#A00', cursor: 'pointer' }} size="small">
            <DeleteForeverIcon />
          </IconButton>
          <IconButton sx={{ color: '#9c2fb0', cursor: 'pointer' }} size="small">
            <VisibilityIcon />
          </IconButton> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={14}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Detalhes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mês</TableCell>
                    <TableCell>ARM 30</TableCell>
                    <TableCell>ARM 40</TableCell>
                    <TableCell>ARM 50</TableCell>
                    <TableCell>ARM 51</TableCell>
                    <TableCell>ARM 52</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={row.mes}>
                    <TableCell component="th" scope="row">
                      {nomesMeses[row.mes - 1]}
                    </TableCell>
                    {row?.resultados?.map((item) => (
                      <TableCell
                        key={item.armazem}
                        style={{
                          backgroundColor:
                            item.qtdContada < 90 ? '#FECACA' : '#BBF7D0',
                        }}
                      >
                        {
                          <IoMdCheckmarkCircle
                            color="#2D8B57"
                            size={15}
                            title="QUANTIDADE CONTADA"
                          />
                        }{' '}
                        {item.qtdContada}{' '}
                        {
                          <IoAlertCircle
                            color="#A00"
                            size={15}
                            title="QUANTIDADE COM DIVERGÊNCIA"
                          />
                        }{' '}
                        {item.qtdComDivergencia}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {isModalOpen && (
        <ModalEditar
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          data={dataEdicao}
          handleFetch={handleFetch}
        />
      )}
    </>
  );
}

export default function TabelaKpi({ dataTabela, handleFetch }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ flex: '1 0 auto' }} aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Mês</TableCell>
            <TableCell>ARM 30</TableCell>
            <TableCell>ARM 40</TableCell>
            <TableCell>ARM 50</TableCell>
            <TableCell>ARM 51</TableCell>
            <TableCell>ARM 52</TableCell>
            <TableCell>Realizado Geral</TableCell>
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataTabela.length > 0 ? (
            dataTabela.map((item) => (
              <Row key={item.mes} row={item} handleFetch={handleFetch} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                Nenhum dado disponível
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
