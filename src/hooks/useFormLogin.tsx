import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login,register} from '../services/login'; // Assuming this path is correct
import { jwtDecode } from 'jwt-decode';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';


interface AuthResponse {
    token: string;
    sub: string;
    authorities: string[];
    id: string;
  }
  

export function useLoginForm() {
    const { updateUser, clearUser } = useStore();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleLogin = async () => {
      setIsLoading(true);
      setError('');
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      localStorage.removeItem('email');
      localStorage.removeItem('roles');
      clearUser();
      try {
        const response = await login(formData.email, formData.password);
        const decodedToken: AuthResponse = jwtDecode(response.token);
        
        localStorage.setItem('roles', JSON.stringify(decodedToken.authorities));
        localStorage.setItem('email', JSON.stringify(decodedToken.sub));
        localStorage.setItem('token', JSON.stringify(response.token).replace(/^"(.*)"$/, '$1'));
  
        await updateUser();
            
        if (decodedToken.authorities.includes('ROLE_ADMIN')) {
          navigate('/dashboard/admin');
        } else {
          navigate('/dashboard/user');
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        } else if (err && typeof err === 'object' && 'message' in err) {
          setError(err.message as string);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleRegister = async () => {
      setIsLoading(true);
      setError('');
      try {
        await register(formData.email, formData.password);
        toast.success('Registro exitoso. Por favor, inicia sesión.');
        setIsLogin(true);
        setFormData({ email: '', password: '' });
      } catch (error) {
        setError("Error: "+ error);
      } finally {
        setIsLoading(false);
      }
    };
  
    return { formData, handleInputChange, error, isLoading, isLogin, setIsLogin, handleLogin, handleRegister };
  }
  
  