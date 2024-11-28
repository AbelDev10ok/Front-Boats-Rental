import { useState } from 'react';
import useStore from '../store/useStore';
import BoatForm from './BoatForm';
import BoatList from './BoatList';
import {getBoats,deletBoat,updateBoat,addBoatDb} from '../apis/dataBoats'
import Boat from '../types/Boat';

export default function BoatCRUD() {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const {token} = useStore();

  const addBoat = async(boat: Boat) => {
    const prevBoats =[...boats]
    // optimista
    setBoats([...boats, { ...boat}]);
    try {
      await addBoatDb(token,boat);
    } catch (error) {
      // manejo de errores, rollback, etc.
      console.error("Error agregar el bote: ",error)
      setBoats(prevBoats);
      alert("No se pudo agregar el bote. Por favor, intentalo de nuevo")
    }
  };

  const deleteBoat = async (id: number) => {
    // filter no muta el array original es una copia supérficial (shallow)
    // const tuitionNumber = Number(tuition);
    const prevBoats = [...boats];
    // console.log(tuition)
    //optimista 
    setBoats(boats.filter(boat => boat.id !== id));
    try {
       await deletBoat(id, token);
    } catch (error) {
        // manejo de errores, rollback, etc.
        console.error("Error eliminando el bote: ",error)
        setBoats(prevBoats);
        alert("No se pudo eliminar el bote. Por favor, intentalo de nuevo")
    }
  };

  const updated = async(id: number, updatedBoat: Boat) => {
    // guardo estado actual en caso de revertir
    const prevBoats = [...boats]

    // actualizo de manera optimista
    const index = boats.findIndex(boat => boat.id === id);
    if (index !== -1) {
      const updatedBoats = [...boats];
      updatedBoats[index] = { ...updatedBoats[index], ...updatedBoat };
      setBoats(updatedBoats);
      setEditingId(null);
    }
    try {
      // actualizo en base de datos
       await updateBoat(token,id, updatedBoat);
    } catch (error) {
      // manejo de errores, rollback, etc.
      console.error("Error actualizando el bote: ",error)
      setBoats(prevBoats);
      alert("No se pudo actualizar el bote. Por favor, intentalo de nuevo")
    }

  };

  const fetchAllBoats = async()=>{
    try {
      const dataBoats:Boat[] = await getBoats(token);
      setBoats(dataBoats);
    } catch (error) {
            // manejo de errores, rollback, etc.
            console.error("Error al obtener los botes: ",error)
            alert("No se pudo obtener los botes. Por favor, intentalo de nuevo")
    }
  }
  
  const startEditing = (id: number) => {
    setEditingId(id);
  };


  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Botes</h1>
      {/* voy a reutilizar este mismo componente de formulario para luego editar dentro del componente BoatList */}
      <BoatForm onSubmit={addBoat} />
      <button 
        onClick={fetchAllBoats}
        className="mt-4 w-full mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Obtener Todos los Botes
      </button>
      {boats?
        <BoatList
          boats={boats}
          onDelete={deleteBoat}
          onUpdate={updated}
          onEdit={startEditing}
          editingId={editingId}
        />
        :
        <span>
          ... loading
        </span>
      }
    </div>
  );
}

