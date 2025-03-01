import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, getUserProfile, createUserProfile } from '../lib/firebase';

// Define user profile type
type UserProfile = {
  name: string;
  email: string;
  role: string;
  photoURL: string | null;
  createdAt?: any;
  updatedAt?: any;
};

// Define the context type
type AuthContextType = {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  refreshUserProfile: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userProfile: null,
  loading: true,
  refreshUserProfile: async () => {},
});

// Create a hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch user profile from Firestore
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log("Fetching user profile for:", userId);
      const { data, error } = await getUserProfile(userId);
      if (data && !error) {
        console.log("User profile found:", data);
        setUserProfile(data as UserProfile);
      } else {
        console.error("Error fetching user profile:", error);
        
        // Create a default profile if one doesn't exist
        if (error === "No such document!" && currentUser) {
          console.log("Creating default user profile for:", currentUser.uid);
          const defaultProfile = {
            name: currentUser.displayName || "User",
            email: currentUser.email || "",
            role: "user",
            photoURL: currentUser.photoURL,
          };
          
          console.log("Default profile data:", defaultProfile);
          
          // Create a new profile in Firestore
          const { error: createError } = await createUserProfile(userId, defaultProfile);
          if (!createError) {
            // Set the profile locally
            console.log("User profile created successfully!");
            setUserProfile(defaultProfile as UserProfile);
          } else {
            console.error("Error creating user profile:", createError);
            setUserProfile(null);
          }
        } else {
          setUserProfile(null);
        }
      }
    } catch (err) {
      console.error("Error in fetchUserProfile:", err);
      setUserProfile(null);
    }
  };

  // Function to manually refresh user profile
  const refreshUserProfile = async () => {
    if (currentUser) {
      await fetchUserProfile(currentUser.uid);
    }
  };

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile when user is logged in
        await fetchUserProfile(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    loading,
    refreshUserProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 