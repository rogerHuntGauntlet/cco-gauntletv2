import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If not loading and no user is logged in, redirect to landing page
    if (!loading && !currentUser) {
      router.push('/');
    }
  }, [currentUser, loading, router]);

  // Show nothing while loading or redirecting
  if (loading || !currentUser) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-midnight-blue">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-electric-indigo mx-auto"></div>
          <p className="mt-4 text-cosmic-grey dark:text-stardust">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children only when authenticated
  return <>{children}</>;
};

export default ProtectedRoute; 