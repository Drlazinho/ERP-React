export default function DeleteFornecedoresModal(props) {
  const handleCancelar = (e) => {
    e.preventDefault();
    props.closeModal();
  };

  const handleConfirmarDelete = (e) => {
    e.preventDefault();
    props.deleteFornecedor();
  };

  return (
    <>
      <p className="text-danger mb-3">
        {' '}
        Tem certeza que deseja excluir o Cliente?
      </p>
      <button
        className="btn btn-outline-success me-2"
        onClick={handleConfirmarDelete}
      >
        <i className="fas fa-check me-2"></i>
        Sim
      </button>
      <button className="btn btn-danger me-2" onClick={handleCancelar}>
        <i className="fas fa-times me-2"></i>
        Nao
      </button>
    </>
  );
}
