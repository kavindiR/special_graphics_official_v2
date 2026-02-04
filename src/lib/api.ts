const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
  };
  message?: string;
}

export interface AuthResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    bio?: string;
    isVerified: boolean;
  };
  token: string;
  expiresIn?: string;
}

// Helper function to get auth token from localStorage
export const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// Helper function to set auth token
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};

// Helper function to remove auth token
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getAuthToken();
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle network errors gracefully
    if (!response.ok) {
      try {
        const data = await response.json();
        return {
          success: false,
          error: {
            message: data.error?.message || data.message || 'An error occurred',
          },
        };
      } catch (parseError) {
        return {
          success: false,
          error: {
            message: 'Network error. Please check your connection.',
          },
        };
      }
    }

    const data = await response.json();

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    // Return a more user-friendly error message
    return {
      success: false,
      error: {
        message: 'Network error. Please check your connection.',
      },
    };
  }
}

// Auth API functions
export const authApi = {
  // Register new user
  register: async (
    name: string,
    email: string,
    password: string,
    role?: string
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }

    return response;
  },

  // Login user
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (response.success && response.data) {
      setAuthToken(response.data.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }

    return response;
  },

  // Logout user
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiRequest<void>('/auth/logout', {
      method: 'POST',
    });

    removeAuthToken();
    return response;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<AuthResponse['user']>> => {
    return apiRequest<AuthResponse['user']>('/auth/me', {
      method: 'GET',
    });
  },

  // Refresh token
  refreshToken: async (): Promise<ApiResponse<{ token: string; expiresIn: string }>> => {
    const response = await apiRequest<{ token: string; expiresIn: string }>(
      '/auth/refresh-token',
      {
        method: 'POST',
      }
    );

    if (response.success && response.data) {
      setAuthToken(response.data.token);
    }

    return response;
  },
};

