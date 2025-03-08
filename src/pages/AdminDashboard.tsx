
import React from 'react';
import { AdminProvider } from '@/components/AdminContext';
import { WaitlistProvider } from '@/components/WaitlistContext';
import AdminDashboardComponent from '@/components/AdminDashboard';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminDashboard() {
  return (
    <AdminProvider>
      <WaitlistProvider>
        <ProtectedRoute>
          <AdminDashboardComponent />
        </ProtectedRoute>
      </WaitlistProvider>
    </AdminProvider>
  );
}
