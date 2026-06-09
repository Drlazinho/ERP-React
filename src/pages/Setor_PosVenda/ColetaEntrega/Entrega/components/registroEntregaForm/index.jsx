import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buscarMunicipiosPorUF } from '@/services/municipiosPorUf.service';
import { useToast } from '@/hooks/toast.hook';
import debounce from '@/utils/debounce';
import { buscarProdutoPorFiltro } from '@/services/movimentacaoCorrente.service';
import { estadosBrasileiros } from '@/utils/estadosBrasileiros';
import {
  consultaProdutos,
  buscarPosVendaEntregaItem,
} from '@/services/produtos/produtos.service';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import dayjs from 'dayjs';
import formatDateInput, { formatDateVisual } from '@/utils/formatDateInput';
import Select from 'react-select';
import { RiFileHistoryLine } from 'react-icons/ri';

import {
  Box,
  TextField,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Modal as MuiModal,
} from '@mui/material';
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RestoreIcon from '@mui/icons-material/Restore';

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

const registroInicial = {
  ordemServico: '',
  clienteDocumento: '',
  clienteNome: '',
  classificacao: '',
  observacao: '',
  uf: '',
  municipio: '',
  transportadora: '',
  valorFrete: 0,
  situacao: '',
  numFat: '',
  numCTE: '',
  email: '',
  notaFiscal: '',
  produtos: [
    {
      ordemServico: '',
      codigoProduto: '',
      quantidade: 0,
    },
  ],
};

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

const origemLista = ['CAMAÇARI', 'CAJAMAR'];

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
const col4Styles = {
  flexGrow: 1,
  flexBasis: '25%',
  maxWidth: '25%',
};
function formatDate(date) {
  return dayjs(date).format('DD/MM/YYYY');
}

