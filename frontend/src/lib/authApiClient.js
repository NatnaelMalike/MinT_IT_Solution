import axios from 'axios';
import useAuthStore from '../store/authStore';

const authApiClient = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
});

let isRefreshing = false;
let refreshPromise = null;

// Add access token to all requests
authApiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle 401s with refresh logic
authApiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      useAuthStore.getState().accessToken
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = axios
          .post('http://localhost:4000/auth/refresh-token', {}, { withCredentials: true })
          .then(({ data }) => {
            useAuthStore.getState().setAuth(data.user, data.accessToken);
            return data.accessToken;
          })
          .catch((refreshError) => {
            useAuthStore.getState().logout();
            throw refreshError;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }
      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApiClient(originalRequest);
      } catch (refreshError) {
        const refreshErrorMessage =
          refreshError.response?.data?.message || 'Session expired';
        return Promise.reject(new Error(refreshErrorMessage));
      }
    }

    const errorMessage =
      error.response?.data?.message || 'An unexpected error occurred';
    return Promise.reject(new Error(errorMessage));
  }
);

export default authApiClient;