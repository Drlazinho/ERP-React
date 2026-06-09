import React, { useState, useEffect, useCallback, useContext } from 'react';
import Button from '@mui/material/Button';
import ModalCard from './Modal/ModalGerenciamentoCard.jsx';
import ModalPage from './Modal/ModalGerenciamentoPage.jsx';
import { TabelaCard } from '@/components/Tabela/GerenciamentoInfoTabela/CardTabela/index.jsx';
import {
  buscarParametrizacaoCard,
  buscarParametrizacaoPageInfo,
  atualizarStatusCard,
  atualizarStatusPage,
  putDescricaoPage,
  putDescricaoCard,
  criarParametrizacaoCard,
  criarParametrizacaoPage,
} from '@/pages/Setor_Inteligencia/GerenciamentoDeInformacoes/gerenciamentoDeInformacoes.service.js';
import { useToast } from '@/hooks/toast.hook.jsx';
import { TabelaPage } from '@/components/Tabela/GerenciamentoInfoTabela/TabelaPage/index.jsx';
import { IoIosSwitch } from 'react-icons/io';
import { Autocomplete, TextField } from '@mui/material';
import { RestricaoContext } from '@/hooks/acesso-restrito-ti.hook.jsx';
import { useLocation, useNavigate } from 'react-router';

