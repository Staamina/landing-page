import { TAILWIND_COLORS } from '../../../../../../constants/tailwind-colors';
import { useEquipmentTransform } from '../../../../hooks/use-equipment-transform';
import { Equipment3DProps } from '../../../../types/equipment-3d.types';

const Mannequin3D = ({
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
      <cylinderGeometry
        args={[dimension.width / 2, dimension.width / 2, dimension.height, 8]}
      />
      <meshStandardMaterial
        color={
          isHighlighted
            ? TAILWIND_COLORS.green[400]
            : TAILWIND_COLORS.purple[500]
        }
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  );
};

export default Mannequin3D;
