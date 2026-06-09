import React from 'react';
import { Box, Typography, styled } from '@mui/material';
import FactoryIcon from '@mui/icons-material/Factory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { RadioButtonUnchecked, TaskAlt } from '@mui/icons-material';
import logotipo from '../../../../assets/logotipo.png';
import { EntregasItem } from '../entregas.service';
import formatDateTotvs from '@/utils/formatDataTotvs';
import { motion, AnimatePresence } from 'framer-motion';

const BreadcrumbContainer = styled(Box)({
  display: 'flex',
  gap: 10,
  overflowX: 'auto',
  position: 'relative',
  padding: 8,
});

const StyledCardBorder = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== 'completed' && prop !== 'isLatestCompleted',
})<{ completed: boolean; isLatestCompleted: boolean }>(
  ({ theme, completed, isLatestCompleted }) => ({
    width: '100%',
    padding: 4,
    borderRadius: 12,
    background: !completed
      ? 'linear-gradient(45deg, #e0e0e0, #f0f0f0, #e0e0e0)'
      : isLatestCompleted
      ? 'linear-gradient(90deg, #121212, #121212, #121212, #700, #c00, #700, #121212)'
      : '#c00',
    backgroundSize: isLatestCompleted ? '200% 200%' : 'initial',
    backgroundPosition: '50% 0%',
    animation:
      completed && isLatestCompleted ? 'gradientFlow 1s ease infinite' : 'none',
    boxShadow: theme.shadows[3],
    transition: 'all 0.1s ease',
    zIndex: 3,

    '&:not(:last-child)::after': {
      content: '""',
      position: 'absolute',
      backgroundColor: completed ? '#700' : '#f0f0f0',
      width: 'calc(100% - 60%)', 
      height: 7, 
      top: '50%',
      transform: 'translateY(-50%)', 
      zIndex: 1,
    },

    '@keyframes gradientFlow': {
      '0%': {
        backgroundPosition: '180% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  })
);

const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'completed',
})<{ completed: boolean }>(({ theme, completed }) => ({
  width: '100%',
  backgroundColor: completed ? '#000' : '#eee',
  color: completed ? '#00FF00' : '#000',
  padding: 8,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  borderRadius: 12,
  boxShadow: '0px 2px 6px rgba(0,0,0,0.2)',
  overflow: 'hidden',
  zIndex: 4,

  backgroundImage: completed ? `url(${logotipo})` : 'initial',
  backgroundSize: '70px',
  backgroundPosition: 'top right',
  backgroundRepeat: 'no-repeat',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const StepContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 12,
});

const StepHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

interface StepProps {
  icon: React.ReactNode;
  title: string;
  date: string;
  completed?: boolean;
  isLatestCompleted?: boolean;
}

const Step = ({
  icon,
  title,
  date,
  completed = false,
  isLatestCompleted = false,
}: StepProps) => (
  <StyledCardBorder completed={completed} isLatestCompleted={isLatestCompleted}>
    <StyledCard completed={completed}>
      <StepHeader>
        {completed && <TaskAlt sx={{ color: '#00FF00' }} />}
        {!completed && <RadioButtonUnchecked sx={{ color: '#999' }} />}
        <Box
          sx={{
            display: { xs: 'none', md: 'inline-flex' }, // esconde o ícone também
          }}
        >
          {icon}
        </Box>
      </StepHeader>
      <StepContent>
        <Typography
          fontWeight="thin"
          variant="caption"
          color={completed ? '#00FF00' : '#000'}
        >
          {title}
        </Typography>
        <Typography
          fontWeight="thin"
          variant="caption"
          color={completed ? '#00FF00' : '#000'}
        >
          {date || 'Sem Data'}
        </Typography>
      </StepContent>
    </StyledCard>
  </StyledCardBorder>
);
const Breadcrumb = ({ data }: { data: EntregasItem }) => {
  const isValidDate = (date?: string) => !!date && date.trim() !== '';

  const steps = [
    {
      icon: (
        <FactoryIcon
          sx={{
            fontSize: 30,
            color: isValidDate(data.emissao) ? '#00FF00' : '#aaa',
          }}
        />
      ),
      title: 'Produção',
      date: formatDateTotvs(data.emissao),
      completed: isValidDate(data.emissao),
    },
    {
      icon: (
        <TrackChangesIcon
          sx={{
            fontSize: 30,
            color: isValidDate(data.saida) ? '#00FF00' : '#aaa',
          }}
        />
      ),
      title: 'Carregamento',
      date: formatDateTotvs(data.saida),
      completed: isValidDate(data.saida),
    },
    {
      icon: (
        <LocalShippingIcon
          sx={{
            fontSize: 30,
            color: isValidDate(data.previsao) ? '#00FF00' : '#aaa',
          }}
        />
      ),
      title: 'Previsão',
      date: formatDateTotvs(data.previsao),
      completed: isValidDate(data.previsao),
    },
    {
      icon: (
        <ShoppingBagIcon
          sx={{
            fontSize: 30,
            color: isValidDate(data.entregue) ? '#00FF00' : '#aaa',
          }}
        />
      ),
      title: 'Entregue',
      date: formatDateTotvs(data.entregue),
      completed: isValidDate(data.entregue),
    },
  ];

  const lastCompletedIndex = [...steps]
    .reverse()
    .findIndex((step) => step.completed);
  const trueIndex =
    lastCompletedIndex === -1 ? -1 : steps.length - 1 - lastCompletedIndex;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography align="center" sx={{ fontWeight: 'bold' }}>
        {' '}
        Nota: {data?.documento || '0000000'}{' '}
      </Typography>
      <AnimatePresence mode="wait">
        <motion.div
          key={data?.documento} 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <BreadcrumbContainer>
            {steps.map((step, index) => (
              <Step
                key={step.title}
                {...step}
                isLatestCompleted={index === trueIndex}
              />
            ))}
          </BreadcrumbContainer>
        </motion.div>
      </AnimatePresence>
    </Box>
  );
};

export default Breadcrumb;
