import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function CircularProgressWithColorX(props) {
  let numericValue;
  if (typeof props.value === 'string') {
    numericValue = parseFloat(props.value.replace(',', '.'));
  } else {
    numericValue = props.value;
  }

  const size = props.size || 200;

  const formatValue = (value) => {
    if (props.noDecimal) {
      return Math.round(value).toString();
    }

    if (Number.isInteger(value)) {
      return value.toString();
    }
    return value.toString();
  };

  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={5}
        sx={{
          color: '#f2f2f2',
          position: 'absolute',
        }}
      />

      <CircularProgress
        variant="determinate"
        value={numericValue}
        size={size}
        thickness={5}
        sx={{
          color: props.cor,
          strokeLinecap: 'round',
        }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          component="div"
          color="text.secondary"
          sx={{ fontSize: size * 0.2 }}
        >
          {`${formatValue(numericValue)}${props.isPercentage ? '%' : ''}`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithColorX.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  cor: PropTypes.string.isRequired,
  size: PropTypes.number,
  isPercentage: PropTypes.bool,
  noDecimal: PropTypes.bool,
};

CircularProgressWithColorX.defaultProps = {
  size: 200,
  isPercentage: false,
  noDecimal: false,
};
