import { useCallback, useState } from "react";
import {fetchCancelRental, fetchUpdateRental } from "../services/dataRentals";
import useStore from "../store/useStore";
import RentalResponse from "../types/RentalResponse";

export  function useRentalCrud(){
    const [rentals, setRentals] = useState<RentalResponse[]>([]);
    const [filter, setFilter] = useState<'all' | 'FINALIZADA' | 'PENDIENTE' | 'CANCELADO' | 'CONFIRMADO'>('all');
    const [editingId, setEditingId] = useState<number | null>(null);

  const {token} = useStore();

  const cancelRental = useCallback(async(id: number) => {
    // optimista
    const prevState = [...rentals]
    setRentals(rentals.filter(rental => rental.id !== id));
    try {
      fetchCancelRental(id,token)
    } catch (error) {
        console.error("Error al obtener los botes: ",error)
        setRentals(prevState)
    }

  },[rentals,token]);

  const updatedRental =useCallback(async(id: number, updateRental: RentalResponse) => {
    const prevState = [...rentals];
    // optimista
    const index = rentals.findIndex(rental => rental.id === id);
    if (index !== -1) {
      const updateRentals = [...rentals];
      updateRentals[index] = { ...updateRentals[index], ...updateRental };
      setRentals(updateRentals);
      setEditingId(null);
    }
    try{
      fetchUpdateRental(id,token,updateRental);
    }catch(error){
      alert(error);
      setRentals(prevState);
    }

  },[rentals,token]);

  
  const startEditing = (id: number) => {
    setEditingId(id);
  };

  return {editingId,startEditing,updatedRental,cancelRental,filter,setFilter,rentals,setRentals}
}