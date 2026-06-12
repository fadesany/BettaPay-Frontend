import axios from 'axios';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

// Use cookie-based auth (HttpOnly cookie set by the server). Do not read tokens from localStorage.
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  // Send cookies for same-site or cross-site auth flows where backend sets HttpOnly cookie
  withCredentials: true,
});

// No Authorization header injection from client-side stored tokens. Server should set/validate cookie.
apiClient.interceptors.request.use((config) => config);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear client state and let UI decide navigation. Do NOT perform direct window.location navigation here.
      useAuthStore.getState().logout();
    }
    
    // Show toast for network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);
