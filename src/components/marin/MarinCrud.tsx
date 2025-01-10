import { useEffect, useState } from "react"
import Marin from "../../types/Marin";
import useStore from "../../store/useStore";
import {fetchAllMarins} from "../../services/dataMarins"
import MarinList from "./MarinList";
import useMarinCrud  from "../../hooks/useMarinCrud";
import Snipper from "../Snipper";


export default function MarinCrud(){
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<string | null>(null);

    const {updateMarin,marins,setMarins,editingId,startEditing} = useMarinCrud();
    
    const {token} = useStore();

    useEffect(() => {
        const getMarins = async()=>{
            setLoading(true);
            try {
                const data:Marin[] = await fetchAllMarins(token);
                setMarins(data);            
            } catch (error) {
                console.error("Error al obtener los marins: ",error)
                alert("No se pudo obtener los marins. Por favor, intentalo de nuevo")
                setError("Error al cargar los datos");            
            }finally{
                setLoading(false)
            }
        }
    
        getMarins();
      }, [token ]);
    
    return (
        <section className="flex flex-col items-center  container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Marins</h1>
            {
            loading?
                <Snipper/>
            :error?
                <div>
                <p>{error}</p>
               </div>
            :marins && marins.length === 0?
                <p>No hay mareins disponibles</p>
            :
                <MarinList
                marins={marins}
                // onDelete={deleteMarin}
                onUpdate={updateMarin}
                onEdit={startEditing}
                editingId={editingId}
                />
            }
        </section>
    )
}