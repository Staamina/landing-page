import { EquipmentType } from '@staamina/types';
import { ComponentType } from 'react';

import { TAILWIND_COLORS } from '../../../../constants/tailwind-colors';
import * as EquipmentModels from './equipment-models-library';
import { useEquipmentTransform } from '../../hooks/use-equipment-transform';
import { Equipment3DProps } from '../../types/equipment-3d.types';

const DEFAULT_MODEL: ComponentType<Equipment3DProps> = ({
  equipment,
  floors,
  isHighlighted,
}) => {
  const { position, rotation, dimension } = useEquipmentTransform({
    equipment,
    floors,
  });

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <boxGeometry
        args={[
          dimension.width || 1,
          dimension.height || 1,
          dimension.depth || 1,
        ]}
      />
      <meshStandardMaterial
        color={
          isHighlighted
            ? TAILWIND_COLORS.green[400]
            : TAILWIND_COLORS.slate[400]
        }
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
};

const EQUIPMENT_MODEL_MAP: Partial<
  Record<EquipmentType, ComponentType<Equipment3DProps>>
> = {
  CASH_REGISTER: EquipmentModels.CashRegister3D,
  MANNEQUIN: EquipmentModels.Mannequin3D,
  METAL_SHELVING: EquipmentModels.MetalShelving3D,
  MODULAR_SHELVING: EquipmentModels.MetalShelving3D,
  SECURITY_CAMERA: EquipmentModels.SecurityCamera3D,
};

export const createEquipment3D = (equipmentType: EquipmentType) => {
  return EQUIPMENT_MODEL_MAP[equipmentType] || DEFAULT_MODEL;
};
