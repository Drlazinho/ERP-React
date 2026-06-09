import CardStatus from '@/pages/Setor_ComprasInt/VirtualSupply/components/CardStatus';
import { Box, Typography } from '@mui/material';

export default function StatusCards({ value, text, color }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '16px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',
        borderRadius: '8px',
        background: '#fff',
        boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.25)',
        color: { color },
        minWidth: '24.4%',
      }}
    >
      <Typography variant="h4">{value}</Typography>
      <Typography variant='body1'>{text}</Typography>
    </Box>
  );
}
