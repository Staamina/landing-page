import { Floor } from '../../types/floor.types';

interface FloorSelectorProps {
  floors: Floor[];
  currentFloorId: string | null;
  onFloorChange: (floorId: string | null) => void;
}

export const FloorSelector = ({
  floors,
  currentFloorId,
  onFloorChange,
}: FloorSelectorProps) => {
  const sortedFloors = [...floors].sort((a, b) => a.number - b.number);

  return (
    <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Floor
      </label>
      <select
        value={currentFloorId || sortedFloors[0]?.id || ''}
        onChange={(e) => onFloorChange(e.target.value || null)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        {sortedFloors.map((floor) => (
          <option key={floor.id} value={floor.id}>
            Floor {floor.number} ({floor.height}m)
          </option>
        ))}
      </select>
    </div>
  );
};
