import { Navigate } from 'react-router-dom';
import useUsuarioLocal from '@/hooks/usuarioLocal.hook';

interface EmailAuthGuardProps {
  children: React.ReactNode;
  allowedEmails: string[];
}

export function EmailAuthGuard({
  children,
  allowedEmails,
}: EmailAuthGuardProps) {
  const { email } = useUsuarioLocal();

  if (!email || !allowedEmails.includes(email)) {
    return <Navigate to="/401" replace />;
  }

  return <>{children}</>;
}
