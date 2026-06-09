import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buscarMunicipiosPorUF } from '@/services/municipiosPorUf.service';
import { useToast } from '@/hooks/toast.hook';
import { estadosBrasileiros } from '@/utils/estadosBrasileiros';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import { buscarPosVendaColetaItem } from '@/pages/Setor_PosVenda/ColetaEntrega/coletaEntrega.service';
import formatDateInput, { formatDateVisual } from '@/utils/formatDateInput';
import { formatarImagem, formatarLinkImagem } from '@/utils/formatarImagem';
import Select from 'react-select';
import ModalLoading from '@/components/ModalLoading';
import RestoreIcon from '@mui/icons-material/Restore';
import dayjs from 'dayjs';
import moment from 'moment/moment';
import { Box, Typography, Button, Modal as MuiModal } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
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

function formatDate(date) {
  return dayjs(date).format('DD/MM/YYYY');
}

const registroInicial = {
  protocolo: '',
  CLIENTE_DOCUMENTO: '',
  CLIENTE_NOME: '',
  CLASSIFICACAO: '',
  OBSERVACAO: '',
  UF: '',
  MUNICIPIO: '',
  DESTINO: '',
  EMAIL: '',
  NOTA_FISCAL: '',
  PRODUTOS: [
    {
      ID: 0,
      PROTOCOLO: '',
      CODIGO_PRODUTO: '',
      QUANTIDADE: 0,
    },
  ],
};

const destinoLista = [
  'FABRICA',
  'EVERALDO',
  'ANANINDEUA',
  'ARAGUAINA',
  'BELO HORIZONTE',
  'BOA VISTA',
  'BREVES',
  'BELEM',
  'BREU BRANCO',
  'CAPANEMA',
  'CRISSIUMAL',
  'CURITIBA',
  'IMPERATRIZ',
  'FORTALEZA',
  'FLORIANOPOLIS',
  'LINHARES',
  'MACAPA',
  'MANAUS',
  'NOVO EMBURGO',
  'OURO PRETO DO OESTE',
  'PARAUPEBAS',
  'SAO PAULO',
  'SANTA INES',
];

const situacaoLista = [
  'AGUARDANDO CADASTRO NA TOTVS',
  'AGUARDANDO COLETA',
  'AGUARDANDO FATURAMENTO',
  'AGUARDANDO EMBARQUE',
  'CLIENTE AUSENTE',
  'COLETA AUTORIZADA',
  'EM COTAÇÃO',
  'EM TRANSLADO PARA O CLIENTE',
  'EM TRANSLADO PARA A FÁBRICA',
  'EM TRANSLADO PARA CD SP',
  'EM TRANSLADO PARA O POSTO',
  'ENDEREÇO NÃO LOCALIZADO',
  'FINALIZADO',
  'PENDÊNCIA DO ATENDIMENTO',
  'RECUSA',
  'SEM REGISTRO',
  'CANCELADO',
  'OUTROS',
];

const transportadoraLista = [
  '3A LOGISTICA',
  'BRASPRESS',
  'DL CARGO',
  'FEDEX',
  'JAMEF',
  'KM CARGO',
  'LOGISTICS',
  'PATRUS',
  'SANANDO',
  'SOLISTICA',
  'TERCEIRO',
  'TRANSNAC',
  'VENDAS',
];

