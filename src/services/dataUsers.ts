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

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.data || (`HTTP error ${response.status}`));
        }
    
        const users: UserType[] = responseData.data;
        return users;
    }catch(error){
        console.error("Error en deleteMarin:", error);
        throw new Error("Error: "+error);
    }
} 

async function fecthupdateEnabledStatus(email:string,token:string,enabled:boolean){
    
    const queryParams = new URLSearchParams({
        enabled:enabled.toString()
      })

    try {
        const response = await fetch(`http://localhost:8080/api/v1/users/${email}/enabled?${queryParams} `,{
            method:'PUT',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            }

        })
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.data || (`HTTP error ${response.status}`));
        }
    } catch (error) {
        console.error("Error en change status user:", error);
        throw new Error("Error: "+error);
    }
}
export {fetchAllUsers,fecthupdateEnabledStatus}