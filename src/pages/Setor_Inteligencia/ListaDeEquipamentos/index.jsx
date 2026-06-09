import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FaTools } from 'react-icons/fa';
import Registrar from './Form';
import { ListaDeEquipamentosTabela } from '@/components/Tabela/ListaDeEquipamentosTabela';
import { consultarPatrimonio } from '@/pages/Setor_Inteligencia/ListaDeEquipamentos/listaDeEquipamentos.service';
import { apiFabrica } from '@/services/apis';
import UpdatePatrimonio from './UpdateForm';
import { useToast } from '@/hooks/toast.hook';
import Loader from '@/components/Loader';
import Select from 'react-select';
import { RiFileExcel2Fill } from 'react-icons/ri';
import { Box, Button, Modal as MuiModal, Typography } from '@mui/material';
import animationData from '@/lotties/Block.json';
import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook';
import { consultaSetores } from '@/services/setores/setores.service';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { buscarGalpao } from '@/services/galpao/galpao.service';

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
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
};

export default function ListaDeEquipamentos() {
  const { showModalAccess, LiberarAcesso, setRouteName, error } =
    useContext(RestricaoContext);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [ListaDeEquipamentos, setListaDeEquipamentos] = useState([]);
  const [setoresLista, setSetoresLista] = useState([]);
  const [filialLista, setFilialLista] = useState([]);
  const [equipamento, setEquipamento] = useState([null]);
  const [sim, setSim] = useState([]);
  const [modalItem, setModalItem] = useState([]);
  const [setorSelecionado, setSetorSelecionado] = useState();

  const navigate = useNavigate();

  const ExcelJS = require('exceljs');

  function handleBack() {
    navigate('/inteligencia/geral');
  }

  const handleRegistroModal = () => {
    setShowModal(!showModal);
  };
  const handleDeleteModal = (item) => {
    setShowDeleteModal(!showDeleteModal);

    if (item) setSim(item.equipamentoID);
  };
  const handleUpdateModal = (item) => {
    setShowUpdateModal(!showUpdateModal);

    if (item) setModalItem(item);
  };

  const [filtro, setFiltro] = useState({
    descricao: '',
    setor: '',
  });

  const { addToast } = useToast();

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const handleClear = (e) => {
    limparSelecao();
    e.preventDefault();
    setFiltro({
      placaPatrimonio: null,
      descricao: null,
      responsavel: null,
      setor: null,
    });
  };

  const handleFetch = useCallback(() => {
    consultarPatrimonio(filtro)
      .then((retorno) => {
        setListaDeEquipamentos(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os Equipamentos',
          description:
            'Erro ao listar os Equipamentos, por favor tente novamente dentre de instantes',
        });
      })
      .finally(() => setRemoveLoading(true));

    consultaSetores()
      .then((retorno) => {
        setSetoresLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os setores',
        });
      });
    buscarGalpao()
      .then((retorno) => {
        setFilialLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Filiais' + _err,
        });
      });
  }, [filtro]);

  const handleSelectChangeSetor = (selectedOption) => {
    setSetorSelecionado(
      setFiltro({
        ...filtro,
        setor: selectedOption.value,
      })
    );
  };

  const selectSetorLista = setoresLista.map((item) => ({
    value: item.setor,
    label: item.setor,
  }));

  function limparSelecao() {
    setSetorSelecionado(null);
  }

  const cancelarPatrimonio = () => {
    setEquipamento({ equipamentoID: 0 });
    handleRegistroModal();
  };

  const cancelarAtualizacao = () => {
    setEquipamento({ equipamentoID: 0 });
    handleUpdateModal();
  };

  const adicionarPatrimonio = async (value) => {
    handleRegistroModal();
    const response = await apiFabrica
      .post(`/Patrimonio`, value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Patrimônio cadastrado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: 'Erro ao fazer o cadastro',
        });
      });
    handleFetch();
  };
  const deletePatrimonio = async () => {
    await apiFabrica.delete(`Patrimonio/${sim}`);
    handleFetch();
    setShowDeleteModal(false);
  };

  const atualizarPatrimonio = async (value) => {
    handleUpdateModal();
    const response = await apiFabrica
      .put(`Patrimonio/Atualizar/${value.equipamentoID}`, value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Patrimônio cadastrado com sucesso',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'warning',
          description: 'Erro ao fazer o cadastro',
        });
      });
    handleFetch();
  };

  const exportExcelFile = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet ');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'Id Equipamento',
        key: 'equipamentoID',
        width: 12,
      },
      {
        header: 'Placa Patrimônio',
        key: 'placaPatrimonio',
        width: 12,
      },
      {
        header: 'Filial',
        key: 'filial',
        width: 12,
      },
      {
        header: 'Descrição',
        key: 'descricao',
        width: 54,
      },
      {
        header: 'Observação',
        key: 'observacao',
        width: 35,
      },
      {
        header: 'Responsável',
        key: 'responsavel',
        width: 25,
      },
      {
        header: 'Setor',
        key: 'setor',
        width: 25,
      },
    ];

    ListaDeEquipamentos.map((item) => {
      sheet.addRow({
        equipamentoID: item.equipamentoID,
        placaPatrimonio: item.placaPatrimonio,
        filial: item.filial,
        descricao: item.descricao,
        observacao: item.observacao,
        responsavel: item.responsavel,
        setor: item.setor,
      });

      return null;
    });

    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'ListaPatrimonio.xlsx';
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const animationLottieOption = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
      <div
        className="position-relative"
        style={{ width: '98%', margin: '0 auto' }}
      >
        {/*MODAL CADASTRAR PATRIMONIO*/}
        <MuiModal open={showModal} onClose={handleRegistroModal}>
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
                Cadastro de Patrimônio
              </Typography>

              <Button
                type="reset"
                onClick={() => {
                  handleRegistroModal();
                }}
              >
                <CloseIcon sx={{ color: '#333333' }} />
              </Button>
            </Box>
            <Box>
              <Registrar
                filiaisLista={filialLista}
                addPatrimonio={adicionarPatrimonio}
                cancelarPatrimonio={cancelarPatrimonio}
                setoresLista={setoresLista}
              />
            </Box>
          </Box>
        </MuiModal>

        {/*MODAL DELETAR PATRIMONIO*/}
        <MuiModal open={showDeleteModal} onClose={handleDeleteModal}>
          <Box sx={{ ...style, width: '400px' }}>
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
                Deseja excluir o Patrimônio?
              </Typography>

              <Button
                type="reset"
                onClick={() => {
                  handleDeleteModal();
                }}
              >
                <CloseIcon sx={{ color: '#333333' }} />
              </Button>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button variant="contained" onClick={handleDeleteModal}>
                NÃO
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={deletePatrimonio}
              >
                SIM
              </Button>
            </Box>
          </Box>
        </MuiModal>

        {/*MODAL UPDATE PATRIMONIO*/}
        <MuiModal open={showUpdateModal} onClose={handleUpdateModal}>
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
                Atualizar Patrimônio
              </Typography>

              <Button
                type="reset"
                onClick={() => {
                  handleUpdateModal();
                }}
              >
                <CloseIcon sx={{ color: '#333333' }} />
              </Button>
            </Box>
            <Box>
              <UpdatePatrimonio
                dadosPatrimonio={modalItem}
                atualizarPatrimonio={atualizarPatrimonio}
                cancelarAtualizacao={cancelarAtualizacao}
                setoresLista={setoresLista}
                filiaisLista={filialLista}
              />
            </Box>
          </Box>
        </MuiModal>

        <div className="d-flex justify-content-between mt-2">
          <div className="d-flex align-items-center gap-2 mt-2">
            <FaTools size={24} color="white" />{' '}
            <h2
              className="text-light"
              style={{ textShadow: '-1px -1px 6px #000000' }}
            >
              Lista De Equipamentos
            </h2>
          </div>

          <Button variant="contained" onClick={handleRegistroModal}>
            <i className="fas fa-plus"></i> Criar Novo Equipamento
          </Button>
        </div>
        <Box>
          <Button
            startIcon={<KeyboardBackspaceIcon />}
            onClick={handleBack}
            variant="contained"
            color="success"
          >
            Voltar
          </Button>
        </Box>
        <div className="row">
          <Box
            onSubmit={handleClear}
            className="mb-5 
          mt-7"
          >
            <Box
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'space-around',
                gap: 2,
                [theme.breakpoints.down(1090)]: {
                  flexWrap: 'wrap',
                },
              })}
            >
              {/* <Button
                  color="success"
                  onClick={handleBack}
                  startIcon={<KeyboardBackspaceIcon />}
                >
                  Voltar
                </Button> */}
              <Box md={2} className="mt-1">
                <label
                  className="text-light"
                  style={{ textShadow: '-1px -1px 6px #000000' }}
                >
                  Descrição
                </label>
                <input
                  type="text"
                  name="descricao"
                  className="form-control"
                  value={filtro.descricao || ''}
                  placeholder="Buscar por descrição"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      descricao: e.target.value,
                    })
                  }
                />
              </Box>

              <Box md={2} className="mt-1">
                <label>Placa Patrimônio</label>
                <input
                  type="number"
                  name="placaPatrimonio"
                  className="form-control"
                  value={filtro.placaPatrimonio || ''}
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      placaPatrimonio: e.target.value,
                    })
                  }
                />
              </Box>

              <Box md={2} className="mt-1">
                <label>Responsável</label>
                <input
                  type="text"
                  name="responsavel"
                  className="form-control"
                  value={filtro.responsavel || ''}
                  placeholder="Buscar por responsável"
                  onChange={(e) =>
                    setFiltro({
                      ...filtro,
                      responsavel: e.target.value,
                    })
                  }
                />
              </Box>

              <Box md={2} className="mt-1">
                <label>Setor</label>
                <Select
                  placeholder="Buscar por setor"
                  value={setorSelecionado}
                  options={selectSetorLista}
                  onChange={handleSelectChangeSetor}
                />
              </Box>
              <Box md={2} className="mt-2">
                <Button
                  variant="contained"
                  color="inherit"
                  type="submit"
                  className="w-100 mt-3"
                  onClick={handleClear}
                >
                  <i className="fas fa-trash me-2"></i>
                  Clear
                </Button>
              </Box>
              <Box md={2} className="mt-2">
                <Button
                  variant="contained"
                  color="success"
                  onClick={exportExcelFile}
                  className="w-100 mt-3"
                >
                  <RiFileExcel2Fill size={20} />
                  Excel
                </Button>
              </Box>
            </Box>
          </Box>

          <div style={{ height: 600, width: '100%', overflow: 'scroll' }}>
            <ListaDeEquipamentosTabela
              ListaDeEquipamentos={ListaDeEquipamentos}
              deletePatrimonio={handleDeleteModal}
              updatePatrimonio={handleUpdateModal}
            />
            <div className="col-md-12">{!removeLoading && <Loader />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
