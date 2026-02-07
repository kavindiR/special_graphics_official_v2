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

  // Update profile
  updateProfile: async (data: { name?: string; bio?: string; avatar?: string; location?: string; website?: string }): Promise<ApiResponse<AuthResponse['user']>> => {
    const response = await apiRequest<AuthResponse['user']>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (response.success && response.data && typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  },
};

// Contests API
export const contestsApi = {
  getAll: async (params?: { status?: string; category?: string; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    return apiRequest(`/contests?${queryParams.toString()}`);
  },
  getById: async (id: number) => apiRequest(`/contests/${id}`),
  create: async (data: any) => apiRequest('/contests', { method: 'POST', body: JSON.stringify(data) }),
  submit: async (contestId: number, data: { imageUrl: string; description?: string }) =>
    apiRequest(`/contests/${contestId}/submit`, { method: 'POST', body: JSON.stringify(data) }),
  getMySubmissions: async () => apiRequest('/contests/my/submissions'),
};

// Portfolio API
export const portfolioApi = {
  getAll: async (params?: { category?: string; search?: string; designerId?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.designerId) queryParams.append('designerId', params.designerId.toString());
    return apiRequest(`/portfolio?${queryParams.toString()}`);
  },
  getById: async (id: number) => apiRequest(`/portfolio/${id}`),
  getMyPortfolio: async () => apiRequest('/portfolio/my/portfolio'),
  create: async (data: any) => apiRequest('/portfolio', { method: 'POST', body: JSON.stringify(data) }),
  update: async (id: number, data: any) =>
    apiRequest(`/portfolio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: async (id: number) => apiRequest(`/portfolio/${id}`, { method: 'DELETE' }),
};

// Earnings API
export const earningsApi = {
  getMyEarnings: async (params?: { status?: string; type?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.type) queryParams.append('type', params.type);
    return apiRequest(`/earnings/my?${queryParams.toString()}`);
  },
  getStats: async () => apiRequest('/earnings/my/stats'),
  requestWithdrawal: async (amount: number) =>
    apiRequest('/earnings/withdraw', { method: 'POST', body: JSON.stringify({ amount }) }),
};

// Messages API
export const messagesApi = {
  getMyMessages: async (params?: { isRead?: boolean }) => {
    const queryParams = new URLSearchParams();
    if (params?.isRead !== undefined) queryParams.append('isRead', params.isRead.toString());
    return apiRequest(`/messages?${queryParams.toString()}`);
  },
  getConversation: async (otherUserId: number, contestId?: number) => {
    const queryParams = new URLSearchParams();
    queryParams.append('otherUserId', otherUserId.toString());
    if (contestId) queryParams.append('contestId', contestId.toString());
    return apiRequest(`/messages/conversation?${queryParams.toString()}`);
  },
  send: async (data: { receiverId: number; content: string; subject?: string; contestId?: number }) =>
    apiRequest('/messages', { method: 'POST', body: JSON.stringify(data) }),
  markAsRead: async (id: number) => apiRequest(`/messages/${id}/read`, { method: 'PUT' }),
  getUnreadCount: async () => apiRequest('/messages/unread/count'),
};

// Designer API
export const designerApi = {
  getAll: async (params?: { level?: string; search?: string; minRating?: number }) => {
    const queryParams = new URLSearchParams();
    if (params?.level) queryParams.append('level', params.level);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.minRating) queryParams.append('minRating', params.minRating.toString());
    return apiRequest(`/designer?${queryParams.toString()}`);
  },
  getProfile: async (id: number) => apiRequest(`/designer/${id}`),
  getMyStats: async () => apiRequest('/designer/my/stats'),
  getMyProfile: async () => apiRequest('/designer/my/profile'),
  getMyContests: async (params?: { status?: string; category?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.category) queryParams.append('category', params.category);
    return apiRequest(`/designer/my/contests?${queryParams.toString()}`);
  },
  getMyProjects: async (params?: { status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    return apiRequest(`/designer/my/projects?${queryParams.toString()}`);
  },
  updateProfile: async (data: any) =>
    apiRequest('/designer/my/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// Projects API
export const projectsApi = {
  getOpenProjects: async (params?: { category?: string; minBudget?: number; maxBudget?: number; search?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.minBudget) queryParams.append('minBudget', params.minBudget.toString());
    if (params?.maxBudget) queryParams.append('maxBudget', params.maxBudget.toString());
    if (params?.search) queryParams.append('search', params.search);
    return apiRequest(`/projects/open?${queryParams.toString()}`);
  },
  getById: async (id: number) => apiRequest(`/projects/${id}`),
  getMyProjects: async (params?: { status?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    return apiRequest(`/projects/my/projects?${queryParams.toString()}`);
  },
  acceptProject: async (id: number) => apiRequest(`/projects/${id}/accept`, { method: 'POST' }),
  updateStatus: async (id: number, status: string) =>
    apiRequest(`/projects/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

