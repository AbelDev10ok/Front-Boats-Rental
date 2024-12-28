import { LogOut } from 'lucide-react';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
  const { clearUser } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    navigate('/');
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
    >
      <LogOut className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Cerrar sesión</span>
    </button>
  );
}

