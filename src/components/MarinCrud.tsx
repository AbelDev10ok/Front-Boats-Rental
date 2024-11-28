import { useState } from "react"
import Marin from "../types/Marin";
import useStore from "../store/useStore";
import {fetchAllMarins} from "../apis/dataMarins"
import MarinForm from "./MarinForm";
import MarinList from "./MarinList";


export default function MarinCrud(){
    const [marins, setMarins] = useState<Marin[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null);
    const {token} = useStore();

    const startEditing = (id: number) => {
        setEditingId(id);
      };

    const addMarin = (marin: Marin)=>{
        setMarins([...marins, { ...marin}]);
    }

    const deleteMarin = (id: number) => {
        setMarins(marins.filter(boat => boat.id !== id));
    };

    const updateMarin = (id: number, updatedMarin: Marin) => {
        const index = marins.findIndex(boat => boat.id === id);
        if (index !== -1) {
          const updatedMarins = [...marins];
          updatedMarins[index] = { ...updatedMarins[index], ...updatedMarin };
          setMarins(updatedMarins);
          setEditingId(null);
        }
    }

    const getMarins = async()=>{
        try {
            const data:Marin[] = await fetchAllMarins(token);
            setMarins(data);            
        } catch (error) {
            console.error("Error al obtener los marins: ",error)
            alert("No se pudo obtener los marins. Por favor, intentalo de nuevo")
        }
    }
    
    return (
        <section className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Gestión de Marins</h1>

            <button onClick={() => getMarins()}>
                Obtener todos los marins
            </button>
            <MarinForm onSubmit={addMarin}/>
            <button 
                onClick={getMarins}
                className="mt-4 w-full mb-6 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
                Obtener Todos los Marins
            </button>
            {marins?
                <MarinList
                marins={marins}
                onDelete={deleteMarin}
                onUpdate={updateMarin}
                onEdit={startEditing}
                editingId={editingId}
                />
                :
                <span>
                ... loading
                </span>
            }
        </section>
    )
}