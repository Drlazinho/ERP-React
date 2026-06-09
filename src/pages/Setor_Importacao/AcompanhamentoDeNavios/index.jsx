import React, { useCallback, useEffect, useState } from 'react';
import LayoutNovo from '../../../components/LayoutNovo';
// import MapGlobal from '../../components/MapGlobal';
import debounce from '../../../utils/debounce';
import './styles.css';
import { GoGlobe } from 'react-icons/go';
import { buscarImportAcompanharFiltro } from './acompanhamentoDeNavios.service';
import { useToast } from '../../../hooks/toast.hook';
import { ImportacaoTabela } from './Tabela';
import Loader from '../../../components/Loader';

export default function AcompanhamentoDeNavios() {
  const [filtro, setFiltro] = useState('005174');
  const [importacaoLista, setImportacaoLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  const { addToast } = useToast();

  const filterDate = (value) => {
    setFiltro(value);
  };

  const handleExpand = useCallback(() => {
    buscarImportAcompanharFiltro(filtro)
      .then((res) => {
        setImportacaoLista(res);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar Importação',
          description: 'Erro ao Listar Importação',
        })
      )
      .finally(() => setRemoveLoading(true));
  }, [filtro]);

  useEffect(() => {
    handleExpand();
  }, [filtro]);

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro(null);
  };

  return (
    <>
      <div
        className="position-relative"
        style={{ width: '98%', margin: '0 auto' }}
      >
        <div className="mb-3">
          <div className="row mt-2">
            <div className="col-md-12 d-flex justify-content-between mt-1">
              <div className="d-flex align-items-top gap-2 ">
                <GoGlobe size={40} color={'#FFFFFF'} />
                <h2
                  className="text-light"
                  style={{ textShadow: '-1px -1px 6px #000000' }}
                >
                  Acompanhamento de Navios
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-4">
          <form
            className="boxFilter d-flex flex-wrap align-items-center justify-content-center"
            onSubmit={handleClear}
          >
            <div className="col-md-4 col-6">
              <label>PO_EIC</label>
              <input
                type="number"
                placeholder="PO_EIC"
                name="descricao"
                className="form-control"
                onChange={(e) =>
                  debounce(() => {
                    setFiltro(e.target.value);
                  })
                }
              />
            </div>
            {/* 

            <div className="col-md-5 col-12 col-lg-4">
              <input
                type="text"
                placeholder="Nº container"
                name="cnpj"
                className="form-control"
                onChange={(e) => setFiltro({ ...filtro, cnpj: e.target.value })}
                disabled
              />
            </div> */}
            <div className="col-md-5 col-xl-1 col-12">
              <button className="btn btn-warning w-100" type="submit">
                <i className="fas fa-trash me-2"></i>
                Clear
              </button>
            </div>
          </form>
        </div>
        <div className="row">
          <div className="d-flex justify-content-center my-2">
            {/* <MapGlobal
              filterDate={filterDate}
              data={''} //Dados
              dateSaida={'dateSaida'}
              dateFase1={'dateTransportFaseI'}
              dateFase2={'dateTransportFaseII'}
              dateFase3={'dateTransportFaseIII'}
              dateEntregaFinal={'dateEntregue'}
            /> */}
          </div>
        </div>
        <div className="row-content mobileReverse">
          <div
            className="tabelaEntregasMobileToPC"
            style={{
              height: 600,
              width: '100%',
              overflow: 'scroll',
              flexGrow: '3',
            }}
          >
            <ImportacaoTabela entregas={importacaoLista} />
            <div className="col-md-12">{!removeLoading && <Loader />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
