import BoatForm from './BoatForm';

interface Boat {
  id: number;
  tuition: number;
  type: string;
  ability: number;
  name: string;
  model: string;
  state: string;
  priceHours: string;
}

interface BoatItemProps {
  boat: Boat;
  onDelete: (id: number) => void;
  onUpdate: (id: number, boat: Boat) => void;
  onEdit: (id: number) => void;
  isEditing: boolean;
}

export default function BoatItem({ boat, onDelete, onUpdate, onEdit, isEditing }: BoatItemProps) {
  return (
    <div className="h-min bg-white shadow-md rounded-lg overflow-hidden">
      {isEditing ? (
        <BoatForm
          initialBoat={boat}
          onSubmit={(updatedBoat) => onUpdate(boat.id, updatedBoat)}
        />
      ) : (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{boat.name}</h2>
          <p className="text-gray-600 mb-1">Matrícula: {boat.tuition}</p>
          <p className="text-gray-600 mb-1">Tipo: {boat.type}</p>
          <p className="text-gray-600 mb-1">Habilidad: {boat.ability}</p>
          <p className="text-gray-600 mb-1">Modelo: {boat.model}</p>
          <p className="text-gray-600 mb-1">Estado: {boat.state}</p>
          <p className="text-gray-600 mb-4">Precio/hora: ${boat.priceHours}</p>
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(boat.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(boat.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

