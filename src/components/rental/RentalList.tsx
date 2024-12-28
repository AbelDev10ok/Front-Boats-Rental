import RentalResponse from '../../types/RentalResponse';
import RentalItem from './RentalItem';


interface RentalListProps {
  rentals: RentalResponse[];
  onUpdate: (id: number, boat: RentalResponse) => void;
  onEdit: (id: number) => void;
  editingId: number | null;
  filter: 'all' | 'FINALIZADA' | 'PENDIENTE' | 'CANCELADO' | 'CONFIRMADO';
}

export default function RentalList({ rentals, onUpdate, onEdit, editingId, filter }: RentalListProps) {

  const filterRentals = rentals.filter(rental => {
    if (filter === 'all') return true;
    if (filter === 'FINALIZADA') return rental.state === 'FINALIZADA';
    if (filter === 'PENDIENTE') return rental.state === 'PENDIENTE';
    if (filter === 'CANCELADO') return rental.state === 'CANCELADO';
    if (filter === 'CONFIRMADO') return rental.state === 'CONFIRMADO';
    return true;
  });

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filterRentals.map(rental => (
        <RentalItem
          key={rental.id}
          rental={rental}
          onUpdate={onUpdate}
          onEdit={onEdit}
          isEditing={editingId === rental.id}
        />
      ))}
    </div>
  );
}

