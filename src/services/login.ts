
import LoginResponse from '../types/LoginResponse';

export async function login(email:string, password:string): Promise<LoginResponse> {
    try{
    const response = await fetch('http://localhost:8080/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage = responseData.data || `HTTP error ${response.status}`;
        throw new Error(errorMessage);
      }
      return responseData.data; // Return the login response data directly
    }catch(error){
        throw new Error('Login failed: ' + error);
    }
}

export async function register(email:string,password:string): Promise<LoginResponse> {
  try{

  const response = await fetch('http://localhost:8080/api/v1/auth/register',{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({email,password})
  })
  const responseData = await response.json();
    if(!response.ok){
        throw new Error( responseData.data || 'Register failed');
      }
    return responseData.data;
  }catch(error){
    throw new Error('Register failed: ' + error);
}
}
