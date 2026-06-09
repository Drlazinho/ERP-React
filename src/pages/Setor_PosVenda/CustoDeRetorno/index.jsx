import { GiReturnArrow } from 'react-icons/gi';
import { Container } from './style.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { consultaProdutos } from '@/services/produtos/produtos.service.js';
import Select from 'react-select';
import { useToast } from '@/hooks/toast.hook.jsx';

import { estadosBrasileiros } from '@/utils/estadosBrasileiros.js';
import { custoRetornoPost } from '@/pages/Setor_PosVenda/CustoDeRetorno/custoRetorno.service.js';
import RetornoDetalhes from './FormResultadoConsulta/index.jsx';
import {
  Box,
  Modal as MuiModal,
  Typography,
  Button,
  TextField,
} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
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
  produtos: [
    {
      codigo: '',
      quantidade: 0,
    },
  ],
  ufOrigem: '',
  ufDestino: '',
  valorNf: 0,
};

const parseCurrency = (value) => {
  if (!value) return 0;

  const numericString = value
    .replace('R$', '')
    .replace(/\./g, '')
    .replace(',', '.')
    .trim();

  const number = Number(numericString);
  return isNaN(number) ? 0 : number;
};

export default function CustoDeRetorno() {
  const [nomeProdutosLista, setNomeProdutosLista] = useState([]);
  const [postCustoRetorno, setPostCustoRetorno] = useState(registroInicial);

  const [itemTabela, setItemTabela] = useState({});
  const [itensPost, setItensPost] = useState({});
  const [tabelaCustoRetorno, setTabelaCustoRetorno] = useState([]);
  const [listaDeProdutos, setListaDeProdutos] = useState([]);

  const [listaUF, setListaUF] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [retornoLista, setRetornoLista] = useState([]);

  const { addToast } = useToast();

  const handleFetchNomeProdutos = useCallback(() => {
    consultaProdutos()
      .then((retorno) => {
        setNomeProdutosLista(
          retorno.map((item) => ({
            value: item.codigo,
            label: item.apelido,
          }))
        );
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

  const handleSelectedValue = (selectedOption) => {
    setItemTabela({
      ...itemTabela,
      codigo: selectedOption.value,
      apelido: selectedOption.label,
    });
    setItensPost({
      ...itensPost,
      codigo: selectedOption.value,
    });
  };

  const adicionarItensNaTabela = (e) => {
    e.preventDefault();
    tabelaCustoRetorno.push(itemTabela);
    listaDeProdutos.push(itensPost);
    setPostCustoRetorno({ ...postCustoRetorno, produtos: listaDeProdutos });
  };

  function removerItemArray(array, item) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      newArray.push({
        codigo: array[i].codigo,
        quantidade: parseInt(array[i].quantidade),
      });
    }
    setPostCustoRetorno({ ...postCustoRetorno, produtos: newArray });
    return array;
  }

  const deletarItemDaTabela = (item, e) => {
    e.preventDefault();
    removerItemArray(tabelaCustoRetorno, item);

    const novaListaDeRegistroDeProduto = listaDeProdutos.filter(
      (produtoRegistrado) => produtoRegistrado.codigo !== item.codigo
    );
    setListaDeProdutos(novaListaDeRegistroDeProduto);
  };

  const handleUFOrigem = (selectedOption) => {
    setPostCustoRetorno({
      ...postCustoRetorno,
      ufOrigem: selectedOption.value,
    });
  };

  const handleUFDestino = (selectedOption) => {
    setPostCustoRetorno({
      ...postCustoRetorno,
      ufDestino: selectedOption.value,
    });
  };

  const handleConferirCusto = () => {
    const dadosParaEnvio = {
      ...postCustoRetorno,
      valorNf: parseCurrency(postCustoRetorno.valorNf),
      produtos: postCustoRetorno.produtos.map((produto) => ({
        ...produto,
        quantidade: Number(produto.quantidade),
      })),
    };

    custoRetornoPost(dadosParaEnvio)
      .then((retorno) => {
        setRetornoLista(retorno.data);
        handleShowModal();
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: _err.response.data.message,
          description:
            'Produto: ' + _err.response.data.codigoProduto + ' Sem cubagem',
        });
      });
  };

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const optionsSelectUF = estadosBrasileiros.map((item) => ({
      value: item.value,
      label: item.label,
    }));

    setListaUF(optionsSelectUF);
  }, []);

  useEffect(() => {
    handleFetchNomeProdutos();
  }, []);

  return (
    <>
      <MuiModal open={showModal} onClose={handleShowModal}>
        <Box sx={style}>
          <RetornoDetalhes listaRetornoCusto={retornoLista} />
        </Box>
      </MuiModal>
      <div className="position-relative">
        <div className="mb-2">
          <div className="d-flex">
            <h2
              className="text-light"
              style={{ textShadow: '-1px -1px 6px #000000' }}
            >
              {' '}
              <GiReturnArrow /> Custo de Retorno
            </h2>
          </div>
        </div>
      </div>
      <Container>
        <form className="position-relative" style={{ margin: '30px' }}>
          <div className="row d-flex justify-content-center align-items-end">
            <div className="col-lg-3 col-md-4 col-12 mt-2 z-index-2">
              <label className="form-label">Produto</label>
              <Select
                options={nomeProdutosLista}
                onChange={handleSelectedValue}
                placeholder={'Produtos'}
              />
            </div>
            <div className="col-md-2 col-sm-4 col-6">
              <label className="form-label">Código do Produto</label>
              <input
                type="text"
                className="form-control"
                value={itemTabela.codigo}
                name="codProduto"
                required
                disabled
              />
            </div>
            <div className="col-md-2 col-sm-4 col-6">
              <label className="form-label">Quantidade</label>
              <input
                type="number"
                onChange={(e) => {
                  setItemTabela({
                    ...itemTabela,
                    quantidade: parseInt(e.target.value),
                  });
                  setItensPost({
                    ...itensPost,
                    quantidade: parseInt(e.target.value),
                  });
                }}
                className="form-control"
                name="Quantidade"
                required
              />
            </div>
            <div className="col-md-2 col-sm-4 col-12 mt-4">
              <button
                className="w-100 btn btn-outline-info me-1"
                onClick={adicionarItensNaTabela}
                disabled={
                  itemTabela.codigo === undefined ||
                  itemTabela.quantidade === undefined
                }
              >
                <i className="fas fa-plus me-1"></i>
                Adicionar
              </button>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items mt-2 ">
            <div className="col-md-2 col-lg-9 col-sm-5 col-20 mt-2">
              <div
                className="col-md-2 col-sm-4 col-6"
                style={{
                  height: 400,
                  width: '100%',
                  overflow: 'scroll',
                  flexGrow: '5',
                }}
              >
                <table className="table">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col" style={{ width: '60%' }}>
                        Produto
                      </th>
                      <th scope="col">Código</th>
                      <th scope="col">Qtd</th>
                      <th scope="col">Deletar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tabelaCustoRetorno.map((item) => (
                      <tr key={item.codigo} scope="row">
                        <td>{item.apelido}</td>
                        <td>{item.codigo}</td>
                        <td>{item.quantidade}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={(e) => deletarItemDaTabela(item, e)}
                          >
                            <i className="fas fa-trash me-2"></i>
                            Apagar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row d-flex justify-content-center align-items">
            <div className=" col-lg-9 col-10 mt-1 ">
              <small
                className="form-text"
                style={{ color: 'red', fontWeight: 'bold' }}
              >
                *CHECAR OS PRODUTOS ANTES DE DAR SEGUIMENTO
              </small>
            </div>
          </div>
          <div className="row d-flex justify-content-center align-items-end mt-2">
            <div className="col-lg-3 col-sm-3 col-4 mt-2">
              <div className="form-label">
                <label className="form-label">UF Origem</label>
                <Select
                  placeholder={'Origem'}
                  options={listaUF}
                  onChange={handleUFOrigem}
                />
              </div>
            </div>
            <div className="col-lg-2 col-sm-3 col-4">
              <div className="form-label">
                <label className="form-label">UF Destino</label>
                <Select
                  placeholder={'Destino'}
                  options={listaUF}
                  onChange={handleUFDestino}
                />
              </div>
            </div>
            <div className="col-lg-2 col-sm-3 col-4">
              <div className="form-label">
                <label className="form-label">Valor da Nota </label>
                <TextField
                  variant="outlined"
                  value={postCustoRetorno.valorNf || ''}
                  onChange={(e) => {
                    let inputValue = e.target.value;
                    const numericValue = inputValue
                      .replace(/[^\d,]/g, '')
                      .replace(',', '');
                    const sizeSlice = numericValue.length - 2;
                    const formattedValue =
                      numericValue.length > 2
                        ? `R$ ${[
                            numericValue
                              .slice(0, sizeSlice)
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                            numericValue.slice(sizeSlice),
                          ].join(',')}`
                        : `R$ ${numericValue}`;
                    setPostCustoRetorno({
                      ...postCustoRetorno,
                      valorNf: formattedValue,
                    });
                  }}
                />
              </div>
            </div>
            <div className="col-lg-2 col-sm-3 col-12 px-2">
              <div className="form-label">
                <Button
                  className="w-100"
                  variant="outline-primary"
                  onClick={handleConferirCusto}
                >
                  {' '}
                  <i className="fa fa-search me-2"></i>Conferir
                </Button>
              </div>
            </div>
          </div>
        </form>
        <div style={{ height: 150, width: '100%' }}></div>
      </Container>
    </>
  );
}
