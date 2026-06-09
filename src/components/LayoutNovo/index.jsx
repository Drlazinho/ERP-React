import React, { useCallback, useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import { useCotacao } from '../../hooks/cotacao.hook';
import './style.css';
import SidebarNovo from './SidebarNovo';
import useWindowDimensions from '../../hooks/viewportWindows';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import useUsuarioLocal from '../../hooks/usuarioLocal.hook';
import Typography from '@mui/material/Typography';
import {
  Box,
  Modal,
  Rating,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import { EnviarFormEmail } from '../../services/email.service';
import { useToast } from '../../hooks/toast.hook';
import { TickerTape } from 'react-ts-tradingview-widgets';
import Chatbot from './chatbot';
import xVermelho from '../../assets/xVermelho.svg';

const LayoutNovo = (props) => {
  const { dollar, euro, yuan, bitcoin, selic, ipca, bitcoinUSD } = useCotacao();
  const { children } = props;
  const [qtdSlider, setQtdSlider] = useState(3);
  const { width } = useWindowDimensions();
  const [showModal, setShowModal] = useState(false);
  const [descricaoSugestao, setDescricaoSugestao] = useState('');

  useEffect(() => {
    if (width <= 700) {
      setQtdSlider(2);
    }
    if (width <= 500) {
      setQtdSlider(1);
    }
  }, []);

  const { nome, setor } = useUsuarioLocal();

  function polygonColorSetor(setor) {
    switch (setor) {
      case 'transporte': {
        return '#56A0F5';
      }
      case 'comercial': {
        return '#F6D258';
      }
      case 'compraint': {
        return '#54F070';
      }
      case 'posvenda': {
        return '#845EC2';
      }
      case 'estoque': {
        return '#8A4601';
      }
      case 'marketing': {
        return '#540b0e';
      }
      case 'producao': {
        return '#FF8C00';
      }
      case 'financeiro': {
        return '#333D29';
      }
      case 'fiscal': {
        return '#0088A3';
      }
      case 'portaria': {
        return '#000000';
      }
      case 'secretariado': {
        return '#999999';
      }
      case 'qualidade': {
        return '#F7D999';
      }
      case 'inteligencia': {
        return '#001E3F';
      }
      case 'recepcao': {
        return '#FF8FAB';
      }
      case 'geral': {
        return '#f00';
      }
      default:
        return 'transparent';
    }
  }

  const horarioDoDia = new Date();
  const hora = String(horarioDoDia.getHours()).padStart(2, '0');
  const minutos = String(horarioDoDia.getMinutes()).padStart(2, '0');
  const getHorario = `${hora} : ${minutos}`;
  const { addToast } = useToast();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const symbolsTrade = [
    {
      title: 'USD/BRL',
      proName: 'FX_IDC:USDBRL',
    },
    {
      title: 'EUR/BRL',
      proName: 'FX_IDC:EURBRL',
    },
    {
      title: 'BTC/BRL',
      proName: 'OKX:BTCBRL',
    },
    {
      title: 'CNY/BRL',
      proName: 'FX_IDC:CNYBRL',
    },
    {
      title: 'BTC/USD',
      proName: 'BITSTAMP:BTCUSD',
    },
  ];

  const handleClose = () => {
    setShowModal(!showModal);
    setDescricaoSugestao('');
  };

  const handleEnviarEmailSugestao = useCallback((value) => {
    const { nome, email } = useUsuarioLocal();
    const destinatario = 'inteligencia@amvox.com.br';
    const assunto = 'NOVA SUGESTÃO/MELHORIA GESTAO WEB';
    // const body = `Descrição: ${descricaoBody} \n Tempo: ${tempoBody} \n Status: ${statusBody}`
    const body = `<table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0
    width="100%"
    style="max-width: 37.5em"
  >
    <tr style="width: 100%">
      <td>
        <table
          style="
            background-color: rgb(190, 190, 190);
            display: flex;
            justify-content: center;
            aling-items: center;
            padding: 30px;
          "
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%"
        >
          <tbody>
            <tr>
              <td style="width="25%">


              </td>
            </tr>
          </tbody>
        </table>
        <table
          style="
            border: 1px solid rgb(0, 0, 0, 0.1);
            border-radius: 3px;
            overflow: hidden;
          align="center"
          border="0"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          width="100%""
        >
          <tbody>
            <tr>
              <table
                width="100%"
                style="padding: 20px 40px; padding-bottom: 0"
                align="center"
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
              >
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Email/Nome: </b>  ${email} - ${nome}
                      </p>
                      <p
                     <b>Titulo: </b> Sugestão
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Sugestão: </b>  ${value}
                      </p>
                    </td>
                  </tr>
                </tbody>
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td>
                      <p
                        style="font-size:12px;line-height:24px; 0;text-align:center;color:rgba(71, 71, 71, 0.7)"
                      >
                        © 2024 | REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS
                        LTDA
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>`;

    const newValue = { destinatario, body, assunto };

    EnviarFormEmail(newValue)
      .then((retorno) => {
        addToast({
          type: 'success',
          description: 'Sucesso ao enviar email',
        });
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          description: 'Falha ao enviar email',
        });
      })
      .finally(() => {
        handleClose();
      });
  });

  return (
    <>
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="body2"
            component="h2"
            color="black"
          >
            Gostaria de compartilhar uma sugestão/melhoria para a Gestão Web ?
          </Typography>

          <TextField
            aria-label="Dê a sua sugestão"
            multiline
            rows={5}
            value={descricaoSugestao}
            placeholder="Dê a sua sugestão"
            onChange={(e) => setDescricaoSugestao(e.target.value)}
            InputProps={{
              inputProps: {
                maxLength: 250,
              },
            }}
          />
          <Typography
            sx={{ width: 'max-content', padding: 0.5, borderRadius: 3 }}
            variant="subtitle2"
            component="span"
            color={
              descricaoSugestao.length < 200
                ? 'GrayText'
                : descricaoSugestao.length < 240
                ? 'orange'
                : '#ff0000'
            }
            bgcolor={descricaoSugestao.length === 250 && '#000'}
          >
            {descricaoSugestao.length} / 250
          </Typography>

          <Box display="flex" gap={2} flexDirection={'row'} fullWidth>
            <Button
              variant="contained"
              color="success"
              fullWidth
              onClick={() => handleEnviarEmailSugestao(descricaoSugestao)}
              disabled={descricaoSugestao.length < 20}
            >
              Enviar
            </Button>
            <Button
              variant="contained"
              color="error"
              fullWidth
              onClick={handleClose}
            >
              Cancelar/Fechar
            </Button>
          </Box>
        </Box>
      </Modal>

      <div className="d-flex layout position-relative ">
        <div className="sidebar">
          <SidebarNovo />
        </div>

        <div className="d-flex flex-column w-100 h-100  ">
          {props.showRoller ? (
            <>
              <div className="topCarrousel">
                <div className="boxDataTimeLayout">
                  <p>{new Date().toLocaleDateString()} </p>
                  <p>
                    <IoMdTime />
                    {getHorario}
                  </p>
                </div>
                <div className="tickerTape">
                  <TickerTape
                    colorTheme="dark"
                    symbols={symbolsTrade}
                    displayMode="adaptive"
                  ></TickerTape>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          <div className="d-flex w-100 ">
            <div
              className="d-flex flex-column justify-content-between h-100 w-100 main  "
              style={{ flex: 1, minHeight: '100vh' }}
            >
              {props.showRoller ? (
                <>
                  <div
                    style={{ paddingLeft: '40px', flex: 1, height: '100%' }}
                    id="child"
                    className="card-child align-self-center mt-2 h-full "
                  >
                    <div
                      className={'clip-path-polygon'}
                      style={{
                        backgroundColor: polygonColorSetor(props.setorColor),
                      }}
                    ></div>

                    {children}
                  </div>
                </>
              ) : (
                <>
                  <div
                    style={{ paddingLeft: '40px', flex: 1, height: '100%' }}
                    id="child"
                    className="non-card-child align-self-center mt-2 h-full "
                  >
                    <div
                      className={'clip-path-polygon'}
                      style={{
                        backgroundColor: polygonColorSetor(props.setorColor),
                      }}
                    ></div>

                    {children}
                  </div>
                </>
              )}

              {/* <FloatingButton whatsapp={linkAmvox} /> */}
              <Box
                sx={{
                  display: 'flex',
                  marginTop: '25px',
                  opacity: '85%',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#000000',
                  width: '100%',
                }}
              >
                {' '}
                <footer className="footerPagePrincipal">
                  <img src={xVermelho} alt="Amvox"></img>
                  Copyright &copy; {new Date().getFullYear()} Amvox. Todos os
                  direitos reservados.
                  <br />
                </footer>
              </Box>
            </div>
            {/* <Box>
              <Chatbot />
            </Box> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutNovo;
