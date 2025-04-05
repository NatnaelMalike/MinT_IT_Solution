import axios from 'axios';
import useAuthStore from '@/store/authStore';
import decodeToken from '@/lib/jwtDecode'; // Decodes the JWT token

// ✅ Create API Client Instance
const apiClient = axios.create({
  baseURL: 'http://localhost:4000/', // Replace with your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Add Interceptor for Request (Attach Token)
apiClient.interceptors.request.use((config) => {
  const { token, logout } = useAuthStore.getState();
  if (token) {
    const decodedToken = decodeToken(token);
  
    if (decodedToken?.exp * 1000 < Date.now()) {
      logout(); // 🔥 Token expired → Logout
      window.location.href = '/'; // Redirect to login
      return Promise.reject(new Error('Session expired'));
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default apiClient;
