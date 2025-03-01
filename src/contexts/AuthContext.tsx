import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from '../lib/firebase';

// Define the context type
type AuthContextType = {
  currentUser: User | null;
  loading: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
});

// Create a hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 