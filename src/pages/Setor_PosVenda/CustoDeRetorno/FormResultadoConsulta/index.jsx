import { useEffect, useState } from 'react';
import Loader from '@/components/Loader';
import CircularProgress from '@mui/material/CircularProgress';

export default function RetornoDetalhes(props) {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (props.listaRetornoCusto.length === 0) {
      setLoader(true);
    } else {
      setLoader(false);
    }
  }, [props.listaRetornoCusto]);

  return (
    <div>
      <div className="row mt-2 px-3 " style={{ height: 250, width: '100%' }}>
        <table className="table table-bordered table-sm">
          <thead className="table-dark">
            <h5 style={{ color: '#a30000' }}>Peso dos Produtos</h5>
            <tr>
              <th scope="col">Cubagem</th>
              <th scope="col">PesoBruto</th>
              <th scope="col">PesoLiquido</th>
              <th scope="col">PesoCorreios</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row">
              <td>
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.cubagem
                )}
              </td>
              <td>
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.pesoBruto
                )}
              </td>
              <td>
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.pesoLiquido
                )}
              </td>
              <td>
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.pesoCorreios
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        className="row mt-2 px-3 table-responsive"
        style={{ height: 250, width: '100%' }}
      >
        <table className="table table-bordered table-sm">
          <thead className="table-dark">
            <h5 style={{ color: '#a30000' }}>Custo</h5>
            <tr>
              <th scope="col">Conserto</th>
              <th scope="col">ReembolsoComColeta</th>
              <th scope="col">ReembolsoSemColeta</th>
              <th scope="col">TrocaComColeta</th>
              <th scope="col">TrocaSemColeta</th>
            </tr>
          </thead>
          <tbody>
            <tr scope="row">
              <td>
                R${' '}
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.conserto
                )}
              </td>
              <td>
                R${' '}
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.reembolsoComColeta
                )}
              </td>
              <td>
                R${' '}
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.reembolsoSemColeta
                )}
              </td>
              <td>
                R${' '}
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.trocaComColeta
                )}
              </td>
              <td>
                R${' '}
                {loader ? (
                  <CircularProgress animation="border" variant="secondary" />
                ) : (
                  props.listaRetornoCusto.trocaSemColeta
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
