import { Floor } from '../types/floor.types';

export const calculateFloorYPosition = (
  floorId: string,
  floors: Floor[]
): number => {
  const targetFloor = floors.find((floor) => floor.id === floorId);
  if (!targetFloor) {
    return 0;
  }

  let accumulatedHeight = 0;
  const sortedFloors = [...floors].sort((a, b) => a.number - b.number);

  for (const floor of sortedFloors) {
    if (floor.id === targetFloor.id) {
      return accumulatedHeight;
    }
    accumulatedHeight += floor.height;
  }

  return 0;
};
