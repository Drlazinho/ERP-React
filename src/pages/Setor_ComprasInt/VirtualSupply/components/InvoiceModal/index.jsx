import * as React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { apiFabrica, apiFactory } from '../../../../../services/apis';
import ClearIcon from '@mui/icons-material/Clear';
import { Table } from '@mui/material';
import formatDateTotvs from '../../../../../utils/formatDataTotvs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

export default function ModalInvoice({ dados, isOpen, handleClose }) {
  const [subItem, setSubItem] = React.useState([]);

  const fetchItemByCodProd = async () => {
    try {
      const response = await apiFactory.get(
        `/ImportC7Entradas/FiltroPorCodigoProd?CodigoProduto=${dados}`
      );
      setSubItem(response.data.value.pendencias);
    } catch (error) {
    }
  };

  React.useEffect(() => {
    fetchItemByCodProd();
  }, [dados]);

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Modal Invoice
          </Typography>
          <Table className="mt-3">
            <thead>
              <tr>
                <th>Data Emissao</th>
                <th>Descrição</th>
                <th>Numero PO</th>
                <th>Previsão de Entrega</th>
                <th>Quantidade Entregue</th>
                <th>Quantidade Total</th>
                <th>Saldo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subItem?.map((item, index) => (
                <tr key={index}>
                  <td style={{ fontSize: 14 }}>
                    {formatDateTotvs(item.dataEmissao)}
                  </td>
                  <td style={{ fontSize: 14 }}>{item.descricaoProduto}</td>
                  <td style={{ fontSize: 14 }}>{item.numPO}</td>
                  <td style={{ fontSize: 14 }}>
                    {formatDateTotvs(item.previsaoEntrega)}
                  </td>
                  <td style={{ fontSize: 14 }}>{item.quantidadeEntregue}</td>
                  <td style={{ fontSize: 14 }}>{item.quantidadeTotal}</td>
                  <td style={{ fontSize: 14 }}>{item.saldo}</td>
                  <td style={{ fontSize: 14 }}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Box sx={{ display: 'flex', gap: 2, paddingY: 1, mt: 2 }} fullWidth>
            <Button
              variant="contained"
              color="error"
              endIcon={<ClearIcon />}
              fullWidth
              type="reset"
              onClick={handleClose}
            >
              Fechar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
