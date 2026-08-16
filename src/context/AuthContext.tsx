import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, signInWithGoogle, logout, onAuthStateChanged, User } from '../lib/firebase';

export interface AppUser {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  isDemo?: boolean;
}

interface AuthContextType {
  currentUser: AppUser | null;
  loading: boolean;
  error: string | null;
  isDomainUnauthorized: boolean;
  unauthorizedDomain: string;
  loginWithGoogle: () => Promise<AppUser | null>;
  loginDemoUser: (customEmail?: string, customName?: string) => void;
  logoutUser: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEMO_USER_STORAGE_KEY = 'artha_ai_demo_auth_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() => {
    try {
      const saved = localStorage.getItem(DEMO_USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDomainUnauthorized, setIsDomainUnauthorized] = useState<boolean>(false);
  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          const userObj: AppUser = {
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            isDemo: false
          };
          setCurrentUser(userObj);
          try {
            localStorage.removeItem(DEMO_USER_STORAGE_KEY);
          } catch {
            // ignore
          }
        } else {
          // If not logged in via Firebase, check if demo user is in storage
          try {
            const saved = localStorage.getItem(DEMO_USER_STORAGE_KEY);
            if (saved) {
              setCurrentUser(JSON.parse(saved));
            } else {
              setCurrentUser(null);
            }
          } catch {
            setCurrentUser(null);
          }
        }
        setLoading(false);
      },
      (err) => {
        console.warn('Firebase Auth state notice:', err?.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleLoginWithGoogle = async (): Promise<AppUser | null> => {
    setError(null);
    setIsDomainUnauthorized(false);
    try {
      const user = await signInWithGoogle();
      if (user) {
        const appUser: AppUser = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isDemo: false
        };
        setCurrentUser(appUser);
        return appUser;
      } else {
        // Fallback gracefully to demo user when domain is not authorized in preview iframe
        setIsDomainUnauthorized(true);
        loginDemoUser('monikabatra890@gmail.com', 'Monika Batra');
        return currentUser;
      }
    } catch {
      setIsDomainUnauthorized(true);
      loginDemoUser('monikabatra890@gmail.com', 'Monika Batra');
      return currentUser;
    }
  };

  const loginDemoUser = (customEmail = 'monikabatra890@gmail.com', customName = 'Monika Batra') => {
    const demoUser: AppUser = {
      uid: `demo_user_${Date.now()}`,
      displayName: customName,
      email: customEmail,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(customName)}`,
      isDemo: true
    };
    setCurrentUser(demoUser);
    setError(null);
    setIsDomainUnauthorized(false);
    try {
      localStorage.setItem(DEMO_USER_STORAGE_KEY, JSON.stringify(demoUser));
    } catch {
      // ignore
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch {
      // ignore if demo mode
    }
    setCurrentUser(null);
    try {
      localStorage.removeItem(DEMO_USER_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const clearError = () => {
    setError(null);
    setIsDomainUnauthorized(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        error,
        isDomainUnauthorized,
        unauthorizedDomain: currentHostname,
        loginWithGoogle: handleLoginWithGoogle,
        loginDemoUser,
        logoutUser: handleLogout,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
