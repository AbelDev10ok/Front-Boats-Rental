import { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import BoatList from './BoatList';
import { useBoatCrud } from '../../hooks/useBoatCrud';
import Boat from '../../types/Boat';
import { getBoats } from '../../services/dataBoats';
import Snipper from '../Snipper';

export default function BoatCRUD() {
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null);

  const {boats,deleteBoat,updated,editingId,startEditing,setBoats} = useBoatCrud();
  const {token} = useStore();

  useEffect(() => {
    
    const fetchAllBoats = async()=>{
      try {
        setLoading(true);
        const dataBoats:Boat[] = await getBoats(token);
        setBoats(dataBoats);
      } catch (error) {
              // manejo de errores, rollback, etc.
              console.error("Error al obtener los botes: ",error)
              alert("No se pudo obtener los botes. Por favor, intentalo de nuevo")
              setError("Error al cargar los datos");
      }finally{
        setLoading(false)
      }
    }
    fetchAllBoats();
  }, [token]);
  
  return (
    <div className="flex flex-col items-center  container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Embarcaciónes</h1>
      {
        loading?
          <Snipper/>
        :error?
          <div>
            <p>{error}</p>
          </div>
        :boats && boats.length === 0?
          <p>No hay botes disponibles</p>
        : <BoatList
          boats={boats}
          onDelete={deleteBoat}
          onUpdate={updated}
          onEdit={startEditing}
          editingId={editingId}
          />
      }
    </div>
  );
}

