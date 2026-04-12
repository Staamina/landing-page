import { useMemo } from 'react';

import { TAILWIND_COLORS } from '../../../../constants/tailwind-colors';
import { Floor as FloorComponent } from './floor';
import { Floor } from '../../types/floor.types';

interface BuildingProps {
  width?: number;
  length?: number;
  floors: Floor[];
  currentFloorId?: string | null;
  defaultFloorTextureUrl?: string;
}

export const Building = ({
  width = 20,
  length = 20,
  floors,
  currentFloorId,
  defaultFloorTextureUrl,
}: BuildingProps) => {
  const currentFloor = useMemo(() => {
    if (!currentFloorId) {
      return floors.length > 0 ? floors[0] : null;
    }
    return floors.find((floor) => floor.id === currentFloorId) || null;
  }, [floors, currentFloorId]);

  const floorYPosition = useMemo(() => {
    if (!currentFloor) return 0;

    let accumulatedHeight = 0;
    const sortedFloors = [...floors].sort((a, b) => a.number - b.number);

    for (const floor of sortedFloors) {
      if (floor.id === currentFloor.id) {
        return accumulatedHeight;
      }
      accumulatedHeight += floor.height;
    }

    return 0;
  }, [floors, currentFloor]);

  if (!currentFloor) {
    return null;
  }

  return (
    <group>
      <mesh position={[0, floorYPosition + currentFloor.height / 2, 0]}>
        <boxGeometry args={[width, currentFloor.height, length]} />
        <meshStandardMaterial
          color={TAILWIND_COLORS.indigo[100]}
          opacity={0.3}
          transparent
        />
      </mesh>
      <FloorComponent
        floor={currentFloor}
        width={width}
        length={length}
        yPosition={floorYPosition}
        isActive={true}
        textureUrl={defaultFloorTextureUrl}
      />
    </group>
  );
};
