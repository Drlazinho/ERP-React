import React, { useEffect, useState } from 'react';
// import Cliente from '../../pages/Clientes/index';
import { apiCep } from '../../services/cep.api.js';

const uf = [
  {
    nome: 'Bahia',
    sigla: 'BA',
  },
  {
    nome: 'Acre',
    sigla: 'AC',
  },
  {
    nome: 'Alagoas',
    sigla: 'AL',
  },
  {
    nome: 'Amapá',
    sigla: 'AP',
  },
  {
    nome: 'Amazonas',
    sigla: 'AM',
  },
  {
    nome: 'Ceará',
    sigla: 'CE',
  },
  {
    nome: 'Distrito Federal',
    sigla: 'DF',
  },
  {
    nome: 'Espírito Santo',
    sigla: 'ES',
  },
  {
    nome: 'Goiás',
    sigla: 'GO',
  },
  {
    nome: 'Maranhão',
    sigla: 'MA',
  },
  {
    nome: 'Mato Grosso',
    sigla: 'MT',
  },
  {
    nome: 'Mato Grosso do Sul',
    sigla: 'MS',
  },
  {
    nome: 'Minas Gerais',
    sigla: 'MG',
  },
  {
    nome: 'Pará',
    sigla: 'PA',
  },
  {
    nome: 'Paraíba',
    sigla: 'PB',
  },
  {
    nome: 'Paraná',
    sigla: 'PR',
  },
  {
    nome: 'Pernambuco',
    sigla: 'PE',
  },
  {
    nome: 'Piauí',
    sigla: 'PI',
  },
  {
    nome: 'Rio de Janeiro',
    sigla: 'RJ',
  },
  {
    nome: 'Rio Grande do Norte',
    sigla: 'RN',
  },
  {
    nome: 'Rio Grande do Sul',
    sigla: 'RS',
  },
  {
    nome: 'Rondônia',
    sigla: 'RO',
  },
  {
    nome: 'Roraima',
    sigla: 'RR',
  },
  {
    nome: 'Santa Catarina',
    sigla: 'SC',
  },
  {
    nome: 'São Paulo',
    sigla: 'SP',
  },
  {
    nome: 'Sergipe',
    sigla: 'SE',
  },
  {
    nome: 'Tocantins',
    sigla: 'TO',
  },
];

const clienteInicial = {
  id: 0,
  nome: '',
  sobrenome: '',
  email: '',
  telefone: '',
  prioridade: '0',
  descricao: '',
  uf: '',
  municipio: '',
  cep: '',
  rua: '',
  bairro: '',
  idPromotora: 0,
  idLoja: 0,
};

export default function ClienteForm(props) {
  const [cliente, setCliente] = useState(clienteAtual());

  useEffect(() => {
    if (props.clienteSelecionada.id !== 0) setCliente(props.clienteSelecionada);
  }, [props.clienteSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setCliente({ ...cliente, [name]: value });
  };

  const cepHandler = (e) => {
    if (e.target.value.length >= 8)
      apiCep.get(e.target.value + '/json').then((res) => {
        setCliente({
          ...cliente,
          uf: res.data.uf,
          rua: res.data.logradouro,
          bairro: res.data.bairro,
          municipio: res.data.localidade,
        });
      });
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarCliente();

    setCliente(clienteInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.clienteSelecionada.id !== 0) props.atualizarCliente(cliente);
    else props.addCliente(cliente);

    setCliente(clienteInicial);
  };

  function clienteAtual() {
    if (props.clienteSelecionada.id !== 0) {
      return props.clienteSelecionada;
    } else {
      return clienteInicial;
    }
  }

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Nome</label>
            <input
              name="nome"
              value={cliente.nome}
              onChange={inputTextHandler}
              id="nome"
              type="text"
              className="form-control"
              placeholder="nome"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Sobrenome</label>
            <input
              name="sobrenome"
              value={cliente.sobrenome}
              onChange={inputTextHandler}
              id="sobrenome"
              type="text"
              className="form-control"
              placeholder="sobrenome"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">E-mail</label>
            <input
              name="email"
              value={cliente.email}
              onChange={inputTextHandler}
              id="email"
              type="text"
              className="form-control"
              placeholder="e-mail"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Telefone</label>
            <input
              name="telefone"
              value={cliente.telefone}
              onChange={inputTextHandler}
              id="telefone"
              type="text"
              className="form-control"
              placeholder="telefone"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <label className="form-label">CEP</label>
            <input
              name="cep"
              value={cliente.cep}
              onChange={cepHandler}
              id="cep"
              type="text"
              className="form-control"
              placeholder="cep"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">UF</label>
            <select
              name="uf"
              value={cliente.uf}
              onChange={inputTextHandler}
              id="uf"
              className="form-select"
            >
              <option value=""></option>
              {uf.map((item, index) => (
                <option key={index} value={item.sigla}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-5">
            <label className="form-label">Municipio</label>
            <input
              name="municipio"
              value={cliente.municipio}
              onChange={inputTextHandler}
              id="municipio"
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Rua</label>
            <input
              name="rua"
              value={cliente.rua}
              onChange={inputTextHandler}
              id="rua"
              type="text"
              className="form-control"
              placeholder="rua"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Bairro</label>
            <input
              name="bairro"
              value={cliente.bairro}
              onChange={inputTextHandler}
              id="bairro"
              type="text"
              className="form-control"
              placeholder="bairro"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Prioridade</label>
            <select
              name="prioridade"
              value={cliente.prioridade}
              onChange={inputTextHandler}
              id="prioridade"
              className="form-select"
            >
              <option value="NaoDefinido">Selecione...</option>
              <option value="Baixa">Baixa</option>
              <option value="Normal">Normal</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Loja</label>
            <select
              name="loja"
              value={cliente.idLoja}
              onChange={(e) =>
                setCliente({ ...cliente, idLoja: +e.target.value })
              }
              id="idloja"
              className="form-select"
            >
              <option value="0">Selecione...</option>
              <option value="1">Baixa</option>
              <option value="2">Normal</option>
              <option value="3">Alta</option>
            </select>
          </div>
          <div className="col-md-3">
            <label className="form-label">Promotora</label>
            <select
              name="promotora"
              value={cliente.idPromotora}
              onChange={(e) =>
                setCliente({ ...cliente, idPromotora: +e.target.value })
              }
              id="promotora"
              className="form-select"
            >
              <option value="0">Selecione...</option>
              <option value="1">Baixa</option>
              <option value="2">Normal</option>
              <option value="3">Alta</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Descricao</label>
            <textarea
              name="descricao"
              value={cliente.descricao}
              onChange={inputTextHandler}
              id="descricao"
              type="text"
              className="form-control"
              placeholder="descricao"
            />
            <hr />
          </div>
        </div>
        <div className="col-12  mt-0">
          {cliente.id === 0 ? (
            <button className="btn btn-outline-success" type="submit">
              <i className="fas fa-plus me-2"></i>
              Salvar
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
