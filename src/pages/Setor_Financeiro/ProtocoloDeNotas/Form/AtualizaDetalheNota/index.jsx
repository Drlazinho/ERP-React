import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';

const detalheInicial = {
  id: 0,
  id_nota: 0,
  id_user: 0,
  observacao: "",
  id_status: 0
};

export default function AtualizarDetalheNota(props) {
  const [detalheInfo, setDetalheInfo] = useState({});

  const { id } = useUsuarioLocal()

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setDetalheInfo({ ...detalheInfo, [name]: value });
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    setDetalheInfo(detalheInicial);
    props.cancelarSubmit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.atualizarDetalhe(detalheInfo);
    setDetalheInfo(detalheInicial);
    props.cancelarSubmit();
  };

  useEffect(() => {
    setDetalheInfo({ ...detalheInfo, id_nota: props.idNota, id: props.idDetalhe, id_user: id })
  }, [])

  // useEffect(() => {
  //   const listaStatus = props.status.map((item) => ({
  //     value: item.statusId,
  //     label: item.statusDescr,
  //   }));

  //     // const { ordemServico, ordemServicoDetalhe, descricaoDetalhe } =
  //     //   props.detalheSelecionado;

  //     // setDetalheInfo({
  //     //   ...detalheInfo,
  //     //   ordSerId: ordemServico,
  //     //   osDet: ordemServicoDetalhe,
  //     //   tarefaDescr: descricaoDetalhe,
  //     // });
  // }, [props.detalheSelecionado]);

      const listaStatus = props.status.map((item) => ({
      value: item.id,
      label: item.descricao,
    }));

  const handleSelectChangeStatus = (selectedOption) => {
    setDetalheInfo({
      ...detalheInfo,
      id_status: selectedOption.value,
    });
  };


  return (
    <div>
      <form className="row g-2" onSubmit={handleSubmit}>
        <div className="col-12">
          <label className="form-label">Observação:</label>
          <textarea
            name="observacao"
            onChange={inputTextHandler}
            value={detalheInfo?.observacao}
            id="observacao"
            type="text"
            className="form-control"
            placeholder="observacao"
          />
        </div>
        <div className="col-12">
          <label className="form-label">Status</label>
          <Select
            aria-required
            options={listaStatus}
            onChange={handleSelectChangeStatus}
            required
          />
        </div>
        <div className="d-flex flex-row">
          <button className="btn btn-outline-success me-2 w-100" type="submit">
            <i className="fas fa-plus me-2"></i>
            Salvar
          </button>
          <button
            className="btn btn-outline-warning w-100"
            onClick={handleCancelar}
          >
            <i className="fas fa-plus me-2"></i>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
