import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabelNPS(props) {
  function renderColorStatus(valor) {
    switch (true) {
      case valor <= -1:
        return '#BD1D0E';
      case valor > -1 && valor < 50:
        return '#F77539';
      case valor > 49 && valor < 75:
        return '#FFA729';
      case valor > 75 && valor < 101:
        return '#01C94E';
      default:
        return undefined;
    }
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress
          sx={{
            height: '15px',
            borderRadius: '24px',
            backgroundColor: 'white',
            '& .MuiLinearProgress-bar': {
              backgroundColor: renderColorStatus(props.value),
            },
          }}
          variant="determinate"
          {...props}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabelNPS.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabelNPS value={props.value} />
    </Box>
  );
}
