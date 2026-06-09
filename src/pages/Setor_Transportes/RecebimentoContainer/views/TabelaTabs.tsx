import { ButtonClear } from '@/components/ButtonAmvox/ButtonsAmvox';
import InputAmvox from '@/components/InputAmvox';
import { InputDateAmvox } from '@/components/InputDateAmvox/InputDateAmvox';
import { Box, Grid2, Pagination } from '@mui/material';
import { FormEvent, useState } from 'react';
import { TabelaRecebimentoContainer } from '../Components/TabelaRecebimentoContainer';
import { useRecebimentoContainerTabelaQuery } from '../hooks/useRecebContainerTabelaQuery';
import ExcelRecebimentoContainer_Button from '../Components/ExcelRecebimentoContainer_Button';
import CadastrarMotorista_Form from '../Components/CadastrarMotorista_Form';
import CadastroContainer_Form from '../Components/CadastroContainer_Form';
import { useEffect } from 'react';

export default function TabelaTabs() {
  const initialState = {
    id: 0,
    produto: '',
    bl: '',
    data: new Date().toLocaleDateString('en-CA'),
    nf: '',
    numeroDaPagina: 1,
    itensPorPagina: 10,
  };

  const [filtro, setFiltro] = useState(initialState);
  const [pagina, setPagina] = useState(0);
  const { ListaContainer } = useRecebimentoContainerTabelaQuery(filtro);

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
    e.currentTarget.reset();
    setFiltro(initialState);
  };

  return (
    <Box>
      <Grid2
        size={{ xs: 12 }}
        container
        component={'form'}
        onSubmit={handlerClear}
        spacing={1}
      >
        <Grid2 size={{ xs: 6 }}>
          <CadastrarMotorista_Form />
        </Grid2>
        <Grid2 size={{ xs: 6 }}>
          <CadastroContainer_Form />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 2.5 }}>
          <InputAmvox
            label="BL"
            onChange={(e) =>
              setFiltro({
                ...filtro,
                bl: e.target.value,
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 2.5 }}>
          <InputAmvox
            label="Nota Fiscal"
            onChange={(e) =>
              setFiltro({
                ...filtro,
                nf: e.target.value,
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 2.5 }}>
          <InputDateAmvox
            label="Data"
            format="YYYY-MM-DD"
            value={filtro.data || ''}
            onChange={(date) =>
              setFiltro({
                ...filtro,
                data: date,
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 2.5 }}>
          <InputAmvox
            label="Produto"
            onChange={(e) =>
              setFiltro({
                ...filtro,
                produto: e.target.value,
              })
            }
          />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 1 }}>
          <ButtonClear type="submit" />
        </Grid2>
        <Grid2 size={{ xs: 6, sm: 4, lg: 1 }}>
          <ExcelRecebimentoContainer_Button
            data={ListaContainer?.containeres}
          />
        </Grid2>
      </Grid2>
      <TabelaRecebimentoContainer
        recebimentoContainerLista={ListaContainer?.containeres || []}
      />
      <Box>
        <Pagination
          sx={{
            marginTop: 4,
            display: 'flex',
            justifyContent: 'center',
          }}
          count={ListaContainer?.totalDePaginas}
          page={pagina + 1}
          onChange={handleChangePage}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Box>
    </Box>
  );
}
