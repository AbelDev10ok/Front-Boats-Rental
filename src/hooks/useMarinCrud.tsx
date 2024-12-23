import { useState } from "react";
import { fetchDeleteMarin, fetchUpdateMarin } from "../services/dataMarins";
import useStore from "../store/useStore";
import Marin from "../types/Marin";

export function useMarinCrud(){
    const [marins, setMarins] = useState<Marin[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const {token} = useStore();

    const startEditing = (id: number) => {
        setEditingId(id);
      };



    const deleteMarin = async(id: number) => {
        const prevMarins = [...marins];
        // optimista
        // filter no muta el array original es una copia supérficial (shallow)
        setMarins(marins.filter(marin => marin.id !== id));
        try {
            await fetchDeleteMarin(id, token);
        } catch (error) {
            console.error("Error al obtener los marins: ",error)
            alert("No se pudo obtener los marins. Por favor, intentalo de nuevo")
            setMarins(prevMarins);
        }
    };

    const updateMarin = async(id: number, updatedMarin: Marin) => {
        const prevMarins = [...marins];
        // actualizo de manera optimista
        const index = marins.findIndex(boat => boat.id === id);
        if (index !== -1) {
          const updatedMarins = [...marins];
          updatedMarins[index] = { ...updatedMarins[index], ...updatedMarin };
          setMarins(updatedMarins);
          setEditingId(null);
        }
        try{
            await fetchUpdateMarin(token,id, updatedMarin);
        }catch (error) {
            console.error("Error al actualizar el marin: ",error)
            alert("No se pudo actualizar marin. Por favor, intentalo de nuevo")
            setMarins(prevMarins);
        }
    }



    return {marins,setMarins,deleteMarin,updateMarin,editingId,startEditing}
}