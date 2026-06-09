import React from 'react';

import './index.css';
import { Box } from '@mui/material';
import Amvoxlogopng from '../assets/Amvoxlogopng.png';
import Cadeado from '../assets/cadeado401.png';
import Chatbot from '../components/LayoutNovo/chatbot';
import xVermelho from '../assets/xVermelho.svg';

const NaoLogado = () => {
  return (
    <>
      <div className="header">
        <div className="logoAmvox">
          <img src={Amvoxlogopng} width={150} alt="Amvox"></img>
        </div>
      </div>
      <div className="divGeral401">
        <img src={Cadeado} alt="Amvox"></img>
        <div className="divTextos401">
          <p className="tituloTextos401">Acesso Restrito </p>{' '}
          <p>
            Ops! Parece que você não tem permissão para acessar esta página.{' '}
            <br /> Se precisar de ajuda, entre em{' '}
            <a className="link-vermelho">contato com nossa equipe pelo chat.</a>
          </p>
          <div>
            <a href="/">
              <button class="botao">Voltar à Página Inicial</button>
            </a>
          </div>
        </div>
      </div>
      <Chatbot />

      <footer className="footerPage401">
        <img src={xVermelho} alt="Amvox"></img>
        Copyright &copy; {new Date().getFullYear()} Amvox. Todos os direitos
        reservados.
        <br />
      </footer>
    </>
  );
};

export default NaoLogado;
