import Marin from "../types/Marin";

async function fetchAllMarins(token:string){
    token = token.replace(/^"(.*)"$/, '$1');

    try {
        const response = await fetch('http://localhost:8080/api/v1/marins',{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}` ,
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
        const marins: Marin[] = responseData.data;
        return marins;
    } catch (error) {
        // manejo de errores, rollback, etc.
        console.error("Error en addBoat:", error);
        throw error;    
    }

}

export {fetchAllMarins};