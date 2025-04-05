
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/authStore';
import { Button } from './ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Clears Zustand state & localStorage
    navigate('/'); // ✅ Redirect to login/homepage
  };

  return (
    <Button 
      onClick={handleLogout} 
      variant={'destructive'}
    >
      <LogOut className="w-4 h-4" />
      <span className="text-sm font-medium">Logout</span>
    </Button>
  );
};

export default LogoutButton;
