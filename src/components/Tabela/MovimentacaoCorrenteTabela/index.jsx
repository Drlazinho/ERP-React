import React, { memo } from 'react';
import useSortableData from '../../../utils/sortable';
import formatDateTotvs from '../../../utils/formatDataTotvs';
import './style.css';
import { Buttonth } from '../InspetorTabela/styles';

function MovimentacaoCorrenteTabelaProps({ ...props }){
    const { items, requestSort, sortConfig } = useSortableData(
        props.produtosLista
    );

    const getClassNamesFor = (name) => {
        if (!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    return (
        <table className="table table-striped table-hover">
            <thead className="table-dark mt-3 position-sticky top-0">
                <tr>
                    <th>
                        {' '}
                        <Buttonth 
                        type="button"
                        onClick={() => requestSort('codProduto')}
                        className={getClassNamesFor('codProduto')}
                        >
                            CodProduto
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth 
                        type="button"
                        onClick={() => requestSort('produto')}
                        className={getClassNamesFor('produto')}
                        >
                            Produto
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth 
                        type="button"
                        onClick={() => requestSort('saldo')}
                        className={getClassNamesFor('saldo')}
                        >
                            Saldo
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth 
                        type="button"
                        onClick={() => requestSort('armazem')}
                        className={getClassNamesFor('armazem')}
                        >
                            Número Armazem
                        </Buttonth>
                    </th>
                    <th>
                        <Buttonth 
                        type="button"
                        onClick={() => requestSort('armazemDescri')}
                        className={getClassNamesFor('armazemDescri')}
                        >
                            Nome Armazem 
                        </Buttonth>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr className="tr-data" key={item.id}>
                        <th>{item.codProduto}</th>
                        <td>{item.produto}</td>
                        <td>{item.saldo}</td>
                        <td>{item.armazem}</td>
                        <td>{item.armazemDescri}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export const MovimentacaoCorrenteTabela = memo(
    MovimentacaoCorrenteTabelaProps,
    (prevProps, nextProps) => {
        Object.is(prevProps, nextProps);
    }
)