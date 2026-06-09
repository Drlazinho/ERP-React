import { memo } from "react";
import useSortableData from "../../../utils/sortable";
import { Buttonth } from "../InspetorTabela/styles";
import './style.css';
import formatDateTotvs from "../../../utils/formatDataTotvs";
import { Link } from "react-router-dom";


function TabelaRecebimentoContainerProps({ ...props }){
    const { items, requestSort, sortConfig } = useSortableData(
        props.recebimentoContainerLista
    );

    const getClassNamesFor = (name) => {
        if(!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return(
        <table className="table table-striped table-hover">
            <thead className="table-dark mt-3 position-sticky top-0">
                <tr>
                    <th>
                        {' '}
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('container')}
                        className={getClassNamesFor('container')}
                        >
                            Container
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('bl')}
                        className={getClassNamesFor('bl')}
                        >
                            BL
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('declaracao_importacao')}
                        className={getClassNamesFor('declaracao_importacao')}
                        >
                            D.I
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('data')}
                        className={getClassNamesFor('data')}
                        >
                            Data
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('nf')}
                        className={getClassNamesFor('nf')}
                        >
                            Nota Fiscal
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('produto')}
                        className={getClassNamesFor('produto')}
                        >
                            Produtos
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('chegada')}
                        className={getClassNamesFor('chegada')}
                        >
                            Chegada
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('volumes_recebidos')}
                        className={getClassNamesFor('volumes_recebidos')}
                        >
                            Vol.Recebidos
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('conferente')}
                        className={getClassNamesFor('conferente')}
                        >
                            Conferente
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('descarregador')}
                        className={getClassNamesFor('descarregador')}
                        >
                            Descarregador
                        </Buttonth>
                    </th>

                    <th>
                        <Buttonth
                        type="button"
                        onClick={() => requestSort('local')}
                        className={getClassNamesFor('local')}
                        >
                            Local
                        </Buttonth>
                    </th>
                    
                    
                    <th>
                        <Buttonth
                        >
                           C.P.C
                        </Buttonth>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => {
                    return (

                        <tr className="tr-data" key={item.id}>
                        <td>{item.container}</td>
                        <td>{item.bl}</td>
                        <td>{item.declaracao_importacao}</td>
                        <td>{formatDateTotvs(item.data)}</td>
                        <td>{item.nf}</td>
                        <td>{item.produto}</td>
                        <td>{item.chegada}</td>
                        <td>{item.volumes_recebidos}</td>
                        <td>{item.conferente}</td>
                        <td>{item.descarregador}</td>
                        <td>{item.local}</td>
                        <td><Link className="btn btn-outline-dark" to={`/printrpc/${item.id}`}
                        
                ><i className="fas fa-file-pdf"></i> Baixar Nota</Link></td>
                    </tr>
                    
                        )
                    }).reverse()}
            </tbody>
        </table>
        
    );
}

export const TabelaRecebimentoContainer= memo(
    TabelaRecebimentoContainerProps,
    (prevProps, nextProps) => {
        Object.is(prevProps, nextProps); 
     }
)