import React, { useCallback, useEffect, useRef, useState } from 'react';
import { buscarMunicipiosPorUF } from '@/services/municipiosPorUf.service';
import { useToast } from '@/hooks/toast.hook';
import debounce from '@/utils/debounce';
import { buscarProdutoPorFiltro } from '@/services/movimentacaoCorrente.service';
import { estadosBrasileiros } from '@/utils/estadosBrasileiros';
import { consultaProdutos } from '@/services/produtos/produtos.service';
import formatDateTotvs from '@/utils/formatDataTotvs';
import formatDateInput, {
  formatDateVisual,
} from '@/utils/formatDateInput';
import { formatarImagem } from '@/utils/formatarImagem';


const registroInicial = {
  protocolo: '',
  CLIENTE_DOCUMENTO: '',
  CLIENTE_NOME: '',
  CLASSIFICACAO: '',
  OBSERVACAO: '',
  UF: '',
  MUNICIPIO: '',
  DESTINO: '',
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

const registroInicialArquivo = {
  ANEXO1: '',
  ANEXO2: '',
  ANEXO3: '',
};

export default function RegistroColetaForm(props) {
  const [registroInfo, setRegistroInfo] = useState({});
  const [produtosLista, setProdutosLista] = useState([]);

  const [registroDeProdutos, setRegistroDeProdutos] = useState({
    protocolo: '',
    codigoProduto: '',
    quantidade: 0,
  });
  const [listaDeRegistroProduto, setListaRegistroProduto] = useState([]);

  const [filtroProdutos, setFiltroProdutos] = useState([]);
  const [nomeDoProduto, setNomeDoProduto] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [disabledAtualizar, setDisabledAtualizar] = useState(false);
  const [anexos, setAnexos] = useState({});
  const [itemTabelaProdutos, setItemTabelaProdutos] = useState({});
  const [tabelaProdutos, setTabelaProdutos] = useState([]);

  const [municipioLista, setMunicipioLista] = useState([]);
  const [estado, setEstado] = useState('');
  const { addToast } = useToast();

  const [registroInfoArquivo, setRegistroInfoArquivo] = useState({});

  useEffect(() => {
    if (props.registroSelecionado) {
      const { cliente, dataRegistro, protocolo, situacao } =
        props.registroSelecionado;
      setDisabled(true);
      setRegistroInfoArquivo({ ...registroInfoArquivo, protocolo });
      setRegistroInfo({
        ...registroInfo,
        clienteNome: cliente,
        protocolo,
      });
    }
  }, [props.registroSelecionado]);

  useEffect(() => {
    if (props.registroParaAtualizar) {
      setDisabledAtualizar(true);
      setRegistroInfo(props.registroParaAtualizar[0]);
      setTabelaProdutos(props.registroParaAtualizar[0].produtos);
      setAnexos({
        anexo1: props.registroParaAtualizar[0].anexo1,
        anexo2: props.registroParaAtualizar[0].anexo2,
        anexo3: props.registroParaAtualizar[0].anexo3,
      });
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
  const valorRef = useRef(null)

  const handleClearFormProduto = (e) => {
    e.preventDefault();
    e.target.reset();
  }

  useEffect(() => {
    handleFetchMunicipios();
  }, [estado]);

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

  const adicionarProdutoNaTabela = (e) => {
    e.preventDefault();
    // adicionarRegistroDeProdutoLista()
    tabelaProdutos.push(itemTabelaProdutos);
    listaDeRegistroProduto.push(registroDeProdutos);
    setRegistroInfo({ ...registroInfo, produtos: listaDeRegistroProduto });
    valorRef.current.value =0;
    handleFetchNomeProdutosParaVisualizacao();
  };

  function removerItemArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    setRegistroInfo({ ...registroInfo, produtos: array })
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
                defaultValue={formatDateTotvs(registroInfo.dataRegistro, '/')}
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
           <small class="form-text"  style={{ color: 'red', fontWeight: 'bold' }}>SOMENTE NÚMEROS</small>
          {props.registroParaAtualizar && (
            <div className="input-group input-group-sm mb-3 mt-3">
              <span className="input-group-text" id="inputGroup-sizing-sm">
                Atualização
              </span>
              <input
                type="text"
                className="form-control"
                aria-label="Sizing example input"
                defaultValue={formatDateTotvs(
                  registroInfo.dataAtualizacao,
                  '/'
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
        <div className="col-6">
          <label className="form-label">Nome</label>
          <input
            name="clienteNome"
            id="clienteNome"
            defaultValue={registroInfo?.clienteNome}
            onChange={inputTextHandler}
            type="text"
            className="form-control"
            placeholder="Nome"
            disabled={disabled}
          />
        </div>
        <div className="col-6">
          {props.registroParaAtualizar ? (
            <>
              <label className="form-label">Fatura</label>
              <input
                name="numFat"
                id="numFat"
                defaultValue={registroInfo?.numFat}
                onChange={inputTextHandler}
                type="number"
                className="form-control"
                placeholder="fatura"
                disabled={disabled}
              />
            </>
          ) : (
            <>
              <label className="form-label">CNPJ/CPF</label>
              <input
                name="clienteDocumento"
                id="clienteDocumento"
                defaultValue={registroInfo?.CLIENTE_DOCUMENTO}
                onChange={inputTextHandler}
                type="number"
                className="form-control"
                placeholder="CNPJ"
                disabled={disabled}
              />
              <small class="form-text"  style={{ color: 'red', fontWeight: 'bold' }}>SOMENTE NÚMEROS</small>
            </>
          )}
        </div>
      </div>

      <div style={props.registroSelecionado && { display: 'none' }}>
        <div className="row">
          <div className="col-4">
            <div className="form-label">
              <label className="form-label">UF</label>
              <select
                className="form-select"
                aria-label="Floating label select example"
                name="uf"
                id="uf"
                defaultValue={registroInfo?.uf}
                onChange={(e) => {
                  debounce(() => {
                    setEstado(e.target.value);
                    setRegistroInfo({ ...registroInfo, uf: e.target.value });
                  });
                }}
              >
                <option selected disabled>
                  Escolha um Estado
                </option>
                {estadosBrasileiros.map((item, index) => (
                  <option key={index} value={`${item.value}`}>
                    {item.value} - {item.label}
                  </option>
                ))}
              </select>
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
              <select
                name="municipio"
                className="form-select"
                aria-label="Floating label select example"
                onChange={inputTextHandler}
                defaultValue={registroInfo?.municipio}
              >
                <option selected disabled>
                  Escolha um município
                </option>
                {municipioLista.map((item) => (
                  <option key={item.id} value={`${item.nome}`}>
                    {item.nome}
                  </option>
                ))}
              </select>
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
              <select
                name="destino"
                className="form-select"
                aria-label="Floating label select example"
                onChange={inputTextHandler}
              >
                <option selected disabled>
                  Escolha o destino
                </option>
                <option value="FÁBRICA">FÁBRICA</option>
                <option value="EVERALDO">EVERALDO</option>
                <option value="PARÁ">PARÁ</option>
                <option value="IMPERATRIZ">IMPERATRIZ</option>
              </select>
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
                  <select
                    className="form-select"
                    aria-label="Floating label select example"
                    name="transportadora"
                    id="transportadora"
                    defaultValue={registroInfo?.transportadora}
                    onChange={(e) => {
                      debounce(() => {
                        setEstado(e.target.value);
                        setRegistroInfo({
                          ...registroInfo,
                          transportadora: e.target.value,
                        });
                      });
                    }}
                  >
                    <option selected disabled>
                      Escolha uma transportadora
                    </option>
                    <option value="SOLISTICA">SOLISTICA</option>
                    <option value="DL CARGO">DL CARGO</option>
                    <option value="3A LOGISTICA">3A LOGISTICA</option>
                    <option value="BRASPRESS">BRASPRESS</option>
                    <option value="JAMEF">JAMEF</option>
                    <option value="FEDEX">FEDEX</option>
                    <option value="PATRUS">PATRUS</option>
                    <option value="TERCEIRO">TERCEIRO</option>
                    <option value="LOGISTICS">LOGISTICS</option>
                  </select>
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
                    <option selected disabled>
                      Escolha a situação
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
                    type="number"
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
                    defaultValue={parseInt(registroInfo?.valorFrete)}
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

        <div className="form-floating">
          <textarea
            className="form-control"
            name="observacao"
            defaultValue={registroInfo?.observacao}
            onChange={inputTextHandler}
            id="floatingTextarea2"
            style={{ height: '70px' }}
          ></textarea>
          <label for="floatingTextarea2">Observação:</label>
        </div>

        {/* PRODUTOS */}
        <fieldset className="row py-2 border my-2 mx-1">
          {!props.registroParaAtualizar && (
            <form onSubmit={handleClearFormProduto}>

            <div className="row d-flex align-items-end">
              <div className="col-3">
                <label className="form-label text-secondary">Produtos</label>
                <select
                  className="form-select"
                  aria-label="Floating label select example"
                  required
                  name="produto"
                  defaultValue={registroInfo.PRODUTOS}
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
                  }}
                >
                  <option selected>Selecione o produto</option>
                  {produtosLista.map((item) => (
                    <option key={item.codigo} value={item.codigo}>
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
                  placeholder="código"
                  disabled
                />
              </div>
              <div className="col-3">
                <label className="form-label text-secondary">Qtd.</label>
                <input
                  name="quantidade"
                  id="quantidade"
                  defaultValue={itemTabelaProdutos?.quantidade}
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
                />
              </div>
              <div className="col-3">
                <button
                  className="btn btn-primary"
                  onClick={adicionarProdutoNaTabela}
                  disabled={registroDeProdutos.codigoProduto === ''}
                >
                  Adicionar
                </button>
              </div>
            </div>
            </form>
          )}

          <div className="row mt-3 px-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={{ width: '70%' }}>
                    Produto
                  </th>
                  <th scope="col">Código</th>
                  <th scope="col">Qtd</th>
                  {!props.registroParaAtualizar && <th scope="col">Deletar</th>}
                </tr>
              </thead>
              <tbody>
                {tabelaProdutos.map((item) => (
                  <tr key={item.codigo} scope="row">
                    <td>{item.nomeProduto || item.descricao}</td>
                    <td>{item.codigo}</td>
                    <td>{item.quantidade}</td>
                    <td>
                      {item.nomeProduto && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={(e) => deletarItemDaTabelaERegistro(item, e)}
                        >
                          <i className="fas fa-trash me-2"></i>
                          Apagar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
      </div>

      {/* IMAGES PDF */}
      {props.registroParaAtualizar !== null && (
        <fieldset className="border my-2 mx-1 px-1 pb-4 row">
          <legend className="fs-5">
            Imagem{' '}
            <span className="fs-6 text-secondary">
              (aceita somente arquivos tipo JPEG ou PNG)
            </span>
          </legend>
          <div className="col-4">
            <label htmlFor="formFile" className="form-label">
              Nota Fiscal
            </label>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              defaultValue={registroInfoArquivo?.ANEXO1}
              onChange={(e) =>
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  // contrato: URL.createObjectURL(e.target.files[0]),
                  anexo1: e.target.files[0],
                })
              }
            />
          </div>
          <div className="col-4">
            <label htmlFor="formFile" className="form-label">
              Comprovante de Residência
            </label>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              defaultValue={registroInfoArquivo?.ANEXO2}
              onChange={(e) =>
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  // contrato: URL.createObjectURL(e.target.files[0]),
                  anexo2: e.target.files[0],
                })
              }
            />
          </div>
          <div className="col-4">
            <label htmlFor="formFile" className="form-label">
              Produto
            </label>
            <input
              className="form-control"
              name="contrato"
              type="file"
              accept="image/png, image/jpeg"
              id="formFile"
              defaultValue={registroInfoArquivo?.ANEXO3}
              onChange={(e) =>
                setRegistroInfoArquivo({
                  ...registroInfoArquivo,
                  // contrato: URL.createObjectURL(e.target.files[0]),
                  anexo3: e.target.files[0],
                })
              }
            />
          </div>
        </fieldset>
      )}
      {props.registroParaAtualizar && (
        <fieldset className="border my-2 mx-1 px-1 pb-4 row">
          <legend className="fs-5">
            Imagem{' '}
            <span className="fs-6 text-secondary">
              (aceita somente arquivos tipo JPEG ou PNG)
            </span>
          </legend>
          <div className="d-flex justify-content-between gap-2">
            <a
              href={formatarImagem(anexos.anexo1)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={formatarImagem(anexos.anexo1)} alt="" width={'100%'} />
            </a>
            <a
              href={formatarImagem(anexos.anexo1)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={formatarImagem(anexos.anexo2)} alt="" width={'100%'} />
            </a>
            <a
              href={formatarImagem(anexos.anexo3)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={formatarImagem(anexos.anexo3)} alt="" width={'100%'} />
            </a>
          </div>
        </fieldset>
      )}
      {/* Buttons */}
      <div className="d-flex justify-content-end mt-2">
        <button className="btn btn-outline-success me-2" onClick={handleSubmit}>
          <i className="fas fa-plus me-2"></i>
          Salvar
        </button>
        <button className="btn btn-outline-warning" onClick={handleClear}>
          <i className="fas fa-trash me-2"></i>
          Cancelar
        </button>
      </div>
    </form>
  );
}
