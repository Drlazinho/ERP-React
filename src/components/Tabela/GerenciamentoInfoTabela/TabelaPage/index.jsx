import React, { memo, useState } from 'react';
import useSortableData from '../../../../utils/sortable';
import { Buttonth } from '../../InspetorTabela/styles';
import { Switch } from '@mui/material';
import {
  CancelOutlined,
  CheckCircleOutlineOutlined,
} from '@mui/icons-material';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';

const TabelaPageProps = ({ ...props }) => {
  const { items, requestSort, sortConfig } = useSortableData(
    props.gerenciarInfo
  );
  const [modoEdicao, setModoEdicao] = useState(false);
  const [editStates, setEditStates] = useState({});
  const [editedValues, setEditedValues] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [newValue, setNewValue] = useState(''); // Estado para o novo valor
  const [newItemStatus, setNewItemStatus] = useState(0); // Estado para o status do novo item
  const [novaDescricaoPage, setNovaDescricaoPage] = useState({
    id: 0,
    descricao: '',
    idprocess: '',
  });

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }

    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handleEdit = (itemId) => {
    setModoEdicao(!modoEdicao);
    setEditStates((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const handleSaveNovaDescricaoPage = (value) => {
    props.atualizarDescricaoPage(value);
  };

  const handleSave = (itemId) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [itemId]: editedValues[itemId],
    }));
    handleEdit(itemId);
  };

  const handleAddNewValue = () => {
    if (newValue.trim() === '') {
      // Evitar adicionar valores em branco
      return;
    }

    // Adicionar um novo elemento com o valor digitado e o status do novo item
    const newItem = {
      id: items.length + 1, // Supondo que os IDs sejam únicos
      descricao: newValue,
      status: newItemStatus,
    };

    // Adicione o novo item à matriz de items
    items.push(newItem);

    // Limpar o estado do novo valor
    setNewValue('');
    // Limpar o estado do status do novo item
    setNewItemStatus(0);
  };

  return (
    <table className="table table-striped table hover">
      <thead className="table-dark mt-10 position-stick top 10">
        <tr>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('id')}
              className={getClassNamesFor('id')}
            >
              Id
            </Buttonth>
          </th>
          <th className="">
            <Buttonth
              type="button"
              onClick={() => requestSort('descricao')}
              className={getClassNamesFor('descricao')}
            >
              Descrição
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('status')}
              className={getClassNamesFor('status')}
            >
              Status
            </Buttonth>
          </th>
          <th>
            <Buttonth
              type="button"
              onClick={() => requestSort('')}
              className={getClassNamesFor('')}
            ></Buttonth>
          </th>
          <th>
            <div className="d-flex justify-content-start  flex-row me-5"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr className="tr-data coluna" key={item.id}>
            <td className="">{item.id}</td>
            <td>
              {!editStates[item.id] ? (
                editedValues[item.id] || item.descricao
              ) : (
                <div className="d-flex w-100  flex-row">
                  <input
                    type="text"
                    className="form-control w-50 "
                    value={novaDescricaoPage.descricao}
                    onChange={(e) =>
                      setNovaDescricaoPage({
                        id: item.id,
                        descricao: e.target.value,
                        idprocess: '',
                      })
                    }
                  />
                  <Button
                    className="ms-2"
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleSaveNovaDescricaoPage(novaDescricaoPage);
                      handleEdit(item.id); // Aqui, você sai do modo de edição após salvar
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              )}
            </td>

            <td>{item.status}</td>
            <td>
              <Switch
                color={item.status === 0 ? 'danger' : 'success'}
                slotProps={{ input: { 'aria-label': 'dark mode' } }}
                startDecorator={
                  <CancelOutlined
                    sx={{ color: item.status === 0 ? 'red' : 'gray' }}
                  />
                }
                endDecorator={
                  <CheckCircleOutlineOutlined
                    sx={{ color: item.status === 1 ? 'green' : 'gray' }}
                  />
                }
                checked={item.status}
                onChange={(e) => props.atualizarServicoPage(item.id)}
              />
            </td>
            <td>
              {!editStates[item.id] ? (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit(item.id)}
                >
                  Editar
                </Button>
              ) : (
                <div className="d-flex vw-100">
                  <Button
                    className="ms-2"
                    variant="contained"
                    size="small"
                    onClick={() => handleEdit(item.id)}
                  >
                    Cancelar
                  </Button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const TabelaPage = memo(TabelaPageProps, (prevProps, nextProps) => {
  Object.is(prevProps, nextProps);
});
