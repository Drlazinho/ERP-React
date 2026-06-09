import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal as MuiModal,
  Box,
  Typography,
  Badge,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';
import { formatDateTime } from '../../../../../utils/formatDateInput';
import { useToast } from '../../../../../hooks/toast.hook';
import {
  AtualizarProtrocoloNotaDet,
  buscarProtocoloNotaStatus,
} from '../../../../../services/protocoloNotasFiscais.service';
import AtualizarDetalheNota from '../AtualizaDetalheNota';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  height: 'auto',
  bgcolor: 'background.paper',
  border: '1px solid #333333',
  borderRadius: '8px',
  boxShadow: 10,
  justifyContent: 'center',
  alignItems: 'center',
  padding: '24px',
  overflowY: 'auto',
};

export default function VisualizarDetalhesNotaModal(props) {
  const { addToast } = useToast();
  const [status, setStatus] = useState([]);
  const [idDetalhe, setIdDetalhe] = useState();
  const [showModalPutDetalhe, setShowModalPutDetalhe] = useState(false);

  const [detalheLista, setDetalheLista] = useState(props.listaDetalhesNota);

  const handleShowModalDetalhes = (id) => {
    setIdDetalhe(id);
    setShowModalPutDetalhe(!showModalPutDetalhe);
  };

  useEffect(() => {
    buscarProtocoloNotaStatus().then((retorno) => setStatus(retorno));
  }, []);

  const handleAtualizarDetalhes = (body) => {
    AtualizarProtrocoloNotaDet(body)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Atualizado',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: 'Erro ao Atualizar, tente novamente mais tarde',
        });
      })
      .finally(() => {
        handleShowModalDetalhes();
        props.atualizarTabelaProtocolo();
        props.fecharModal();
      });
  };

  const colorCardStatus = (value) => {
    switch (value) {
      case 'APROVADO':
        return 'primary';
      case 'PENDENTE':
        return 'danger';
      case 'RECUSADO':
        return 'danger';
      case 'CONCLUIDO':
        return 'success';
    }
  };

  return (
    <div>
      <MuiModal
        open={showModalPutDetalhe}
        onClose={handleShowModalDetalhes}
        style={{ backgroundColor: 'rgba(0,0,0, 0.62)' }}
        centered
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Atualizar Protocolo de Notas
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModalDetalhes();
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <AtualizarDetalheNota
              status={status}
              idDetalhe={idDetalhe}
              idNota={props.idNota}
              atualizarDetalhe={handleAtualizarDetalhes}
              cancelarSubmit={handleShowModalDetalhes}
            />
          </Box>
        </Box>
      </MuiModal>
      <div className="d-flex justify-content-center flex-wrap row">
        {detalheLista &&
          detalheLista.map((item, index) => (
            <Box sm={6} lg={4} key={index}>
              <Card
                key={index}
                sx={{
                  width: '100%',
                  maxWidth: 345,
                  m: 2,
                  ...getCardColor(item.status),
                }}
              >
                <CardHeader
                  title={item.nota}
                  sx={{ color: getCardColor(item.status).color }}
                />
                <CardContent>
                  <p className="text-light">
                    <span className="font-bold">Registro:</span>{' '}
                    {formatDateTime(item.data_registro)}
                  </p>
                  <p className="text-light">
                    <span className="font-bold">Atualização:</span>{' '}
                    {formatDateTime(item.data_atualizacao)}
                  </p>
                  <p className="text-light">
                    <span className="font-bold">Setor:</span> {item.setor}
                  </p>
                  <p className="text-light">
                    <span className="font-bold">Usuario:</span> {item.usuario}
                  </p>
                  <p className="text-light">
                    <span className="font-bold text-light">Status:</span>
                    {item.status === 'CONCLUIDO' && (
                      <Badge color="success">{item.status}</Badge>
                    )}
                    {item.status === 'APROVADO' && (
                      <Badge color="primary">{item.status}</Badge>
                    )}
                    {item.status === 'PENDENTE' && (
                      <Badge color="danger">{item.status}</Badge>
                    )}
                  </p>
                  <p className="text-light">
                    <span className="font-bold">Observacao:</span>{' '}
                    {item.observacao}
                  </p>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outline-light"
                    onClick={() => handleShowModalDetalhes(item.id)}
                  >
                    Atualizar
                  </Button>
                </CardActions>
              </Card>
            </Box>
          ))}
      </div>
    </div>
  );
}
