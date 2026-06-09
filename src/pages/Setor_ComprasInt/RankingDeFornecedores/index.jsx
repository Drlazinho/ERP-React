import formatDateTotvs from '../../../utils/formatDataTotvs';
import React, { useState, useEffect, useMemo } from 'react';
import {
  apiFabrica,
  apiFactory,
  apiParaTestesDev,
} from '../../../services/apis';

import BasicRating from '../../../components/RatingStars';
import {
  Button,
  Box,
  Typography,
  IconButton,
  Modal as MuiModal,
} from '@mui/material';
import {
  Header,
  ModalBodyDesignDetailsFornecedor,
  PageContentResponsiveFornecedores,
} from './styles';
import { useToast } from '../../../hooks/toast.hook';

import { questsInspecao } from '../../../utils/avaliacaoDeInspecao';
import debounce from '../../../utils/debounce';

import NewFornecedor from './NewFornecedorModal';

import GuiaModal from './GuiaModal';

import DeleteFornecedoresModal from './DeleteFornecedorModal';
import { FornecedoresTabela } from '../../../components/Tabela/FornecedoresTabela';
import CloseIcon from '@mui/icons-material/Close';
import BreadCrump from '../../../components/BreadCumbs';
import Loader from '../../../components/Loader';
import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';
import { TbNotebook } from 'react-icons/tb';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '500px',
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

