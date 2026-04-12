import { TAILWIND_COLORS } from '../../../../../../constants/tailwind-colors';
import { useEquipmentTransform } from '../../../../hooks/use-equipment-transform';
import { Equipment3DProps } from '../../../../types/equipment-3d.types';

const MetalShelving3D = ({
  equipment,
  floors,
  isHighlighted,
}: Equipment3DProps) => {
  const { position, rotation, dimension } = useEquipmentTransform({
    equipment,
    floors,
  });

  return (
    <mesh
      position={[position.x, position.y + dimension.height / 2, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
    >
      <boxGeometry
        args={[dimension.width, dimension.height, dimension.depth]}
      />
      <meshStandardMaterial
        color={
          isHighlighted
            ? TAILWIND_COLORS.green[400]
            : TAILWIND_COLORS.slate[500]
        }
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
};

export default MetalShelving3D;