export default function AtualizarRegistroColetaForm(props) {
  const [showModalHistorico, setShowModalHistorico] = useState(false);
  const [apiHistorico, setApiHistorico] = useState([]);
  const [registroInfo, setRegistroInfo] = useState({});
  const [produtosLista, setProdutosLista] = useState([]);
  const handleShowModalHistorico = () => {
    setShowModalHistorico(!showModalHistorico);
  };

  const [registroDeProdutos, setRegistroDeProdutos] = useState({
    protocolo: '',
    codigoProduto: '',
    quantidade: 0,
  });
  const [nomeDoProduto, setNomeDoProduto] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledAtualizar, setDisabledAtualizar] = useState(false);
  const [anexos, setAnexos] = useState({});
  const [itemTabelaProdutos, setItemTabelaProdutos] = useState({});
  const [tabelaProdutos, setTabelaProdutos] = useState([]);

  const [municipioLista, setMunicipioLista] = useState([]);
  const [estado, setEstado] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    if (props.registroParaAtualizar) {
      setDisabledAtualizar(true);
      setRegistroInfo(props.registroParaAtualizar);
      setTabelaProdutos(props.registroParaAtualizar?.produtos);
      setAnexos({
        anexo1: props.registroParaAtualizar?.anexo1,
        anexo2: props.registroParaAtualizar?.anexo2,
        anexo3: props.registroParaAtualizar?.anexo3,
      });
    }
  }, [props.registroParaAtualizar]);

  useEffect(() => {
    handleFetchHistorico();
  }, [setRegistroInfo]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setRegistroInfo({ ...registroInfo, [name]: value });
  };

  const handleClear = (e) => {
    e.preventDefault();
    props.cancelarRegistro();
    setRegistroInfo(registroInicial);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.registroSelecionado) {
      props.registrarImagemColeta(registroInfoArquivo);
    }
    if (!props.registroSelecionado && !props.registroParaAtualizar) {
      props.registrarColeta(registroInfo);
    }
    if (props.registroParaAtualizar) {
      delete registroInfo.anexo1;
      delete registroInfo.anexo2;
      delete registroInfo.anexo3;
      delete registroInfo.clienteDocumento;
      delete registroInfo.clienteNome;
      delete registroInfo.dataAtualizacao;
      delete registroInfo.dataRegistro;
      delete registroInfo.produtos;
      delete registroInfo.id;
      delete registroInfo.idDev;
      props.atualizarRegistro(registroInfo);
    }
    setRegistroInfo(registroInicial);
  };

  useEffect(() => {
    handleFetchMunicipios();
  }, [estado]);

  const formatDateStringRegistro = (date) => {
    if (date != undefined) {
      const barra = '/';
      const espaco = ' ';
      const TP = ':';
      const posicaoInicial = 4;
      const posicaomeio = 7;
      const posicao3 = 10;
      const posicao4 = 13;
      const posicao5 = 16;
      let pFiltro;
      let sFiltro;
      let tFiltro;
      let qFiltro;
      let quiFiltro;
      pFiltro = [
        date.slice(0, posicaoInicial),
        barra,
        date.slice(posicaoInicial),
      ].join('');
      sFiltro = [
        pFiltro.slice(0, posicaomeio),
        barra,
        pFiltro.slice(posicaomeio),
      ].join('');
      tFiltro = [
        sFiltro.slice(0, posicao3),
        espaco,
        sFiltro.slice(posicao3),
      ].join('');
      qFiltro = [tFiltro.slice(0, posicao4), TP, tFiltro.slice(posicao4)].join(
        ''
      );
      quiFiltro = [
        qFiltro.slice(0, posicao5),
        TP,
        qFiltro.slice(posicao5),
      ].join('');
      return moment(quiFiltro).format('DD/MM/YYYY HH:mm:ss');
    }
    return date;
  };

  const handleFetchNomeProdutos = useCallback(() => {
    consultaProdutos()
      .then((retorno) => {
        setProdutosLista(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os produtos',
          description:
            'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
        });
      });
  }, []);

  const handleFetchNomeProdutosParaVisualizacao = useCallback(() => {
    consultaProdutos({ codigo: registroDeProdutos.codigoProduto })
      .then((retorno) => {
        setNomeDoProduto(retorno[0].apelido);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro ao listar os produtos',
          description:
            'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
        });
      })
      .finally(() => {
        setItemTabelaProdutos({
          ...itemTabelaProdutos,
          nomeProduto: nomeDoProduto,
        });
      });
  }, [registroDeProdutos]);

  useEffect(() => {
    handleFetchNomeProdutosParaVisualizacao();
  }, [registroDeProdutos]);

  useEffect(() => {
    handleFetchNomeProdutos();
  }, []);

  const handleFetchMunicipios = useCallback(() => {
    buscarMunicipiosPorUF(estado)
      .then((res) => {
        setMunicipioLista(res.data);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Municipios',
          description:
            'Erro ao Listar Municipios - por favor tente novamente dentre de instantes !',
        })
      );
  }, [estado]);

  const listaDeEstadosUf = estadosBrasileiros.map((item) => {
    const nomeSigla = item.value + ' - ' + item.label;
    return {
      value: item.value,
      label: nomeSigla,
    };
  });

  const listaDeMunicipiosUf = municipioLista.map((item) => ({
    value: item.nome,
    label: item.nome,
  }));

  const situacaoListaSelect = situacaoLista.map((item) => ({
    value: item,
    label: item,
  }));

  const transportadoraListaSelect = transportadoraLista.map((item) => ({
    value: item,
    label: item,
  }));
  const listadeDestino = destinoLista.map((item) => ({
    value: item,
    label: item,
  }));

  const handleSelectChangeDestino = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, destino: selectedOption.value });
  };

  const handleSelectChangeUF = (selectedOption) => {
    setEstado(selectedOption.value);
    setRegistroInfo({ ...registroInfo, uf: selectedOption.value });
  };

  const handleSelectChangeMunicipio = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, municipio: selectedOption.value });
  };

  const handleSelectChangeSituacao = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, situacao: selectedOption.value });
  };

  const handleSelectChangeTransportadora = (selectedOption) => {
    setRegistroInfo({ ...registroInfo, transportadora: selectedOption.value });
  };

  const handleFetchHistorico = async () => {
    await buscarPosVendaColetaItem({
      Protocolo: props.registroParaAtualizar?.protocolo,
    }).then((retorno) => {
      if (retorno?.historico.length) {
        setApiHistorico(retorno.historico);
      }
    });
  };

  return (
    <form>
      <div className="row">
        <div className="col-4">
          <label className="form-label">Protocolo</label>
          <input
            name="protocolo"
            defaultValue={registroInfo?.protocolo}
            onChange={(e) => {
              setRegistroDeProdutos({
                ...registroDeProdutos,
                protocolo: e.target.value,
              });
              setRegistroInfo({ ...registroInfo, protocolo: e.target.value });
            }}
            type="number"
            className="form-control"
            placeholder="Protocolo"
            disabled={disabled || disabledAtualizar}
          />
          {props.registroParaAtualizar && (
            <div className="input-group input-group-sm mb-3 mt-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Registro
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                defaultValue={formatDateStringRegistro(
                  registroInfo?.dataRegistro
                )}
                aria-describedby="inputGroup-sizing-sm"
                disabled
              />
            </div>
          )}
        </div>
        <div className="col-4">
          <label className="form-label">Nota Fiscal</label>
          <input
            name="notaFiscal"
            defaultValue={registroInfo?.notaFiscal}
            onChange={(e) => {
              setRegistroInfo({ ...registroInfo, notaFiscal: e.target.value });
            }}
            type="number"
            className="form-control"
            disabled={disabled}
            placeholder="Nota Fiscal"
          />
          {props.registroParaAtualizar && (
            <div className="input-group input-group-sm mb-3 mt-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Atualização
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                defaultValue={formatDateStringRegistro(
                  registroInfo?.dataAtualizacao
                )}
                aria-describedby="inputGroup-sizing-sm"
                disabled
              />
            </div>
          )}
        </div>
        <div className="col-4">
          <div className="form-label">
            <label className="form-label">Classificação</label>
            <select
              name="classificacao"
              id="classificacao"
              className="form-select"
              aria-label="Floating label select example"
              onChange={inputTextHandler}
              disabled={disabled}
            >
              <option selected disabled>
                Escolha uma classificação
              </option>
              <option value="CONSUMIDOR">CONSUMIDOR</option>
              <option value="POSTO">POSTO</option>
              <option value="REVENDA">REVENDA</option>
            </select>
          </div>
          {props.registroParaAtualizar && (
            <div className="form-label">
              <input
                defaultValue={registroInfo?.classificacao}
                type="text"
                className="form-control"
                disabled
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-4">
          <label className="form-label">Nome</label>
          <input
            name="clienteNome"
            id="clienteNome"
            defaultValue={registroInfo?.clienteNome}
            onChange={inputTextHandler}
            type="text"
            className="form-control"
            placeholder="Nome"
            disabled
          />
        </div>
        <div className="col-4">
          <label className="form-label">Fatura</label>
          <input
            name="numFat"
            id="numFat"
            defaultValue={registroInfo?.numFat}
            onChange={inputTextHandler}
            type="text"
            className="form-control"
            placeholder="Fatura"
            disabled={disabled}
          />
        </div>
        <div className="col-4">
          <label className="form-label t">
            <br />
          </label>
          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              CT-e
            </span>
            <input
              type="text"
              className="form-control"
              aria-label="Sizing example input"
              defaultValue={registroInfo?.numCTE}
              onChange={(e) => {
                setRegistroInfo({
                  ...registroInfo,
                  numCTE: e.target.value,
                });
              }}
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
          <div class="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Valor Frete R$
            </span>
            <input
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              defaultValue={registroInfo?.valorFrete}
              onChange={(e) => {
                setRegistroInfo({
                  ...registroInfo,
                  valorFrete: parseInt(e.target.value),
                });
              }}
              aria-describedby="inputGroup-sizing-sm"
            />
          </div>
        </div>
      </div>

      <div style={props.registroSelecionado && { display: 'none' }}>
        <div className="row">
          <div className="col-4">
            <div className="form-label">
              <label className="form-label">UF</label>
              <Select
                aria-required
                options={listaDeEstadosUf}
                onChange={handleSelectChangeUF}
              />
            </div>
            {props.registroParaAtualizar && (
              <div className="form-label">
                <input
                  name="uf"
                  id="uf"
                  defaultValue={registroInfo?.uf}
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            )}
          </div>

          <div className="col-4">
            <div className="form-label">
              <label className="form-label">Município</label>
              <Select
                aria-required
                options={listaDeMunicipiosUf}
                onChange={handleSelectChangeMunicipio}
              />
            </div>
            {props.registroParaAtualizar && (
              <div className="form-label">
                <input
                  defaultValue={registroInfo?.municipio}
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            )}
          </div>
          <div className="col-4">
            <div className="form-label">
              <label className="form-label">Destino</label>
              <Select
                aria-required
                options={listadeDestino}
                onChange={handleSelectChangeDestino}
              />
            </div>
            {props.registroParaAtualizar && (
              <div className="form-label">
                <input
                  defaultValue={registroInfo?.destino}
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            )}
          </div>
        </div>

        {/* Campos Especificos para Atualizar o Registro */}
        {props.registroParaAtualizar && (
          <>
            <div className="row">
              <div className="col-4">
                <div className="form-label">
                  <label className="form-label">Transportadora</label>
                  <Select
                    aria-required
                    options={transportadoraListaSelect}
                    onChange={handleSelectChangeTransportadora}
                  />
                </div>
                {props.registroParaAtualizar && (
                  <div className="form-label">
                    <input
                      name="transportadora"
                      id="transportadora"
                      defaultValue={registroInfo?.transportadora}
                      type="text"
                      className="form-control"
                      disabled
                    />
                  </div>
                )}
              </div>

              <div className="col-4">
                <div className="form-label">
                  <label className="form-label">Situação</label>
                  <Select
                    aria-required
                    options={situacaoListaSelect}
                    onChange={handleSelectChangeSituacao}
                  />
                </div>
                {props.registroParaAtualizar && (
                  <div className="form-label">
                    <input
                      defaultValue={registroInfo?.situacao}
                      type="text"
                      className="form-control"
                      disabled
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-3">
                <div className="form-label">
                  <label className="form-label">Autorização</label>
                  <input
                    name="dataAutoriz"
                    id="dataAutoriz"
                    defaultValue={formatDateVisual(registroInfo?.dataAutoriz)}
                    onChange={(e) => {
                      setRegistroInfo({
                        ...registroInfo,
                        dataAutoriz: e.target.value,
                      });
                    }}
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-label">
                  <label className="form-label">Previsão Coleta</label>
                  <input
                    name="dataPrevisao"
                    id="dataPrevisao"
                    defaultValue={formatDateVisual(registroInfo?.dataPrevisao)}
                    onChange={(e) => {
                      setRegistroInfo({
                        ...registroInfo,
                        dataPrevisao: e.target.value,
                      });
                    }}
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-label">
                  <label className="form-label">Coleta</label>
                  <input
                    name="dataColeta"
                    id="dataColeta"
                    defaultValue={formatDateVisual(registroInfo?.dataColeta)}
                    onChange={(e) => {
                      setRegistroInfo({
                        ...registroInfo,
                        dataColeta: e.target.value,
                      });
                    }}
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="form-label">
                  <label className="form-label">Previsão de Entrega</label>
                  <input
                    name="dataPrevisaoEntrega"
                    id="dataPrevisaoEntrega"
                    defaultValue={formatDateVisual(
                      registroInfo?.dataPrevisaoEntrega
                    )}
                    onChange={(e) => {
                      setRegistroInfo({
                        ...registroInfo,
                        dataPrevisaoEntrega: e.target.value,
                      });
                    }}
                    type="date"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          </>
        )}
        <label for="floatingTextarea2">Observação:</label>

        <div className="form-floating">
          <textarea
            className="form-control"
            name="observacao"
            defaultValue={registroInfo?.observacao}
            onChange={inputTextHandler}
            id="floatingTextarea2"
            style={{ height: '160px' }}
          ></textarea>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '8px',
            marginBottom: '8px',
          }}
        >
          <Button
            type="button"
            variant="outlined"
            onClick={handleShowModalHistorico}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '2px solid #1976d2',
            }}
          >
            <RestoreIcon size={40} style={{ marginRight: '8px' }} />{' '}
            <span style={{ fontWeight: 'bold' }}> Histórico</span>
          </Button>
        </div>

        <MuiModal
          open={showModalHistorico}
          onClose={handleShowModalHistorico}
          centered
          style={{
            backdropFilter: 'blur(1px)',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
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
                Histórico de Alterações
              </Typography>

              <Button
                type="reset"
                onClick={() => {
                  handleShowModalHistorico();
                }}
              >
                <CloseIcon sx={{ color: '#333333' }} />
              </Button>
            </Box>
            {apiHistorico?.length > 0 ? (
              <main>
                <p style={{ textAlign: 'center', paddingTop: '8px' }}>
                  Foram feitas {apiHistorico.length} alterações nesse protocolo.
                </p>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '10px',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}
                >
                  {apiHistorico.map((item) => (
                    <section>
                      <div
                        style={{
                          color: 'black',
                          display: 'flex',
                          alignContent: 'center',
                          flexDirection: 'column',
                          width: '775px',
                          padding: '20px',
                          height: '100%',
                          border: '1px solid rgba(0, 0, 0, 0.23)',
                          background: '#FFF',
                          borderRadius: '8px',
                        }}
                      >
                        <p>Protocolo: {item.protocolo}</p>
                        <p>
                          Realizada em: <CalendarMonthIcon />{' '}
                          {formatDate(item.dataRegistro)}
                        </p>
                        <p>Responsável pela alteração: {item.email}</p>
                        <div
                          style={{
                            color: 'black',
                            display: 'flex',
                            alignContent: 'center',
                            flexDirection: 'column',
                            padding: '18px',
                            height: '100%',
                            border: '1px solid rgba(0, 0, 0, 0.23)',
                            background: '#FFF',
                            borderRadius: '8px',
                          }}
                        >
                          <p>Descrição da alteração: {item.descricao}</p>
                        </div>
                      </div>
                    </section>
                  ))}
                </Box>
              </main>
            ) : (
              <div style={{ paddingBottom: '100px' }}>
                <h4
                  style={{
                    textAlign: 'center',
                    marginTop: '50px',
                    fontWeight: 'bold',
                  }}
                >
                  Ainda não foram feitas alterações nesse protocolo.
                </h4>
              </div>
            )}
          </Box>
        </MuiModal>

        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '12px',
            color: '#AA0000',
            marginBottom: '16px',
            paddingLeft: '8px',
          }}
        >
          Produtos
        </Typography>
        {/* PRODUTOS */}
        <fieldset className="row py-2 border my-2 mx-1">
          <div className="row mt-3 px-4">
            <table className="table">
              <thead>
                <tr style={{ borderBottom: '1px solid #808080' }}>
                  <th scope="col" style={{ width: '70%' }}>
                    Produto
                  </th>
                  <th scope="col">Código</th>
                  <th scope="col">Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {tabelaProdutos?.map((item) => (
                  <tr key={item.codigo} scope="row">
                    <td style={{ textAlign: 'left' }}>
                      {item.nomeProduto || item.descricao}
                    </td>
                    <td style={{ textAlign: 'left' }}>{item.codigo}</td>
                    <td style={{ textAlign: 'left' }}>{item.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: '12px',
          color: '#AA0000',
          marginBottom: '24px',
          paddingLeft: '8px',
        }}
      >
        Evidências
      </Typography>
      {/* IMAGES PDF */}
      <fieldset className="border my-2 mx-1 px-1 pb-4 row">
        <div className="d-flex justify-content-between gap-2">
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              1. Nota Fiscal
            </Typography>
            <a
              href={formatarImagem(anexos.anexo1)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={anexos.anexo1} alt="" width={'100%'} />
            </a>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              2. Comprovante de Residência
            </Typography>
            <a
              href={formatarImagem(anexos.anexo2)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={anexos.anexo2} alt="" width={'100%'} />
            </a>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '12px',
                marginBottom: '10px',
              }}
            >
              3. Imagem do Produto
            </Typography>
            <a
              href={formatarImagem(anexos.anexo3)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={anexos.anexo3} alt="" width={'100%'} />
            </a>
          </Box>
        </div>
      </fieldset>

      {/* Buttons */}

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          margin: '10px 24px',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          size="large"
          onClick={handleClear}
          variant="outlined"
          color="inherit"
        >
          Cancelar
        </Button>
        <Button
          size="large"
          onClick={handleSubmit}
          variant="contained"
          color="success"
        >
          Salvar Atualizações
        </Button>
      </Box>
    </form>
  );
}
