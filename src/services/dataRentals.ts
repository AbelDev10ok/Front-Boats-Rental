import RentalResponse from "../types/RentalResponse";
interface ApiResponse {
    data: RentalResponse[] | RentalResponse | null; // Permite data como array, objeto o null
    message: string;
  }

async function fetchAllRentals(token: string){
    try {
        const response = await fetch('http://localhost:8080/api/v1/rentals', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (response.status === 403) { 
                throw new Error('Forbidden - No tienes permiso para acceder a este recurso.');
            }
            if (response.status === 404) {
                throw new Error('Resource not found');
            }
             // Manejo de otros errores
            const errorData = await response.json(); 
            throw new Error(`Error ${response.status}: ${errorData.message || 'Error en el servidor'}`);

        }

        const responseJson = await response.json();
        if (responseJson && responseJson.data) { 
            const rentals :RentalResponse[]= responseJson.data;
            return rentals;
        } else {
            throw new Error("Respuesta del servidor con formato inesperado:" + responseJson); 
        }

    } catch (error) {
        console.log(error)
        alert(error)
    }
}
async function fetchUpdateRental(id: number, token: string, rental: RentalResponse) {

    const renta = {
        dateInit: rental.dateInit,
        dateEnd: rental.dateEnd,
        state:rental.state,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/v1/rentals/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(renta),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error details:", errorData); // Loguea los detalles del error
            const errorMessage = errorData.messae || `HTTP error ${response.status}`; //  Usa el mensaje del backend si existe
            throw new Error(errorMessage);  // Lanza el error para que lo capture el catch
        }

    } catch (error) {
        console.error("Error updating rental:", error);
    }
}

async function fetchCancelRental(id: number, token: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/rentals/cancel/rental/${id}`,{
            method:'GET',
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (response.status === 403) { 
                throw new Error('Forbidden - No tienes permiso para acceder a este recurso.');
            }
            if (response.status === 404) {
                throw new Error('Resource not found');
            }
             // Manejo de otros errores
            if(response.status === 400){

                const errorData:ApiResponse = await response.json(); 
                const error = errorData.message || 'Error en el servidor';
                throw new Error(`Error ${response.status}: ${error}`);
            }

        }
    } catch (error) {
        console.log(error)
        
    }
}
export {fetchAllRentals,fetchUpdateRental,fetchCancelRental};