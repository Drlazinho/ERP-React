// components/PaginationControl.tsx
import React from 'react';
import Pagination from '@mui/material/Pagination';

interface PaginationControlProps {
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  color?: 'primary' | 'secondary' | 'standard';
}

const PaginationAmvox: React.FC<PaginationControlProps> = ({
  count,
  onChange,
  showFirstButton = true,
  showLastButton = true,
  color = 'primary',
}) => {
  return (
    <Pagination
      count={count}
      onChange={onChange}
      showFirstButton={showFirstButton}
      showLastButton={showLastButton}
      color={color}
      size='small'
    />
  );
};

export default PaginationAmvox;
