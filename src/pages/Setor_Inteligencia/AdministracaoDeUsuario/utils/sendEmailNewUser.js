import { EnviarFormEmail } from "../../../../services/email.service"

export function sendEmailNewUser(value) {
    const { nome, email, password } = value
    const anoAtual = new Date().getFullYear()
    const assunto = "Novo Acesso Gestão na Web"
    const body = `<table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
    style="max-width: 37.5em">
    <tr style="width: 100%">
      <td>
        <table style="
              background-color: rgb(190, 190, 190);
              display: flex;
              justify-content: center;
              aling-items: center;
              padding: 30px;
            " align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
          <tbody>
            <tr>
              <td style="width=" 25%">
  
              </td>
            </tr>
          </tbody>
        </table>
        <table style="
              border: 1px solid rgb(0, 0, 0, 0.1);
              border-radius: 3px;
              overflow: hidden;
            " align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
          <tbody>
            <tr>
              <table width="100%" style="padding: 20px 40px; padding-bottom: 0" align="center" role="presentation"
                cellspacing="0" cellpadding="0" border="0">
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td>
                      <p style="
                          font-size: 16px;
                          line-height: 24px;
                          margin: 16px 0;
                          margin-top: -5px;
                        ">
                        <b>Olá ${nome? nome : 'usuário'}, Seu acesso ao Gestão AmvoX chegou!</b></br> Considere após o primeiro acesso trocar a sua senha
                        para uma de sua preferência.
                      </p>
                      <p style="
                            font-size: 16px;
                            line-height: 24px;
                            margin: 16px 0;
                            margin-top: -5px;
                          ">
                        <b>Login: </b> ${email}
                      </p>
                      <p style="
                            font-size: 16px;
                            line-height: 24px;
                            margin: 16px 0;
                            margin-top: -5px;
                          ">
                        <b>Senha: </b> ${password}
                      </p>
                      <p style="
                            font-size: 16px;
                            line-height: 24px;
                            margin: 16px 0;
                            margin-top: -5px;
                          ">
                        <a href="https://amvox.gestaonaweb.com.br/">Clique aqui para acessar o site</a>
                      </p>
                    </td>
                  </tr>
                </tbody>
                <tbody style="width: 100%">
                  <tr style="width: 100%">
                    <td>                      
                      <p style="font-size:12px;line-height:24px; 0;text-align:center;color:rgba(71, 71, 71, 0.7)">
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
  </table>`

    const newValue = { destinatario: email, body, assunto }

    EnviarFormEmail(newValue)
        .then((retorno) => {
        })
        .catch((_err) => {
            alert('Error ao enviar email')
        })
}