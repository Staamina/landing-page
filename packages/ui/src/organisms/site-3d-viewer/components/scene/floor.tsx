import { useTexture } from '@react-three/drei';
import { Suspense, useEffect } from 'react';
import { RepeatWrapping, Texture } from 'three';

import { TAILWIND_COLORS } from '../../../../constants/tailwind-colors';
import { Floor as FloorType } from '../../types/floor.types';

interface FloorProps {
  floor: FloorType;
  width: number;
  length: number;
  yPosition: number;
  isActive?: boolean;
  textureUrl?: string;
}

interface FloorWithTextureProps extends FloorProps {
  texturePath: string;
}

const FloorMesh = ({
  width,
  length,
  yPosition,
  isActive = false,
  texturePath,
}: FloorWithTextureProps) => {
  const floorTexture = useTexture(texturePath) as Texture;

  useEffect(() => {
    if (floorTexture) {
      floorTexture.wrapS = RepeatWrapping;
      floorTexture.wrapT = RepeatWrapping;
      const repeatX = Math.max(1, Math.floor(width / 2));
      const repeatY = Math.max(1, Math.floor(length / 2));
      floorTexture.repeat.set(repeatX, repeatY);
    }
  }, [floorTexture, width, length]);

  return (
    <mesh
      position={[0, yPosition, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial
        map={floorTexture}
        color={
          isActive ? TAILWIND_COLORS.indigo[100] : TAILWIND_COLORS.slate[50]
        }
        opacity={isActive ? 0.9 : 0.7}
        transparent
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

const FloorFallback = ({
  width,
  length,
  yPosition,
  isActive = false,
}: Omit<FloorProps, 'floor' | 'textureUrl'>) => {
  return (
    <mesh
      position={[0, yPosition, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[width, length]} />
      <meshStandardMaterial
        color={
          isActive ? TAILWIND_COLORS.slate[300] : TAILWIND_COLORS.slate[200]
        }
        opacity={isActive ? 0.9 : 0.7}
        transparent
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

export const Floor = ({
  floor,
  width,
  length,
  yPosition,
  isActive = false,
  textureUrl,
}: FloorProps) => {
  const texturePath = textureUrl || floor.textureUrl;

  if (!texturePath) {
    return (
      <FloorFallback
        width={width}
        length={length}
        yPosition={yPosition}
        isActive={isActive}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <FloorFallback
          width={width}
          length={length}
          yPosition={yPosition}
          isActive={isActive}
        />
      }
    >
      <FloorMesh
        floor={floor}
        width={width}
        length={length}
        yPosition={yPosition}
        isActive={isActive}
        texturePath={texturePath}
      />
    </Suspense>
  );
};
