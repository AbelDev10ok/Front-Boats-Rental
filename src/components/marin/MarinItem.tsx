import Marin from "../../types/Marin";
import MarinForm from "./MarinForm";

interface MarinItemProps {
    marin: Marin;
    onDelete: (id: number) => void;
    onUpdate: (id: number, boat: Marin) => void;
    onEdit: (id: number) => void;
    isEditing: boolean;
}


export default function MarinItem({marin,onDelete,onUpdate,onEdit,isEditing}: MarinItemProps){
    return (
        <div className="h-min bg-white shadow-md rounded-lg overflow-hidden">
        {isEditing?
            (
                <MarinForm
                initialMarin={marin}
                onSubmit={(updatedMarin) => onUpdate(marin.id, updatedMarin)}
                />
            ):
            (
                <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{marin.name}</h2>
                <p className="text-gray-600 mb-1">Matrícula: {marin.lastname}</p>
                <p className="text-gray-600 mb-1">Tipo: {marin.dni}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => onEdit(marin.id)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(marin.id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
        }
        </div>
    )
}
