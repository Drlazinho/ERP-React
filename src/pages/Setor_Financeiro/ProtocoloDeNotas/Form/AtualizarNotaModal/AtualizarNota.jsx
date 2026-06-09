import Select from 'react-select';
import { useState } from 'react';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '80%',
  height: '80%',
  overflow: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const notaInicial = {
  id: 0,
  OBSERVACAO: '',
  SETOR_ORIGEM: '',
  DATA_VENCIMENTO: '',
};

export default function AtualizarNota({
  notasSelecionada,
  setores,
  protocoloTipo,
  handleClose,
  handleSubmit,
}) {
  const [nota, setNota] = useState(notaInicial);

  useEffect(() => {
    if (notasSelecionada) {
      setNota({
        id: notasSelecionada.id,
        OBSERVACAO: notasSelecionada.observacao,
        SETOR_ORIGEM: notasSelecionada.setor,
        DATA_VENCIMENTO: notasSelecionada.datA_VENCIMENTO,
        ID_TIPO: 0,
      });
    }
  }, [notasSelecionada]);

  const submit = (e) => {
    e.preventDefault();
    handleSubmit(nota);
    setNota(notaInicial);
  };
  const inputTextHandler = (e) => {
    const { name, value } = e.target;
    setNota({
      ...nota,
      [name]: value,
    });
  };

  const selectSetores = setores.map((item) => ({
    value: item.id,
    label: item.setor,
  }));

  const selectTipo = protocoloTipo.map((item) => ({
    value: item.id,
    label: item.descricao,
  }));

  const handleSelectChangeTipoNota = (selectedOption) => {
    setNota({
      ...nota,
      ID_TIPO: selectedOption.value,
    });
  };

  const handleSelectChangeSetores = (selectedOption) => {
    setNota({
      ...nota,
      SETOR_ORIGEM: selectedOption.label,
    });
  };

  const handleCancelar = (e) => {
    e.preventDefault();
    handleClose();
    setNota(notaInicial);
  };

  return (
    <>
      <div>
        <form className="row g-3" onSubmit={submit}>
          <div className="row">
            <div className="col-sm-12 col-12">
              <label className="form-label">Nota (Número da Chave)*</label>
              <input
                name="NOTA"
                value={notasSelecionada?.nota}
                id="nota"
                type="text"
                className="form-control"
                placeholder="Chave NF"
                maxLength={44}
                disabled
              />
            </div>
            <div className="col-sm-6 col-12">
              <label className="form-label">Data de Registro*</label>
              <input
                name="datA_REGISTRO"
                value={notasSelecionada?.datA_REGISTRO}
                id="datA_REGISTRO"
                type="datetime-local"
                className="form-control"
                disabled
              />
            </div>
            <div className="col-sm-6 col-12">
              <label className="form-label">Data de Vencimento*</label>
              <input
                name="DATA_VENCIMENTO"
                defaultValue={notasSelecionada?.datA_VENCIMENTO}
                onChange={inputTextHandler}
                id="DATA_VENCIMENTO"
                type="datetime-local"
                className="form-control"
              />
            </div>
            <div className="col-sm-3 col-12">
              <label className="form-label">Setor Origem</label>
              <input
                name="NOTA"
                value={notasSelecionada?.setor}
                id="nota"
                type="text"
                className="form-control"
                placeholder="Chave NF"
                maxLength={44}
                disabled
              />
            </div>
            <div className="col-sm-3 col-12">
              <label className="form-label">Setor Origem</label>
              <Select
                aria-required
                options={selectSetores}
                onChange={handleSelectChangeSetores}
                placeholder="Setor"
              />
            </div>

            <div className="col-sm-3 col-12">
              <label className="form-label">Tipo</label>
              <input
                name="NOTA"
                value={notasSelecionada?.tipo}
                id="nota"
                type="text"
                className="form-control"
                placeholder="Chave NF"
                maxLength={44}
                disabled
              />
            </div>
            <div className="col-sm-3 col-12">
              <label className="form-label">Tipo</label>
              <Select
                aria-required
                options={selectTipo}
                onChange={handleSelectChangeTipoNota}
                placeholder="Tipo"
              />
            </div>
            <div className="col-sm-6 col-12">
              <label htmlFor="formFile" className="form-label">
                Anexo
              </label>
              <input
                className="form-control"
                name="docNf"
                type="file"
                accept="application/pdf"
                id="formFile"
                onChange={(e) =>
                  setNota({
                    ...nota,
                    ANEXO: e.target.files[0],
                  })
                }
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <label className="form-label">Observação</label>
              <br />
              <textarea
                name="OBSERVACAO"
                placeholder="Observação"
                className="form-control"
                defaultValue={notasSelecionada?.observacao}
                onChange={inputTextHandler}
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col-12  mt-2">
              <button className="btn btn-outline-success me-2" type="submit">
                <i className="fas fa-plus me-2"></i>
                Atualizar
              </button>
              <button
                className="btn btn-outline-warning"
                onClick={handleCancelar}
              >
                <i className="fas fa-plus me-2"></i>
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
