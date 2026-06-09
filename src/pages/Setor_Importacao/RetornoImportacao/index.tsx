import TabelaRetornoImportacao from './components/TabelaRetornoImportacao';
import FilterImportacao from './components/FilterImportacao';
import HeaderAmvox from '@/components/HeaderAmvox';
import { useNavigate } from 'react-router';
import { Box, Pagination } from '@mui/material';
import { useFetchImportBI } from './hooks/useFetchImportBI';
import { useState, useEffect } from 'react';

export default function RetornoImportacao() {
  const navigate = useNavigate();
  const [pagina, setPagina] = useState(0);
  const [filtro, setFiltro] = useState({
    paginas: 1,
    quantidadeItensPagina: 10,
    bl: '',
    invoice: '',
    container: '',
  });

  useEffect(() => {
    setPagina(filtro.paginas - 1);
  }, [filtro.paginas]);

  const handleChangePage = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setPagina(newPage - 1);
    setFiltro((prevFiltro) => ({
      ...prevFiltro,
      paginas: newPage,
    }));
  };

  const handleClear = () => {
    setFiltro({
      paginas: 1,
      quantidadeItensPagina: 10,
      bl: '',
      invoice: '',
      container: '',
    });
  };

  const { data, refetch } = useFetchImportBI(filtro);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        <HeaderAmvox
          title="Planilha BI Importação"
          onBack={() => navigate(-1)}
        />
        <FilterImportacao
          filtro={filtro}
          onFiltroChange={setFiltro}
          onClear={handleClear}
        />
        {data && (
          <TabelaRetornoImportacao data={data.listaImport} onUpdate={refetch} />
        )}
        <Box>
          <Pagination
            sx={{
              marginTop: 4,
              display: 'flex',
              justifyContent: 'center',
            }}
            count={data?.totalPaginas}
            page={pagina + 1}
            onChange={handleChangePage}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Box>
      </Box>
    </>
  );
}
