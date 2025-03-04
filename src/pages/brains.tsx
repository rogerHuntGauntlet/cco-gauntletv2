import React from 'react';
import { NextPage } from 'next';
import { AuthProvider } from '../hooks/useAuth';
import BrainDashboard from '../features/secondbrain/BrainDashboard';
import { AppShell } from '../components/layout/AppShell';

const BrainsPage: NextPage = () => {
  return (
    <AuthProvider>
      <AppShell>
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">My Brains</h1>
            <p className="text-gray-600">Create and manage your brains</p>
          </div>
          <div className="flex-grow overflow-hidden">
            <BrainDashboard />
          </div>
        </div>
      </AppShell>
    </AuthProvider>
  );
};

export default BrainsPage; 