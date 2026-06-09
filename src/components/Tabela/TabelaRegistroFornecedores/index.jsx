import useSortableData from '../../../utils/sortable';
import { Buttonth } from './styles';

export function RegistroFornecedoresTabela({ ...props }) {
    const { items, requestSort, sortConfig } = useSortableData(props.registro);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark mt-3 position-sticky top-0">
                <tr className=''>
                    <th>
                        <Buttonth
                            type="button"
                            onClick={() => requestSort('nome')}
                            className={getClassNamesFor('nome')}
                        >
                            Nome
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth type="button"
                            onClick={() => requestSort('cidade')}
                            className={getClassNamesFor('cidade')}>Cidade</Buttonth>
                    </th>
                    <th>
                        <Buttonth type="button"
                            onClick={() => requestSort('pais')}
                            className={getClassNamesFor('pais')}>Pais</Buttonth>
                    </th>
                    <th>
                        <Buttonth type="button"
                            onClick={() => requestSort('email')}
                            className={getClassNamesFor('email')}>Email</Buttonth>
                    </th>
                    <th>
                        <Buttonth type="button"
                            onClick={() => requestSort('responsavel')}
                            className={getClassNamesFor('responsavel')}>Responsável</Buttonth>
                    </th>
                    <th>
                        <Buttonth type="button"
                            onClick={() => requestSort('nota')}
                            className={getClassNamesFor('nota')}
                        >Nota</Buttonth>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr
                        className="tr-data"
                        key={item.id}
                    >
                        <td>
                                {item.nome}
                        </td>
                        <td>
                            <p className="text-dark">{item.cidade}</p>
                        </td>
                        <td>
                            <p className="text-dark">{item.pais}</p>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.responsavel}</td>
                        <td>{item.notaDeAvaliacao}</td>
                    </tr>
                )).reverse()}
            </tbody>
        </table>
    );
}
