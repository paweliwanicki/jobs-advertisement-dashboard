import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

type AuthGuardType = {
  children?: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardType) => {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.jwtToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
