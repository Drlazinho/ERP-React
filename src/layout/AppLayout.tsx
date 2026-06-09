import LayoutNovo from '@/components/LayoutNovo';
import { Outlet } from 'react-router';

export default function AppLayout() {
  return (
    <LayoutNovo>
      <Outlet />
    </LayoutNovo>
  );
}
