import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import './styles.css';

const NotInfo = ({ title, redirectTo, borderColor, color }) => {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        border: 1,
        borderColor: `${borderColor}`,
        p: 2,
        background: '#fff',
        height: '100%',
      }}
    >
      {/* Título clicável */}
      <Box sx={{ alignSelf: 'flex-start', mb: 2 }}>
        <Link
          to={redirectTo}
          style={{
            textDecoration: 'none',
            color: `${color}`,
          }}
        >
          <Typography variant="h7" sx={{ mb: 1, fontWeight: 'bold' }}>
            {title}
          </Typography>
        </Link>
      </Box>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <SearchIcon sx={{ fontSize: 48, color: '#808080', mb: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Nenhuma informação disponível no momento.
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default NotInfo;
