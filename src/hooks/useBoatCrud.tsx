import { useState } from "react";
import Boat from "../types/Boat";
import { deletBoat, updateBoat } from "../services/dataBoats";
import useStore from "../store/useStore";

export function useBoatCrud(){
    const [boats, setBoats] = useState<Boat[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);

  const {token} = useStore();


    const deleteBoat = async (tuition: number) => {
        // filter no muta el array original es una copia supérficial (shallow)
        // const tuitionNumber = Number(tuition);
        const prevBoats = [...boats];
        // console.log(tuition)
        //optimista 
        setBoats(boats.filter(boat => boat.tuition !== tuition));
        try {
           await deletBoat(tuition, token);
        } catch (error) {
            // manejo de errores, rollback, etc.
            console.error("Error eliminando el bote: ",error)
            setBoats(prevBoats);
            alert(error)
        }
      };
    
      const updated = async(tuition: number, updatedBoat: Boat) => {
        // guardo estado actual en caso de revertir
        const prevBoats = [...boats]
    
        // actualizo de manera optimista
        const index = boats.findIndex(boat => boat.tuition === tuition);
        if (index !== -1) {
          const updatedBoats = [...boats];
          updatedBoats[index] = { ...updatedBoats[index], ...updatedBoat };
          setBoats(updatedBoats);
          setEditingId(null);
        }
        try {
          // actualizo en base de datos
           await updateBoat(token,tuition, updatedBoat);
        } catch (error) {
          // manejo de errores, rollback, etc.
          console.error("Error actualizando el bote: ",error)
          setBoats(prevBoats);
          alert("No se pudo actualizar el bote. Por favor, intentalo de nuevo")
        }
    
      };

      const startEditing = (tuition: number) => {
        setEditingId(tuition);
      };

    
    return {boats,deleteBoat,updated,editingId,startEditing,setBoats}
}