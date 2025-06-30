import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    if (email === 'admin@gamestore.com' && password === 'admin') {
      const adminUser: User = {
        id: '1',
        username: 'Admin',
        email: 'admin@gamestore.com',
        avatar: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: true,
        joinDate: '2024-01-01',
        downloadedGames: []
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(adminUser));
    } else if (email === 'user@gamestore.com' && password === 'user') {
      const regularUser: User = {
        id: '2',
        username: 'GamePlayer',
        email: 'user@gamestore.com',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
        isAdmin: false,
        joinDate: '2024-01-15',
        downloadedGames: ['1', '3']
      };
      setUser(regularUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(regularUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const register = async (username: string, email: string, password: string) => {
    // Mock registration
    const newUser: User = {
      id: Math.random().toString(),
      username,
      email,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      isAdmin: false,
      joinDate: new Date().toISOString().split('T')[0],
      downloadedGames: []
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}