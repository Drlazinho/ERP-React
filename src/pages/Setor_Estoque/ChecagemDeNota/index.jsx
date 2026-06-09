import React, { useState, useCallback, useEffect } from 'react';
import Select from 'react-select';
import { Modal as MuiModal, Box, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LayoutNovo from '../../../components/LayoutNovo';

import { IoMdCloseCircle } from 'react-icons/io';

import useUsuarioLocal from '../../../hooks/usuarioLocal.hook';

import {
  buscarPorEanProduto,
  consultaProdutos,
} from '../../../services/produtos/produtos.service';

import { buscarPedidosPorNota } from '../../../services/pedidos/pedidos.service';

import {
  ContainerCheckList,
  ContainerSeletorUnidades,
  ContainerProdutosFormulario,
  TabelaCheckList,
  ContainerConferencia,
} from './style';
import { checkExpedicao } from '../../../services/checkExpedicao/check-expedicao.service';
import { Link } from 'react-router-dom';
import { RiHomeWifiFill } from 'react-icons/ri';
import { Checklist } from '@mui/icons-material';
import debounce from '../../../utils/debounce';

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

const checklistInitial = {
  produto: {
    nome: '',
    ean: '',
    unidade: 'unidade',
    qtd: '',
  },
  produtos: [],
  notaFiscal: '',
};

const selCaixaMasterInitial = {
  porCaixa: 0,
  qtdCaixas: 0,
};

export default function ChecagemNotaEstoque() {
  const [isLoading, setIsLoading] = useState(false);
  const [checkList, setCheckList] = useState(checklistInitial);
  const [itensChecados, setItensChecados] = useState([]);
  const [selCaixaMaster, setSelCaixaMaster] = useState({
    porCaixa: 0,
    qtdCaixas: 0,
  });

  const [realizarChecagem, setRealizarChecagem] = useState(false);
  const [valorEan, setValorEan] = useState('');

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showModalQuantidade, setShowModalQuantidade] = useState(false);
  const [message, setMessage] = useState('');
  const [eanLista, setEanLista] = useState([]);
  const { email, nome } = useUsuarioLocal();

  const handleQtdCaixaMaster = useCallback(
    (y, x) => {
      y = Number(y);
      x = Number(x);

      setCheckList({
        ...checkList,
        produto: { ...checkList.produto, qtd: y * x },
      });
    },
    [checkList]
  );

  useEffect(() => {
    consultaProdutos().then((retorno) => {
      setEanLista(retorno.value);
    });
  }, []);

  const listaDeProdutosEan = (eanLista || []).map((item) => ({
    value: item.ean,
    label: `${item.apelido} (ean: ${item.ean})`,
  }));

  const handleSelectChange = (selectedOption) => {
    setCheckList({
      ...checkList,
      produto: {
        ...checkList.produto,
        ean: selectedOption.value,
      },
    });
    handleBipagemPorProduto(selectedOption.value);
  };

  const handleBipagemPorProduto = useCallback(
    async (value) => {
      if (!checkList.produto.unidade) {
        setMessage('Selecione uma das unidades (palete, unitario, caixa)');

        setShowMessageModal(true);

        setCheckList({
          ...checkList,
          produto: {
            ...checkList.produto,
            ean: '',
          },
        });
      } else {
        let produto = await buscarPorEanProduto({ params: { ean: value } });

        if (produto.length > 0) {
          produto = produto[0];

          setCheckList({
            ...checkList,
            produto: {
              ...checkList.produto,
              nome: produto.apelido,
              ean: produto.ean,
            },
          });

          if (checkList.produto.unidade === 'unidade') {
            handleQtdUnitario(produto);
          } else {
            setShowModalQuantidade(true);
          }
        } else {
          setMessage('Não foram encontrados produtos com o respectivo EAN');
          setShowMessageModal(true);
        }
      }
      setValorEan('');
    },
    [checkList]
  );

  const handleQtdUnitario = useCallback(
    (produto) => {
      let produtos = checkList.produtos;

      let f = produtos.find((p) => p.ean === produto.ean);

      if (f) {
        produtos = produtos.map((prod) => {
          if (prod.ean === produto.ean) {
            prod.qtd += 1;
            return { ...prod };
          } else {
            return { ...prod };
          }
        });

        setCheckList({
          ...checkList,
          produtos,
        });
      } else {
        produto.qtd = 1;
        produto.nome = produto.apelido;
        produto.unidade = 'UNIDADE';

        produtos.push(produto);

        setCheckList({
          ...checkList,
          produtos,

          produto: {
            ...checkList.produto,
            ean: '',
            nome: '',
            qtd: '',
          },
        });
      }
    },
    [checkList]
  );

  const adicionaItemCheckList = useCallback(() => {
    const p = checkList.produtos;

    setSelCaixaMaster({
      porCaixa: 1,
      qtdCaixas: 1,
    });

    const i = p.findIndex((prod) => prod.ean === checkList.produto.ean);

    if (i !== -1) {
      const prod = p[i];

      prod.qtd += Number(checkList.produto.qtd);

      p[i] = prod;
    } else {
      p.push(checkList.produto);
    }

    setCheckList({
      ...checkList,
      produtos: p,
    });

    setShowModalQuantidade(false);
  }, [checkList]);

  const removeItemChecagem = useCallback(
    async (ean) => {
      if (checkList.produtos.length > 1) {
        const p = checkList.produtos.filter((f) => f.ean !== ean);

        setCheckList({ ...checkList, produtos: p });
      } else {
        setCheckList({ ...checkList, produtos: [] });
      }
    },
    [checkList.produtos]
  );

  const removeListaDeChecagem = useCallback(() => {
    setCheckList(checklistInitial);
  }, []);

  const handleNotaFiscal = useCallback(async () => {
    let pedido = await buscarPedidosPorNota({
      params: { nf: checkList.notaFiscal },
    });
    realizarChecagemNota(pedido.pedido);
    setRealizarChecagem(true);
  }, [checkList.notaFiscal]);

  const realizarChecagemNota = useCallback(
    async (pedidos) => {
      const checados = pedidos.map((x) => {
        let found = checkList.produtos.find((y) => x.ean === y.ean);

        if (found) {
          let isConfere = true;

          if (found.qtd !== x.qtd) isConfere = false;

          return {
            ean: found.ean,
            qtd: x.qtd,
            bipe: found.qtd,
            nome: found.apelido,
            isConfere,
          };
        } else {
          return {
            ean: x.ean,
            qtd: x.qtd,
            bipe: 0,
            nome: x.descricao,
            isConfere: false,
          };
        }
      });

      const produtosParaCheck = checkList.produtos.map((item) => {
        return {
          ean: item.ean,
          qtd: item.qtd,
        };
      });

      let request = {
        nf: checkList.notaFiscal,
        nome_usuario: nome,
        email_usuario: email,
        produtos: produtosParaCheck,
      };

      let result = await checkExpedicao(request)
        .then((res) => {
          setItensChecados(res.produtos);
        })
        .catch((_err) => {
          setItensChecados(_err.response.data.produtos);
        });

      // setItensChecados(checados);
      // setItensChecados(result.produtos);
    },
    [checkList.produtos, checkList.notaFiscal, nome, email]
  );

  const limparChecagem = useCallback(() => {
    setSelCaixaMaster(selCaixaMasterInitial);
    setCheckList({
      produto: {
        nome: '',
        ean: '',
        unidade: 'unidade',
        qtd: '',
      },
      produtos: [],
      notaFiscal: '',
    });
    setItensChecados([]);
  }, []);

  return (
    <>
      <MuiModal
        open={showModalQuantidade}
        onClose={() => {
          setCheckList({
            ...checkList,
            produto: {
              ...checkList.produto,
              ean: '',
            },
          });
          setShowModalQuantidade(false);
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
              sx={{ fontSize: '16px', fontWeight: 'bold', color: '#333333' }}
            >
              Inserir quantidade de produtos
            </Typography>
            <Button
              type="reset"
              onClose={() => {
                setCheckList({
                  ...checkList,
                  produto: {
                    ...checkList.produto,
                    ean: '',
                  },
                });
                setShowModalQuantidade(false);
              }}
            >
              <CloseIcon sx={{ color: '#333333' }} />
            </Button>
          </Box>
          <Box style={{ fontSize: '12px' }}>
            <div className="border w-100">
              <label className="form-label w-100 text-center border-bottom py-1">
                Produto
              </label>
              <div className="row px-2 py-1">
                <div className="col-sm-4">
                  <label>
                    <b>Produto</b>
                  </label>
                  <p>{checkList.produto.nome}</p>
                </div>
                <div className="col-sm-4">
                  <label>
                    <b>EAN</b>
                  </label>
                  <p>{checkList.produto.ean}</p>
                </div>
                <div className="col-sm-4">
                  <label>
                    <b>Unidade</b>
                  </label>
                  <p className="text-uppercase">{checkList.produto.unidade}</p>
                </div>
                {checkList.produto.unidade === 'caixaMaster' ? (
                  <>
                    <div className="col-sm-4">
                      <label>Quantidade Caixas</label>
                      <input
                        type="number"
                        className="form-control"
                        value={selCaixaMaster.qtdCaixas}
                        onChange={(e) => {
                          handleQtdCaixaMaster(
                            selCaixaMaster.porCaixa,
                            e.target.value
                          );
                          setSelCaixaMaster({
                            ...selCaixaMaster,
                            qtdCaixas: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-sm-4">
                      <label>Quantidade P/Caixa</label>
                      <input
                        type="number"
                        className="form-control"
                        value={selCaixaMaster.porCaixa}
                        onChange={(e) => {
                          handleQtdCaixaMaster(
                            e.target.value,
                            selCaixaMaster.qtdCaixas
                          );
                          setSelCaixaMaster({
                            ...selCaixaMaster,
                            porCaixa: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <div className="col-sm-4">
                    <label>Quantidade</label>
                    <input
                      type="number"
                      className="form-control"
                      value={checkList.produto.qtd}
                      onChange={(e) =>
                        setCheckList({
                          ...checkList,
                          produto: {
                            ...checkList.produto,
                            qtd: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </Box>
          <Box>
            <Button
              variant="secondary"
              onClick={() => {
                setCheckList({
                  ...checkList,
                  produto: {
                    ...checkList.produto,
                    ean: '',
                  },
                });
                setShowModalQuantidade(false);
              }}
            >
              Fechar / Close
            </Button>
            <Button variant="primary" onClick={adicionaItemCheckList}>
              Incluir / Include
            </Button>
          </Box>
        </Box>
      </MuiModal>

      <MuiModal
        oopen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        size="sm"
      >
        <Box sx={style}>
          <Button
            type="reset"
            onClick={() => {
              setShowMessageModal(false);
            }}
          >
            <CloseIcon sx={{ color: '#333333' }} />
          </Button>
          <Box>
            <p>{message}</p>
          </Box>
        </Box>
      </MuiModal>

      <ContainerCheckList
        className={`${
          realizarChecagem ? 'd-none' : 'd-flex mb-3 justify-content-center'
        }`}
      >
        <ContainerSeletorUnidades className="w-25">
          <div
            className={`d-flex flex-row align-items-center  justify-content-center ${
              checkList.produto.unidade === 'unidade'
                ? 'boxSelectedUnidade'
                : 'boxSelectUnidade'
            }`}
          >
            <input
              type="radio"
              value="unidade"
              className="me-2 inputSelectUnidades"
              onChange={(e) =>
                setCheckList({
                  ...checkList,
                  produto: { ...checkList.produto, unidade: e.target.value },
                })
              }
              checked={checkList.produto.unidade === 'unidade'}
            />
            <label className="text-light">Unidade</label>
          </div>
          <div
            className={`d-flex flex-row align-items-center justify-content-center  ${
              checkList.produto.unidade === 'palete'
                ? 'boxSelectedUnidade'
                : 'boxSelectUnidade'
            } `}
          >
            {' '}
            <input
              type="radio"
              value="palete"
              className="me-2 inputSelectUnidades"
              onChange={(e) =>
                setCheckList({
                  ...checkList,
                  produto: { ...checkList.produto, unidade: e.target.value },
                })
              }
              checked={checkList.produto.unidade === 'palete'}
            />
            <label className="text-light">Palete</label>
          </div>
          <div
            className={`d-flex flex-column align-items-center me-2 ${
              checkList.produto.unidade === 'caixaMaster'
                ? 'boxSelectedUnidade'
                : 'boxSelectUnidade'
            }`}
          >
            <div className="d-flex align-items-center me-2 ">
              <input
                type="radio"
                value="caixaMaster"
                className="me-2 inputSelectUnidades"
                onChange={(e) =>
                  setCheckList({
                    ...checkList,
                    produto: {
                      ...checkList.produto,
                      unidade: e.target.value,
                    },
                  })
                }
                checked={checkList.produto.unidade === 'caixaMaster'}
              />
              <label className="text-light">Caixa Master</label>
            </div>
          </div>
          <div>
            <Link to="/principal" className="button_back_to_principal">
              <RiHomeWifiFill size={30} color="#ff0000" />
              <span>Ir para Principal</span>
            </Link>
          </div>
        </ContainerSeletorUnidades>
        <ContainerProdutosFormulario className="d-flex flex-column gap-4 w-75 p-4">
          <div className="row">
            <div className="d-flex flex-column">
              <div>
                {/* <label>Leitura do EAN</label> */}
                {checkList.produto.unidade !== 'caixaMaster' ? (
                  <input
                    type="text"
                    placeholder="Leitura do EAN"
                    name="ean"
                    value={valorEan}
                    className="form-control-sm w-100"
                    onChange={(e) => {
                      debounce(() => {
                        handleBipagemPorProduto(e.target.value);
                      }, 750);
                      setValorEan(e.target.value);
                    }}
                  />
                ) : (
                  <Select
                    options={listaDeProdutosEan}
                    onChange={handleSelectChange}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <TabelaCheckList className="table rounded overflow-hidden tabela_expedicao_log">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Apelido</th>
                  <th scope="col">Ean</th>
                  <th scope="col">QTD</th>
                </tr>
              </thead>
              <tbody>
                {checkList.produtos.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <IoMdCloseCircle
                        size={16}
                        color="red"
                        onClick={() => removeItemChecagem(item.ean)}
                      />
                    </td>
                    <td>{item.nome}</td>
                    <td>{item.ean}</td>
                    <td>{item.qtd}</td>
                  </tr>
                ))}
              </tbody>
            </TabelaCheckList>
          </div>
          <div className="row">
            <input
              type="text"
              value={checkList.notaFiscal}
              placeholder="N.F (Nota Fiscal)"
              className="form-control"
              onChange={(e) => {
                setCheckList({ ...checkList, notaFiscal: e.target.value });
              }}
            />
          </div>
          <div className="row p-0 m-0">
            <div className="col-6 p-0 m-0">
              <button
                className="btn btn-success w-100"
                type="button"
                disabled={setCheckList.notaFiscal === ''}
                onClick={handleNotaFiscal}
              >
                <i className="fas fa-check me-2"></i>
                Realizar Conferencia
              </button>
            </div>
            <div className="col-6 p-0 m-0">
              <button
                className="btn btn-warning w-100"
                type="button"
                onClick={limparChecagem}
              >
                <i className="fas fa-trash me-2"></i>
                Clear
              </button>
            </div>
          </div>
        </ContainerProdutosFormulario>
      </ContainerCheckList>

      <ContainerConferencia
        className={`${
          realizarChecagem
            ? 'bg-secondary d-flex flex-column mt-4 p-4 gap-2'
            : 'd-none'
        }`}
      >
        <div className="d-flex flex-row h-100">
          <div className="d-flex flex-column w-50">
            {checkList.produtos.map((item, index) => (
              <div
                key={index}
                className="text-white p-2 border border-white border-top-2 border-start-2 border-bottom-2 border-end-0"
              >
                <p className="fs-6">{item.nome}</p>
                <p className="fs-6">
                  BIPE: <b>{item.qtd}</b>
                </p>
              </div>
            ))}
          </div>
          <div className="d-flex flex-column w-50">
            {itensChecados &&
              itensChecados.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    item.isConfere ? '' : 'text-white '
                  }d-flex p-2 w-100 border border-white border-top-2 border-start-0 border-bottom-2 border-end-2`}
                >
                  {item.status === 'FALTANTE' && (
                    <div className="bg-danger d-flex flex-column w-100 px-2">
                      <p className="fs-6">EAN: {item.ean}</p>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="fs-6">
                          STATUS:{' '}
                          <b>
                            {item.qtd} {item.status}
                          </b>
                        </p>
                        <p className="fs-6">
                          Qt. na NOTA: <b>{item.qtdNota}</b>
                        </p>
                      </div>
                    </div>
                  )}
                  {item.status === 'EXCEDENTE' && (
                    <div className="bg-danger d-flex flex-column w-100 px-2">
                      <p className="fs-6">EAN: {item.ean}</p>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="fs-6">
                          STATUS:{' '}
                          <b>
                            {item.qtd} {item.status}
                          </b>
                        </p>
                        <p className="fs-6">
                          Qt. na NOTA: <b>{item.qtdNota}</b>
                        </p>
                      </div>
                    </div>
                  )}
                  {item.status === 'OK' && (
                    <div className="bg-success d-flex flex-column w-100 px-2">
                      <p className="fs-6">EAN: {item.ean}</p>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="fs-6">
                          STATUS: <b>{item.status}</b>
                        </p>
                        <p className="fs-6">
                          Qt. na NOTA: <b>{item.qtdNota}</b>
                        </p>
                      </div>
                    </div>
                  )}
                  {item.status === 'INEXISTENTE' && (
                    <div className="bg-danger d-flex flex-column w-100 px-2">
                      <p className="fs-6">EAN: {item.ean}</p>
                      <div className="d-flex flex-row justify-content-between">
                        <p className="fs-6">
                          STATUS: <b>{item.status}</b>
                        </p>
                        <p className="fs-6">
                          Qt. na NOTA: <b>{item.qtdNota}</b>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <button
          className="btn btn-warning"
          onClick={() => {
            setSelCaixaMaster(selCaixaMasterInitial),
              setCheckList({ ...checkList, produtos: [], notaFiscal: '' }),
              setItensChecados([]),
              setRealizarChecagem(false);
          }}
        >
          Voltar
        </button>
      </ContainerConferencia>
    </>
  );
}
