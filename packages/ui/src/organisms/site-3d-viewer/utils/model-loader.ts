import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

import { modelCache } from './model-cache';

export const useModelLoader = (url: string): GLTF | null => {
  const cached = modelCache.get(url);

  if (cached) {
    return cached;
  }

  try {
    const gltf = useGLTF(url);

    modelCache.set(url, gltf);
    return gltf;
  } catch (error) {
    console.warn(`Failed to load model from ${url}:`, error);
    return null;
  }
};
