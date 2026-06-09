export default function GuiaModal() {
  return (
    <>
      <div style={{ height: 600, overflow: 'scroll' }}>
        <table className="table table-striped table-hover table-hover-scale">
          <thead className="table-dark mt-3">
            <tr>
              <th colspan="4" className="text-center">
                Criterios por Bloco
              </th>
            </tr>
            <tr>
              <th>Notas</th>
              <th>1</th>
              <th>3</th>
              <th>5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" className="table-primary text-center font-bold">
                Setor China - Victor/Marina
              </td>
            </tr>
            <tr>
              <td>Comunicação</td>
              <td>sem ou maior</td>
              <td>Quinzenal</td>
              <td>Semanal</td>
            </tr>
            <tr>
              <td>Capacidade de Prod.</td>
              <td>menor</td>
              <td>exato</td>
              <td>Maior que 30%</td>
            </tr>
            <tr>
              <td>Pontualidade emba.</td>
              <td>mais que uma semana</td>
              <td>uma semana</td>
              <td>no dia ou antes</td>
            </tr>
            <tr>
              <td colspan="4" className="table-primary text-center font-bold">
                Setor Produção - Arthur
              </td>
            </tr>
            <tr>
              <td>Qualidade Prod.</td>
              <td>acima de 1%</td>
              <td>0,5% até 1%</td>
              <td>0% defeito func.</td>
            </tr>
            <tr>
              <td>Qualidade Est.</td>
              <td>acima de 1,5%</td>
              <td>1% até 1,5%</td>
              <td>0% até 1% defeito est.</td>
            </tr>
            <tr>
              <td>Qualidade Emb.</td>
              <td>acima de 1,5%</td>
              <td>1% até 1,5%</td>
              <td>0% até 1% defeito emb.</td>
            </tr>
            <tr>
              <td colspan="4" className="table-primary text-center font-bold">
                Setor Financeiro - Calebe
              </td>
            </tr>
            <tr>
              <td>Condição Pagto</td>
              <td>Fora dessas condições</td>
              <td>Prazo maior ou igual a 30 dias ETD</td>
              <td>Prazo maior ou igual a 30 dias ETA</td>
            </tr>
            <tr>
              <td>Flexibilidade</td>
              <td>nunca</td>
              <td>as vezes</td>
              <td>sim</td>
            </tr>
            <tr>
              <td>Renegociação</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colspan="4" className="table-primary text-center font-bold">
                Setor Pós-Venda - Lucas
              </td>
            </tr>
            <tr>
              <td>Agilidade Envio Pecas</td>
              <td>acima de 61</td>
              <td>46 a 60 dias no Brasil</td>
              <td>menor que 45 dias no Brasil</td>
            </tr>
            <tr>
              <td>Flexibilidade</td>
              <td>nunca</td>
              <td>as vezes</td>
              <td>sim</td>
            </tr>
            <tr>
              <td>Retorno Vendas Audio/clima</td>
              <td>acima de 5%</td>
              <td>2,1% até 4,9%</td>
              <td>abaixo de 2%</td>
            </tr>
            <tr>
              <td>Retorno Vendas Lar</td>
              <td>acima de 2,6%</td>
              <td>1,1% até 2,5%</td>
              <td>abaixo de 1%</td>
            </tr>
            <tr>
              <td colspan="4" className="table-primary text-center font-bold">
                Setor Logística - Alexandre
              </td>
            </tr>
            <tr>
              <td>Qualidade Cont.</td>
              <td>acima de 1%</td>
              <td>0,5% até 1%</td>
              <td>0% dano no container</td>
            </tr>
            <tr>
              <td>Qualidade Arrum.</td>
              <td>acima de 1%</td>
              <td>0,5% até 1%</td>
              <td>0% a 1% defeito</td>
            </tr>
            <tr>
              <td>Qualidade Emb.</td>
              <td>acima de 1,5%</td>
              <td>1% até 1,5%</td>
              <td>0% até 1% defeito emb.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
