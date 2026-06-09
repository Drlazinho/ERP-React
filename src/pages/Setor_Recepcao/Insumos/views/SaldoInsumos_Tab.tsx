import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import { Box, Grid2 } from '@mui/material';
import InsumosSaldo_Table from '../components/InsumosSaldo_Table';
import { useInsumosSaldoQuery } from '../hooks/useInsumosSaldoQuery';
import { useState } from 'react';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';
import CadastrarInsumos_Form from '../components/CadastrarInsumos_Form';
import CadastrarFornecedorInsumos_Form from '../components/CadastrarFornecedoInsumos_Form';
import CadastrarEntradaInsumos_Form from '../components/CadastrarEntradaInsumos_Form';
import ExcelSaldoInsumos_Button from '../components/ExcelSaldoInsumos_Button';
import SelectAmvox from '@/components/SelectAmvox';
import Loading from '@/components/Loading';
import debounce from '@/utils/debounce';

export default function SaldoInsumos_Tab() {
  const { email } = useUsuarioLocal();

  const initialState = {
    email: email,
    codProduto: '',
    nome: '',
  };

  const [filter, setFilter] = useState(initialState);
  const { insumos_data, insumos_isLoading } = useInsumosSaldoQuery(filter);

  const handleSelectChange =
    <T extends object, K extends keyof T>(field: string, extractKey: K) =>
    (_event: React.SyntheticEvent, value: T | null) => {
      setFilter((prev) => ({
        ...prev,
        [field]: value?.[extractKey] ?? '',
      }));
    };

  return (
    <Box>
      <Grid2 container spacing={1}>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <CadastrarInsumos_Form />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <CadastrarFornecedorInsumos_Form />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 4 }}>
          <CadastrarEntradaInsumos_Form />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <InputAmvox
            label="Buscar por código"
            name="codProduto"
            onChange={(e) =>
              debounce(() => {
                setFilter({
                  ...filter,
                  codProduto: e.target.value,
                });
              }, 1500)
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <SelectAmvox<{ nome: string }>
            label="Produto"
            options={insumos_data}
            onChange={handleSelectChange('nome', 'nome')}
            getOptionLabel={(option) => option.nome}
            isOptionEqualToValue={(option, value) => option.nome === value.nome}
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <ButtonClear />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 3 }}>
          <ExcelSaldoInsumos_Button dados={insumos_data} />
        </Grid2>
      </Grid2>
      {insumos_isLoading ? (
        <Loading />
      ) : (
        <InsumosSaldo_Table data={insumos_data} />
      )}
    </Box>
  );
}
