import BoatItem from './BoatItem';

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

interface BoatListProps {
  boats: Boat[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, boat: Boat) => void;
  onEdit: (id: number) => void;
  editingId: number | null;
}

export default function BoatList({ boats, onDelete, onUpdate, onEdit, editingId }: BoatListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {boats.map(boat => (
        <BoatItem
          key={boat.id}
          boat={boat}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onEdit={onEdit}
          isEditing={editingId === boat.id}
        />
      ))}
    </div>
  );
}

