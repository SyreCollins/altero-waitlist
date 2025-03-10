
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdmin } from './AdminContext';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();

  // Prevent infinite redirect by checking the current location
  if (!isAuthenticated && location.pathname !== '/admin') {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
}
