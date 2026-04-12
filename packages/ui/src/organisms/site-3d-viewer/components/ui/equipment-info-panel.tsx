import { Equipment3DData } from '../../types/equipment-3d.types';

interface EquipmentInfoPanelProps {
  equipment: Equipment3DData | null;
  onClose: () => void;
}

export const EquipmentInfoPanel = ({
  equipment,
  onClose,
}: EquipmentInfoPanelProps) => {
  if (!equipment) {
    return null;
  }

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white rounded-lg shadow-lg p-6 max-w-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {equipment.name}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ×
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-gray-700">Type:</span>{' '}
          <span className="text-gray-600">{equipment.type}</span>
        </div>
        {equipment.floor && (
          <div>
            <span className="font-medium text-gray-700">Floor:</span>{' '}
            <span className="text-gray-600">
              Floor {equipment.floor.number} ({equipment.floor.height}m)
            </span>
          </div>
        )}
        {equipment.positionX !== undefined &&
          equipment.positionY !== undefined &&
          equipment.positionZ !== undefined && (
            <div>
              <span className="font-medium text-gray-700">Position:</span>{' '}
              <span className="text-gray-600">
                ({equipment.positionX.toFixed(2)},{' '}
                {equipment.positionY.toFixed(2)},{' '}
                {equipment.positionZ.toFixed(2)})
              </span>
            </div>
          )}
        {equipment.width && equipment.height && equipment.depth && (
          <div>
            <span className="font-medium text-gray-700">Dimensions:</span>{' '}
            <span className="text-gray-600">
              {equipment.width.toFixed(2)}m × {equipment.height.toFixed(2)}m ×{' '}
              {equipment.depth.toFixed(2)}m
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
