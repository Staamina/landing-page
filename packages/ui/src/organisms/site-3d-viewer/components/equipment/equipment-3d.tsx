import { createEquipment3D } from './equipment-factory';
import { Equipment3DData } from '../../types/equipment-3d.types';
import { Floor } from '../../types/floor.types';

interface Equipment3DComponentProps {
  equipment: Equipment3DData;
  floors: Floor[];
  isHighlighted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onHover?: (equipment?: Equipment3DData) => void;
}

export const Equipment3D = ({
  equipment,
  floors,
  isHighlighted = false,
  isSelected = false,
  onClick,
  onHover,
}: Equipment3DComponentProps) => {
  const EquipmentModel = createEquipment3D(equipment.type);

  return (
    <group
      onClick={onClick}
      onPointerEnter={() => onHover?.(equipment)}
      onPointerLeave={() => onHover?.(undefined)}
    >
      <EquipmentModel
        equipment={equipment}
        floors={floors}
        isHighlighted={isHighlighted || isSelected}
        isSelected={isSelected}
        onClick={onClick}
        onHover={(hovered) => onHover?.(hovered ? equipment : undefined)}
      />
    </group>
  );
};
