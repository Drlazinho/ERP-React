const EnviarEmailNovoChamado = ({
  data,
  email,
  nome,
  tipo,
  categoria,
  urgencia,
  setor,
  titulo,
  descricao,
  anoAtual,
}) => {
  return `<table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
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
                          font-size: 14px;
                          line-height: 24px;
                          margin: 16px 0;
                          color: rgb(0, 0, 0, 0.5);
                          margin-top: -5px;
                        "
                      >
                        *${data}
                      </p>
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
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Tipo: </b>  ${tipo}
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Categoria: </b>  ${categoria}
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Urgencia: </b>  ${urgencia} 
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Setor Solicitante: </b>  ${setor}
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Titulo: </b>  ${titulo}
                      </p>
                      <p
                        style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        "
                      >
                     <b>Descricao: </b>  ${descricao}
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
                        © ${anoAtual} | REISTAR INDÚSTRIA E COMÉRCIO DE ELETRÔNICOS
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
};
export default EnviarEmailNovoChamado;
