import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login} from '../services/login'; // Assuming this path is correct
import LoginResponse from '../types/LoginResponse';
import UseLoginFormReturn from '../types/UseLoginResponse';
import { jwtDecode } from 'jwt-decode';
import useStore from '../store/useStore';

interface AuthResponse{
    token: string;
    sub: string;
    authorities: string[];
    id: string;
}



export function useLoginForm():UseLoginFormReturn {
    const {updateUser,clearUser} = useStore();
    const redirect = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('email');
        localStorage.removeItem('roles');
        clearUser();
        try {
            const response: LoginResponse = await login(email, password);
            const decodedToken: AuthResponse = jwtDecode(response.token);
            
            localStorage.setItem('roles',JSON.stringify(decodedToken.authorities))
            localStorage.setItem('email',JSON.stringify(decodedToken.sub))
            localStorage.setItem('token',JSON.stringify(response.token).replace(/^"(.*)"$/, '$1'))

            await updateUser();
                
            if(decodedToken.authorities.includes('ROLE_ADMIN')){
                return redirect('/dashboard/admin');
            }else{
                return redirect('/dashboard/user');
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
            }
    };

    return { email, setEmail, password, setPassword, error, handleSubmit };
}
