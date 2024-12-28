import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import RentalList from './RentalList';
import { fetchAllRentals} from '../../services/dataRentals';
import { useRentalCrud } from '../../hooks/useRentalCrud';
import Snipper from '../Snipper';

export default function RentalCrud() {
  const {updatedRental,startEditing,rentals,setRentals,filter,setFilter,editingId} = useRentalCrud();
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);
  const {token} = useStore();

  const changeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as 'all' | 'FINALIZADA' | 'PENDIENTE' | 'CANCELADO' | 'CONFIRMADO');
  };

  useEffect(() => {
    const getRentals = async()=>{
      setLoading(true);
      try {
        const dataRentals = await fetchAllRentals(token);
        setRentals(dataRentals || []);
      } catch (error) {
              // manejo de errores, rollback, etc.
              console.error("Error al obtener los botes: ",error)
              alert(error)
              setError("Error al cargar los datos");
      } finally {
        setLoading(false)
      }
    }
    getRentals();
  }, [token]);


  return (
    <div className="flex flex-col items-center justify-center container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestion de Rentas</h1>
      <div className="mb-4 flex justify-center">
        <label className="inline-flex flex-col items-center">
          <span className="mb-2 text-sm font-medium text-gray-700">Filtrar por estado del usuario:</span>
          <select 
          value={filter} 
          onChange={changeFilter}
          className="block w-full px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
          >
          <option value="all">Todas</option>
          <option value="FINALIZADA">Finalizada</option>
          <option value="CONFIRMADO">Confirmada</option>
          <option value="CANCELADO">Cancelado</option>
          <option value="PENDIENTE">Pendiente</option>
          </select>
        </label>
      </div>
      {
          loading?
            <Snipper/>
          :error?
          <p>{error}</p>
          : rentals && rentals.length === 0?
          <p>No hay rentas disponibles</p>
          :
          <RentalList
            rentals={rentals}
            onUpdate={updatedRental}
            onEdit={startEditing}
            editingId={editingId}
            filter={filter}
          />
      }
    </div>
  );
}

