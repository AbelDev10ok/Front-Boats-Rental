import Boat from '../types/Boat';


async function getBoats(token:string): Promise<Boat[]> {  // Allow null token for error handling
    try {

      const response = await fetch('http://localhost:8080/api/v1/boats', {
        method: 'GET',
        headers: {
            'Authorization':`Bearer ${token}`,
        },
        
      });
  
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.data || (`HTTP error ${response.status}`));
      }
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
  
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.data || (`HTTP error ${response.status}`));
      }
  

    } catch (error) {
        console.error("Error en deletBoat:", error);
        throw new Error("Error: "+error);
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

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.data || (`HTTP error ${response.status}`));
    }

    return responseData.data as Boat;

  } catch (error) {
    throw new Error("Error: "+error);
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

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.data || (`HTTP error ${response.status}`));
    }

  }catch(error){
    throw new Error("Error: "+error);
  }

}
async function getBoatsAvaiable(token:string, dateInit: Date | null, dateEnd:Date | null): Promise<Boat[]> {
  try{
    const queryParams = new URLSearchParams({
      dateInit: dateInit ? dateInit.toISOString() : '',
      dateEnd: dateEnd ? dateEnd.toISOString() : ''
    }).toString();

    const response = await fetch(`http://localhost:8080/api/v1/boats/available?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization':`Bearer ${token}`,
        'Content-Type': 'application/json', //This is not needed for GET requests
      },
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.data || (`HTTP error ${response.status}`));
    }
    return responseData.data as Boat[];

  }catch(error){
    throw new Error("Error: "+error);
  }
}
export {getBoats, deletBoat,updateBoat,addBoatDb, getBoatsAvaiable};
