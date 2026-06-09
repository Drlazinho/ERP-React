import { Box, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Amvoxlogopng from '@/assets/Amvoxlogopng.png';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface HeaderProps {
  title: string;
  onBack?: () => void;
}

export default function HeaderAmvox({ onBack, title }: HeaderProps) {
  const navigate = useNavigate();
  const handleBack = onBack ?? (() => navigate(-1));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        pr: 2,
        maxWidth: '100%',
      }}
    >
      <IconButton onClick={handleBack}>
        <ChevronLeftIcon />
      </IconButton>
      <img src={Amvoxlogopng} alt="Amvox" className="imgAmvox" width={80} />
      <Typography
        variant="h5"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
