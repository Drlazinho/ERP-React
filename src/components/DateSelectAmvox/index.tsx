import React from 'react';
import { Box, Button, MenuItem, Stack, TextField } from '@mui/material';
import generateYears from '@/utils/generateYears'

const meses = [
  { id: 1, nome: 'Jan' },
  { id: 2, nome: 'Fev' },
  { id: 3, nome: 'Mar' },
  { id: 4, nome: 'Abr' },
  { id: 5, nome: 'Mai' },
  { id: 6, nome: 'Jun' },
  { id: 7, nome: 'Jul' },
  { id: 8, nome: 'Ago' },
  { id: 9, nome: 'Set' },
  { id: 10, nome: 'Out' },
  { id: 11, nome: 'Nov' },
  { id: 12, nome: 'Dez' },
];

interface DateSelectProps {
  selectedMes?: number;
  handleSelectedMes: (id: number) => void;
  selectedYear?: number;
  handleYearChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DateSelectAmvox({
  selectedMes,
  handleSelectedMes,
  handleYearChange,
  selectedYear,
}: DateSelectProps) {
  const years = generateYears()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <TextField
        select
        sx={{
          minWidth: '100px',
          background: '#ffff',
          height: '40px',
          '& .MuiInputBase-root': {
            height: '40px',
            borderRadius: '4px',
            '&:focus-within': {
              border: '1px solid rgba(0, 0, 0, 0.10)',
            },
          },
        }}
        value={selectedYear}
        onChange={handleYearChange}
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction={'row'} sx={{
         overflowX: 'auto',
         '&::-webkit-scrollbar': {
           height: '6px',
         },
         '&::-webkit-scrollbar-thumb': {
           backgroundColor: '#a00',
           borderRadius: '4px',
         },
         '&::-webkit-scrollbar-track': {
           backgroundColor: '#f0f0f0',
         },
      }}>
        {meses.map((item) => (
          <Button
            key={item.id}
            variant="contained"
            onClick={() => {
              handleSelectedMes(item.id);
            }}
            sx={{
              display: 'flex',
              height: '40px',
              fontFamily: 'Poppins, Poppins Bold, sans-serif',
              textTransform: 'capitalize',
              borderRadius: '2px',
              border: '1px solid rgba(0, 0, 0, 0.10)',
              boxShadow: '0px 1px 1px 0px rgba(0, 0, 0, 0.25)',
              transition: 'background-color 0.2s ease-in-out',
              marginRight: '2px',
              backgroundColor: selectedMes === item.id ? '#a00' : '#FFF',
              color: selectedMes === item.id ? '#fff' : 'black',
              '&:hover': {
                backgroundColor: selectedMes === item.id ? '#a00' : 'lightGray',
              },
            }}
          >
            {item.nome}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
