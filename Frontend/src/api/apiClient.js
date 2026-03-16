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

export { apiOrigin };
export default apiClient;
