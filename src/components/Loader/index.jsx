import { Box, CircularProgress, Typography } from '@mui/material';
import './styles.css';

function Loader() {
  return (
    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', p: 2 }}>
      <div class="dot-bricks"></div>
    </Box>
  )
}

export default Loader;