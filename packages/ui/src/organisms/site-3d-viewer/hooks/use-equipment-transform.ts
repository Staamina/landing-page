import { useMemo } from 'react';

import { Equipment3DData } from '../types/equipment-3d.types';
import { Floor } from '../types/floor.types';
import {
  SpatialPosition,
  SpatialRotation,
  SpatialDimensions,
} from '../types/spatial-data.types';
import { calculateFloorYPosition } from '../utils/floor-position';

const degreesToRadians = (degrees: number = 0): number => {
  if (degrees === null) {
    return 0;
  }

  return (degrees * Math.PI) / 180;
};

interface UseEquipmentTransformOptions {
  equipment: Equipment3DData;
  floors: Floor[];
}

export const useEquipmentTransform = ({
  equipment,
  floors,
}: UseEquipmentTransformOptions) => {
  const floorYOffset = useMemo(() => {
    return equipment.floorId
      ? calculateFloorYPosition(equipment.floorId, floors)
      : 0;
  }, [equipment.floorId, floors]);

  const position: SpatialPosition = useMemo(
    () => ({
      x: equipment.positionX ?? 0,
      y: (equipment.positionY ?? 0) + floorYOffset,
      z: equipment.positionZ ?? 0,
    }),
    [
      equipment.positionX,
      equipment.positionY,
      equipment.positionZ,
      floorYOffset,
    ]
  );

  const rotation: SpatialRotation = useMemo(
    () => ({
      x: degreesToRadians(equipment.rotationX),
      y: degreesToRadians(equipment.rotationY),
      z: degreesToRadians(equipment.rotationZ),
    }),
    [equipment.rotationX, equipment.rotationY, equipment.rotationZ]
  );

  const dimension: SpatialDimensions = useMemo(
    () => ({
      width: equipment.width ?? 1,
      height: equipment.height ?? 1,
      depth: equipment.depth ?? 1,
    }),
    [equipment.width, equipment.height, equipment.depth]
  );

  return {
    position,
    rotation,
    dimension,
  };
};
