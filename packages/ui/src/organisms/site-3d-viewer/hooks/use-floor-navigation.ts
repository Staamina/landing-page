import { useState, useMemo } from 'react';

import { Equipment3DData } from '../types/equipment-3d.types';
import { Floor } from '../types/floor.types';

export const useFloorNavigation = (
  floors: Floor[],
  equipment: Equipment3DData[]
) => {
  const sortedFloors = useMemo(() => {
    return [...floors].sort((a, b) => a.number - b.number);
  }, [floors]);

  const defaultFloorId = sortedFloors.length > 0 ? sortedFloors[0].id : null;

  const [currentFloorId, setCurrentFloorId] = useState<string | null>(
    defaultFloorId
  );

  const effectiveFloorId = currentFloorId || defaultFloorId;

  const currentFloor = useMemo(() => {
    if (!effectiveFloorId) return null;
    return floors.find((floor) => floor.id === effectiveFloorId) || null;
  }, [floors, effectiveFloorId]);

  const filteredEquipment = useMemo(() => {
    if (!effectiveFloorId) {
      return [];
    }
    return equipment.filter((eq) => eq.floorId === effectiveFloorId);
  }, [equipment, effectiveFloorId]);

  const handleFloorChange = (floorId: string | null) => {
    setCurrentFloorId(floorId || defaultFloorId);
  };

  return {
    currentFloorId: effectiveFloorId,
    currentFloor,
    filteredEquipment,
    sortedFloors,
    setCurrentFloorId: handleFloorChange,
  };
};
