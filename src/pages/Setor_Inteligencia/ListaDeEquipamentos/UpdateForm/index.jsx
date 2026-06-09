import { useEffect, useState } from "react";
import Select from 'react-select';


export default function UpdatePatrimonio(props) {
  const data = props.dadosPatrimonio;

  const [patrimonio, setPatrimonio] = useState({
    equipamentoID: data.equipamentoID,
    placaPatrimonio: data.placaPatrimonio,
    descricao: data.descricao,
    responsavel: data.responsavel,
    setor: data.setor,
    observacao: data.observacao,
    filial: data.filial,
  });

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtualizacao();

  };
  const handleSelectChangeSetor = (selectedOption) => {

    setPatrimonio({
        ...patrimonio,
        setor: selectedOption.value,
      });
  };
  const handleSelectChangeFilial = (selectedOption) => {

    setPatrimonio({
        ...patrimonio,
        filial: selectedOption.value,
      });
  };


  const selectSetorLista = props.setoresLista.map((item) => ({
    value: item.setor,
    label: item.setor,
  }));
  const selectFilialLista = props.filiaisLista.map((item) => ({
    value: item.nome,
    label: item.nome,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    props.atualizarPatrimonio(patrimonio);

    setPatrimonio()
  };
  return (
    <>
      <form className="row g-3 d-flex gap-3" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12 d-flex flex-column gap-2">
            <div className="row">
            <div className="col-3">
                <label className="form-label">Filial</label>
                <input
                  name="setor"
                  type="text"
                  className="form-control"
                  defaultValue={patrimonio?.filial}
                  disabled
                />
              </div>
              <div className="col-4">
                <label className="form-label">Filial</label>
                <Select
                 options={selectFilialLista}
                 onChange={handleSelectChangeFilial}
                />
              </div>
              <div className="col-6">
                <label className="form-label">Equipamento Id</label>
                <input
                  name="equipamenteID"
                  defaultValue={patrimonio?.equipamentoID}
                  onChange={(e) => setPatrimonio({ ...patrimonio, equipamentoID: e.target.value, })}
                  id="equipamenteID"
                  type="text"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="col-6">
                <label className="form-label">Placa Patrimonio </label>
                <input
                  name="placaPatrimonio"
                  defaultValue={patrimonio?.placaPatrimonio}
                  onChange={(e) => setPatrimonio({ ...patrimonio, placaPatrimonio: e.target.value, })}
                  id="placaPatrimonio"
                  type="number"
                  className="form-control"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label className="form-label">Descrição</label>
                <input
                  name="descricao"
                  className="form-control"
                  defaultValue={patrimonio?.descricao}
                  onChange={(e) => setPatrimonio({ ...patrimonio, descricao: e.target.value, })}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label className="form-label">Responsável</label>
                <input
                  name="responsavel"
                  type="text"
                  className="form-control"
                  defaultValue={patrimonio?.responsavel}
                  onChange={(e) => setPatrimonio({ ...patrimonio, responsavel: e.target.value, })}
                />
              </div>
              <div className="col-3">
                <label className="form-label">Setor</label>
                <input
                  name="setor"
                  type="text"
                  className="form-control"
                  defaultValue={patrimonio?.setor}
                  disabled
                />
              </div>
              <div className="col-4">
                <label className="form-label">Setor</label>
                <Select
                 options={selectSetorLista}
                 onChange={handleSelectChangeSetor}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <label className="form-label">Observação</label>
                <input
                  name="observacao"
                  className="form-control"
                  defaultValue={patrimonio?.observacao}
                  onChange={(e) => setPatrimonio({ ...patrimonio, observacao: e.target.value, })}
                />
              </div>
              </div>
            </div>
            </div>
            <div className="col-12  mt-4">
              <button className="btn btn-outline-success me-2" type="submit">
                Atualizar
              </button>
              <button className="btn btn-outline-warning" onClick={handleCancelar}>
                Cancelar
              </button>
            </div>
          </form>
        </>
        );
}