import { useState } from 'react';

import { Equipment3DData } from '../../types/equipment-3d.types';
import { Floor } from '../../types/floor.types';
import { Equipment3D } from '../equipment/equipment-3d';

interface EquipmentHighlightProps {
  equipments: Equipment3DData[];
  floors: Floor[];
  onEquipmentClick?: (equipment: Equipment3DData) => void;
  onEquipmentHover?: (equipment?: Equipment3DData) => void;
}

export const EquipmentHighlight = ({
  equipments,
  floors,
  onEquipmentClick,
  onEquipmentHover,
}: EquipmentHighlightProps) => {
  const [hoveredId, setHoveredId] = useState<string | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const handleClick = (eq: Equipment3DData) => {
    setSelectedId(eq.id === selectedId ? undefined : eq.id);
    onEquipmentClick?.(eq);
  };

  const handleHover = (eq?: Equipment3DData) => {
    setHoveredId(eq?.id ?? undefined);
    onEquipmentHover?.(eq);
  };

  return (
    <>
      {equipments.map((equipment) => {
        if (
          equipment.positionX === undefined ||
          equipment.positionY === undefined ||
          equipment.positionZ === undefined
        ) {
          return undefined;
        }

        return (
          <Equipment3D
            key={equipment.id}
            equipment={equipment}
            floors={floors}
            isHighlighted={hoveredId === equipment.id}
            isSelected={selectedId === equipment.id}
            onClick={() => handleClick(equipment)}
            onHover={(hovered) => handleHover(hovered ? equipment : undefined)}
          />
        );
      })}
    </>
  );
};
