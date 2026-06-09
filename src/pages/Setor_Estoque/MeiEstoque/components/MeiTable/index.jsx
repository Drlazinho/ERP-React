import * as React from 'react';
import '../../styles.css';
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import format from 'date-fns/format';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import { putCheckin } from '../../../../../services/movimentacaoCorrente.service';
import { useToast } from '../../../../../hooks/toast.hook';

const meiFormData = {
  mei: null,
  emailAprov1: null,
  emailAprov2: null,
};

function Row({ row, dataSubRow, handleMovAtt }) {
  const [open, setOpen] = useState(false);
  const [isApproved1, setIsApproved1] = useState(false);
  const [isApproved2, setIsApproved2] = useState(false);
  const [formData, setFormData] = useState(meiFormData);
  const { nome, email } = useUsuarioLocal();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const rowsSub = Array.isArray(dataSubRow)
    ? dataSubRow.filter((sub) => sub.mei === row.mei)
    : [];

  const formattedDate = format(new Date(row.dataMovimentacao), 'dd/MM/yyyy');

  const isAprov1Filled = row.idUserAprov1 !== 0 && row.idUserAprov1 !== '';
  const isAprov2Filled = row.idUserAprov2 !== 0 && row.idUserAprov2 !== '';
  const isCreator = row.usuario === nome;

  const handleLikeResp1 = async () => {
    if (isCreator) {
      setIsApproved1(!isApproved1);
      try {
        const updatedFormData = {
          mei: row.mei,
          emailAprov1: email,
        };
        await putCheckin(updatedFormData);
        row.nomeAprov1 = nome;
        row.dataAprov1 = format(new Date(), 'dd/MM/yyyy');
        addToast({
          type: 'success',
          title: 'Sucesso',
          description: 'Aprovação enviada com sucesso!',
        });
      } catch (error) {
        addToast({
          type: 'danger',
          title: 'Erro',
          description: 'Erro ao enviar aprovação. Tente novamente.',
        });
        setIsApproved1(false);
        handleMovAtt();
      }
    } else {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Apenas quem criou pode aprovar esse campo.',
      });
    }
  };

  const handleLikeResp2 = async () => {
    setIsApproved2(!isApproved2);
    try {
      const updatedFormData = {
        mei: row.mei,
        emailAprov2: email,
      };
      await putCheckin(updatedFormData);

      row.nomeAprov2 = nome;
      row.dataAprov2 = format(new Date(), 'dd/MM/yyyy');

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Aprovação enviada com sucesso!',
      });
    } catch (error) {
      addToast({
        type: 'danger',
        title: 'Erro',
        description: 'Erro ao enviar aprovação. Tente novamente.',
      });
      setIsApproved2(false);
      handleMovAtt();
    }
  };

  const handleRowClick = () => {
    navigate('/estoque/printpdfmei', { state: { item: row } });
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.mei}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.motivo || '-'}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.tipo}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.quantidade}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{formattedDate}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>{row.usuario}</TableCell>
        <TableCell sx={{ borderBottom: 'none' }}>
          <IconButton onClick={handleRowClick}>
            <PictureAsPdfOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            onClick={handleLikeResp1}
            disabled={!isCreator}
            style={{
              color: isAprov1Filled || isApproved1 ? 'green' : 'red',
            }}
          >
            {isAprov1Filled || isApproved1 ? (
              <Box>
                <ThumbUpIcon />
                <Typography sx={{ fontSize: '12px' }}>
                  {row.nomeAprov1}
                </Typography>
                <Typography sx={{ fontSize: '10px' }}>
                  {row.dataAprov1}
                </Typography>
              </Box>
            ) : (
              <ThumbDownIcon />
            )}
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            onClick={handleLikeResp2}
            style={{
              color: isAprov2Filled || isApproved2 ? 'green' : 'red',
            }}
          >
            {isAprov2Filled || isApproved2 ? (
              <Box>
                <ThumbUpIcon />
                <Typography sx={{ fontSize: '12px' }}>
                  {row.nomeAprov2}
                </Typography>
                <Typography sx={{ fontSize: '10px' }}>
                  {row.dataAprov2}
                </Typography>
              </Box>
            ) : (
              <ThumbDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell>{row.observacao}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="subrow">
                <TableHead sx={{ bgcolor: '#f3f3f3' }}>
                  <TableRow>
                    <TableCell>Código do Produto</TableCell>
                    <TableCell>Quantidade</TableCell>
                    <TableCell>Armazém de Origem</TableCell>
                    <TableCell>Armazém de Destino</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rowsSub.map((sub) => (
                    <TableRow key={sub.codProduto}>
                      <TableCell>{sub.codProduto}</TableCell>
                      <TableCell>{sub.saldo}</TableCell>
                      <TableCell>{sub.armazOrigem}</TableCell>
                      <TableCell>{sub.armazOrigemDescr}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MeiTable({ data, dataSubRow }) {
  const rows = Array.isArray(data) ? data : [];

  return (
    <TableContainer component={Paper} style={{ maxHeight: 657 }}>
      <Table stickyHeader aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#F3F3F3' }}>
            <TableCell />
            <TableCell>Nº da MEI</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Quantidade Total</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Registrado Por</TableCell>
            <TableCell>Exportar</TableCell>
            <TableCell align="center">Demandante</TableCell>
            <TableCell align="center">Destinatário</TableCell>
            <TableCell>Observação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} dataSubRow={dataSubRow} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
