import { useState, useEffect, useCallback } from 'react';

import Loader from '@/components/Loader/index.jsx';
import { buscarContratosPorFiltro } from '@/pages/Setor_Secretariado/Contratos/contratos.service.js';
import formatDateTotvs from '@/utils/formatDataTotvs.js';
import ModalCadastroContratos from './Modal/cadastro-contrato.jsx';
import ModalContratos from './Modal/contrato.jsx';
import {
  ContratosProvider,
  useContratos,
} from '@/hooks/contrato-provider.hook.jsx';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook.js';
import { useToast } from '@/hooks/toast.hook.jsx';
import { Button, Box, Grid2, TextField, FormLabel } from '@mui/material';

export default function Contrato() {
  const { handleSubmit, handleShowModalPostContrato, showModal } =
    useContratos();

  const [contratosLista, setContratoLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [contratoId, setContratoId] = useState(null);

  const [showContratoModal, setShowContratoModal] = useState(false);
  const [showCadastroContratoModal, setShowCadastroContratoModal] =
    useState(false);
  const handleCadastroContratoModal = () => {
    setShowCadastroContratoModal(!showCadastroContratoModal);
  };
  const handleContratoModal = () => {
    setShowContratoModal(!showContratoModal);
  };

  const { id } = useUsuarioLocal();

  const { addToast } = useToast();

  const [filtro, setFiltro] = useState({
    usuarioId: id,
    contratado: null,
    emailContratante: null,
    dataAssinatura: null,
    dataVencimento: null,
  });

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      usuarioId: id,
      contratado: null,
      emailContratante: null,
      dataAssinatura: null,
      dataVencimento: null,
    });
  };

  const handleFetch = useCallback(() => {
    buscarContratosPorFiltro(filtro)
      .then((retorno) => {
        setContratoLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar Contratos !',
          description:
            'Erro ao listar os Contratos, por favor tente novamente dentre de instantes !',
        });
      })
      .finally(() => setRemoveLoading(true));
  }, [filtro]);

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleFetchPost = () => {
    buscarContratosPorFiltro(filtro)
      .then((res) => {
        setContratoLista(res);
      })
      .then(() => {
        addToast({
          type: 'success',
          title: 'Sucesso ao Registrar um novo Contratos !',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao Registrar um novo Contratos !',
        });
      });
  };

  const handleFetchTimeOut = () => {
    setTimeout(() => {
      handleFetchPost();
      handleShowModalPostContrato();
    }, 1000);
  };

  return (
    <div className="p-4">
      {/* <ContratosProvider> */}
      <ModalCadastroContratos
        id={id}
        showModal={showModal}
        handleFetchTimeOut={handleFetchTimeOut}
        handleClose={handleShowModalPostContrato}
      />
      {/* </ContratosProvider> */}
      <ModalContratos
        showModal={showContratoModal}
        handleClose={() => {
          handleContratoModal();
          setContratoId(null);
        }}
        contratoId={contratoId}
      />
      <div>
        <div className="row">
          <div className="Box-md-12 d-flex justify-content-between mt-3">
            <h2
              className="text-light"
              style={{ textShadow: '-1px -1px 6px #000000' }}
            >
              Contratos
            </h2>
            <Button
              variant="outlined"
              onClick={() => handleShowModalPostContrato()}
            >
              <i className="fas fa-plus me-2"></i>
              Novo Contrato
            </Button>
          </div>
        </div>
        <div className="row">
          <form onSubmit={handleClear} className="mb-3 mt-2">
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <FormLabel
                  className="text-light"
                  style={{ textShadow: '-1px -1px 6px #000000' }}
                >
                  Contratado
                </FormLabel>

                <TextField
                  placeholder="Buscar nome do contrato"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      contratado: e.target.value,
                    })
                  }
                />
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <FormLabel>Email do respon.</FormLabel>
                <TextField
                  placeholder="Buscar pelo email do contratante"
                  type="email"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      emailContratante: e.target.value,
                    })
                  }
                />
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <FormLabel>Data de Assinatura</FormLabel>
                <TextField
                  type="date"
                  // onChange={handleInputChange}
                  placeholder="Buscar pela Data de Assinatura"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      dataAssinatura: e.target.value,
                    })
                  }
                />
              </Box>
              <Box
                sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
              >
                <FormLabel> Data de Vencimento</FormLabel>
                <TextField
                  // onChange={handleInputChange}
                  type="date"
                  placeholder="Buscar pelo Data de Vencimento"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      dataVencimento: e.target.value,
                    })
                  }
                />
              </Box>
              <Box sx={{ width: '100%' }}>
                <Button
                  variant="contained"
                  color="error"
                  type="submit"
                  sx={{ mt: 4, width: '100%' }}
                >
                  <i className="fas fa-trash me-2"></i>
                  Clear
                </Button>
              </Box>
            </Box>
          </form>
        </div>

        <div style={{ height: 600, width: '100%', overflow: 'scroll' }}>
          <table className="table table-striped table-hover">
            <thead className="table-dark mt-3 position-sticky top-0">
              <tr>
                <th scope="Box">Contratado</th>
                <th scope="Box">Email Contratante</th>
                <th scope="Box">Data Assinatura</th>
                <th scope="Box">Data Vencimento</th>
                <th scope="Box">Tipo Contrato</th>
                <th scope="Box">Valor R$</th>
                <th scope="Box">forma Pgto</th>
                <th scope="Box">Ind. de Reajuste</th>
                <th scope="Box"></th>
              </tr>
            </thead>
            <tbody>
              {!removeLoading ? (
                <tr>
                  <td Boxspan="8" className="text-center">
                    <Loader />
                  </td>
                </tr>
              ) : (
                contratosLista.map((item) => (
                  <tr key={item.id}>
                    <th>{item.contratado}</th>
                    <td>{item.emailContratante}</td>
                    <td>{formatDateTotvs(item.dataAssinatura)}</td>
                    <td>{formatDateTotvs(item.dataVencimento)}</td>
                    <td>{item.tipoContrato}</td>
                    <td>{item.valor}</td>
                    <td>{item.formaPgto}</td>
                    <td>{item.indiceReajuste}</td>
                    <td>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => {
                            setContratoId(item.id);
                            handleContratoModal();
                          }}
                        >
                          <i className="fas fa-user-edit me-2"></i>
                          Visualizar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
