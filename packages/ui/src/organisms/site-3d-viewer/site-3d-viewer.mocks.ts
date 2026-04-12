import { EquipmentType } from '@staamina/types';

import { Equipment3DData } from './types/equipment-3d.types';
import { Floor } from './types/floor.types';

export const mockFloors: Floor[] = [
  {
    id: 'floor-1',
    number: -1,
    height: 2.5,
    siteBuildingId: 'building-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'floor-2',
    number: 0,
    height: 3.0,
    siteBuildingId: 'building-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'floor-3',
    number: 1,
    height: 3.0,
    siteBuildingId: 'building-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

interface CreateSimpleEquipmentPayload {
  id: string;
  name: string;
  type: EquipmentType;
  floorId: string;
  floor: Floor;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationY?: number;
  width?: number;
  height?: number;
  depth?: number;
}

export const createSimpleEquipment = (
  payload: CreateSimpleEquipmentPayload
): Equipment3DData => ({
  id: payload.id,
  name: payload.name,
  type: payload.type,
  siteId: 'site-simple-1',
  floorId: payload.floorId,
  floor: payload.floor,
  positionX: payload.positionX,
  positionY: payload.positionY,
  positionZ: payload.positionZ,
  rotationX: 0,
  rotationY: payload.rotationY ?? 0,
  rotationZ: 0,
  width: payload.width ?? 1,
  height: payload.height ?? 1,
  depth: payload.depth ?? 1,
});

export const createSecurityCameraEquipment = (payload: {
  id: string;
  name: string;
  floorId: string;
  floor: Floor;
  positionX: number;
  positionY: number;
  positionZ: number;
  rotationY?: number;
}): Equipment3DData => ({
  id: payload.id,
  name: payload.name,
  type: EquipmentType.SECURITY_CAMERA,
  siteId: 'site-simple-1',
  floorId: payload.floorId,
  floor: payload.floor,
  positionX: payload.positionX,
  positionY: payload.positionY,
  positionZ: payload.positionZ,
  rotationX: 0,
  rotationY: payload.rotationY ?? 0,
  rotationZ: 0,
  width: 1,
  height: 1,
  depth: 1,
});

export const mockEquipment: Equipment3DData[] = [
  createSimpleEquipment({
    id: 'eq-basement-1',
    name: 'Étagère Stockage 1',
    type: EquipmentType.METAL_SHELVING,
    floorId: 'floor-1',
    floor: mockFloors[0],
    positionX: -6,
    positionY: 0,
    positionZ: -6,
    rotationY: 0,
    width: 1.0,
    height: 2.0,
    depth: 0.5,
  }),
];

export const simpleStoreFloors: Floor[] = [
  {
    id: 'floor-simple-1',
    number: 0,
    height: 3.0,
    siteBuildingId: 'building-simple-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const simpleStoreEquipment: Equipment3DData[] = [
  createSimpleEquipment({
    id: 'eq-simple-1',
    name: 'Cash Register Principal',
    type: EquipmentType.CASH_REGISTER,
    floorId: 'floor-simple-1',
    floor: simpleStoreFloors[0],
    positionX: 8,
    positionY: 0,
    positionZ: 8,
    rotationY: 45,
    width: 0.5,
    height: 0.4,
    depth: 0.3,
  }),
];
