import React, { ReactNode } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';
import BrainCardLogo from '../ui/BrainCardLogo';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const navigation = [
    { name: 'Dashboard', href: '/' },
    { name: 'My Brains', href: '/brains' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <Link href="/">
            <div className="flex items-center">
              <BrainCardLogo size="sm" />
              <span className="ml-2 text-xl font-semibold text-gray-900">BrainHub</span>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link href={item.href}>
                  <div
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      router.pathname === item.href
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User section */}
        <div className="p-4 border-t border-gray-200">
          {loading ? (
            <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
          ) : user ? (
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium">
                {user.email?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.email}
                </p>
                <button 
                  className="text-xs text-gray-500 hover:text-gray-700"
                  onClick={() => {/* Sign out logic */}}
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <Link href="/login">
              <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Sign in
              </div>
            </Link>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}; 