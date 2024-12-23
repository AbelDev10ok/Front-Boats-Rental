import BoatForm from './BoatForm';
import Boat from '../../types/Boat';
import { SailboatIcon, Anchor, Award, DollarSign } from 'lucide-react';

interface BoatItemProps {
  boat: Boat;
  onDelete: (id: number) => void;
  onUpdate: (id: number, boat: Boat) => void;
  onEdit: (id: number) => void;
  isEditing: boolean;
}

export default function BoatItem({ boat, onDelete, onUpdate, onEdit, isEditing }: BoatItemProps) {
  return (
    <>
      {isEditing ? (
        <div className="card h-full flex flex-col text-sm">
          <BoatForm
          initialBoat={boat}
          onSubmit={(updatedBoat) => onUpdate(boat.tuition, updatedBoat)}
          />
        </div>
      ) : (
        <div className='card h-min flex flex-col text-sm'>
          <div className="card-header">
            <h2 className="flex items-center text-xl font-semibold truncate">
              <SailboatIcon className="w-5 h-5 mr-2 flex-shrink-0" />
              <span className="truncate">{boat.name}</span>
            </h2>
          </div>
          <div className="card-body flex-grow">
            <p className="flex items-center text-gray-600 mb-2">
              <Anchor className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Matrícula: {boat.tuition}</span>
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              <SailboatIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Tipo: {boat.type}</span>
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              <Award className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Habilidad: {boat.ability}</span>
            </p>
            <p className="flex items-center text-gray-600 mb-2 ">
              <SailboatIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className='truncate'>
                Modelo: {boat.model}
              </span>
            </p>
            <p className="flex items-center text-gray-600 mb-2">
              <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">Precio/hora: ${boat.priceHours}</span>
            </p>
          </div>
          <div className="card-footer mt-auto flex justify-between">
            <button
              onClick={() => onEdit(boat.tuition)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
              Editar
            </button>
            <button
              onClick={() => onDelete(boat.tuition)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
              >
              Eliminar
            </button>
          </div>
        </div>
      )}
      </>
  );
}

