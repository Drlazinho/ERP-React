import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function CustomCard({ title, value, color }) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
        borderRadius: '8px',
        padding: '16px 24px',
        width: '100%',
      }}
    >
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          variant="h6"
          color={color}
          sx={{
            fontWeight: 600,
            mb: 1,
            textAlign: 'center',
          }}
        >
          {value}
        </Typography>
        <Typography
          color={color}
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CustomCard;
