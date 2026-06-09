import React, { useState, useEffect, useMemo } from 'react';
import {
  apiFabrica,
  apiFabrica_operacao,
  apiFabricaADM,
} from '@/services/apis';
import LayoutNovo from '@/components/LayoutNovo';
import debounce from '@/utils/debounce';
import { Button, Modal as MuiModal, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryFinanceCard from '@/components/HistoryFinanceCard';
import foto from '@/assets/produtos/sem-foto.png';
import { BiBarcodeReader } from 'react-icons/bi';
import { BsFillKeyboardFill } from 'react-icons/bs';
import { useToast } from '@/hooks/toast.hook';
import HistoryFinanceCardLog from '@/components/HistoryFinanceCardLog';
import {
  getPedidoPorNota,
  getProdutoEan,
  postItenPedidoPorNota,
} from './checkDeExpedicao.service';
import InfoCardAmvox from '@/components/InfoCardAmvox'
import HeaderAmvox from '@/components/HeaderAmvox'

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
};

export default function ExpedicaoLog() {
  const [pedidoLista, setPedidoLista] = useState([]);
  const [produtoLista, setProdutoLista] = useState([]);
  const [exibeProduto, setExibeProduto] = useState([]);
  const [qtdeConferida, setQtdeConferida] = useState(1);
  const [conferidos, setConferidos] = useState([]);

  const [filtroNota, setFiltroNota] = useState({
    nf: '',
  });

  const [filtroProduto, setFiltroProduto] = useState({
    ean: '',
  });

  const [leitorOuTeclado, setLeitorOuTeclado] = useState(true);

  const [show, setShow] = useState(true);

  const [modalItem, setModalItem] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setShow(true);
    setModalItem(item);
    setQtdeConferida({ qtdeConferida: 1 });
  };

  const { addToast } = useToast();

  const totalGeral = useMemo(() => {
    let qtdprodutos_ = 0;
    let totalfat_ = 0;
    let somatotal_ = 0;

    pedidoLista.forEach((item) =>
      (totalfat_ += parseFloat(item.total)).toFixed(2)
    );
    pedidoLista.forEach((item) => (qtdprodutos_ += item.qtde));
    pedidoLista.forEach((item) => (somatotal_ += parseFloat(item.total)));

    return {
      qdtProdutos: qtdprodutos_,
      totalFat: new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 2,
      }).format(totalfat_),
      somatotal: somatotal_,
    };
  }, [pedidoLista]);

  useEffect(() => {
    getPedidoPorNota(filtroNota)
      .then((retorno) => {
        setPedidoLista(
          retorno.map((item) => {
            return {
              id: item.id,
              codigo: item.codigo,
              nome: item.nome,
              descricao: item.descricao,
              valor: item.valor.toFixed(2),
              qtde: item.qtde,
              total: item.total.toFixed(2),
              dtfat: item.dtFat,
              nf: item.nF,
            };
          })
        );
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro!',
          description: 'Erro ao buscar Nota !',
        });
      });
  }, [filtroNota]);

  useEffect(() => {
    getProdutoEan(filtroProduto)
      .then((retorno) => {
        setProdutoLista(
          retorno.map((item) => {
            return {
              id: item.id,
              codigo: item.codigo,
              apelido: item.apelido,
              custo: item.custo.toFixed(2),
              preco: item.preco.toFixed(2),
              ean: item.ean,
              dun: item.dun,
              sigla: item.sigla,
              categoria: item.categoria,
              imagem: item.imagem
                ? `data:image/png;base64,${item.imagem}`
                : foto,
            };
          })
        );
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'Erro!',
          description: 'Erro ao buscar produto !',
        });
      });
  }, [filtroProduto]);

  const handleComparaItem = async () => {
    const body = {
      listaItens: exibeProduto,
      nf: filtroNota.nf,
    };

    const response = postItenPedidoPorNota(body);
    // const response = await apiFabricaADM.post('/Pedidos/ItensPedidoPorNota', {
    //   listaItens: exibeProduto,
    //   nf: filtroNota.nf,
    // });
    setConferidos(response.data);
  };

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltroNota({ nf: '' });
    setFiltroProduto({ ean: '' });
    setExibeProduto([]);
    setConferidos([]);
  };

  const formatNotaFiscal = (value) => {
    const formatValue = value.substring(25, 34);
    setFiltroNota({ ...filtroNota, nf: formatValue });
  };

  const handleInsereNoCard = async (item) => {
    setExibeProduto((prev) => [...prev, item]);

    handleClose();
    setFiltroProduto({ ean: '' });
  };

  return (
    <>
      <MuiModal open={show} onClose={handleClose}>
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
              Inserir Quantidade de Produtos
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
          <Box>
            <div className="col-md-6">
              <label className="form-label">Conferente</label>
              <input
                name="conferente"
                value={localStorage.getItem('email')}
                id="conferente"
                readOnly
                className="form-control"
                placeholder="conferente"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Produto</label>
              <input
                name="produto"
                value={modalItem?.apelido}
                id="produto"
                readOnly
                className="form-control"
                placeholder="produto"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Quantidade</label>
              <input
                className="form-select"
                onChange={(e) => setQtdeConferida(+e.target.value)}
                id="valor"
                type="number"
              ></input>
            </div>
            <div className="col-md-12">
              <img src={modalItem?.imagem} height="90" width="90" />
            </div>
            <div className="col-md-12">
              <hr />
            </div>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="contained" color="error" onClick={handleClose}>
              Fechar / Close
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                setFiltroProduto({ ...filtroProduto, ean: '' });
                handleInsereNoCard({
                  ...modalItem,
                  qdte: qtdeConferida,
                  hrr: Date.now(),
                });
              }}
            >
              Incluir / Include
            </Button>
          </Box>
        </Box>
      </MuiModal>
      <div
        className="mb-3 position-relative"
        style={{ width: '98%', margin: '0 auto' }}
      >
        <form onSubmit={handleClear}>
          <div className="row">
            <HeaderAmvox title='Check List de Nota Fiscal'/>
            <div className="col-md-3 col-6">
              <InfoCardAmvox
                title="Qtd Produtos"
                amount={Number(totalGeral.qdtProdutos)}
                type='money'
              />
            </div>
            <div className="col-md-3 col-6">
              <InfoCardAmvox
                title="Total dos Produtos"
                amount={Number(totalGeral.somatotal)}
                type='money'
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label>Pesquisa por EAN</label>
              <input
                type="text"
                placeholder="EAN"
                name="ean"
                value={filtroProduto.ean}
                className="form-control"
                onChange={(e) =>
                  setFiltroProduto({ ...filtroProduto, ean: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 my-4">
              <button
                className="btn btn-success"
                type="button"
                onClick={handleComparaItem}
              >
                <i className="fas fa-check me-2"></i>
                Realizar Conferencia
              </button>
            </div>
            <div className="col-md-2 my-4">
              <button className="btn btn-warning" type="submit">
                <i className="fas fa-trash me-2"></i>
                Clear
              </button>
            </div>
            <div className="box_input">
              <div className="d-flex flex-row gap-2 align-items-center">
                <input
                  type="radio"
                  id="leitor"
                  name="dateOrMonth"
                  value="leitor"
                  onClick={(e) => {
                    setLeitorOuTeclado(true);
                  }}
                  checked={leitorOuTeclado}
                />
                <label htmlFor="leitor" className="text-black-50">
                  Leitor
                </label>
              </div>
              <div className="d-flex flex-row gap-2 align-items-center">
                <input
                  type="radio"
                  id="teclado"
                  name="dateOrMonth"
                  value="teclado"
                  onClick={(e) => {
                    setLeitorOuTeclado(false);
                  }}
                />
                <label htmlFor="teclado" className="text-black-50">
                  Teclado
                </label>
              </div>
            </div>{' '}
            <div className="col-md-3">
              {!leitorOuTeclado && (
                <>
                  <label>
                    <BsFillKeyboardFill size={28} />
                    Nota Fiscal (Teclado)
                  </label>
                  <input
                    type="number"
                    placeholder="N.F"
                    name="notafiscal"
                    className="form-control"
                    onChange={(e) =>
                      debounce(() => {
                        setFiltroNota({ ...filtroNota, nf: e.target.value });
                      })
                    }
                  />
                </>
              )}
              {leitorOuTeclado && (
                <>
                  <label>
                    <BiBarcodeReader size={28} />
                    Nota Fiscal (Leitor)
                  </label>
                  <input
                    type="number"
                    placeholder="N.F"
                    name="notafiscal"
                    className="form-control"
                    onChange={(e) =>
                      debounce(() => {
                        formatNotaFiscal(e.target.value);
                      })
                    }
                  />
                </>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="row" style={{ width: '99%', margin: '0 auto' }}>
        <div className="col-md-12">
          <div style={{ height: 160, width: '100%', overflow: 'scroll' }}>
            <table className="table table-striped table-hover">
              <thead className="table-dark mt-3">
                <tr>
                  <th scope="col">Apelido</th>
                  <th scope="col">Ean</th>
                  <th>Acoes</th>
                </tr>
              </thead>
              <tbody>
                {produtoLista.map((item, index) => (
                  <tr key={index}>
                    <td>{item.apelido}</td>
                    <td>{item.ean}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => {
                          handleShow(item);
                        }}
                      >
                        <i className="fas fa-pen me-2"></i>
                        Incluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div style={{ height: 400, width: '100%', overflow: 'scroll' }}>
            {exibeProduto.map((item, index) => {
              return (
                <HistoryFinanceCardLog
                  key={index}
                  tagColor="#FF0000"
                  title={item.apelido}
                  subtitle={item.ean}
                  amount={item.preco}
                  qtde={item.qdte}
                  isok={conferidos.find(
                    (i) => i.codigo === item.codigo && i.temNaLista
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
