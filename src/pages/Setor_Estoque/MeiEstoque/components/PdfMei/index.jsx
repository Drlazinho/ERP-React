import React, { useState, useEffect } from 'react';
import {
  Button,
  Box,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from '@mui/material';
import logoAmvox from '../../../../../assets/amvoxlogomarca.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useLocation, useNavigate } from 'react-router';
import { buscarMovimentacaoProdutos } from '../../../../../services/movimentacaoCorrente.service';
import { format } from 'date-fns';
import { gerarPdf } from '../../../../../utils/gerarPdf';

const MeiPdf = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();
  const { item } = location.state || {};

  useEffect(() => {
    buscarMovimentacaoProdutos({ mei: item.mei }).then((res) => {
      setData(res.value.movimentacaoProdutos);
    });
  }, []);

  const formatData = format(new Date(item.dataMovimentacao), 'dd/MM/yyyy');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </IconButton>
        <Button
          variant="outlined"
          color="primary"
          onClick={() =>
            gerarPdf(document.getElementById('nota'), item.mei, formatData)
          }
          sx={{
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: '10px',
          }}
        >
          Baixar Nota
        </Button>
      </Box>

      <Box id="nota" className="page notaArea" sx={{ mt: 2 }}>
        <Box></Box>

        <Box
          sx={{
            display: 'flex',
            border: '1px solid',
            borderRadius: '5px',
            maxWidth: '100%',
            mt: '20px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              height: '100px',
              width: '25%',
              borderRight: '2px solid',
            }}
          >
            <img src={logoAmvox} alt="Amvox" />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ borderBottom: '1px solid' }}>
              REISTAR IND. E COM. DE ELETRÔNICOS LTDA
            </Box>
            <Box sx={{ borderBottom: '1px solid' }}>
              Amvox FILIAL - CAMAÇARI - BA
            </Box>
            <Box
              sx={{
                display: 'flex',
                mt: '15px',
                flexDirection: 'row',
                fontSize: '25px',
              }}
            >
              DATA: <Box sx={{ ml: '5px', color: 'red' }}>{formatData}</Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              width: '25%',
              borderLeft: '2px solid',
              flexDirection: 'column',
              gap: '25px',
            }}
          >
            <Box sx={{ ml: '10px' }}>
              Nº MIE:{' '}
              <Box sx={{ color: 'red', fontSize: '18px' }}>{item.mei}</Box>
            </Box>
            <Box sx={{ borderTop: '1px solid', ml: '10px' }}>OPº:</Box>
          </Box>
        </Box>

        <Box className="boxFields" sx={{ pt: 0.5 }}>
          <Table sx={{ minWidth: '100%' }} aria-label="movimentacao-table">
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={6}
                  align="center"
                  sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    border: '1px solid',
                    borderRadius: '5px',
                  }}
                >
                  MOVIMENTAÇÃO INTERNA DE ESTOQUE
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ border: '1px solid' }}>ORIGEM</TableCell>
                <TableCell sx={{ border: '1px solid' }}>DESTINO</TableCell>
                <TableCell sx={{ border: '1px solid' }}>MODELO</TableCell>
                <TableCell sx={{ border: '1px solid' }}>QUANT.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {row.armazOrigem} - {row.armazOrigemDescr}
                  </TableCell>
                  <TableCell>
                    {row.armazDestino} - {row.armazDestinoDescr}
                  </TableCell>
                  <TableCell>{row.produto}</TableCell>
                  <TableCell>{row.saldo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2 }}>
            <Table aria-label="expedicao-entradas-table">
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Expedição Entradas</TableCell>
                </TableRow>
                {[...Array(3)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>Data:</TableCell>
                    <TableCell>QTD:</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              mt: '50px',
              gap: '50px',
            }}
          >
            <Box
              sx={{
                borderTop: '2px solid',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              Ass.
            </Box>
            <Box
              sx={{
                borderTop: '2px solid',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}
            >
              Ass.
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default MeiPdf;
