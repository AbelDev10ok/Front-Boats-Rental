import { useEffect, useState } from "react";
import { fetchCancelRental, fetchRentalById } from "../../services/dataRentals";
import RentalResponse from "../../types/RentalResponse";
import useStore from "../../store/useStore";

export default function RentalsUser() {
    const [rentals, setRentals] = useState<RentalResponse[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {token} = useStore();


    useEffect(() => {
        const getRentals = async () => {
          setLoading(true);
          setError(null);
          try {
            const response = await fetchRentalById(token);
            if (response) {
              setRentals(response);
            } else {
              setRentals([]);
            }
          } catch (error) {
            setError("Error fetching rentals");
            console.error("Error fetching rentals:", error);
          } finally {
            setLoading(false);
          }
        };
        getRentals();
      }, [token]);

    const handleCancelRental = async (id: number) => {
        const prevRentals = [...rentals];
        const index = rentals.findIndex((rental) => rental.id === id);
        if (index === -1) return;
        // Actualización optimista
        const updatedRentals = [...rentals];
        updatedRentals[index] = { ...updatedRentals[index], state: 'CANCELADO' };
        setRentals(updatedRentals);
        try {
            await fetchCancelRental(id, token);
        }catch (error){
            setError("" + error);
            setRentals(prevRentals); // Revertir cambios si la llamada a la API falla
        }
    }
    return (
        <section className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <main className="container mx-auto px-4 py-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-800">Mis rentas</h2>
                {loading && <p className="text-center">Cargando...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {rentals.map((rental) => (
                        <div key={rental.id}>
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col ">
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Renta de {rental.username}</h3>
                                    <p className="text-gray-600">Estado: {rental.state}</p>
                                    <p className="text-gray-600">Fecha Inicio: {rental.dateInit?.toLocaleString()}</p>
                                    <p className="text-gray-600">Fecha Fin: {rental.dateEnd?.toLocaleString()}</p>
                                    <p className="text-gray-600">Total: ${rental.total}</p>
                                </div>
                                {rental.state === 'CONFIRMADO'?
                                <div className="flex justify-between p-2">
                                    <button
                                    onClick={() => handleCancelRental(rental.id)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
                                    >
                                    Cancelar renta
                                    </button>
                                </div>
                                :null
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </section>
    )
}