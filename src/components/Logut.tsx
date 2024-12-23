import { LogOut } from 'lucide-react';
import {useNavigate } from 'react-router-dom';


export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Clear all local storage
    navigate('/'); // Redirect to the login form
  };

  return (

    <button
        className='flex items-center text-gray-700 hover:text-red-600 transition-colors'
        onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        <span>Logout</span>
    </button> // Or a Link, styled as needed
  );
}