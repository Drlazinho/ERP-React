import amvoxlogomarca from './../../assets/amvoxlogomarca.png';
import { Container, ContentForm, Overlay } from './style';
import 'swiper/swiper.min.css';

import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useCallback, useEffect, useState } from 'react';
import { trocarSenha } from '../../services/usuarios.service';
import { useToast } from '../../hooks/toast.hook';
import useUsuarioLocal from '../../hooks/usuarioLocal.hook';
import { Tooltip, IconButton } from '@mui/material';
import { CgLogIn } from 'react-icons/cg';
import { logout } from '../../services/auth';

export default function RedefinirSenha() {
  const [userList, setUserList] = useState([]);
  const { email } = useUsuarioLocal();
  const [filtro, setFiltro] = useState({
    email: '',
  });

  const [pass, setPass] = useState({
    password: '',
  });

  const [repetirPass, setRepetirPass] = useState({
    password: '',
  });

  const { addToast } = useToast();

  // useEffect(() => {
  //   handleFetch();
  // }, [filtro]);

  // useEffect(() => {
  //   setUserList(userList);
  // });

  // const handleFetch = useCallback(() => {
  //   filtro.email = email;
  //   buscarUsuarioPorFiltro(filtro)
  //     .then((res) => {
  //       setUserList(res.data[0].id);
  //     })
  //     .catch(() =>
  //       addToast({
  //         type: 'danger',
  //         title: 'Erro ao Listar o Usuário',
  //         description:
  //           'Erro ao Listar o Usuário - por favor tente novamente dentre de instantes !',
  //       })
  //     );
  // }, [filtro]);

  const handleAtualizarSenha = async (pass, e) => {
    e.preventDefault();
    trocarSenha(email, pass)
      .then((res) => {
        addToast({
          type: 'success',
          title: 'Nova senha',
          description: res.message,
        });
      })
      .catch((err) => {
        addToast({
          type: 'warning',
          title: 'Nova senha',
          description: err.erros,
        });
      });
  };

  return (
    <Container>
      <ContentForm>
        <img className="logo" src={amvoxlogomarca} alt="" />
        <div className="header">
          <h1>Redefinir a Senha</h1>
        </div>
        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={email}
              disabled
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nova senha</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              name="pass"
              // value={pass.password}
              onChange={(e) => setPass({ ...pass, password: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Repetir Nova Senha</label>
            <input
              type="password"
              className="form-control"
              id="pass"
              name="pass"
              onChange={(e) =>
                setRepetirPass({ ...pass, password: e.target.value })
              }
              required
            />
          </div>

          <button
            onClick={(e) => handleAtualizarSenha(pass.password, e)}
            type="submit"
            className="btn btn-primary"
            disabled={
              pass.password !== repetirPass.password ||
              pass.password === '' ||
              repetirPass.password === '' ||
              pass.password.length < 8
            }
          >
            Concluir
          </button>
          {pass.password !== repetirPass.password && (
            <p className="text-danger">
              O campo &quot;Repetir Nova Senha&quot; não está igual ao campo
              &quot;Nova Senha&quot;
            </p>
          )}
          {pass.password.length < 8 && repetirPass.password.length < 8 && (
            <p className="text-danger">
              A senha não pode ser menor que 8 dígitos
            </p>
          )}
        </form>

        <Overlay>
          <Tooltip title="Ir Para o Login" placement="top" arrow>
            <IconButton
              className="return-app-button"
              onClick={logout}
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <CgLogIn size={24} />
            </IconButton>
          </Tooltip>
        </Overlay>
      </ContentForm>
    </Container>
  );
}
