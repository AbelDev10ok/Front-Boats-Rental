import { useEffect, useState } from "react";
import RentalCalendar from "./RentalCalendar";
import RentalResponse from "../types/RentalResponse";
import Boat from "../types/Boat";
import { getBoatsAvaiable } from "../services/dataBoats";
import useStore from "../store/useStore";
import {Ship } from 'lucide-react';

export default function RentalPage() {
    const {token} = useStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [boats, setBoats] = useState<Boat[]>([]);

    const [rental, setRental] = useState<RentalResponse>({
        id: 0,
        tuitionBoat: 0,
        username: '',
        state: '',
        total: 0,
        dateInit: null,
        dateEnd: null,
    });
      
    const handleBoatClick = (boat: Boat) => {
        setRental({
          ...rental,
          tuitionBoat: boat.tuition,
          username: boat.name,
        });
    };
    
    useEffect(() => {
        if (!rental.dateInit || !rental.dateEnd) return;
        setLoading(true);
        setError(null);
        getBoatsAvaiable(token, rental.dateInit, rental.dateEnd)
        .then((data) => {
          setBoats(data);
        })
        .catch((error) => {
          setError(error.message);
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [rental.dateInit, rental.dateEnd, token]);

    const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
        setRental(prevRental => ({
            ...prevRental,
            dateInit: startDate,
            dateEnd: endDate
        }));
    }

    return (
        <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8 text-blue-800">Reserva tu Bote de Ensueño</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendario */}
                    <div className="lg:col-span-1 order-1">
                        <RentalCalendar onDateChange={handleDateChange} handleBoatClick={handleBoatClick} />
                    </div>

                    {/* Resumen de Reserva */}
                    <div className="lg:col-span-1 order-3 lg:order-2">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
                                <Ship className="mr-2" /> Resumen de tu Aventura
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Fecha de inicio:</span>
                                    <span className="font-medium">{rental.dateInit ? rental.dateInit.toLocaleDateString() : 'No seleccionada'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Fecha de fin:</span>
                                    <span className="font-medium">{rental.dateEnd ? rental.dateEnd.toLocaleDateString() : 'No seleccionada'}</span>
                                </div>
                                <div className="flex justify-between items-center border-b pb-2">
                                    <span className="text-gray-600">Bote seleccionado:</span>
                                    <span className="font-medium">{rental.username || 'Ninguno'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Matrícula del bote:</span>
                                    <span className="font-medium">{rental.tuitionBoat || 'N/A'}</span>
                                </div>
                            </div>

                            <button 
                                className="mt-6 w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                disabled={!rental.dateInit || !rental.dateEnd || !rental.tuitionBoat}
                            >
                                Confirmar Reserva
                            </button>
                        </div>
                    </div>
                    
                    {/* Lista de Botes */}
                    <div className="lg:col-span-1 order-2 lg:order-3">
                        <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center justify-center">
                                <Ship className="mr-2" /> Botes Disponibles
                            </h3>
                            {loading && (
                                <div className="flex justify-center items-center h-32">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            )}
                            {error && <p className="text-red-500 text-center">{error}</p>}
                            {!loading && !error && boats && boats.length === 0 && (
                                <p className="text-gray-600 text-center">No hay botes disponibles para las fechas seleccionadas.</p>
                            )}
                            <ul className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                                {!loading && !error && boats && boats.map((boat) => (
                                    <li 
                                        key={boat.tuition}
                                        className={`p-4 border rounded-md cursor-pointer transition-all duration-200 ${
                                            rental.tuitionBoat === boat.tuition 
                                            ? 'bg-blue-100 border-blue-300 shadow-md' 
                                            : 'hover:bg-gray-50 hover:shadow-md'
                                        }`}
                                        onClick={() => handleBoatClick(boat)}
                                    >
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                            <div>
                                                <h4 className="font-semibold text-lg text-blue-800">{boat.name}</h4>
                                                <p className="text-gray-600">Tipo: {boat.type}</p>
                                            </div>
                                            <div className="text-left sm:text-right mt-2 sm:mt-0">
                                                <p className="font-bold text-green-600">${boat.priceHours}/hora</p>
                                                <p className="text-sm text-gray-500">Capacidad: {boat.ability} personas</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-800 text-white py-4 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; 2023 NauticRent. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

