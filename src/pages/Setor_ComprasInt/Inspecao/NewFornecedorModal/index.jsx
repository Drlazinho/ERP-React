import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { apiCep } from '@/services/cep.api.js';

import UF from '@/repositories/estados.js';

const fornecedorInicial = {
  id: 0,
  nome: '',
  fornecedor: '',
  email: '',
  telefone: '',
  produto: '0',
  valor: 0,
};

export default function NewFornecedor(props) {
  const { id } = useParams();

  const [fornecedor, setFornecedor] = useState({
    fornecedor: '',
    name: '',
    proforma: '',
    dateProducao: '',
    dateInspecao: '',
    datePrevisao: '',
    dateEntrega: '',
    dataPrevista: '',
    payment: '',
    situation: '',
    rankingMedia1: 0,
    rankingMedia2: 0,
    rankingMedia3: 0,
    rankingMedia4: 0,
    rankingMedia5: 0,
    rankingTotal: 0,
  });

  // useEffect(() => {
  //   if (props.clienteSelecionada) setFornecedor(props.clienteSelecionada);
  // }, [props.clienteSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setFornecedor({ ...fornecedor, [name]: value });
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarFornecedor();

    setFornecedor(fornecedorInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addFornecedor(fornecedor);
    setFornecedor(fornecedorInicial);
  };

  return (
    <>
      <form className="row g-3 d-flex gap-3" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12">
            <label className="form-label">Apelido</label>
            <input
              name="name"
              defaultValue={fornecedor?.name}
              onChange={inputTextHandler}
              id="nome"
              type="text"
              className="form-control"
              placeholder="Apelido"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Empresa</label>
            <input
              name="fornecedor"
              defaultValue={fornecedor?.fornecedor}
              onChange={inputTextHandler}
              id="fornecedor"
              type="text"
              className="form-control"
              placeholder="Empresa"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Nº do pro forma</label>
            <input
              name="proforma"
              defaultValue={fornecedor?.proforma}
              onChange={inputTextHandler}
              id="fornecedor"
              type="text"
              className="form-control"
              placeholder="proforma"
            />
          </div>
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
      </form>
    </>
  );
}
