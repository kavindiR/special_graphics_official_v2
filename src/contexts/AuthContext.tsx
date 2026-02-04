'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, AuthResponse } from '@/lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  bio?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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

// Local test credentials (for testing without backend)
const TEST_CREDENTIALS = {
  admin: {
    email: 'admin@specialgraphics.com',
    password: 'Admin123!',
    user: {
      id: 1,
      name: 'Admin User',
      email: 'admin@specialgraphics.com',
      role: 'admin',
      isVerified: true,
    }
  },
  designer: {
    email: 'designer@test.com',
    password: 'Designer123!',
    user: {
      id: 2,
      name: 'Test Designer',
      email: 'designer@test.com',
      role: 'designer',
      isVerified: true,
    }
  },
  client: {
    email: 'client@test.com',
    password: 'Client123!',
    user: {
      id: 3,
      name: 'Test Client',
      email: 'client@test.com',
      role: 'client',
      isVerified: true,
    }
  }
};

// Check if user is trying to access admin panel
const isAdminRoute = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/adminpanel');
};

// Local login (no backend required) - supports admin, designer, and client
const localLogin = (email: string, password: string): { success: boolean; user?: User; error?: string } => {
  // Normalize email (trim and lowercase) for comparison
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();
  
  // Check admin credentials
  if (normalizedEmail === TEST_CREDENTIALS.admin.email.toLowerCase() && normalizedPassword === TEST_CREDENTIALS.admin.password) {
    return { success: true, user: TEST_CREDENTIALS.admin.user };
  }
  
  // Check designer credentials
  if (normalizedEmail === TEST_CREDENTIALS.designer.email.toLowerCase() && normalizedPassword === TEST_CREDENTIALS.designer.password) {
    return { success: true, user: TEST_CREDENTIALS.designer.user };
  }
  
  // Check client credentials
  if (normalizedEmail === TEST_CREDENTIALS.client.email.toLowerCase() && normalizedPassword === TEST_CREDENTIALS.client.password) {
    return { success: true, user: TEST_CREDENTIALS.client.user };
  }
  
  return { success: false, error: 'Invalid email or password' };
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // If it's an admin user and we're on admin route, allow access without backend check
          if (isAdminRoute() && (parsedUser.role === 'admin' || parsedUser.role === 'moderator')) {
            setUser(parsedUser);
            setLoading(false);
            return;
          }
          
          // For non-admin routes or if token exists, try to verify with backend
          if (token && !isAdminRoute()) {
            try {
              const response = await authApi.getCurrentUser();
              if (response.success && response.data) {
                setUser(response.data);
                localStorage.setItem('user', JSON.stringify(response.data));
              } else {
                // If backend fails but it's a test user (admin, designer, client), allow access
                if (parsedUser.role === 'admin' || parsedUser.role === 'moderator' || parsedUser.role === 'designer' || parsedUser.role === 'client') {
                  setUser(parsedUser);
                } else {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  setUser(null);
                }
              }
            } catch (error) {
              // Backend not available, but if it's a test user, allow access
              if (parsedUser.role === 'admin' || parsedUser.role === 'moderator' || parsedUser.role === 'designer' || parsedUser.role === 'client') {
                setUser(parsedUser);
              } else {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                setUser(null);
              }
            }
          } else {
            // No token but user exists - allow access for test users
            setUser(parsedUser);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Always try local login first (check test credentials for admin, designer, client)
      const localResult = localLogin(email, password);
      if (localResult.success && localResult.user) {
        setUser(localResult.user);
        localStorage.setItem('user', JSON.stringify(localResult.user));
        localStorage.setItem('token', `local-${localResult.user.role}-token`);
        return { success: true };
      }

      // If not test credentials and on admin route, don't try backend
      if (isAdminRoute()) {
        return { success: false, error: 'Invalid admin credentials. Please use admin@specialgraphics.com / Admin123!' };
      }

      // For regular login, try backend (but don't fail if backend is unavailable for non-admin routes)
      try {
        const response = await authApi.login(email, password);
        
        if (response.success && response.data) {
          setUser(response.data.user);
          return { success: true };
        } else {
          return {
            success: false,
            error: response.error?.message || 'Login failed',
          };
        }
      } catch (error) {
        // Backend not available - show error with test credentials hint
        return {
          success: false,
          error: 'Network error. Please check your connection. Or use test credentials: designer@test.com / Designer123! or client@test.com / Client123!',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role?: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authApi.register(name, email, password, role);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      } else {
        return {
          success: false,
          error: response.error?.message || 'Registration failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      // Try backend logout, but don't fail if backend is unavailable
      try {
        await authApi.logout();
      } catch (error) {
        console.log('Backend logout failed, clearing local storage');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      // Only refresh from backend if not admin route
      if (!isAdminRoute()) {
        const response = await authApi.getCurrentUser();
        if (response.success && response.data) {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        }
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
