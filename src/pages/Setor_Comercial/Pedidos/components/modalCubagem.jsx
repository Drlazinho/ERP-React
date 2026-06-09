import { useNavigate } from 'react-router';
import logoAmvox from '@/assets/amvoxlogomarca.png';
import { gerarPdf } from '@/utils/gerarPdf';

import { Box, Button } from '@mui/material';

const ModalCubagem = () => {
  const { dados } = useLocation();
  const navigate = useNavigate();
  return (
    <>
      <Box display={'flex'} flexDirection={'row'} gap={4} marginTop={'30px'}>
        <Button
          onClick={() =>
            gerarPdf(
              document.getElementById('nota'),
              'Cubagem- Nº ' + dados.numeroPedido
            )
          }
          variant="success"
          style={{
            width: '50%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          Baixar Cubagem (PDF){' '}
        </Button>
        <Button
          onClick={() => navigate(-1)}
          variant="primary"
          style={{
            width: '50%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {' '}
          Voltar{' '}
        </Button>
      </Box>
      <div id="nota" className="page notaArea">
        <div className="boxFields" style={{ paddingTop: '20px' }}>
          <table cellPadding="0" cellSpacing="0" border="1">
            <tbody>
              <tr>
                <td colSpan="3" className="txt-center font-12 valign-middle">
                  REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS LTDA
                  <img className="amvox_logo" src={logoAmvox} alt="Amvox" />
                </td>
              </tr>
              <tr>
                <td style={{ width: '100cm' }} className="txt-center">
                  <span className="title">
                    RELATÓRIO GERAL DE CUBAGEM{' '}
                    {new Date().toLocaleDateString('pt-BR')} - Nº Pedido {''}
                    {dados.numeroPedido}
                    <span
                      className="title txt-upper"
                      style={{ padding: '5px', fontWeight: 'bold' }}
                    ></span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
        </div>
      </div>
    </>
  );
};
export default ModalCubagem;
