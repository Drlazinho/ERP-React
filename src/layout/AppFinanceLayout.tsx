import LayoutNovo from '@/components/LayoutNovo';
import { Outlet } from 'react-router';

export default function AppFinanceLayout() {
  return (
    <LayoutNovo showRoller={true}>
      <Outlet />
    </LayoutNovo>
  );
}
