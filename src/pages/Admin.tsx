
import React from 'react';
import { AdminProvider } from '@/components/AdminContext';
import AdminLogin from '@/components/AdminLogin';

export default function Admin() {
  return (
    <AdminProvider>
      <AdminLogin />
    </AdminProvider>
  );
}
