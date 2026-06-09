import React, { useState } from 'react';
import Select from 'react-select';
import useUsuarioLocal from '../../../../../hooks/usuarioLocal.hook';
import { setorSelect } from '../../../../../repositories/setor';

const notaInicial = {
  setor: '',
  observacao: '',
};

export default function AtribuirTarefaModal({ item }) {
  const [notaFiscalInfo, setNotaFiscalInfo] = useState(notaInicial);
  const [setorSelecionado, setSetorSelecionado] = useState();
  const { nome, id } = useUsuarioLocal();

  //PEGAR O ID DA NOTA

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setNotaFiscalInfo({
      ...notaFiscalInfo,
      [name]: value,
      idUser: id,
    });
  };

  const handleSelectChangeSetor = (selectedOption) => {
    setSetorSelecionado(
      setNotaFiscalInfo({
        ...notaFiscalInfo,
        setor: selectedOption.value,
      })
    );
  };

  const selectSetorLista = setorSelect.map((item) => ({
    value: item.nome,
    label: item.nome,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="row">
          <h5>Nota: (Id_Nota)</h5>
          <div className="col-12">
            <label className="form-label">Setor</label>
            <Select
              value={setorSelecionado}
              aria-required
              options={selectSetorLista}
              onChange={handleSelectChangeSetor}
              name="setorSolicitacao"
              placeholder="Setor"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Observação</label>
            <br />
            <textarea
              name="observação"
              placeholder="Observação"
              className="form-control"
              value={notaFiscalInfo.observacao}
              onChange={inputTextHandler}
              rows="2"
              required
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-12  mt-2">
            <button className="btn btn-outline-success me-2" type="submit">
              <i className="fas fa-plus me-2"></i>
              Salvar
            </button>
            <button
              className="btn btn-outline-warning"
              //   onClick={handleCancelar}
            >
              <i className="fas fa-plus me-2"></i>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
