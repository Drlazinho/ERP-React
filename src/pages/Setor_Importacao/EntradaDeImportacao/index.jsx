import React, { useState, useEffect, useMemo, useCallback } from 'react';

import LayoutNovo from '../../../components/LayoutNovo';
import debounce from '../../../utils/debounce';

import Select from 'react-select';

import Loader from '../../../components/Loader';
import { RiFileExcel2Fill } from 'react-icons/ri';
import ModalLoading from '../../../components/ModalLoading';
import { TbTableImport } from 'react-icons/tb';
import { buscarImportC7EntradasPorFiltro } from './entradaDeImportacao.service';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { useToast } from '../../../hooks/toast.hook';
import './styles.css';
import { formatDateTime } from '../../../utils/formatDateInput';
import TabelaEntradaDeImportacao from './components/TabelaEntradaImportacao'
const ExcelJS = require('exceljs');

export default function EntradaDeImportacao() {
  const [entradaLista, setEntradaLista] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [filtro, setFiltro] = useState({
    EMISSAO: null,
    DESCRI: null,
    EIC: null,
    STATUS: 'AGUARDANDO',
    LOCAL: null,
  });

  const StatusLista = [
    {
      label: 'AGUARDANDO',
      value: 'AGUARDANDO',
    },
    {
      label: 'INCOMPLETO',
      value: 'INCOMPLETO',
    },
    {
      label: 'COMPLETO',
      value: 'COMPLETO',
    },
    {
      label: 'TOTAL',
      value: null,
    },
  ];

  const { addToast } = useToast();

  useEffect(() => {
    handleFetch();
  }, [filtro]);

  const exportExcelFile = (e) => {
    e.preventDefault;
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('My Sheet');
    sheet.properties.defaultRowHeight = 20;

    sheet.columns = [
      {
        header: 'PRODUTO',
        key: 'c7_PRODUTO',
        width: 15,
      },
      { header: 'c7_DESCRI', key: 'c7_DESCRI', width: 60 },
      {
        header: 'Solicitado',
        key: 'c7_QUANT',
        width: 15,
      },
      {
        header: 'Entregue',
        key: 'c7_QUJE',
        width: 15,
      },
      {
        header: 'LOCAL',
        key: 'c7_LOCAL',
        width: 15,
      },
      {
        header: 'NUM',
        key: 'c7_NUM',
        width: 15,
      },
      {
        header: 'Emissão',
        key: 'c7_EMISSAO',
        width: 15,
      },
      {
        header: 'PO_EIC',
        key: 'c7_PO_EIC',
        width: 15,
      },
      {
        header: 'Preço',
        key: 'c7_PRECO',
        width: 10,
      },
      {
        header: 'Taxa MOEDA',
        key: 'c7_TXMOEDA',
        width: 15,
      },
      {
        header: 'TOTAL',
        key: 'c7_TOTAL',
        width: 15,
      },
      {
        header: 'qtd_Cntr_Produto',
        key: 'qtd_Cntr_Produto',
        width: 12,
      },
      {
        header: 'Status',
        key: 'status_Cntr',
        width: 15,
      },
    ];

    entradaLista.import.map((item) => {
      sheet.addRow({
        c7_PRODUTO: item.c7_PRODUTO,
        c7_DESCRI: item.c7_DESCRI,
        c7_QUANT: item.c7_QUANT,
        c7_QUJE: item.c7_QUJE,
        c7_LOCAL: item.c7_LOCAL,
        c7_PRECO: item.c7_PRECO,
        c7_TXMOEDA: item.c7_TXMOEDA,
        c7_TOTAL: item.c7_TOTAL,
        c7_NUM: item.c7_NUM,
        c7_EMISSAO: formatDateTotvs(item.c7_EMISSAO),
        c7_PO_EIC: item.c7_PO_EIC,
        qtd_Cntr_Produto: item.qtd_Cntr_Produto,
        status_Cntr: item.status_Cntr,
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
      anchor.download = `EntradaImportacao.xlsx`;
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const handleFetch = useCallback(() => {
    buscarImportC7EntradasPorFiltro(filtro)
      .then((res) => {
        setEntradaLista(res);
      })
      .catch(() =>
        addToast({
          type: 'danger',
          title: 'Erro ao Listar as Entradas Invoice',
          description:
            'Erro ao Listar Entradas Invoice - por favor tente novamente dentre de instantes !',
        })
      )
      .finally(() => setRemoveLoading(true));
  }, [filtro]);

  // ---------DATA E HORA FIXA DA TABELA
  const [dataHora, setdataHora] = useState('');
  const handleFetchData = useCallback(() => {
    buscarImportC7EntradasPorFiltro()
      .then((res) => {
        setdataHora(res);
      })
      .finally(() => setRemoveLoading(true));
  }, []);

  useEffect(() => {
    handleFetchData();
  }, []);
  //--------------------------------------------

  const handleClear = (e) => {
    e.preventDefault();
    e.target.reset();
    setFiltro({
      EMISSAO: null,
      DESCRI: null,
      EIC: null,
      STATUS: null,
      LOCAL: null,
    });
  };

  const handleSelectChangeStatus = (selectedOption) => {
    setFiltro({
      ...filtro,
      STATUS: selectedOption.value,
    });
  };

  return (
    <>
      <ModalLoading show={removeLoading} />
      <form
        className="position-relative"
        onSubmit={handleClear}
        style={{ width: '98%', margin: '0 auto' }}
      >
        <div className="row">
          <div className="col-md-12 d-flex justify-content-between mt-3">
            <div className="d-flex align-items-top gap-2 ">
              <TbTableImport size={40} color={'#FFFFFF'} />
              <h2
                className="text-light"
                style={{ textShadow: '-1px -1px 6px #000000' }}
              >
                Entrada de Importação
              </h2>
            </div>
          </div>
        </div>
        {/* <div className="row p-0 m-0">
          <div className="col-xxl-3 col-md-6 col-sm-3 col-6">
            <NumberBox
              title="Solicitado"
              textColor='#fff'
              backcolor="#800000"
              amount={Number(entradaLista?.solicitado)}
              icon="ship"
            />
          </div>
          <div className="col-xxl-3 col-md-6 col-sm-3 col-6">
            <NumberBox
              title="Entregue"
              textColor='#fff'
              backcolor="#008000"
              amount={Number(entradaLista?.entregue)}
              icon="ship"
            />
          </div>
          <div className="col-xxl-3 col-md-6 col-sm-3 col-6">
            <WalletBox
              title="Total em Dolar"
              textColor='#fff'
              backcolor="#0000FF"
              amount={parseFloat(entradaLista.total_usd)}
              footerlabel="considerando os armazens filtrados"
              icon="dolar"
            />
          </div>
          <div className="col-xxl-3 col-md-6 col-sm-3 col-6">
            <NumberBox
              title="Container"
              textColor='#fff'
              backcolor="#DC143C"
              amount={Number(entradaLista?.container)}
              icon="ship"
            />
          </div>
        </div> */}
        <div className="row">
          <div className="col-md-3 col-lg-2 col-12">
            <label>Descricao</label>
            <input
              type="text"
              placeholder="Descricao"
              name="descricao"
              className="form-control"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, DESCRI: e.target.value });
                })
              }
            />
          </div>
          <div className="col-md-3 col-lg-2 col-6">
            <label>Emissao</label>
            <input
              type="date"
              placeholder="Emissao"
              name="descricao"
              className="form-control"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, EMISSAO: e.target.value });
                })
              }
            />
          </div>
          <div className="col-md-3 col-lg-2 col-6">
            <label>Status</label>
            <Select
              value={filtro.STATUS}
              options={StatusLista}
              placeholder={filtro.STATUS ? filtro.STATUS : 'TOTAL'}
              onChange={handleSelectChangeStatus}
            />
          </div>
          <div className="col-md-2 col-lg-2 col-xl-1 col-6">
            <label>PO_EIC</label>
            <input
              type="number"
              placeholder="PO_EIC"
              name="descricao"
              className="form-control"
              onChange={(e) =>
                debounce(() => {
                  setFiltro({ ...filtro, EIC: e.target.value });
                })
              }
            />
          </div>
          <div className="col-6 col-md-2 col-lg-1">
            <button className="btn btn-warning my-4 w-100" type="submit">
              <i className="fas fa-trash me-2"></i>
              Clear
            </button>
          </div>
          <div className="col-6 col-md-2 col-lg-1">
            <button
              className="btn btn-success my-4 w-100"
              onClick={exportExcelFile}
              type="button"
            >
              <RiFileExcel2Fill size={20} />
              Excell
            </button>
          </div>
        </div>
        <div className="lastUpdateTable_Box">
          <div className="lastUpdateTable">
            <p>
              <span>Last Updt: </span>
              {formatDateTime(dataHora?.dataHoraAtualizacao)}
            </p>
          </div>
        </div>
      </form>
      <div className="row" style={{ width: '99%', margin: '0 auto' }}>
        <div className="col-md-12">
          <div style={{ height: 600, width: '100%', overflow: 'scroll' }}>
            <TabelaEntradaDeImportacao
              entrada={entradaLista.import ? entradaLista.import : []}
            />
            <div className="col-md-12">{!removeLoading && <Loader />}</div>
          </div>
        </div>
      </div>
    </>
  );
}
