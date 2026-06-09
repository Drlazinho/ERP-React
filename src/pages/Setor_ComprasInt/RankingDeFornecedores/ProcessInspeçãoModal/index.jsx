import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import formatDateInput from '../../../../utils/formatDateInput';

export default function FaseProcessInspecaoModal(props) {

  const [dateProcess, setDateProcess] = useState({});

  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setDateProcess({ ...dateProcess, [name]: formatDateInput(value) });
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    props.closeModal();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.dateInspecao(dateProcess);
  };

  return (
    <>
      <form className="row g-3 d-flex gap-3" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12">
            <input
              name="dateInspecao"
              defaultValue={dateProcess?.dateInspecao}
              onChange={inputTextHandler}
              id="nome"
              type="date"
              className="form-control"
              placeholder="nome"
            />
          </div>
          <div className="col-12  mt-4">
            {props.clienteSelecionada ? (
              <button className="btn btn-outline-success" type="submit">
                <i className="fas fa-plus me-2"></i>
                Atualizar
              </button>
            ) : (
              <>
                <button className="btn btn-outline-success me-2" type="submit">
                  <i className="fas fa-plus me-2"></i>
                  Salvar
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={handleCancelar}
                >
                  <i className="fas fa-plus me-2"></i>
                  Cancelar
                </button>
              </>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
