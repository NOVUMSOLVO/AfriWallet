import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserData } from '../types';

interface AuthContextType {
  user: UserData | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<UserData>) => Promise<boolean>;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check for stored authentication
    const storedUser = localStorage.getItem('afriwallet-user');
    const token = localStorage.getItem('afriwallet-token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('afriwallet-user');
        localStorage.removeItem('afriwallet-token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await api.login({ email, password });
      
      // Mock authentication for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@afriwallet.com' && password === 'demo123') {
        const mockUser: UserData = {
          id: '1',
          name: 'John Mukamuri',
          email: email,
          phone: '+263 77 123 4567',
          balance: {
            USD: 1250.50,
            ZWL: 850000.00,
            ZAR: 2100.25
          },
          chamaBalance: 450.00,
          investments: 2100.50,
          pendingRemittances: 3,
          kycStatus: 'verified'
        };

        setUser(mockUser);
        localStorage.setItem('afriwallet-user', JSON.stringify(mockUser));
        localStorage.setItem('afriwallet-token', 'mock-jwt-token');
        return true;
      } else {
        setError('Invalid email or password');
        return false;
      }
    } catch (error) {
      setError('Login failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<UserData>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newUser: UserData = {
        id: Date.now().toString(),
        name: userData.name || 'New User',
        email: userData.email || '',
        phone: userData.phone || '',
        balance: { USD: 0, ZWL: 0, ZAR: 0 },
        chamaBalance: 0,
        investments: 0,
        pendingRemittances: 0,
        kycStatus: 'pending'
      };

      setUser(newUser);
      localStorage.setItem('afriwallet-user', JSON.stringify(newUser));
      localStorage.setItem('afriwallet-token', 'mock-jwt-token');
      return true;
    } catch (error) {
      setError('Registration failed. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('afriwallet-user');
    localStorage.removeItem('afriwallet-token');
    setError(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register,
      isLoading,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};
