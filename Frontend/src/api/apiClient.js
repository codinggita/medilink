import axios from 'axios';

const apiOrigin = import.meta?.env?.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
  : 'http://localhost:5000';

const baseURL = import.meta?.env?.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api`
  : 'http://localhost:5000/api';
const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Pass basic user context for mock-token dev auth
    try {
      const rawUser = localStorage.getItem('user');
      if (rawUser) {
        const u = JSON.parse(rawUser);
        if (u?.role) config.headers['x-user-role'] = u.role;
        if (u?.id) config.headers['x-user-id'] = u.id;
      }
    } catch {
      // ignore
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          error.message = data?.message || 'Bad request. Please check your input.';
          break;
        case 401:
          error.message = data?.message || 'Unauthorized. Please login again.';
          // Clear auth data on unauthorized
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          break;
        case 403:
          error.message = data?.message || 'Access denied. You do not have permission.';
          break;
        case 404:
          error.message = data?.message || 'Resource not found.';
          break;
        case 500:
          error.message = data?.message || 'Server error. Please try again later.';
          break;
        default:
          error.message = data?.message || 'An error occurred. Please try again.';
      }
    } else if (error.request) {
      // Request made but no response received
      error.message = 'Network error. Please check your connection and ensure the server is running.';
    } else {
      // Error in request setup
      error.message = error.message || 'An unexpected error occurred.';
    }
    
    return Promise.reject(error);
  }
);

export { apiOrigin };
export default apiClient;
