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
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.data || (`HTTP error ${response.status}`));
        }
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

        const responseData = await response.json();

        if (!response.ok) {
          console.log("Error en deleteMarin:", responseData.data);
          throw new Error(responseData.data || (`HTTP error ${response.status}`));
        }

    }catch(error){
        throw new Error("Error: "+error);

    }
    
}

async function fetchAddMarin(token: string, marin: Marin){
    try {
      const response = await fetch('http://localhost:8080/api/v1/marins/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(marin),
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        const errorMessage = responseData.data || `HTTP error ${response.status}`;
        console.error("Error en addMarin:", errorMessage);
        throw new Error(errorMessage);
      }
  
      return responseData.data;
    }  catch (error) {
      console.error(" " + error);}
  }
async function fetchUpdateMarin(token:string,id:number,marin:Marin){
    try{

        const response = await fetch(`http://localhost:8080/api/v1/marins/${id}`,{
            method: 'PUT',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(marin)
        })
    
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.data || (`HTTP error ${response.status}`));
        }
    
    }catch(error){
        console.error("Error en updateMarin:", error);
        throw new Error("Error: "+error);
    }
}

export {fetchAllMarins,fetchDeleteMarin,fetchAddMarin,fetchUpdateMarin};