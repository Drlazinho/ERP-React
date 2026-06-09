import React, { useMemo, useState, useEffect } from 'react';
import { Button, Typography, Modal, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { MaterialReactTable } from 'material-react-table';
import { pedidosCarteira } from '../virtualSupply.service';
import { MRT_Localization_PT_BR } from 'material-react-table/locales/pt-BR';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
  width: '1410px',
  height: '650px',
};

const ModalCarteira = ({ dados, isOpenCarteira, handleCloseCarteira }) => {
  const [subItem, setSubItem] = useState([]);

  const handlePedidoEmCarteira = () => {
    pedidosCarteira(dados)
      .then((response) => {
        setSubItem(response.value);
      })
      .catch((err) => {
        console.error('erro', err);
      });
  };

  useEffect(() => {
    handlePedidoEmCarteira();
  }, [dados]);

  const columns = useMemo(
    () => [
      { accessorKey: 'numPedido', header: 'Número do Pedido', size: 150 },
      { accessorKey: 'nomeProduto', header: 'Nome do Produto', size: 250 },
      { accessorKey: 'cliente', header: 'Cliente', size: 200 },
      { accessorKey: 'cnpj', header: 'CNPJ', size: 150 },
      { accessorKey: 'data', header: 'Data', size: 100 },
      { accessorKey: 'qtdPedido', header: 'Quantidade Pedido', size: 150 },
      { accessorKey: 'qtdEntregue', header: 'Quantidade Entregue', size: 150 },
      { accessorKey: 'qtdPendente', header: 'Quantidade Pendente', size: 150 },
      { accessorKey: 'valorTotal', header: 'Valor Total (R$)', size: 150 },
    ],
    []
  );

  const formatarData = (dataString) => {
    const ano = dataString.slice(0, 4);
    const mes = dataString.slice(4, 6);
    const dia = dataString.slice(6, 8);
    return `${dia}/${mes}/${ano}`;
  };

  const data = subItem.map((item) => ({
    ...item,
    data: formatarData(item.data),
  }));

  return (
    <div>
      <Modal
        open={isOpenCarteira}
        onClose={handleCloseCarteira}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              mb: '10px',
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Pedidos em carteira
            </Typography>
            <IconButton onClick={handleCloseCarteira}>
              <CloseIcon />
            </IconButton>
          </Box>
          <MaterialReactTable
            columns={columns}
            data={data}
            muiTopToolbarProps={{
              sx: {
                bgcolor: '#F3F3F3',
                color: 'white',
                borderRadius: '16px 16px 0 0',
              },
            }}
            initialState={{ density: 'compact', pagination: { pageSize: 10 } }}
            localization={MRT_Localization_PT_BR}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalCarteira;
