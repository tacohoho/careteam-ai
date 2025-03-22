import axios from 'axios';

const API_URL = 'http://localhost:8001/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }
        
        const response = await axios.post(`${API_URL}/auth/refresh-token`, {
          refresh_token: refreshToken,
        });
        
        const { access_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        
        // Retry the original request with new token
        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        authService.logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

const authService = {
  // Register a new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.access_token) {
      localStorage.setItem('accessToken', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    return response.data;
  },
  
  // Login with email and password
  login: async (email, password) => {
    // For testing purposes - test account bypass
    if (email === 'test@example.com' && password === 'password123') {
      console.log('Using test account login');
      const testUserData = {
        access_token: 'test-token-123',
        refresh_token: 'test-refresh-token-123',
        user: {
          id: 1,
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          is_admin: false
        }
      };
      
      localStorage.setItem('accessToken', testUserData.access_token);
      localStorage.setItem('refreshToken', testUserData.refresh_token);
      localStorage.setItem('user', JSON.stringify(testUserData.user));
      
      return testUserData;
    }
    
    try {
      console.log('Attempting API login with:', { email });
      const response = await api.post('/auth/login/email', {
        email,
        password
      });
      if (response.data.access_token) {
        localStorage.setItem('accessToken', response.data.access_token);
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  // Logout user and clear storage
  logout: () => {
    console.log('Logging out user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Don't attempt to call the server for test accounts
    const token = localStorage.getItem('accessToken');
    if (token !== 'test-token-123') {
      // Optional: notify the server
      api.post('/auth/logout').catch(() => {
        // Silent catch - logout from client side even if server call fails
      });
    }
  },
  
  // Get current user information
  getCurrentUser: async () => {
    // For test token, return mock data without API call
    const token = localStorage.getItem('accessToken');
    if (token === 'test-token-123') {
      console.log('Returning mock user data for test token');
      return {
        data: {
          id: 1,
          email: 'test@example.com',
          first_name: 'Test',
          last_name: 'User',
          is_admin: false
        }
      };
    }
    
    return api.get('/auth/me');
  },
  
  // Check if user is logged in
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    console.log('Checking authentication status, token exists:', !!token);
    return !!token;
  },
  
  // Get the current access token
  getToken: () => {
    return localStorage.getItem('accessToken');
  }
};

export default authService; 