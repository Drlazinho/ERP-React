import LayoutNovo from '../../components/LayoutNovo';
import { Link } from 'react-router-dom';

import { Container, Content } from './styles';

import { BsFillMegaphoneFill } from 'react-icons/bs';
import { BsFillClipboardDataFill } from 'react-icons/bs';

export default function TelaChamados() {
  return (
    <LayoutNovo>
      <Container>
        <Content>
          <div className="backgroundAbrirChamados">
            <Link className="buttonAbrirChamado" to={'/xcontato'}>
              <div style={{ marginBottom: '15px', marginRight: '20px' }}>
                <BsFillMegaphoneFill />
              </div>
              ABRIR CHAMADO
            </Link>
          </div>
        </Content>

        <Content>
          <div className="backgroundTabelaChamados">
            <Link
              className="buttonAbrirTelaChamados"
              to={'/xchamados'}
            >
              <div style={{ marginBottom: '15px', marginRight: '20px' }}>
                <BsFillClipboardDataFill />
              </div>
              CHAMADOS POR SETOR
            </Link>
          </div>
        </Content>
      </Container>
    </LayoutNovo>
  );
}
