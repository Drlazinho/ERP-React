import { FormEvent, useState, useEffect } from 'react';
import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import SelectAmvox from '@/components/SelectAmvox';
import { Box, Pagination } from '@mui/material';
import { SyntheticEvent } from 'react';
import RegistrarAvaliacao_Form from '../components/RegistrarAvaliacao_Form';
import TableAvaliacaoSemanal from '../components/TableAvaliacaoSemanal';

const initialState = {
  semana: '',
  ano: '2025',
  numeroDaPagina: 1,
  itensPorPagina: 10,
};

const anoSelect = [
  { value: 2024, label: '2024' },
  { value: 2025, label: '2025' },
  { value: 2026, label: '2026' },
  { value: 2027, label: '2027' },
];

const semanaSelect = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const Avaliacao_View = () => {
  const [filtro, setFiltro] = useState(initialState);
  const [pagina, setPagina] = useState(0);

  const ANO_LIST = anoSelect.map((item) => item.value.toString());
  const SEMANA_LIST = semanaSelect.map((item) => item.value.toString());

  useEffect(() => {
    setPagina(filtro.numeroDaPagina - 1);
  }, [filtro.numeroDaPagina]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPagina(newPage - 1);
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      numeroDaPagina: newPage,
    }));
  };

  const handlerClear = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFiltro(initialState);
  };

  return (
    <>
      <Box
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid #ccc,',
          borderRadius: '4px',
          backgroundColor: '#fff',
          boxShadow: '0px 1px 3px 0px #ccc',
          padding: '16px',
          gap: '8px',
          width: '100%',
          mt: '20px',
        }}
      >
        <Box
          component="form"
          onSubmit={handlerClear}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Box sx={{ display: 'flex', gap: '8px', width: '100%' }}>
            <SelectAmvox
              label="Semana"
              options={SEMANA_LIST}
              value={filtro.semana}
              onChange={(_event: SyntheticEvent, value: string | null) => {
                setFiltro({ ...filtro, semana: value || '' });
              }}
              sx={{ flexGrow: 1, maxWidth: '300px' }}
            />
            <SelectAmvox
              label="Ano"
              options={ANO_LIST}
              value={filtro.ano}
              onChange={(_event: SyntheticEvent, value: string | null) => {
                setFiltro({ ...filtro, ano: value || '' });
              }}
              sx={{ flexGrow: 1, maxWidth: '300px' }}
            />
            <ButtonClear
              type="submit"
              sx={{ flexGrow: 1, maxWidth: '200px' }}
            />
          </Box>
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
          >
            <RegistrarAvaliacao_Form />
          </Box>
        </Box>
      </Box>
      <Box sx={{ mt: '20px' }}>
        <TableAvaliacaoSemanal />
        <Pagination
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
          //count={totalDePaginas}
          page={pagina + 1}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </>
  );
};

export default Avaliacao_View;
