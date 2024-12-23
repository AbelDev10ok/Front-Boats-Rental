import UserType from "../types/UserType";

async function fetchAllUsers(token:string){
    try {
        const response = await fetch('http://localhost:8080/api/v1/users',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}` ,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            // Handle the error appropriately based on the status code
            if (response.status === 401) {
                // Access token invalid or expired – redirect to login, refresh the token, etc.
                throw new Error('Unauthorized');
      
            } else if (response.status === 404) {
                throw new Error('Resource not found'); // Example - Customize as needed
      
            } else {
              const errorText = await response.text();  // Get the error as text, not JSON
              throw new Error(`HTTP error ${response.status}: ${errorText}`); // Include error message from server
            }
        }
        const responseData = await response.json();
        const users: UserType[] = responseData.data;

        console.log(users);
        return users;
    }catch(error){
        console.error("Error en deleteMarin:", error);
        throw error;
    }
} 

async function fecthupdateEnabledStatus(email:string,token:string,enabled:boolean){

    try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${email}/enabled?enabled=${enabled}`,{
            method:'PUT',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            // Handle the error appropriately based on the status code
            if (response.status === 401) {
                // Access token invalid or expired – redirect to login, refresh the token, etc.
                throw new Error('Unauthorized');
      
            } else if (response.status === 404) {
                throw new Error('Resource not found'); // Example - Customize as needed
      
            } else {
              const errorText = await response.text();  // Get the error as text, not JSON
              throw new Error(`HTTP error ${response.status}: ${errorText}`); // Include error message from server
            }
        }
        return true
    } catch (error) {
        console.error("Error en change status user:", error);
        throw error;
        return false;
    }
}
export {fetchAllUsers,fecthupdateEnabledStatus}