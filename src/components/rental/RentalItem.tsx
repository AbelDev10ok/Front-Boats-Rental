import RentalResponse from "../../types/RentalResponse";
import RentalForm from "./RentalForm";


interface RentalItemProps {
  rental: RentalResponse;
  onUpdate: (id: number, boat: RentalResponse) => void;
  onEdit: (id: number) => void;
  isEditing: boolean;
}

export default function RentalItem({ rental, onUpdate, onEdit, isEditing }: RentalItemProps) {
  return (
    <div className="h-min bg-white shadow-md rounded-lg overflow-hidden">
      {isEditing ? (
        <RentalForm
          initialRental={rental}
          onSubmit={(updateRental) => onUpdate(rental.id, updateRental)}
        />
      ) : (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{rental.state}</h2>
          <p className="text-gray-600 mb-1">Precio Total: ${rental.total}</p>
          <p className="text-gray-600 mb-1">Fecha Inicio: {rental.dateInit}</p>
          <p className="text-gray-600 mb-1">Fecha Fin: {rental.dateEnd}</p>
          <p className="text-gray-600 mb-1">Estado de renta: {rental.state}</p>
          <p className="text-gray-600 mb-1">Tuition del Bote: {rental.tuitionBoat}</p>
          <p className="text-gray-600 mb-4">Username del Usuario: {rental.username}</p>
          <div className="flex justify-between">
            <button
              onClick={() => onEdit(rental.id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded text-sm transition duration-300 ease-in-out"
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