export default function Fornecedores() {
  const [modalItem, setModalItem] = useState({});
  const [showModalAvaliarFornecedor, setShowModalAvaliarFornecedor] =
    useState(false);
  const [showModalDetalhesFornecedor, setShowModalDetalhesFornecedor] =
    useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);

  const [showModaLNewFornecedor, setShowModaLNewFornecedor] = useState(false);
  const [showModalGuia, setShowModalGuia] = useState(false);
  const [showModalDeleteFornecedor, setShowModalDeleteFornecedor] =
    useState(false);
  const [valueStar, setValueStar] = useState({
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
  });
  const { addToast } = useToast();

  const [totalRankingStar, setTotalRankingStar] = useState(0);
  const [nameFornecedor, setNameFornecedor] = useState('');
  const [setupQuest, setSetupQuest] = useState({
    avaliador: null,
    setor: null,
  });
  const [filtro, setFiltro] = useState({
    fornecedor: null,
    cnpj: null,
  });

  // API
  const [fornecedorProformaLista, setFornecedorProformaLista] = useState([]);
  const [questions, setQuestions] = useState({});
  const [rankingPersonal, setRankingPersonal] = useState(0);

  const resetPointQuests = () => {
    setValueStar({
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0, //value4 - Nao tem valor funcional - usado pra resolver um bug - temporário
    });
  };

  const handleShowModalAvaliar = (item) => {
    setNameFornecedor(item.fornecedor);
    setRankingPersonal({
      avaliacao1: item.avaliacao1,
      avaliacao2: item.avaliacao2,
      avaliacao3: item.avaliacao3,
      avaliacao4: item.avaliacao4,
    });
    setModalItem(item);
    setShowModalAvaliarFornecedor(true);
  };

  const handleShowModalDetails = (item) => {
    setShowModalDetalhesFornecedor(true);
    setModalItem(item);
  };

  const handleShowModalNewFornecedor = () => {
    setShowModaLNewFornecedor(true);
  };
  const handleShowModalDeleteFornecedor = (item) => {
    setModalItem(item);
    setShowModalDeleteFornecedor(true);
  };
  const handleShowModalGuia = () => {
    setShowModalGuia(!showModalGuia);
  };

  const handleUpdate = async (item) => {
    try {
      questType();
      await apiFactory.put(`/RatingFornecedor/${item.id}`, {
        ...item,
        ...rankingPersonal,
      });
      handleFetch();
      handleClose();
    } catch (err) {
      addToast({
        type: 'warning',
        title: 'Erro ao Avaliar!',
        description: 'Não foi possível enviar a avaliação',
      });
    } finally {
      addToast({
        type: 'success',
        title: 'Sucesso ao Avaliar!',
        description: 'Sua avaliação foi enviada',
      });
    }
  };

  const handleClose = () => {
    setShowModalAvaliarFornecedor(false);
    setShowModalDetalhesFornecedor(false);
    setShowModaLNewFornecedor(false);
    setShowModalDeleteFornecedor(false);
    resetPointQuests();
    setSetupQuest({ avaliador: null, setor: null });
  };

  // useEffect(() => {
  //   questType();
  // }, [setupQuest]);

  const setupQuestInputsModalAvaliador = (e) => {
    resetPointQuests();
    setSetupQuest({ ...setupQuest, avaliador: e });
  };

  const setupQuestInputsModalSetor = (e) => {
    resetPointQuests();
    setSetupQuest({ ...setupQuest, setor: e });
  };

  useEffect(() => {
    setTotalRankingStar(
      valueStar.value1 + valueStar.value2 + valueStar.value3 //remover
    );
    questType();
  }, [valueStar]);

  const { setor, nivel } = useUsuarioLocal();

  // CONDICIONAIS DAS AVALIAÇÕES
  const questType = () => {
    if (setor === 11) {
      setQuestions({
        question1: questsInspecao[0].quests.quest1,
        question2: questsInspecao[0].quests.quest2,
        question3: questsInspecao[0].quests.quest3,
      });
      setRankingPersonal({
        avaliacao1: totalRankingStar,
      });
    }
    if (setor === 8 || setor === 7) {
      setQuestions({
        question1: questsInspecao[1].quests.quest1,
        question2: questsInspecao[1].quests.quest2,
        question3: questsInspecao[1].quests.quest3,
      });
      setRankingPersonal({
        avaliacao2: totalRankingStar,
      });
    }
    if (setor === 4) {
      setQuestions({
        question1: questsInspecao[2].quests.quest1,
        question2: questsInspecao[2].quests.quest2,
        question3: questsInspecao[2].quests.quest3,
      });
      setRankingPersonal({
        avaliacao3: totalRankingStar,
      });
    }
    if (setor === 10) {
      setQuestions({
        question1: questsInspecao[3].quests.quest1,
        question2: questsInspecao[3].quests.quest2,
        question3: questsInspecao[3].quests.quest3,
      });
      setRankingPersonal({
        avaliacao4: totalRankingStar,
      });
    }
    if (setor === 9) {
      setQuestions({
        question1: questsInspecao[4].quests.quest1,
        question2: questsInspecao[4].quests.quest2,
        question3: questsInspecao[4].quests.quest3,
      });
      setRankingPersonal({
        rankingMedia5: totalRankingStar,
      });
    }
    if (
      setor !== 9 &&
      setor !== 11 &&
      setor !== 10 &&
      setor !== 4 &&
      setor !== 7
    ) {
      setQuestions({
        question1: 'NÃO COMPATÍVEL',
        question2: 'NÃO COMPATÍVEL',
        question3: 'NÃO COMPATÍVEL',
      });
    }
  };

  const [fornecedorLista, setFornecedorLista] = useState({});

  const handleFetch = async () => {
    try {
      const responseDataFornecedor = await apiFactory.get('/FornecedoresChina');
      setFornecedorLista(responseDataFornecedor.data);
    } catch (error) {
      addToast({
        type: 'warning',
        title: 'Erro + Novo Proforma !',
        description:
          'Não é possível registrar Nova Proforma, tente novamente mais tarde',
      });
    } finally {
      setRemoveLoading(true);
    }

    try {
      const response = await apiFactory.get('/RatingFornecedor', {
        params: filtro,
      });
      setFornecedorProformaLista(
        response.data.map((item) => {
          return {
            id: item.id,
            doc: item.doc,
            codFornecedor: item.codFornecedor,
            fornecedor: item.fornecedor,
            dataProducao: item.dataProducao,
            dataInspecao: item.dataInspecao,
            dataPrevisao: item.dataPrevista,
            dataEntrega: item.dataEntrega,
            pagamento: item.pagamento,
            perpago: item.perpago,
            product: item.product,
            quitado: item.quitado,
            proforma: item.proforma,
            avaliacao1: item.avaliacao1,
            avaliacao2: item.avaliacao2,
            avaliacao3: item.avaliacao3,
            avalResult: item.avalResult,
          };
        })
      );
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar fornecedores !',
        description:
          'Erro ao listar os fornecedores, por favor tente novamente dentre de instantes !',
      });
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setNameFornecedor('');
    setFiltro({ cnpj: null, fornecedor: null });
  };

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const addFornecedor = async (value) => {
    const response = await apiFactory.post('/RatingFornecedor', value);
    if (nivel === 6 || nivel === 8) {
      setFornecedorProformaLista([...fornecedorProformaLista, response.data]);
      setShowModaLNewFornecedor(false);
    } else {
      addToast({
        type: 'danger',
        title: 'SEM PERMISSÃO',
        description:
          'Seu perfil não tem permissão para adicionar nova Proforma',
      });
    }
  };

  const deleteFornecedor = async (item) => {
    await apiFabrica.delete(`/RatingFornecedor/${modalItem.id}`);
    await handleFetch();
    setShowModalDeleteFornecedor(false);
  };

  const [renderOverBreadCrumb, setRenderOverBreadCrumb] = useState({});
  const [classAnimation, setClassAnimation] = useState('');

  const novaRenderizacao = (values) => {
    setRenderOverBreadCrumb(values);
    if (classAnimation === '') {
      setClassAnimation('render-Bread');
    }
  };

  const restartRenderizacao = () => {
    setClassAnimation('');
  };

  const eventScrollToBottom = (e) => {
    window.scrollBy(0, 99999);
  };

  return (
    <>
      <MuiModal open={showModalAvaliarFornecedor} onClose={handleClose}>
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
              Avaliação do Fornecedor-{' '}
              <span className="font-bold text-success">{nameFornecedor}</span>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleShowModalGuia}
            >
              Guia
            </Button>
          </Box>

          {/* QUESTIONARIOS */}
          <form className="">
            <div>
              {questions.question1}
              <select
                className="form-select form-select-lg mb-3"
                id="categoria1"
                name="categoria1"
                onChange={(event) => {
                  setValueStar({
                    ...valueStar,
                    value1: Number(event.target.value),
                  });
                }}
              >
                <option value="0" disabled selected>
                  Dar a Nota
                </option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
              {/* <BasicRating
                    type
                    value={valueStar.value1}
                    onChange={(event) => {
                      setValueStar({
                        ...valueStar,
                        value1: Number(event.target.value),
                      });
                    }}
                  /> */}
            </div>
            <div>
              {questions.question2}
              <select
                className="form-select form-select-lg mb-3"
                id="categoria2"
                name="categoria2"
                onChange={(event) => {
                  setValueStar({
                    ...valueStar,
                    value2: Number(event.target.value),
                  });
                }}
              >
                <option value="0" disabled selected>
                  Dar a Nota
                </option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
            <div>
              {questions.question3}
              <select
                className="form-select form-select-lg mb-3"
                id="categoria3"
                name="categoria3"
                onChange={(event) => {
                  setValueStar({
                    ...valueStar,
                    value3: Number(event.target.value),
                  });
                }}
              >
                <option value="0" disabled selected>
                  Dar a Nota
                </option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
              </select>
            </div>
          </form>
          {/* RESULTADO */}
          <div>
            Resultado <BasicRating valueStarTotal={totalRankingStar} />
          </div>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '10px',
              mt: '24px',
            }}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              sx={{ fontSize: '10px' }}
            >
              Fechar / Close
            </Button>
            {questions.question1 !== 'NÃO COMPATÍVEL' ? (
              <Button
                variant="outlined"
                sx={{ fontSize: '10px' }}
                onClick={(e) => {
                  setValueStar({
                    ...valueStar,
                    value4: Number(e.target.value),
                  });
                  handleUpdate(modalItem);
                }}
              >
                Salvar Alteraçoes / Save Changes
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={() => handleUpdate(modalItem)}
                disabled
              >
                Salvar Alteraçoes / Save Changes
              </Button>
            )}
          </Box>
        </Box>
      </MuiModal>

      {/* -----------------------------MODAL RESULTADO----------------------------------------------------- */}
      <MuiModal open={showModalDetalhesFornecedor} onClose={handleClose}>
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mb: '24px',
            }}
          >
            <Typography
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Detalhes do Fornecedor -{' '}
              <span className="font-bold text-success">
                {modalItem.fornecedor}
              </span>
            </Typography>
            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <ModalBodyDesignDetailsFornecedor>
              <div>
                <p className="text-dark">Nota do setor Pós-venda</p>
                <BasicRating result={modalItem.avaliacao1} mediaSetor />
              </div>
              <div>
                <p className="text-dark">Nota do setor China</p>
                <BasicRating result={modalItem.avaliacao2} mediaSetor />
              </div>
              <div>
                <p className="text-dark">Nota do setor Financeiro</p>
                <BasicRating result={modalItem.avaliacao3} mediaSetor />
              </div>
              <div>
                <p className="text-dark">Nota do setor Produção</p>
                <BasicRating result={modalItem.avaliacao4} mediaSetor />
              </div>
              <div>
                <p className="text-dark">Nota do setor Logística</p>
                <BasicRating result={modalItem.rankingMedia5} mediaSetor />
              </div>
              <div>
                <p className="text-dark">Resultado Total</p>
                <BasicRating
                  rankingFinal
                  result={modalItem.rankingTotal}
                  size="large"
                />
              </div>
              <div>
                <p className="text-dark">{modalItem.name}</p>
                <p className="text-dark">{modalItem.proForma}</p>
              </div>
            </ModalBodyDesignDetailsFornecedor>
          </Box>
          <Box>
            <Button
              variant="outlined"
              sx={{ fontSize: '10px' }}
              color="error"
              onClick={handleClose}
            >
              Fechar / Close
            </Button>
          </Box>
        </Box>
      </MuiModal>

      <MuiModal open={showModalGuia} onClose={handleShowModalGuia}>
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
              Guia de Avaliação
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleShowModalGuia();
              }}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <GuiaModal />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleShowModalGuia}
              sx={{ fontSize: '10px' }}
            >
              Fechar / Close
            </Button>
          </Box>
        </Box>
      </MuiModal>

      <MuiModal open={showModaLNewFornecedor} onClose={handleClose}>
        <Box sx={style}>
          <Box>
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
                Novo Proforma
              </Typography>

              <Button
                type="reset"
                onClick={() => {
                  handleClose();
                }}
                variant="text"
              >
                <CloseIcon sx={{ color: '#333333' }} />
              </Button>
            </Box>
          </Box>
          <Box>
            <NewFornecedor
              listaDeFornecedores={fornecedorLista}
              addFornecedor={addFornecedor}
              cancelarFornecedor={handleClose}
            />
          </Box>
        </Box>
      </MuiModal>

      <MuiModal open={showModalDeleteFornecedor} onClose={handleClose}>
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
              Deletar Fornecedor
            </Typography>

            <Button
              type="reset"
              onClick={() => {
                handleClose();
              }}
              variant="text"
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box>
            <DeleteFornecedoresModal
              deleteFornecedor={deleteFornecedor}
              closeModal={handleClose}
            />
          </Box>
        </Box>
      </MuiModal>

      {/* -------------------------------------------Layout da Página---------------------------------------------------- */}
      <div
        className="position-relative"
        style={{ width: '98%', margin: '0 auto' }}
      >
        <div className="mb-3">
          <Header>
            <div className=" d-flex justify-content-between ">
              <div className="d-flex align-items-top gap-2 ">
                <TbNotebook size={40} color={'#FFFFFF'} />
                <h2
                  className="text-light"
                  style={{ textShadow: '-1px -1px 6px #000000' }}
                >
                  Ranking de Fornecedores
                </h2>
              </div>
            </div>
            <Button variant="outlined" onClick={handleShowModalNewFornecedor}>
              <i className="fas fa-plus"></i> Nova Proforma
            </Button>
          </Header>
        </div>
        <form className="row" onSubmit={handleClear}>
          <div className="col-md-4">
            <label
              className="text-light"
              style={{ textShadow: '-1px -1px 6px #000000' }}
            >
              Fornecedores
            </label>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Fornecedores"
                aria-label="Fornecedores"
                aria-describedby="basic-addon1"
                onChange={(e) =>
                  debounce(() => {
                    setFiltro({ ...filtro, fornecedor: e.target.value });
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <label>Nº do pro forma</label>
            <div className="input mb-3">
              <input
                type="text"
                placeholder="Nº da pro forma"
                name="pro_forma"
                className="form-control"
                onChange={(e) =>
                  debounce(() => {
                    setFiltro({ ...filtro, doc: e.target.value });
                  })
                }
              />
            </div>
          </div>
          <div className="col-12 col-md-2 mt-0 mt-md-4 mb-2">
            <button
              className="w-100 btn btn-sm btn-outline-danger me-2"
              type="submit"
            >
              <i className="fas fa-trash me-2"></i>
              Clear
            </button>
          </div>
        </form>

        <PageContentResponsiveFornecedores>
          <div className={classAnimation}>
            <BreadCrump
              toMobile
              name1={'Produção'}
              idImage1={1}
              date1={formatDateTotvs(
                renderOverBreadCrumb.dataProducaoNewRender,
                '/'
              )}
              idImage2={2}
              name2={'Inspeção'}
              date2={formatDateTotvs(
                renderOverBreadCrumb.dataCarregamentoNewRender,
                '/'
              )}
              idImage3={3}
              name3={'Previsão'}
              date3={formatDateTotvs(
                renderOverBreadCrumb.dataTransporteNewRender,
                '/'
              )}
              idImage4={4}
              name4={'Entregue'}
              date4={formatDateTotvs(
                renderOverBreadCrumb.dataEntregueNewRender,
                '/'
              )}
            />
          </div>

          {/* Componentizar TABELA - DEPOIS */}
          <div className="row">
            <div className="col-md-12 mt-4">
              <div style={{ height: 600, width: '100%', overflow: 'scroll' }}>
                <FornecedoresTabela
                  inspecao={fornecedorProformaLista}
                  telamodal={handleShowModalAvaliar}
                  telamodal2={handleShowModalDetails}
                  handleModalDeleteFornecedores={
                    handleShowModalDeleteFornecedor
                  }
                  novaRenderizacao={novaRenderizacao}
                  restartRenderizacao={restartRenderizacao}
                  eventScrollToBottom={eventScrollToBottom}
                />
                <div className="col-md-12">{!removeLoading && <Loader />}</div>
              </div>
            </div>
          </div>
        </PageContentResponsiveFornecedores>
      </div>
    </>
  );
}
