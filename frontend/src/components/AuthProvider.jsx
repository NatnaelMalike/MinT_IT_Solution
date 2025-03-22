import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import authApiClient from '@/lib/authApiClient';
import decodeToken from '@/lib/jwtDecode';

const AuthProvider = ({ children }) => {
  const { setAuth, logout, accessToken } = useAuthStore();
  const navigate = useNavigate();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      const response = await authApiClient.get('/user/me');
      return response.data;
    },
    enabled: !!accessToken,
    retry: false,
    onSuccess: (data) => {
      setAuth(data.user, useAuthStore.getState().accessToken);
    },
    onError: () => {
      logout();
      navigate('/');
    },
  });

  useEffect(() => {
    if (userData) {
      const decodedToken = decodeToken(accessToken);
      const role = decodedToken?.role;
      switch (role) {
        case 'NormalUser':
          navigate('/user');
          break;
        case 'TechnicianUser':
          navigate('/technician');
          break;
        case 'HelperAdmin':
          navigate('/helper_desk/dashboard');
          break;
        case 'SuperAdmin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
          break;
      }
    }
  }, [userData, accessToken, navigate]);

  if (isLoading && accessToken) return <div>Loading...</div>;
  return children;
};

export default AuthProvider;