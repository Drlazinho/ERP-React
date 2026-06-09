import React, { useState, useCallback, useEffect, useRef } from 'react';

import { BsFileEarmarkPdfFill, BsFillTrashFill } from 'react-icons/bs';
import CloseIcon from '@mui/icons-material/Close';

import {
  Button,
  Modal as MuiModal,
  Typography,
  Table,
  Box,
} from '@mui/material';
import LabelTextArea from '@/components/Forms/LabelTextArea';
import LabelInput from '@/components/Forms/LabelInput';
import LabelSelect from '@/components/Forms/LabelSelect';
import {
  atualizarContrato,
  buscarContrato,
} from '@/pages/Setor_Secretariado/Contratos/contratos.service';
import { donwloadPDF } from '@/utils/downloadPdf';
import formatDateApi from '@/utils/formaDateApi';
import Loader from '@/components/Loader';
import { useToast } from '@/hooks/toast.hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '1000px',
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

const ModalContratos = ({ showModal, handleClose, contratoId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [contrato, setContrato] = useState({
    id: '',
    valor: 0,
    aditivo: '',
    formaPgto: '',
    distrativo: 'N/A',
    contratado: '',
    tipoContrato: '',
    dataAssinatura: '',
    dataVencimento: '',
    objetoContrato: 'N/A',
    indiceReajuste: '',
    emailContratante: 'N/A',
    clausulaRescisoria: 'N/A',
    anexos: [],
  });

  const { addToast } = useToast();

  const clear = useCallback(() => {
    setContrato({
      id: '',
      valor: '',
      aditivo: '',
      formaPgto: '',
      distrativo: '',
      contratado: '',
      tipoContrato: '',
      dataAssinatura: '',
      dataVencimento: '',
      objetoContrato: '',
      indiceReajuste: '',
      emailContratante: '',
      clausulaRescisoria: '',
      anexos: [],
    });
    setIsLoading(true);
  }, [contrato]);

  const handleUpdate = useCallback(() => {
    const formData = new FormData();

    formData.append('contratado', contrato.contratado);
    formData.append('emailContratante', contrato.emailContratante);
    formData.append(
      'dataAssinatura',
      contrato.dataAssinatura.replaceAll('-', '')
    );
    formData.append(
      'dataVencimento',
      contrato.dataVencimento.replaceAll('-', '')
    );
    formData.append('objetoContrato', contrato.objetoContrato);
    formData.set('valor', contrato.valor);
    formData.append('formaPgto', contrato.formaPgto);
    formData.set('indiceReajuste', contrato.indiceReajuste);
    formData.append('clausulaRescisoria', contrato.clausulaRescisoria);
    formData.append('aditivo', contrato.aditivo);
    formData.append('tipoContrato', contrato.tipoContrato);
    formData.append('distrativo', contrato.distrativo);

    contrato.anexos.forEach((a, i) => {
      formData.append(`anexos[${i}].id`, a.id);
    });

    atualizarContrato(contratoId, formData)
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso !',
          description: 'Contrato Atualizado no Sistema.',
        });
        clear();
        handleClose();
      })
      .catch((err) =>
        addToast({
          type: 'danger',
          title: 'Erro na requisição !',
          description: err.response.data,
        })
      )
      .finally(() => setIsLoading(true));
  }, [contrato]);

  useEffect(() => {
    if (contratoId) {
      buscarContrato(contratoId)
        .then((res) => {
          setContrato({
            ...res,
            dataAssinatura: formatDateApi(res.dataAssinatura),
            dataVencimento: formatDateApi(res.dataVencimento),
          });
        })
        .catch((_err) => {
          addToast({
            type: 'danger',
            title: 'Erro ao listar Contratos !',
            description:
              'Erro ao listar os Contratos, por favor tente novamente dentre de instantes !',
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [contratoId]);
  return (
    <MuiModal
      open={showModal}
      onClose={() => {
        clear();
        handleClose();
        setIsLoading(true);
      }}
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
            sx={{ fontSize: '20px', fontWeight: 'bold', color: '#333333' }}
          >
            Contrato
          </Typography>

          <Button
            type="reset"
            onClick={() => {
              handleClose();
              clear();
              setIsLoading(true);
            }}
          >
            <CloseIcon sx={{ color: '#333333' }} />
          </Button>
        </Box>
        <Box>
          {isLoading ? (
            <div className="d-flex justify-content-center">
              <Loader />
            </div>
          ) : (
            <Box sx={{ width: '100%' }}>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    label="Contratado"
                    name="contratado"
                    value={contrato.contratado}
                    onChange={(e) =>
                      setContrato({ ...contrato, contratado: e.target.value })
                    }
                    type="text"
                    placeholder="Contratado"
                    required
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        emailContratante: e.target.value,
                      })
                    }
                    label="Email do Responsável"
                    name="emailContratante"
                    value={contrato.emailContratante}
                    type="text"
                    placeholder="Email do Responsável"
                    required
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        dataAssinatura: e.target.value,
                      })
                    }
                    label="Data Assinatura"
                    name="dataAssinatura"
                    value={contrato.dataAssinatura}
                    type="date"
                    placeholder="Data Assinatura"
                    required
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        dataVencimento: e.target.value,
                      })
                    }
                    label="Data Vencimento"
                    name="dataVencimento"
                    value={contrato.dataVencimento}
                    type="date"
                    className="form-control"
                    placeholder="Data Vencimento"
                    required
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelSelect
                    label="Tipo do Contrato"
                    className="form-select"
                    required
                    name="formgpt"
                    value={contrato.tipoContrato}
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        tipoContrato: e.target.value,
                      })
                    }
                  >
                    <option value="">Open this select menu</option>
                    <option value="COMISSAO">COMISSAO</option>
                    <option value="PAGAMENTO">PAGAMENTO</option>
                  </LabelSelect>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelSelect
                    label="Forma de Pagamento"
                    className="form-select"
                    required
                    name="formgpt"
                    value={contrato.formaPgto ? contrato.formaPgto : ''}
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        formaPgto: e.target.value,
                      })
                    }
                  >
                    <option value="">Open this select menu</option>
                    <option value="PIX">PIX</option>
                    <option value="BOLETO">BOLETO</option>
                    <option value="DOC">DOC</option>
                    <option value="TED">TED</option>
                  </LabelSelect>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    onChange={(e) =>
                      setContrato({ ...contrato, valor: e.target.value })
                    }
                    label="Valor"
                    name="valor"
                    value={contrato.valor}
                    type="text"
                    placeholder="R$"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelInput
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        indiceReajuste: e.target.value,
                      })
                    }
                    label="Índice de reajuste"
                    name="indiceReajuste"
                    value={contrato.indiceReajuste}
                    type="text"
                    placeholder="Reajuste"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelTextArea
                    label="Objeto Contrato"
                    value={contrato.objetoContrato}
                    name="objetoContrato"
                    rows="2"
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        objetoContrato: e.target.value,
                      })
                    }
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelTextArea
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        clausulaRescisoria: e.target.value,
                      })
                    }
                    label="Cláusula Rescisória"
                    name="clausulaRescisoria"
                    value={contrato.clausulaRescisoria}
                    rows="2"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelTextArea
                    onChange={(e) =>
                      setContrato({ ...contrato, aditivo: e.target.value })
                    }
                    label="Aditivo"
                    name="aditivo"
                    value={contrato.aditivo}
                    rows="2"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <LabelTextArea
                    onChange={(e) =>
                      setContrato({ ...contrato, distrativo: e.target.value })
                    }
                    label="Distrato"
                    name="distrativo"
                    value={contrato.distrativo}
                    rows="2"
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <ListaAnexos anexos={contrato.anexos} />
              </Box>
              <Box sx={{ display: 'flex', gap: '16px' }}>
                <Box xs className="mt-2 d-flex gap-2">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      clear();
                      handleClose();
                    }}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Fechar
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleUpdate}
                  >
                    <i className="fas fa-plus me-2"></i>
                    Atualizar
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </MuiModal>
  );
};

function ListaAnexos({ anexos }) {
  return (
    <Table className="table">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Anexo</th>
        </tr>
      </thead>
      <tbody>
        {anexos.map((item, index) => (
          <tr key={index}>
            <td>{item.descricao}</td>
            <td>
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => donwloadPDF(item.arquivo, item.nome)}
              >
                <BsFileEarmarkPdfFill size={20} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ModalContratos;
