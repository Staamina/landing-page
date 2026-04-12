import { Suspense, RefObject } from 'react';
import { Group } from 'three';

import { TAILWIND_COLORS } from '../../../../../../constants/tailwind-colors';
import { Equipment3DProps } from '../../../../types/equipment-3d.types';
import { ModelErrorBoundary } from '../../../error-boundaries/model-error-boundary';
import { useEquipmentTransform } from '../../../../hooks/use-equipment-transform';
import { addHalfRotation } from '../../../../utils/spatial-helpers';

import { useEquipmentModel } from '../use-equipment-model';

const MODEL_URL = '/models/surveillance-camera.glb';

interface SurveillanceCameraModelProps {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  dimension: { width: number; height: number; depth: number };
  scale?: number;
  isHighlighted: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
  meshRef: RefObject<THREE.Group>;
  modelScene: Group | null;
  finalDimensions: { width: number; height: number; depth: number };
  modelTransform: {
    centerOffset: { x: number; y: number; z: number };
    bottomOffset: number;
  };
}

const SurveillanceCameraModel = ({
  position,
  rotation,
  dimension,
  scale = 1,
  isHighlighted,
  onClick,
  onHover,
  meshRef,
  modelScene,
  finalDimensions,
  modelTransform,
}: SurveillanceCameraModelProps) => {
  if (!modelScene) {
    return (
      <FallbackModel
        position={position}
        rotation={rotation}
        dimension={dimension}
        scale={scale}
        isHighlighted={isHighlighted}
        onClick={onClick}
        onHover={onHover}
      />
    );
  }

  return (
    <group
      ref={meshRef}
      position={[position.x, position.y, position.z]}
      onClick={onClick}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
    >
      <group rotation={[addHalfRotation(rotation.x), rotation.y, rotation.z]}>
        <group
          position={[
            modelTransform.centerOffset.x * finalDimensions.width,
            (modelTransform.centerOffset.y - modelTransform.bottomOffset) *
              finalDimensions.height,
            modelTransform.centerOffset.z * finalDimensions.depth,
          ]}
          scale={[
            finalDimensions.width,
            finalDimensions.height,
            finalDimensions.depth,
          ]}
        >
          <primitive object={modelScene} />
        </group>
      </group>
    </group>
  );
};

interface FallbackModelProps {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  dimension: { width: number; height: number; depth: number };
  scale?: number;
  isHighlighted: boolean;
  onClick?: () => void;
  onHover?: (hovered: boolean) => void;
}

const FallbackModel = ({
  position,
  rotation,
  dimension,
  scale = 1,
  isHighlighted,
  onClick,
  onHover,
}: FallbackModelProps) => {
  const finalDimensions = {
    width: dimension.width * scale,
    height: dimension.height * scale,
    depth: dimension.depth * scale,
  };

  return (
    <mesh
      position={[position.x, position.y, position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      onClick={onClick}
      onPointerEnter={() => onHover?.(true)}
      onPointerLeave={() => onHover?.(false)}
    >
      <boxGeometry
        args={[
          finalDimensions.width,
          finalDimensions.height,
          finalDimensions.depth,
        ]}
      />
      <meshStandardMaterial
        color={
          isHighlighted ? TAILWIND_COLORS.green[400] : TAILWIND_COLORS.blue[500]
        }
        metalness={0.3}
        roughness={0.7}
      />
    </mesh>
  );
};

const SurveillanceCamera3d = ({
  equipment,
  floors,
  isHighlighted = false,
  onClick,
  onHover,
}: Equipment3DProps) => {
  const { position, rotation, dimension } = useEquipmentTransform({
    equipment,
    floors,
  });
  const scale = equipment.scale ?? 1;

  const {
    modelScene,
    meshRef,
    useFallback,
    setUseFallback,
    finalDimensions,
    modelTransform,
  } = useEquipmentModel({
    modelUrl: MODEL_URL,
    isHighlighted,
    dimension,
    scale,
  });

  const fallbackModel = (
    <FallbackModel
      position={position}
      rotation={rotation}
      dimension={dimension}
      scale={scale}
      isHighlighted={isHighlighted}
      onClick={onClick}
      onHover={onHover}
    />
  );

  if (useFallback) {
    return fallbackModel;
  }

  return (
    <ModelErrorBoundary
      fallback={fallbackModel}
      onError={() => {
        setUseFallback(true);
      }}
    >
      <Suspense fallback={fallbackModel}>
        <SurveillanceCameraModel
          position={position}
          rotation={rotation}
          dimension={dimension}
          scale={scale}
          isHighlighted={isHighlighted}
          onClick={onClick}
          onHover={onHover}
          meshRef={meshRef}
          modelScene={modelScene}
          finalDimensions={finalDimensions}
          modelTransform={modelTransform}
        />
      </Suspense>
    </ModelErrorBoundary>
  );
};

export default SurveillanceCamera3d;
