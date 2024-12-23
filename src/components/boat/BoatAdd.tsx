import BoatForm from "./BoatForm";
import Boat from "../../types/Boat";
import { addBoatDb } from "../../services/dataBoats";
import useStore from "../../store/useStore";


export default function BoatAdd(){    

    const {token} = useStore();
       
    const addBoat = async(boat: Boat) => {
        try {
          await addBoatDb(token,boat);
        } catch (error) {
          // manejo de errores, rollback, etc.
          console.error("Error agregar el bote: ",error)
          alert("No se pudo agregar el bote. Por favor, intentalo de nuevo")
        }
      };

    return (
        <BoatForm onSubmit={addBoat} />    
    )
}