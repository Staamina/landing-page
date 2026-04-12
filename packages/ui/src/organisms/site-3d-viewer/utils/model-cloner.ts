import { Object3D, Mesh, Material } from 'three';

const cloneMaterial = (material: Material): Material => {
  return material.clone();
};

export const cloneModelScene = (scene: Object3D): Object3D => {
  scene.updateMatrixWorld(true);

  const cloned = scene.clone(true);

  cloned.traverse((child) => {
    if (child instanceof Mesh) {
      if (Array.isArray(child.material)) {
        child.material = child.material.map((mat) => cloneMaterial(mat));
      } else if (child.material) {
        child.material = cloneMaterial(child.material);
      }
    }
  });

  return cloned;
};