//import { AiOutlineFileText } from 'react-icons/ai';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function GerenciamentoDeInformacoes() {
  const { showModalAccess, LiberarAcesso, setRouteName, error } =
    useContext(RestricaoContext);
  const location = useLocation().pathname;
  const [gerenciamentoInfoCard, setGerenciamentoInfoCard] = useState([]);
  const [gerenciamentoInfoPage, setGerenciamentoInfoPage] = useState([]);
  const [updateInfoCard, setUpdateInfoCard] = useState(true);
  const [updateInfoPage, setUpdateInfoPage] = useState(true);
  const [filtroCard, setFiltroCard] = useState(0);
  const [filtroPage, setFiltroPage] = useState(0);
  const { addToast } = useToast();
  const [listOfCards, setListOfCards] = useState([]);
  const [listOfPage, setlistOfPage] = useState([]);
  const [listCards, setListCards] = useState([]);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  //Gerenciamento dos cards
  const handleFetchCard = useCallback(() => {
    setRouteName(location);
    buscarParametrizacaoCard(filtroCard).then((retorno) => {
      setGerenciamentoInfoCard(retorno);
      retorno?.map((item, index) =>
        listOfCards.push({
          label: item.id + ' - ' + item.descricao,
          value: item.id,
        })
      );
    });
  }, [filtroCard]);

  const handleAutoCompleteChangeCard = (e, item) => {
    setFiltroCard(item.value);
  };

  const handleAutoCompleteChangePage = (e, item) => {
    setFiltroPage(item.value);
  };

  const handleFetchPage = useCallback(() => {
    buscarParametrizacaoPageInfo(filtroPage).then((retorno) => {
      setGerenciamentoInfoPage(retorno);
      retorno?.map((item, index) =>
        listOfPage.push({
          label: item.id + ' - ' + item.descricao,
          value: item.id,
        })
      );
    });
  }, [filtroPage]);

  const handleChangeEnviadoCard = (id) => {
    atualizarStatusCard(id)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Card alterada',
        });
      })
      .catch(() => {
        addToast({
          type: 'danger',
          description: 'Falha ao alterar a Card',
        });
      })
      .finally(() => {
        handleFetchCard, setUpdateInfoCard(!updateInfoCard);
      });
  };

  const handleChangeEnviadoPage = (id) => {
    atualizarStatusPage(id)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Página alterada',
        });
      })
      .catch(() => {
        addToast({
          type: 'danger',
          description: 'Falha ao alterar a página',
        });
      })
      .finally(() => {
        handleFetchPage, setUpdateInfoPage(!updateInfoPage);
      });
  };

  useEffect(() => {
    handleFetchCard();
  }, [updateInfoCard, filtroCard]);

  useEffect(() => {
    handleFetchPage();
  }, [updateInfoPage, filtroPage]);

  const handleClearCard = (event, reason) => {
    if (reason === 'select-option') {
    } else if (reason === 'clear') {
      setFiltroCard(0);
    }
  };

  const handleClearPage = (event, reason) => {
    if (reason === 'select-option') {
    } else if (reason === 'clear') {
      setFiltroPage(0);
    }
  };

  const atualizarDescricaoPage = (value) => {
    putDescricaoPage(value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Descricao alterada',
        });
      })
      .catch(() => {
        addToast({
          type: 'danger',
          description: 'error',
        });
      })
      .finally(() => {
        handleFetchPage();
      });
  };
  const atualizarDescricaoCard = (value) => {
    putDescricaoCard(value)
      .then(() => {
        addToast({
          type: 'success',
          description: 'Descricao alterada',
        });
      })
      .catch(() => {
        addToast({
          type: 'danger',
          description: 'error',
        });
      })
      .finally(() => {
        handleFetchCard();
      });
  };

  const CriarParametrizacaoCard = async (value) => {
    try {
      await criarParametrizacaoCard(value);
      addToast({
        type: 'success',
        description: 'Card Enviado',
      });
    } catch (error) {
      console.error(error);
      addToast({
        type: 'danger',
        description: 'Error occurred while processing the request',
      });
    } finally {
      handleFetchCard();
    }
  };
  const CriarParametrizacaoPage = async (value) => {
    try {
      await criarParametrizacaoPage(value);
      addToast({
        type: 'success',
        description: 'Card Enviado',
      });
    } catch (error) {
      console.error(error);
      addToast({
        type: 'danger',
        description: 'Error occurred while processing the request',
      });
    } finally {
      handleFetchPage();
    }
  };
  return (
    <>
      <div
        className="position-relative"
        style={{ width: '98%', margin: '0 auto' }}
      >
        <div className="mb-3 row">
          <div className="d-flex align-items-center gap-2">
            <IoIosSwitch size={24} color="white" />{' '}
            <h2
              className="text-light"
              style={{ textShadow: '-1px -1px 6px #000000' }}
            >
              Gerenciamento de Informação
            </h2>
          </div>
          <div>
            <Button
              variant="contained"
              color="success"
              onClick={handleBack}
              startIcon={<KeyboardBackspaceIcon />}
            >
              Voltar
            </Button>
          </div>

          <div className="col-6 d-flex flex-column  border border-3 border-top-0 border-bottom-0 border-start-0 border-secondary  p-2  ">
            {/* <AiOutlineFileText size={24} color='orange'/> */}
            <div className=" ">
              <h2 className="m-auto w-75 text-center p-2 bg-dark text-light fs-5 rounded fw-light shadow">
                PAGE
              </h2>
              <section></section>

              <div className="d-flex mt-2 justify-content-end"></div>
            </div>

            <div className=" flex-column align-items-center  pt-3 justify-content-start gap-2 ">
              <div className="d-flex flex-row w-75 gap-4">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={listOfPage}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Page" />
                  )}
                  onChange={(event, newValue) => {
                    setFiltroPage(newValue?.value);
                  }}
                  onClose={handleClearPage}
                />
                <ModalPage
                  atualizarDescricaoPage={atualizarDescricaoPage}
                  CriarParametrizacaoPage={CriarParametrizacaoPage}
                ></ModalPage>
              </div>

              <div style={{ height: 500, width: '100%', overflow: 'scroll' }}>
                <TabelaPage
                  gerenciarInfo={gerenciamentoInfoPage}
                  atualizarServicoPage={handleChangeEnviadoPage}
                  atualizarDescricaoPage={atualizarDescricaoPage}
                />
              </div>
            </div>
          </div>

          <div className="col-6 d-flex flex-column border border-3 border-secondary  border-top-0 border-bottom-0 border-end-0  p-2 ">
            {/* <AiOutlineFileText size={24} color='orange'/> */}
            <div className=" ">
              <h2 className="m-auto w-75 text-center p-2 bg-dark text-light fs-5 rounded fw-light shadow">
                CARD
              </h2>
              <br />
              <div className="d-flex flex-row w-75 gap-4">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={listOfCards}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Cards" />
                  )}
                  onChange={(event, newValue) => {
                    setFiltroCard(newValue?.value);
                  }}
                  onClose={handleClearCard}
                />
                <ModalCard
                  atualizarDescricaoCard={atualizarDescricaoCard}
                  CriarParametrizacaoCard={CriarParametrizacaoCard}
                  atualizarServicoPage={handleChangeEnviadoPage}
                />
              </div>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center gap-2  ">
              <div className="d-flex flex-row w-75 gap-4"></div>
              <div style={{ height: 500, width: '100%', overflow: 'scroll' }}>
                <TabelaCard
                  gerenciarInfo={gerenciamentoInfoCard}
                  atualizarServicoCard={handleChangeEnviadoCard}
                  atualizarDescricaoCard={atualizarDescricaoCard}
                  atualizarServicoPage={handleChangeEnviadoCard}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
