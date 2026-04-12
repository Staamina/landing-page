import { useEffect, useMemo, useRef, useState } from 'react';
import { Mesh, MeshStandardMaterial, Group, Box3, Vector3 } from 'three';

import { cloneModelScene } from '../../../utils/model-cloner';
import { useModelLoader } from '../../../utils/model-loader';

interface UseEquipmentModelOptions {
  modelUrl: string;
  isHighlighted: boolean;
  dimension: { width: number; height: number; depth: number };
  scale?: number;
}

export const useEquipmentModel = ({
  modelUrl,
  isHighlighted,
  dimension,
  scale = 1,
}: UseEquipmentModelOptions) => {
  const gltf = useModelLoader(modelUrl);
  const meshRef = useRef<Group>(null);
  const [useFallback, setUseFallback] = useState(false);

  const modelScene = useMemo(() => {
    if (!gltf) {
      return null;
    }

    gltf.scene.updateMatrixWorld(true);

    const cloned = cloneModelScene(gltf.scene) as Group;

    return cloned;
  }, [gltf]);

  const finalDimensions = useMemo(
    () => ({
      width: dimension.width * scale,
      height: dimension.height * scale,
      depth: dimension.depth * scale,
    }),
    [dimension.width, dimension.height, dimension.depth, scale]
  );

  const modelTransform = useMemo(() => {
    if (!modelScene) {
      return {
        centerOffset: { x: 0, y: 0, z: 0 },
        bottomOffset: 0,
      };
    }

    const box = new Box3().setFromObject(modelScene);
    const center = box.getCenter(new Vector3());

    return {
      centerOffset: {
        x: -center.x,
        y: -center.y,
        z: -center.z,
      },
      bottomOffset: box.min.y - center.y,
    };
  }, [modelScene]);

  useEffect(() => {
    if (modelScene && meshRef.current) {
      meshRef.current.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.material instanceof MeshStandardMaterial
        ) {
          if (isHighlighted) {
            child.material.emissive.setHex(0x4ade80);
            child.material.emissiveIntensity = 0.5;
          } else {
            child.material.emissive.setHex(0x000000);
            child.material.emissiveIntensity = 0;
          }
        }
      });
    }
  }, [modelScene, isHighlighted]);

  return {
    gltf,
    modelScene,
    meshRef,
    useFallback,
    setUseFallback,
    finalDimensions,
    modelTransform,
  };
};
