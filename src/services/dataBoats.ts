import Boat from '../types/Boat';

interface ApiResponse {
  data: Boat[] | Boat | null; // Permite data como array, objeto o null
  message: string;
}

async function getBoats(token:string): Promise<Boat[]> {  // Allow null token for error handling
    try {

      const response = await fetch('http://localhost:8080/api/v1/boats', {
        method: 'GET',
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
  
        const responseData: ApiResponse = await response.json();
        return responseData.data as Boat[];
  
    } catch (error) {
        console.error("Error en getBoats:", error);
        throw error; // Re-throw for the calling component to handle
    }
  }

async function deletBoat (tuition:number, token:string){

    try {
      const response = await fetch(`http://localhost:8080/api/v1/boats/${tuition}`, {
        method: 'DELETE',
        headers: {
            'Authorization':`Bearer ${token}`,
        },
        
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Obtén el mensaje, sea cual sea el status

        if (response.status === 401) {
            throw new Error('Unauthorized');
        } else if (response.status === 404) {
            throw new Error('Resource not found');
        } else {
          // Aquí manejas el error del trigger u otros errores del servidor
          // El mensaje está en 'errorText'
          throw new Error(errorText); // Lanza un error con el mensaje del servidor
        }
      }

    } catch (error) {
        console.error("Error en deletBoat:", error);
        throw error; // Re-throw para manejo en el componente
    }
  }
  
async function updateBoat(token:string,tuition:number,boat:Boat){
  try {
    const response = await fetch(`http://localhost:8080/api/v1/boats/${tuition}`, {
      method: 'PUT', // Or PATCH if you're doing partial updates
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json', // Important for sending JSON data
      },
      body: JSON.stringify(boat),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

    const updatedBoatData = await response.json();  // Assuming the backend returns the updated boat data
    // Optionally, merge relevant updatedBoatData properties back into the existing boat object before returning. 

    return updatedBoatData as Boat;

  } catch (error) {
    console.error("Error updating boat:", error);
    throw error;
  }
  
}

async function addBoatDb(token:string, boat: Boat) {
  try{
    const response = await fetch('http://localhost:8080/api/v1/boats/save', {
      method: 'POST',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(boat),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error ${response.status}: ${errorText}`);
    }

  }catch(error){
    console.error("Error en addBoat:", error);
    throw error;
  }

}

export {getBoats, deletBoat,updateBoat,addBoatDb};