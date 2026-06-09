import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NoImage from '@/assets/noImage.png';
import RegistroImagemProdutoPos from './ModalRegistroImagem';
import formatDateTotvsFL from '@/utils/formatDataTotvsFL';

const styleR = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #D88A8A',
  backgroundColor: '#F7E6E6',
  pointerEvents: 'none',
};

const styleG = {
  width: '156px',
  padding: '4px 8px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  borderRadius: '24px',
  border: '1px solid #28A745',
  backgroundColor: '#EEFFF2',
  pointerEvents: 'none',
};

const styleIcon = {
  padding: '40px 0px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

function TabelaProdutoForaDeLinha({ handleAtualizarLista, data }) {
  const [modalAtualizarRegistroImagens, setModalAtualizarRegistroImagens] =
    useState(false);

  const handleShowModalRegistroImagem = () => {
    setModalAtualizarRegistroImagens(!modalAtualizarRegistroImagens);
  };

  const [itemProduto, setItemProduto] = useState(null);

  return (
    <>
      <RegistroImagemProdutoPos
        open={modalAtualizarRegistroImagens}
        onClose={handleShowModalRegistroImagem}
        item={itemProduto}
        handleAtualizarLista={handleAtualizarLista}
      />
      <div className="tabelaForaLinha" style={{ width: '100%' }}>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: '25px',
            overflow: 'hidden',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', paddingLeft: '80px' }}>
                  Descrição
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  Última importação
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  Importado há menos de 5 anos?
                </TableCell>
                <TableCell align="right" style={{ fontWeight: 'bold' }}>
                  Produzido há menos de 5 anos?
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img
                      src={
                        item.imagem
                          ? `data:image/png;base64, ${item.imagem}`
                          : NoImage
                      }
                      alt="NoImage"
                      style={{
                        width: '100px',
                        height: '100px',
                        marginRight: '10px',
                      }}
                    />
                    {'              '}
                    {item.nome}
                  </TableCell>
                  <TableCell align="right">
                    {formatDateTotvsFL(item.dataUltimImport)}
                  </TableCell>
                  <TableCell align="right">
                    {item.foraLinha === 0 ? (
                      <Button variant="outlined" color="error" sx={styleR}>
                        Não
                      </Button>
                    ) : item.foraLinha === 1 ? (
                      <Button variant="outlined" color="success" sx={styleG}>
                        Sim
                      </Button>
                    ) : null}
                  </TableCell>
                  <TableCell align="right">
                    {item.produzido === 0 ? (
                      <Button variant="outlined" color="error" sx={styleR}>
                        Não
                      </Button>
                    ) : item.produzido === 1 ? (
                      <Button variant="outlined" color="success" sx={styleG}>
                        Sim
                      </Button>
                    ) : null}
                  </TableCell>
                  <Box sx={styleIcon}>
                    <Button
                      size="large"
                      color="warning"
                      onClick={() => {
                        handleShowModalRegistroImagem();
                        setItemProduto(item);
                      }}
                    >
                      <AddPhotoAlternateIcon
                        fontSize="inherit"
                        sx={{ fontSize: 30 }}
                      />
                    </Button>
                  </Box>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
export default TabelaProdutoForaDeLinha;
