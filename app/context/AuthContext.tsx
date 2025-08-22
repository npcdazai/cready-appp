import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User } from '../utils/apiClient';

interface AuthContextType {
  phone: string;
  setPhone: (phone: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (authenticated: boolean) => void;
  clearAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [phone, setPhone] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const clearAuth = () => {
    setPhone('');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    phone,
    setPhone,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    clearAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 