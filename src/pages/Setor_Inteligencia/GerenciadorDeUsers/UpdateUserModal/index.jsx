import { useEffect, useState } from 'react';
import nivel from '../../../../repositories/nivel';
import setor from '../../../../repositories/setor';

export default function UpdateUser(props) {
  const data = props.dadosUser;

  const [user, setUser] = useState({
    idUsuario: data.id,
    nome: data.nome,
    email: data.email,
    idNivel: data.nivel.id,
    idSetor: data.setor.id,
    setorReal: data.setor.id,
  });

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setUser((prev) => ({
      ...prev,
      idUsuario: data.id,
      nome: data.nome,
      email: data.email,
    }));
  }, []);

  const handleCancelar = (e) => {
    e.preventDefault();

    props.cancelarAtualizacao();

    setUser({
      nome: '',
      email: '',
      idUsuario: '',
      idNivel: null,
      idSetor: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.atualizarUsuario(user);
    setUser({
      idUsuario: '',
      nome: '',
      email: '',
      idNivel: '',
      idSetor: '',
      setorReal: '',
    });
  };

  return (
    <>
      <form className="row g-3 d-flex gap-3" onSubmit={handleSubmit}>
        <div className="row mt-3">
          <div className="col-md-12 d-flex flex-column gap-2">
            <div className="col">
              <label className="form-label">Nome</label>
              <input
                name="contratado"
                defaultValue={user?.nome}
                onChange={(e) => setUser({ ...user, nome: e.target.value })}
                id="contratado"
                type="text"
                className="form-control"
                placeholder="Nome"
              />
            </div>
            <div className="col">
              <label className="form-label">Email do Responsável*</label>
              <input
                name="emailContratante"
                defaultValue={user?.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="emailContratante"
                type="text"
                className="form-control"
                placeholder="Email do Responsável"
              />
            </div>
            <select
              name="idNivel"
              className="form-select"
              aria-label="Floating label select example"
              required
              defaultValue={user?.idNivel}
              disabled={disabled}
              // onChange={onChange}
              onChange={(e) => setUser({ ...user, idNivel: e.target.value })}
            >
              <option value={null} selected disabled>
                Alterar Nível
              </option>
              {nivel.map((item) => (
                <option key={item.valor} value={Number(item.valor)}>
                  {item.valor}
                  {' - '}
                  {item.nome}
                </option>
              ))}
            </select>
            <select
              name="idSetor"
              className="form-select"
              aria-label="Floating label select example"
              defaultValue={user?.idSetor}
              onChange={(e) => {
                const value = Number(e.target.value);
                setUser({ ...user, idSetor: value, setorReal: value });
              }}
              required
              disabled={disabled}
            >
              <option value={'DEFAULT'} selected disabled>
                Alterar Setor
              </option>
              {setor.map((item) => (
                <option key={item.valor} value={Number(item.valor)}>
                  {item.valor}
                  {' - '}
                  {item.nome}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center gap-2">
          {user.idNivel !== 0 && (
            <>
              <input
                type="radio"
                id="noAccess"
                name="noAccess"
                value={0}
                onClick={(e) => {
                  setUser({
                    ...user,
                    idNivel: e.target.value,
                  }),
                    setDisabled(true);
                }}
              />
              <label className="text-black">Bloquear Usuário</label>
            </>
          )}
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