export default function RegistroEntregaForm(props) {
  const [registroInfo, setRegistroInfo] = useState(registroInicial);
  const [produtosLista, setProdutosLista] = useState([]);
  const [showModalHistorico, setShowModalHistorico] = useState(false);

  const [registroDeProdutos, setRegistroDeProdutos] = useState({
    ordemServico: '',
    codigoProduto: '',
    quantidade: 0,
  });
  const [listaDeRegistroProduto, setListaRegistroProduto] = useState([]);

  const [filtroProdutos, setFiltroProdutos] = useState([]);
  const [nomeDoProduto, setNomeDoProduto] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledAtualizar, setDisabledAtualizar] = useState(false);
  const [itemTabelaProdutos, setItemTabelaProdutos] = useState({});
  const [tabelaProdutos, setTabelaProdutos] = useState([]);
  const [apiHistorico, setApiHistorico] = useState([]);

  const [municipioLista, setMunicipioLista] = useState([]);
  const [estado, setEstado] = useState('');
  const { addToast } = useToast();

  const [valorSelected, setValorSelected] = useState('');
  const valorRef = useRef(null);

  const handleShowModalHistorico = () => {
    setShowModalHistorico(!showModalHistorico);
  };

  useEffect(() => {
    if (props.registroSelecionado) {
      const { cliente, dataRegistro, ordemServico, situacao } =
        props.registroSelecionado;
      setDisabled(true);
      setRegistroInfo({
        ...registroInfo,
        clienteNome: cliente,
        ordemServico,
      });
    }
  }, [props.registroSelecionado]);

  useEffect(() => {
    if (props.registroParaAtualizar != null) {
      setDisabledAtualizar(true);
      setRegistroInfo(props.registroParaAtualizar);
      setTabelaProdutos(props.registroParaAtualizar.produtos);
    }
  }, [props.registroParaAtualizar]);

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
    if (!props.registroSelecionado && !props.registroParaAtualizar) {
      props.registrarEntrega(registroInfo);
    }
    if (props.registroParaAtualizar) {
      delete registroInfo.cliente;
      delete registroInfo.clienteDocumento;
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

  const handleFetchNomeProdutos = useCallback(() => {
    try {
      consultaProdutos().then((retorno) => {
        setProdutosLista(retorno);
      });
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar os produtos',
        description:
          'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
      });
    }
  }, []);

  const handleFetchNomeProdutosParaVisualizacao = useCallback(() => {
    try {
      consultaProdutos({ codigo: registroDeProdutos.codigoProduto }).then(
        (retorno) => {
          setNomeDoProduto(retorno[0].apelido);
        }
      );
    } catch (err) {
      addToast({
        type: 'danger',
        title: 'Erro ao listar os produtos',
        description:
          'Erro ao listar os produtos, por favor tente novamente dentre de instantes',
      });
    } finally {
      setItemTabelaProdutos({
        ...itemTabelaProdutos,
        nomeProduto: nomeDoProduto,
      });
    }
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
          title: 'Erro ao Listar Financeiro',
          description:
            'Erro ao Listar Financeiro - por favor tente novamente dentre de instantes !',
        })
      );
  }, [estado]);

  const adicionarProdutoNaTabela = (e) => {
    e.preventDefault();
    // adicionarRegistroDeProdutoLista()
    tabelaProdutos.push(itemTabelaProdutos);
    listaDeRegistroProduto.push(registroDeProdutos);
    setRegistroInfo({ ...registroInfo, produtos: listaDeRegistroProduto });
    valorRef.current.value = 0;
    setValorSelected('');
    handleFetchNomeProdutosParaVisualizacao();
  };

  function removerItemArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({
        ordemServico: registroInfo.ordemServico,
        codigoProduto: array[i].codigo,
        quantidade: parseInt(array[i].quantidade),
      });
    }
    setRegistroInfo({ ...registroInfo, produtos: newArray });
    return array;
  }

  const deletarItemDaTabelaERegistro = (item, e) => {
    e.preventDefault();
    removerItemArray(tabelaProdutos, item);
    const novaListaDeRegistroDeProduto = listaDeRegistroProduto.filter(
      (produtoRegistrado) => produtoRegistrado.codigoProduto !== item.codigo
    );
    setListaRegistroProduto(novaListaDeRegistroDeProduto);
    handleFetchNomeProdutosParaVisualizacao();
  };

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
    await buscarPosVendaEntregaItem({
      ordemServico: props.registroParaAtualizar.ordemServico,
    }).then((retorno) => {
      setApiHistorico(retorno[0]?.historico);
    });
  };

  useEffect(() => {
    if (props.registroParaAtualizar != null) {
      handleFetchHistorico();
    }
  }, [setRegistroInfo]);

  return (
    <form>
      {props.registroParaAtualizar && (
        <div
          className="input-group input-group-sm mb-4 mt-1"
          style={{ maxWidth: '600px', borderRadius: '8px' }}
        >
          <span
            className="input-group-text"
            id="inputGroup-sizing-sm"
            style={{ fontSize: '12px', padding: '4px 8px' }}
          >
            Registro
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            defaultValue={moment(registroInfo.dataRegistro).format(
              'YYYY/MM/DD HH:mm'
            )}
            aria-describedby="inputGroup-sizing-sm"
            disabled
            style={{
              fontSize: '12px',
              height: '30px',
              padding: '4px 8px',
              marginRight: '8px',
            }}
          />
          <span
            className="input-group-text"
            id="inputGroup-sizing-sm"
            style={{ fontSize: '12px', padding: '4px 8px' }}
          >
            Atualização
          </span>
          <input
            type="text"
            className="form-control"
            aria-label="Sizing example input"
            defaultValue={moment(registroInfo.dataAtualizacao).format(
              'YYYY/MM/DD HH:mm'
            )}
            aria-describedby="inputGroup-sizing-sm"
            disabled
            style={{ fontSize: '12px', height: '30px', padding: '4px 8px' }}
          />
        </div>
      )}
      <div className="row" style={{ paddingBottom: '14px' }}>
        <Box sx={col4Styles}>
          <TextField
            id="outlined-basic"
            label="Ordem Serviço"
            variant="outlined"
            name="ordemServico"
            size="small"
            value={registroInfo?.ordemServico || ''}
            onChange={(e) => {
              const novoValor = e.target.value;
              setRegistroDeProdutos({
                ...registroDeProdutos,
                ordemServico: novoValor,
              });
              setRegistroInfo({
                ...registroInfo,
                ordemServico: novoValor,
              });
            }}
            type="number"
            placeholder="Ordem Serviço"
            required
            fullWidth
            disabled={disabled || disabledAtualizar}
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="outlined-basic"
            label="Nota Fiscal"
            variant="outlined"
            name="notaFiscal"
            size="small"
            value={registroInfo?.notaFiscal || ''}
            onChange={(e) => {
              setRegistroInfo({ ...registroInfo, notaFiscal: e.target.value });
            }}
            type="number"
            placeholder="Nota Fiscal"
            required
            fullWidth
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="clienteNome"
            label="Nome"
            variant="outlined"
            name="clienteNome"
            size="small"
            value={registroInfo?.clienteNome || ''}
            onChange={inputTextHandler}
            type="text"
            placeholder="Nome"
            required
            fullWidth
            disabled={disabled || disabledAtualizar}
          />
        </Box>

        <Box sx={col4Styles}>
          <TextField
            id="clienteDocumento"
            label="CPF/CNPJ"
            variant="outlined"
            name="clienteDocumento"
            size="small"
            value={registroInfo?.clienteDocumento || ''}
            onChange={inputTextHandler}
            placeholder="CPF/CNPJ"
            type="number"
            required
            fullWidth
            disabled={disabled || disabledAtualizar}
          />
        </Box>
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
                placeholder="UF *"
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
                placeholder="Município *"
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
            <label className="form-label">Fatura</label>
            <input
              name="numFat"
              id="numFat"
              defaultValue={registroInfo?.numFat}
              onChange={inputTextHandler}
              type="number"
              pattern="[0-9]+"
              className="form-control"
              placeholder="Fatura *"
              required
              disabled={disabled}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <div className="form-label">
              <label className="form-label">Transportadora</label>
              <Select
                aria-required
                options={transportadoraListaSelect}
                onChange={handleSelectChangeTransportadora}
                placeholder="Transportadora *"
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
              <select
                name="situacao"
                className="form-select"
                aria-label="Floating label select example"
                onChange={inputTextHandler}
                defaultValue={registroInfo?.situacao}
              >
                <option value="" selected disabled>
                  Escolha a situação *
                </option>
                {situacaoLista.map((item, index) => (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </select>
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
                pattern="[0-9]+"
                required
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

            <div className="input-group input-group-sm mb-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Valor Frete R$
              </span>
              <input
                type="text"
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
        <div className="row">
          <div className="col-md-6">
            <div className="form-label">
              <label className="form-label">Origem</label>
              <select
                name="origem"
                className="form-select"
                aria-label="Floating label select example"
                onChange={inputTextHandler}
                defaultValue={registroInfo?.origem}
              >
                <option value="" selected disabled>
                  Escolha a origem *
                </option>
                {origemLista.map((item, index) => (
                  <option key={index} value={`${item}`}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {props.registroParaAtualizar && (
              <div className="form-label">
                <input
                  defaultValue={registroInfo?.origem}
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
            )}
          </div>

          <div className="col-md-6">
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
                  Escolha uma classificação *
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
          <div className="col-3">
            <div className="form-label">
              <label className="form-label">Saída</label>
              <input
                name="dataSaida"
                id="dataSaida"
                defaultValue={formatDateVisual(registroInfo?.dataSaida)}
                onChange={(e) => {
                  setRegistroInfo({
                    ...registroInfo,
                    dataSaida: e.target.value,
                  });
                }}
                type="date"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-3">
            <div className="form-label">
              <label className="form-label">Previsão</label>
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
              <label className="form-label">Entrega</label>
              <input
                name="dataEntrega"
                id="dataEntrega"
                defaultValue={formatDateVisual(registroInfo?.dataEntrega)}
                onChange={(e) => {
                  setRegistroInfo({
                    ...registroInfo,
                    dataEntrega: e.target.value,
                  });
                }}
                type="date"
                className="form-control"
              />
            </div>
          </div>
        </div>

        <label>Observação:</label>
        <div className="form-label">
          <textarea
            className="form-control"
            name="observacao"
            defaultValue={registroInfo?.observacao}
            onChange={inputTextHandler}
            id="floatingTextarea2"
            style={{ height: '140px' }}
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
                sx={{ fontSize: '20x', fontWeight: 'bold', color: '#333333' }}
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
            {apiHistorico?.length ? (
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
                        <p>Ordem de serviço: {item.ordemServico}</p>
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

        {/* PRODUTOS */}
        <fieldset className="row py-2 border my-2 mx-1">
          {!props.registroParaAtualizar && (
            <div className="row d-flex align-items-end">
              <div className="col-3">
                <label className="form-label text-secondary">Produtos</label>
                <select
                  className="form-select"
                  aria-label="Floating label select example"
                  required
                  name="produto"
                  value={valorSelected}
                  disabled={registroInfo.ordemServico === ''}
                  onChange={(e) => {
                    setRegistroDeProdutos({
                      ...registroDeProdutos,
                      codigoProduto: e.target.value,
                    });
                    setItemTabelaProdutos({
                      ...itemTabelaProdutos,
                      codigo: e.target.value,
                    });
                    setFiltroProdutos(e.target.value);
                    setValorSelected(e.target.value);
                  }}
                >
                  <option value="" selected>
                    Selecione o produto
                  </option>
                  {Array.isArray(produtosLista) &&
                    produtosLista.map((item, index) => (
                      <option key={index} value={item.codigo}>
                        {item.apelido}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label className="form-label text-secondary">Código</label>
                <input
                  name="codigoProduto"
                  id="codigoProduto"
                  defaultValue={registroDeProdutos.codigoProduto}
                  type="text"
                  className="form-control"
                  placeholder="Código"
                  disabled
                />
              </div>
              <div className="col-3">
                <label className="form-label text-secondary">Quantidade</label>
                <input
                  name="quantidade"
                  id="quantidade"
                  defaultValue={registroInfo?.PRODUTOS}
                  ref={valorRef}
                  onChange={(e) => {
                    setRegistroDeProdutos({
                      ...registroDeProdutos,
                      quantidade: parseInt(e.target.value),
                    });
                    setItemTabelaProdutos({
                      ...itemTabelaProdutos,
                      quantidade: e.target.value,
                    });
                  }}
                  type="number"
                  className="form-control"
                  disabled={valorSelected === ''}
                />
              </div>
              <div className="col-3">
                <Button
                  onClick={adicionarProdutoNaTabela}
                  disabled={
                    registroDeProdutos.codigoProduto === '' ||
                    valorSelected === ''
                  }
                  style={{
                    border: '2px solid blue',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    color: 'blue',
                  }}
                  startIcon={<AddIcon />}
                >
                  Adicionar
                </Button>
              </div>
            </div>
          )}

          <div className="row mt-3 px-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '70%' }}>
                    Produto
                  </th>
                  <th scope="col">Código</th>
                  <th scope="col">Quantidade</th>
                  {!props.registroParaAtualizar && <th scope="col">Deletar</th>}
                </tr>
              </thead>
              <tbody>
                {tabelaProdutos.map((item, index) => (
                  <tr key={index} scope="row">
                    <td>{item.nomeProduto || item.descricao}</td>
                    <td>{item.codigo}</td>
                    <td>{item.quantidade}</td>
                    <td>
                      {item.nomeProduto && (
                        <Button
                          onClick={(e) => deletarItemDaTabelaERegistro(item, e)}
                          style={{
                            border: '2px solid red',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)',
                            transition:
                              'transform 0.2s ease, box-shadow 0.2s ease',
                          }}
                        >
                          <DeleteIcon
                            style={{ fontSize: '18px', color: 'red' }}
                          />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

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
