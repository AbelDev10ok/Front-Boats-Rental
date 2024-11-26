
import LoginResponse from '../types/LoginResponse'; // Import the LoginResponse type

export async function login(email:string, password:string): Promise<LoginResponse> {
      const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error( (await response.json()).message || 'Login failed');

      const data: {data: LoginResponse} = await response.json();
      return data.data; // Return the login response data directly


}