import Marin from "../../types/Marin";
import MarinItem from "./MarinItem";

interface MarinListProps {
    marins: Marin[];
    // onDelete: (id: number) => void;
    onUpdate: (id: number, boat: Marin) => void;
    onEdit: (id: number) => void;
    editingId: number | null;
}
  

export default function MarinList({marins,onUpdate,onEdit,editingId}: MarinListProps){
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {marins.map(marin => (
          <MarinItem
            key={marin.id}
            marin={marin}
            // onDelete={onDelete}
            onUpdate={onUpdate}
            onEdit={onEdit}
            isEditing={editingId === marin.id}
          />
        ))}
        </div>
    )
}