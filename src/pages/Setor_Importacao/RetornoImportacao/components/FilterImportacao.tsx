import { useState, useEffect } from 'react';
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

interface Filtro {
  paginas: number;
  quantidadeItensPagina: number;
  bl: string;
  invoice: string;
  container: string;
}

interface FilterImportacaoProps {
  filtro: Filtro;
  onFiltroChange: (novoFiltro: Filtro) => void;
  onClear: () => void;
}

const FilterImportacao = ({
  filtro,
  onFiltroChange,
  onClear,
}: FilterImportacaoProps) => {
  const [tempFiltro, setTempFiltro] = useState<Filtro>(filtro);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onFiltroChange(tempFiltro);
    }, 1000);

    return () => clearTimeout(debounceTimer);
  }, [tempFiltro, onFiltroChange]);

  const handleChange = (campo: keyof Filtro, valor: string) => {
    setTempFiltro((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  useEffect(() => {
    setTempFiltro(filtro);
  }, [filtro]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 2,
        marginBottom: 2,
        padding: 2,
      }}
    >
      <Box sx={{ marginLeft: 2, marginBottom: 2 }}>
        <Typography variant="h6">Filtros:</Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          ml: 4,
          alignItems: 'center',
          width: '100%',
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
            Invoice
          </FormLabel>
          <TextField
            type="text"
            variant="outlined"
            size="medium"
            sx={{
              bgcolor: '#fff',
              '& .MuiOutlinedInput-input': {
                padding: '10px 14px',
                borderRadius: 2,
              },
              '& .MuiOutlinedInput-root': {
                height: 48,
              },
            }}
            value={tempFiltro.invoice}
            onChange={(e) => handleChange('invoice', e.target.value)}
            placeholder="Informe o Invoice"
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>BL</FormLabel>
          <TextField
            type="text"
            variant="outlined"
            size="medium"
            sx={{
              bgcolor: '#fff',
              '& .MuiOutlinedInput-input': {
                padding: '10px 14px',
                borderRadius: 2,
              },
              '& .MuiOutlinedInput-root': {
                height: 48,
              },
            }}
            value={tempFiltro.bl}
            onChange={(e) => handleChange('bl', e.target.value)}
            placeholder="Informe o BL"
          />
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <FormLabel sx={{ color: '#333', fontWeight: 'bold' }}>
            Container
          </FormLabel>
          <TextField
            type="text"
            variant="outlined"
            size="medium"
            sx={{
              bgcolor: '#fff',
              '& .MuiOutlinedInput-input': {
                padding: '10px 14px',
                borderRadius: 2,
              },
              '& .MuiOutlinedInput-root': {
                height: 48,
              },
            }}
            value={tempFiltro.container}
            onChange={(e) => handleChange('container', e.target.value)}
            placeholder="Informe o Container"
          />
        </Box>

        <Button
          size="medium"
          variant="contained"
          color="primary"
          onClick={onClear}
          sx={{ width: 150, height: 48, mt: 3 }}
        >
          <CleaningServicesIcon />
          Limpar
        </Button>
      </Box>
    </Box>
  );
};

export default FilterImportacao;
