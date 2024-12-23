import Marin from "../types/Marin";

async function fetchAllMarins(token:string):Promise<Marin[]>{
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

async function fetchDeleteMarin(id:number,token:string){
       token = token.replace(/^"(.*)"$/, '$1');
       try {
        const response = await fetch(`http://localhost:8080/api/v1/marins/${id}`, {
          method: 'DELETE',
          headers: {
              'Authorization':`Bearer ${token}`,
          },
          
        });

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

    }catch(error){
        console.error("Error en deleteMarin:", error);
        throw error;
    }
    
}

async function fetchAddMarin(token:string,marin:Marin):Promise<Marin>{
    try {
        const response = await fetch('http://localhost:8080/api/v1/marins/save', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(marin),
        });

        if (!response.ok) {
            // This is the crucial part: parse the error response from the server
            const errorData = await response.json();  // Assuming your server sends JSON errors

            // Construct a more informative error message, including the status code and error data
            const errorMessage = `HTTP error ${response.status}: ${JSON.stringify(errorData)}`;
            throw new Error(errorMessage); // Throw a new error with server info

        } else {
            const responseData = await response.json();
            const newMarin: Marin = responseData.data;
            return newMarin;
        }

    } catch (error) { // Add type for error
        console.error("Error en addMarin:", error);

        // Now, 'error.message' will contain the JSON string with details
        throw error; // Re-throw error. Frontend must parse the message
    }
}

async function fetchUpdateMarin(token:string,id:number,marin:Marin){
    try{
        console.log(id);
        console.log(marin)
        const response = await fetch(`http://localhost:8080/api/v1/marins/${id}`,{
            method: 'PUT',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marin)
        })
    
        if (!response.ok) {
            if(response.status === 401){
                throw new Error('Unauthorized');
            }
            if(response.status === 404){
                throw new Error('Resource not found');
            }
        }
    
    }catch(error){
        console.error("Error en updateMarin:", error);
        throw error;
    }
}

export {fetchAllMarins,fetchDeleteMarin,fetchAddMarin,fetchUpdateMarin};