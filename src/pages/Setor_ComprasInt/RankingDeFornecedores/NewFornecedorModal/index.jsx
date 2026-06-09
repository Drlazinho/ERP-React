import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

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
  const [selectValue, setSelectValue] = useState('');

  const onChange = (event) => {
    const value = event.target.value;
    setSelectValue(value);
  };

  const { id } = useParams();

  const [fornecedorLista, setFornecedorLista] = useState([])

  const [fornecedor, setFornecedor] = useState({
    doc: '',
    fornecedor: '',
    codFornecedor: '',
    dataProducao: '',
    dataInspecao: '',
    dataTransporte: '',
    dataEntrega: '',
    dataPrevista: '',
    pagamento: '',
    avaliacao1: 0,
    avaliacao2: 0,
    avaliacao3: 0,
  });

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

  useEffect(() => {
    const lista = props.listaDeFornecedores.map((item) => {
      const nomeFornecedorCompleto = `${item.nome}${' '}${item.apelido}`;
      return ({
        value: nomeFornecedorCompleto,
        label: nomeFornecedorCompleto,
      });
    });

    setFornecedorLista(lista);
  }, [props.listaDeFornecedores]);

  const handleSelectChange = (selectedOption) => {
    setFornecedor({ ...fornecedor, fornecedor: selectedOption.value });
  };


  return (
    <>
      <form className="row g-3 d-flex gap-3" onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-label">
            <label className="form-label">Fornecedores Registrado</label>
            <Select
              options={fornecedorLista}
              // value={movimentacaoInfo}
              onChange={handleSelectChange}
            />
            {/* <select name="fornecedor" className="form-select" aria-label="Floating label select example" 
            // onChange={onChange}
             onChange={(e) =>
                setFornecedor({ ...fornecedor, fornecedor: e.target.value })
            }
            >
              <option selected disabled>Escolha um fornecedor registrado no sistema</option>
              {
                props.listaDeFornecedores.map((item) => 
                 (
                  <option key={item.id} value={`${item.nome}${item.responsavel}`}>{item.nome}{' '}{item.responsavel}</option>
                 ))
              }
            
            </select> */}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label className="form-label">Nº do pro forma</label>
            <input
              name="doc"
              defaultValue={fornecedor?.doc}
              onChange={(e) =>
                setFornecedor({ ...fornecedor, doc: e.target.value })
              }
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
