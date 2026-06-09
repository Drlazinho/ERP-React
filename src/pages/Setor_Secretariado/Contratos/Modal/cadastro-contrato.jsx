import React, { useState, useCallback, useEffect, useRef } from 'react';

import { BsFileEarmarkPdfFill, BsFillTrashFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';

import {
  Box,
  Typography,
  Button,
  Table,
  Modal as MuiModal,
  TextField,
} from '@mui/material';

import LabelTextArea from '@/components/Forms/LabelTextArea/index.jsx';
import { useContratos } from '@/hooks/contrato-provider.hook.jsx';
import LabelInput from '@/components/Forms/LabelInput/index.jsx';
import LabelSelect from '@/components/Forms/LabelSelect/index.jsx';
import { ButtonAddAnexo, ButtonAddAnexoInactive, InputFile } from './style.js';

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

const ModalCadastroContratos = ({
  showModal,
  handleClose,
  handleFetchTimeOut,
  id,
}) => {
  const [arquivo, setArquivo] = useState({ descricao: '', arquivo: null });
  const [listaAnexo, setListaAnexo] = useState([]);

  const [contrato, setContratos] = useState({
    id: '',
    usuarioId: id,
    valor: '0',
    aditivo: 'N/A',
    formaPgto: '',
    distrativo: 'N/A',
    contratado: '',
    tipoContrato: '',
    dataAssinatura: new Date().toLocaleDateString(),
    dataVencimento: new Date().toLocaleDateString(),
    objetoContrato: 'N/A',
    indiceReajuste: '0',
    emailContratante: '',
    clausulaRescisoria: 'N/A',
    anexos: [],
  });

  const fileInputRef = useRef();

  const adicionarAnexo = useCallback(() => {
    let anexos = listaAnexo;
    console.table(anexos);

    anexos.push(arquivo);

    setListaAnexo(anexos);

    setArquivo({ descricao: '', caminho: '' });
    fileInputRef.current.value = null;
  }, [listaAnexo, arquivo, fileInputRef]);

  const removerAnexo = useCallback(
    (i) => {
      let anexos = listaAnexo;

      setListaAnexo(anexos.filter((a, index) => index !== i));
    },
    [listaAnexo]
  );

  const { handleSubmit } = useContratos();

  return (
    <MuiModal open={showModal} onClose={handleClose}>
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
            }}
          >
            <CloseIcon sx={{ color: '#333333' }} />
          </Button>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                label="Contratado*"
                name="contratado"
                value={contrato.contratado}
                onChange={(e) =>
                  setContratos({ ...contrato, contratado: e.target.value })
                }
                type="text"
                placeholder="Contratado"
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    emailContratante: e.target.value,
                  })
                }
                label="Email do Responsável*"
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
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    dataAssinatura: e.target.value,
                  })
                }
                label="Data Assinatura*"
                name="dataAssinatura"
                value={contrato.dataAssinatura}
                type="date"
                placeholder="Data Assinatura"
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    dataVencimento: e.target.value,
                  })
                }
                label="Data Vencimento*"
                name="dataVencimento"
                value={contrato.dataVencimento}
                type="date"
                className="form-control"
                placeholder="Data Vencimento"
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelSelect
                label="Tipo do Contrato"
                className="form-select"
                required
                name="formgpt"
                value={contrato.tipoContrato}
                onChange={(e) =>
                  setContratos({
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
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelSelect
                label="Forma de Pagamento"
                className="form-select"
                required
                name="formgpt"
                value={contrato.formaPgto}
                onChange={(e) =>
                  setContratos({
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
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                onChange={(e) =>
                  setContratos({ ...contrato, valor: e.target.value })
                }
                label="Valor (ex: 1000,00)"
                name="valor"
                value={contrato.valor}
                type="text"
                placeholder="R$"
                pattern="[A-Za-z]{3}\d{3}"
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelInput
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    indiceReajuste: e.target.value,
                  })
                }
                label="Índice de reajuste (ex: 100,00)"
                name="indiceReajuste"
                value={contrato.indiceReajuste}
                type="text"
                placeholder="Reajuste"
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelTextArea
                label="Objeto Contrato"
                value={contrato.objetoContrato}
                name="objetoContrato"
                rows="2"
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    objetoContrato: e.target.value,
                  })
                }
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelTextArea
                onChange={(e) =>
                  setContratos({
                    ...contrato,
                    clausulaRescisoria: e.target.value,
                  })
                }
                label="Cláusula Rescisória"
                name="clausulaRescisoria"
                value={contrato.clausulaRescisoria}
                rows="2"
                required
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelTextArea
                onChange={(e) =>
                  setContratos({ ...contrato, aditivo: e.target.value })
                }
                label="Aditivo"
                name="aditivo"
                value={contrato.aditivo}
                rows="2"
                required
              />
            </Box>
            <Box
              sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
            >
              <LabelTextArea
                onChange={(e) =>
                  setContratos({ ...contrato, distrativo: e.target.value })
                }
                label="Distrato"
                name="distrativo"
                value={contrato.distrativo}
                rows="2"
                required
              />
            </Box>
          </Box>
          {/* <Row className="mt-2">
                <Col sm="8">
                  <div className="d-flex flex-column gap-2">
                    <LabelTextArea
                      label="Anexo"
                      name="descricao"
                      onChange={(e) => {
                        setArquivo({ ...arquivo, descricao: e.target.value });
                      }}
                      value={arquivo.descricao}
                      placeholder="Descricao Anexo"
                    />
                    <InputFile>
                      <input
                        name="contrato"
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={(e) =>
                          setArquivo({ ...arquivo, arquivo: e.target.files[0] })
                        }
                      />
                    </InputFile>
                  </div>
                </Col>
                <Col sm="4" className="mt-4 h-100 p-2">
                  <Button
                    variant="warning"
                    onClick={() => adicionarAnexo(arquivo)}
                    disabled={arquivo.descricao === ''}
                  >
                    <FaPlus size={16} /> Adicionar Anexo
                  </Button>
                </Col>
              </Row> */}
          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Table className="table">
              <thead>
                <tr>
                  <th>Anexo</th>
                  <th>Descrição</th>
                  <th>Adicionar/Deletar</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <InputFile>
                      <input
                        name="contrato"
                        type="file"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={(e) =>
                          setArquivo({
                            ...arquivo,
                            arquivo: e.target.files[0],
                          })
                        }
                      />
                    </InputFile>
                  </td>
                  <td>
                    {' '}
                    <LabelTextArea
                      name="descricao"
                      onChange={(e) => {
                        setArquivo({ ...arquivo, descricao: e.target.value });
                      }}
                      value={arquivo.descricao}
                      placeholder="Descrição Obrigatória"
                      rows={1}
                    />
                  </td>
                  <td>
                    {arquivo.descricao.length > 3 ? (
                      <ButtonAddAnexo onClick={() => adicionarAnexo(arquivo)}>
                        <FaPlus size={16} /> Adicionar
                      </ButtonAddAnexo>
                    ) : (
                      <ButtonAddAnexoInactive disabled>
                        <FaPlus size={16} /> Adicionar
                      </ButtonAddAnexoInactive>
                    )}
                  </td>
                </tr>
                <ListaAnexos anexos={listaAnexo} removerAnexo={removerAnexo} />
              </tbody>
            </Table>
          </Box>
          <Box>
            <Box xs className="mt-2">
              <Button
                className="me-2"
                type="button"
                variant="contained"
                color="success"
                onClick={() => {
                  handleSubmit(contrato, listaAnexo, handleClose),
                    handleFetchTimeOut();
                }}
              >
                <i className="fas fa-plus me-2"></i>
                Salvar
              </Button>
              <Button variant="contained" color="error" onClick={handleClose}>
                <i className="fas fa-plus me-2"></i>
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </MuiModal>
  );
};

function ListaAnexos({ removerAnexo, anexos }) {
  return (
    <>
      {anexos.map((item, index) => (
        <tr key={index}>
          <td>{item.descricao}</td>
          <td>
            <BsFileEarmarkPdfFill size={20} />
          </td>
          <td>
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => removerAnexo(index)}
            >
              <BsFillTrashFill size={20} />
            </button>
          </td>
        </tr>
      ))}
    </>
  );
}

export default ModalCadastroContratos;
