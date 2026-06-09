import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';

export default function BasicRating({
  result,
  type,
  valueStarTotal,
  onChange,
  read,
  rankingFinal,
  rankingLabel,
  mediaSetor,
  ...props
}) {

  const resultadoFinal = (value) => {
    let resultadoTratado = 0;
    if (value <= 49) {
      resultadoTratado = 0;
    }
    if (value >= 50 && value <= 69.6) {
      resultadoTratado = 1;
    }
    if (value >= 70 && value <= 84) {
      resultadoTratado = 2;
    }
    if (value >= 85) {
      resultadoTratado = 3;
    }
    return resultadoTratado;
  };

  const resultadoMediaSetor = (value) => {
    let mediaTratada = 0
    if(value <= 5) {
      mediaTratada = 1;
    }
    if(value > 5 && value <= 10) {
      mediaTratada = 2;
    }
    if(value > 10 && value <= 15) {
      mediaTratada = 3;
    }

    return mediaTratada
  }

  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      {read && (
        <Rating
          name="simple-controlled"
          value={valueStarTotal}
          readOnly
          {...props}
          max={3}
        />
      )}
      {mediaSetor && (
        <Rating
          value={resultadoMediaSetor(result)}
          name="simple-controlled"
          onChange={onChange}
          {...props}
          readOnly
          max={3}
        />
      )}
      {rankingFinal && (
        <>
          <Rating
            name="simple-controlled"
            value={resultadoFinal(result)}
            readOnly
            {...props}
            max={3}
          />

          {/* {valueStarTotal <= 49 && <p>Desqualificado</p>}
          {valueStarTotal <= 69.9 && valueStarTotal >= 50 && <p>Ruim</p>}
          {valueStarTotal <= 84.9 && valueStarTotal >= 70 && <p>Médio</p>}
          {valueStarTotal <= 49 && <p>Excelente</p>} */}
        </>
      )}
    </Box>
  );
}
