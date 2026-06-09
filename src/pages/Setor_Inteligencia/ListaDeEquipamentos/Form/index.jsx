import React, { useEffect, useState } from 'react';
import Select from 'react-select';

   const equipamentoInicial = {
     equipamentoID: 0,
     placaPatrimonio: '',
     descricao: '',
     responsavel: '',
     setor: '',
   };

export default function Registrar(props) {
  const [enabled, setEnable] = useState(false);
  const [equipamentoInfo, setEquipamentoInfo] = useState({});

  useEffect(() => {
    if (props.notaFiscalSelecionada) {
      setEquipamentoInfo(props.notaFiscalSelecionada);
      setEnable(true);
    }
  }, [props.notaFiscalSelecionada]);

  const inputTextHandler = (e) => {
    const { name, value } = e.target;

    setEquipamentoInfo({ ...equipamentoInfo, [name]: value });
  };

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarPatrimonio();

    setEquipamentoInfo(equipamentoInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      props.addPatrimonio(equipamentoInfo);
      setEquipamentoInfo(equipamentoInicial)
    
  };

  const handleSelectChangeSetor = (selectedOption) => {
      setEquipamentoInfo({
        ...equipamentoInfo,
        setor: selectedOption.value,
      });
  };

  const handleSelectChangeFilial = (selectedOption) => {
    setEquipamentoInfo({
      ...equipamentoInfo,
      filial: selectedOption.value
    })
  }

  const selectSetorLista = props.setoresLista.map((item) => ({
    value: item.setor,
    label: item.setor,
  }));

  const selectFilialLista = props.filiaisLista.map((item) => ({
    value: item.nome,
    label: item.nome,
  }));

  return (
      <div>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-8 col-12">
              <label className="form-label">Placa Patrimônio*</label>
              <input
                name="placaPatrimonio"
                defaultValue={equipamentoInfo?.placaPatrimonio}
                onChange={inputTextHandler}
                id="placaPatrimonio"
                type="number"
                className="form-control"
                placeholder="Placa Patrimônio"
                required
              />
            </div>
            <div className="col-sm-12 col-12">
              <label className="form-label">Filial*</label>
              <Select
                  placeholder="Buscar Filial"
                  options={selectFilialLista}
                  onChange={handleSelectChangeFilial}
                />
            </div>
            <div className="col-sm-12 col-12">
              <label className="form-label">Descrição*</label>
              <input
                name="descricao"
                defaultValue={equipamentoInfo?.descricao}
                onChange={inputTextHandler}
                id="descricao"
                type="text"
                className="form-control"
                placeholder="Descricao"
                required
              />
            </div>
          </div>
          <div className="row">
          <div className="col-sm-12 col-12">
              <label className="form-label">Responsável*</label>
              <input
                name="responsavel"
                defaultValue={equipamentoInfo?.responsavel}
                onChange={inputTextHandler}
                id="responsavel"
                type="text"
                className="form-control"
                placeholder="Responsavel"
                required
              />
            </div>
            <div className="col-sm-12 col-12">
              <label className="form-label">Setor*</label>
              <Select
                  placeholder="Buscar por setor"
                  options={selectSetorLista}
                  onChange={handleSelectChangeSetor}
                />
            </div>
            <div className="col-sm-12 col-12">
              <label className="form-label">Observação*</label>
              <textarea
                name="observacao"
                defaultValue={equipamentoInfo?.observacao}
                onChange={inputTextHandler}
                id="observacao"
                rows="3"
                className="form-control"
              />
            </div>
            <div className="col-12  mt-2">
              {props.notaFiscalSelecionada ? (
                <button className="btn btn-outline-success" type="submit">
                  <i className="fas fa-plus me-2"></i>
                  Atualizar
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-outline-success me-2"
                    type="submit"
                  >
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
      </div>
  );
}
