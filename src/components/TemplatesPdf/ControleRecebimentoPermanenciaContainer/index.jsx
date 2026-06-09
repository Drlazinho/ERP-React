import { useParams } from 'react-router';
import './style.css';
import logoAmvox from '../../../assets/amvoxlogomarca.png';
import { useEffect, useState } from 'react';
import { consultaContainerNota } from '../../../services/recebimentoPermanenciaContainer.service';
import { useToast } from '../../../hooks/toast.hook';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import { gerarPdf } from '../../../utils/gerarPdf';
import { Button } from '@mui/material';
import { formatNumeroNfe } from '../../../utils/formatNfeNumero';

const ControleRPCTemplate = () => {
  const { documento } = useParams();

  const { addToast } = useToast();

  const [dados, setDados] = useState({});

  useEffect(() => {
    consultaContainerNota(documento)
      .then((retorno) => {
        setDados(retorno);
      })
      .catch((_err) => {
        addToast({
          type: 'danger',
          title: 'ERRO',
          description: 'Erro ao caregar os dados da nota !',
        });
      });
  }, [documento]);
  return (
    <>
      <Button
        onClick={() =>
          gerarPdf(document.getElementById('nota'), formatNumeroNfe(dados.nf))
        }
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
        Baixar Nota{' '}
      </Button>
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
                    CONTROLE DE RECEBIMENTO E PERMANÊNCIA DE CONTAINER
                    <span
                      className="title txt-upper"
                      style={{ padding: '5px', fontWeight: 'bold' }}
                    >
                      {dados.local}
                    </span>
                  </span>
                </td>
                <td rowSpan="2" className="tserie txt-center">
                  <span>Nº {dados.id}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="hr-dashed" />

          <table cellPadding="0" cellSpacing="0" border="1" className="no-top">
            <tbody>
              <tr>
                <td
                  rowSpan="3"
                  style={{ width: '62mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">CONTAINER:</span>
                  <span className="info txt-upper">{dados.container}</span>
                </td>
                <td
                  rowSpan="3"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">LACRE:</span>
                  <span className="info txt-upper">{dados.lacre}</span>
                </td>
                <td
                  rowSpan="3"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">BL:</span>
                  <span className="info txt-upper">{dados.bl}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className="no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="3"
                  style={{ width: '62mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">
                    DECLARAÇÃO DE IMPORTAÇÃO:
                  </span>
                  <span className="info txt-upper">
                    {dados.declaracao_importacao}
                  </span>
                </td>
                <td
                  rowSpan="3"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">DATA:</span>
                  <span className="info txt-upper">
                    {formatDateTotvs(dados.data)}
                  </span>
                </td>
                <td
                  rowSpan="3"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">N.F.:</span>
                  <span className="info txt-upper">
                    {formatNumeroNfe(dados.nf)}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className="no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="4"
                  style={{ width: '4mm' }}
                  className="txt-center valign-middle"
                >
                  <span className="nota-label bold">MOTORISTA:</span>
                </td>
                <td
                  rowSpan="4"
                  style={{ width: '48.7mm' }}
                  className="txt-start valign-middle"
                >
                  <span className="info txt-upper">{dados.motorista}</span>
                </td>
                <td
                  rowSpan="4"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">CPF:</span>
                  <span className="info txt-upper">{dados.cpf}</span>
                </td>
                <td
                  rowSpan="4"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">CNH:</span>
                  <span className="info txt-upper">{dados.cnh}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className="no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="5"
                  style={{ width: '62.3mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold bold">PRODUTO:</span>
                  <span className="info txt-upper">{dados.produto}</span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '60mm', fontSize: '7pt' }}
                  className="txt-center valign-middle greyContrast"
                >
                  <span className="info txt-upper greyContrast">
                    PREVISAO DE CHEGADA
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '19.7mm', fontSize: '7pt' }}
                  className="txt-center valign-middle greyContrast"
                >
                  <span className="info txt-upper greyContrast">CHEGADA</span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '20mm', fontSize: '7pt' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    INICIO DA O.P.
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '20mm', fontSize: '7pt' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    FINAL DA O.P.
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className=" no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="5"
                  style={{ width: '86mm', fontSize: '7pt' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    STATUS DE DESCARGA DOS PROCESSOS
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '85.5mm' }}
                  className="txt-center valign-middle greyContrast"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.previsao_chegada}
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '24mm' }}
                  className="txt-center valign-middle greyContrast"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.chegada}
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '24mm' }}
                  className="txt-center valign-middle greyContrast"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.inicio_op}
                  </span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '30.5mm', fontSize: '7pt' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.final_op}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className=" no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="6"
                  style={{ width: '4mm' }}
                  className="txt-center valign-middle"
                >
                  <span className="nota-label bold">CONHECIMENTO:</span>
                </td>
                <td
                  rowSpan="6"
                  style={{ width: '16.7mm' }}
                  className="txt-center valign-middle"
                >
                  <span className="info txt-upper">{dados.conhecimento}</span>
                </td>
                <td
                  rowSpan="5"
                  style={{ width: '31.5mm', fontSize: '7pt' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    VOLUMES NA NOTA
                  </span>
                </td>
                <td
                  rowSpan="6"
                  style={{ width: '9.5mm' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.volumes_nf}
                  </span>
                </td>
                <td
                  rowSpan="6"
                  style={{ width: '5mm' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    VOL. <br />
                    RECEBIDOS
                  </span>
                </td>
                <td
                  rowSpan="6"
                  style={{ width: '10.7mm' }}
                  className="txt-center greyContrast valign-middle"
                >
                  <span className="info txt-upper greyContrast">
                    {dados.volumes_recebidos}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" border="1" className="no-top">
            <tbody>
              <tr>
                <td
                  rowSpan="3"
                  style={{ width: '62mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">DESCARREGADOR:</span>
                  <span className="info txt-upper">{dados.descarregador}</span>
                </td>
                <td
                  rowSpan="3"
                  style={{ width: '60mm' }}
                  className="txt-center"
                >
                  <span className="nota-label bold">CONFERENTE:</span>
                  <span className="info txt-upper">{dados.conferente}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" className=" no-top" border="1">
            <tbody>
              <tr>
                <td
                  rowSpan="1"
                  style={{ width: '5px', fontSize: '7pt' }}
                  className="txt-center"
                >
                  <span className="info txt-upper"></span>
                </td>
              </tr>
            </tbody>
          </table>

          <hr className="hr-dashed" />

          <p style={{ margin: '10px 620px 3px' }} className="info txt-upper">
            conforme
          </p>
          <table
            cellPadding="0"
            cellSpacing="0"
            border="1"
            style={{ width: '20px', marginLeft: '640px', marginTop: '0px' }}
          >
            <tbody>
              <tr>
                <td
                  rowSpan="1"
                  style={{ width: '7px', fontSize: '7pt' }}
                  className="txt-right"
                >
                  <span className="info txt-upper txt-center">
                    {dados.conforme === 1 ? 'X' : ''}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" border="0">
            <hr
              className="hr-line"
              style={{ margin: '3px 50px 0px', width: '100mm' }}
            />
            <p style={{ margin: '2px 180px 0px' }} className="info txt-upper">
              ASSINATURA DO MOTORISTA
            </p>
          </table>

          <p style={{ margin: '10px 620px 5px' }} className="info txt-upper">
            não conforme
          </p>
          <table
            cellPadding="0"
            cellSpacing="0"
            border="1"
            style={{ width: '20px', marginLeft: '640px' }}
          >
            <tbody>
              <tr>
                <td
                  rowSpan="2"
                  style={{ width: '7px', fontsize: '7pt' }}
                  className="txt-right"
                >
                  <span className="info txt-upper txt-center">
                    {dados.conforme === 0 ? 'X' : ''}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <table cellPadding="0" cellSpacing="0" border="0" width={'180nm'}>
            <p
              style={{ margin: '20px 0', textAlign: 'center' }}
              className="info txt-upper"
            >
              OBSERVAÇÕES COMPLEMENTARES E REGISTRO DE FALTAS
            </p>
            <hr
              className="hr-line"
              style={{ margin: '20px 0px 10px', width: '180mm' }}
            />
            <p className="info txt-upper" style={{ marginRight: '90px' }}>
              {dados.observacao}
            </p>
            <hr className="hr-line" style={{ margin: '0px 0px 0px' }} />
          </table>

          <table cellPadding="0" cellSpacing="0" border="0">
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <h1
                style={{
                  margin: '35px 0px 0',
                  borderTop: '1px solid #444',
                  width: '75%',
                  textAlign: 'center',
                }}
                className="info txt-upper"
              >
                ENC. DO SETOR DE ALMOXARIFADO
              </h1>
              <h1
                style={{
                  margin: '35px 50px 0',
                  borderTop: '1px solid #444',
                  width: '75%',
                  textAlign: 'center',
                }}
                className="info txt-upper"
              >
                GERENCIA LOGÍSTICA
              </h1>
            </div>
          </table>
        </div>
      </div>
    </>
  );
};
export default ControleRPCTemplate;
