import { EquipmentType } from '@staamina/types';

import type { Floor } from './floor.types';

export interface Equipment3DData {
  id: string;
  name: string;
  type: EquipmentType;
  siteId: string;
  floorId?: string;
  floor?: Floor;
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}

export interface Equipment3DProps {
  equipment: Equipment3DData;
  floors: Floor[];
  isHighlighted?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}
