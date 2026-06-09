import { useState } from 'react';
import HistoricoInsumos_Table from '../components/HistoricoInsumos_Table';
import { useHistoricoInsumosQuery } from '../hooks/useHistoricoInsumosQuery';
import SelectAmvox from '@/components/SelectAmvox';
import { Grid2 } from '@mui/material';
import ExcelHistoricoInsumos_Button from '../components/ExcelHistoricoInsumos_Button'

const initialState = {
  tipoMovimentacao: '',
  DataInicio: null,
  DataFim: null,
};

export default function HistoricoInsumos_Tab() {
  const TipoMovimentacaoLista = [
    { value: 'SAIDA', label: 'SAÍDA' },
    { value: 'ENTRADA', label: 'ENTRADA' },
  ];
  const [movimentacaoSelecionada, setMovimentacaoSelecionada] = useState({
    value: '',
    label: '',
  });

  const [filter, setFilter] = useState(initialState);

  const { historico_data } = useHistoricoInsumosQuery(filter);

  const handleSelectChange = (_: any, selectedOption : any) => {
    setMovimentacaoSelecionada(selectedOption);

    setFilter((prev) => ({
      ...prev,
      tipoMovimentacao: selectedOption?.value || '',
    }));
  };

  return (
    <>
      <Grid2 spacing={1} container component={'form'}>
        <Grid2 size={{ xs: 6, sm: 4, md: 2 }}>
          <SelectAmvox
            options={TipoMovimentacaoLista}
            label="Tipo de Movimentação"
            value={movimentacaoSelecionada}
            onChange={handleSelectChange}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, md: 2 }}>
          <ExcelHistoricoInsumos_Button dados={historico_data} />
        </Grid2>
      </Grid2>
      <HistoricoInsumos_Table data={historico_data} />
    </>
  );
}
