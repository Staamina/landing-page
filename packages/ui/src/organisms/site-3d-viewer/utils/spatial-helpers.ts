import {
  SpatialPosition,
  SpatialDimensions,
} from '../types/spatial-data.types';

export const degreesToRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

export const calculateDistance = (
  pos1: SpatialPosition,
  pos2: SpatialPosition
): number => {
  const dx = pos2.x - pos1.x;
  const dy = pos2.y - pos1.y;
  const dz = pos2.z - pos1.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export const calculateCenter = (
  positions: SpatialPosition[]
): SpatialPosition => {
  if (positions.length === 0) {
    return { x: 0, y: 0, z: 0 };
  }

  const sum = positions.reduce(
    (acc, pos) => ({
      x: acc.x + pos.x,
      y: acc.y + pos.y,
      z: acc.z + pos.z,
    }),
    { x: 0, y: 0, z: 0 }
  );

  return {
    x: sum.x / positions.length,
    y: sum.y / positions.length,
    z: sum.z / positions.length,
  };
};

export const addHalfRotation = (radians: number): number => {
  const result = radians + Math.PI;

  if (result >= 2 * Math.PI) {
    return result - 2 * Math.PI;
  }

  if (result < 0) {
    return result + 2 * Math.PI;
  }

  return result;
};

export const getDefaultDimensions = (type: string): SpatialDimensions => {
  const defaults: Record<string, SpatialDimensions> = {
    CASH_REGISTER: { width: 0.5, height: 0.4, depth: 0.3 },
    MANNEQUIN: { width: 0.4, height: 1.8, depth: 0.4 },
    METAL_SHELVING: { width: 1.0, height: 2.0, depth: 0.5 },
  };

  return defaults[type] || { width: 1, height: 1, depth: 1 };
};
