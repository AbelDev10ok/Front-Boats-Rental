import RentalResponse from "../types/RentalResponse";

async function fetchAllRentals(token: string){
    try {
        const response = await fetch('http://localhost:8080/api/v1/rentals', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const responseData = await response.json();
        if(!response.ok){
            throw new Error( responseData.data || 'Register failed');
          }

        const rentals :RentalResponse[]= responseData.data;
        return rentals;
        }catch (error) {
            throw new Error("Error: "+ error); 
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

        const responseData = await response.json();
        if(!response.ok){
            throw new Error( responseData.data || 'Register failed');
          }

    } catch (error) {
        console.error("Error updating rental:", error);
    }
}

async function fetchCreateRental(token: string, rental: RentalResponse) {
    const renta = {
        dateInit: rental.dateInit ? new Date(rental.dateInit).toISOString().split('T')[0] : null,
        dateEnd: rental.dateEnd ? new Date(rental.dateEnd).toISOString().split('T')[0] : null,
    };

    try {
        const response = await fetch(`http://localhost:8080/api/v1/rentals/client/boatsId/${rental.tuitionBoat}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(renta),
        });

        const responseData = await response.json();
        if(!response.ok){
            throw new Error( responseData.data || 'Register failed');
          }

    } catch (error) {
        console.error("Error creating rental:", error);
        alert("Error creating rental: "+ error);
    }
}

async function fetchRentalById(token: string) {
    try {
        const response = await fetch('http://localhost:8080/api/v1/rentals/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            });

            const responseData = await response.json();
            if(!response.ok){
                throw new Error( responseData.data || 'Register failed');
              }
            const rentals :RentalResponse[]= responseData.data;
            return rentals;
    
    
        }catch (error) {
            console.error("Error fetching rental by ID:", error);
            throw error;
        }

}

async function fetchCancelRental(id: number, token: string) {
    try {
        const response = await fetch(`http://localhost:8080/api/v1/rentals/cancel/rental/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const responseData = await response.json();
        if(!response.ok){
            throw new Error( responseData.data || 'Register failed');
          }

    }catch (error) {
        console.error("Error fetching cancel rental:", error);
        throw error;
        
    }
}

// /cancel/rental/{id}
export {fetchAllRentals,fetchUpdateRental,fetchCancelRental,fetchCreateRental,fetchRentalById};