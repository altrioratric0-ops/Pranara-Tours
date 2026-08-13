import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({
  user: null,
  loading: true,
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}

// Custom hooks to mimic Clerk hook behaviors
export function useAuth() {
  const { user, loading } = useContext(AuthContext);
  return {
    isSignedIn: !!user,
    userId: user ? user.uid : null,
    loading,
    isLoaded: !loading,
  };
}

export function useUser() {
  const { user, loading } = useContext(AuthContext);
  if (loading || !user) {
    return {
      user: null,
      isLoaded: !loading,
      isSignedIn: false,
    };
  }
  return {
    isLoaded: true,
    isSignedIn: true,
    user: {
      imageUrl: user.photoURL || 'https://www.gravatar.com/avatar/?d=mp',
      fullName: user.displayName || user.email?.split('@')[0] || 'Traveler',
      primaryEmailAddress: {
        emailAddress: user.email,
      },
    },
  };
}

export function useClerk() {
  const { logout } = useContext(AuthContext);
  return {
    signOut: logout,
  };
}
