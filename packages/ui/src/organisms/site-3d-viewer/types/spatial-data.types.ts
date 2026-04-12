export interface SpatialPosition {
  x: number;
  y: number;
  z: number;
}

export interface SpatialRotation {
  x: number;
  y: number;
  z: number;
}

export interface SpatialDimensions {
  width: number;
  height: number;
  depth: number;
}

export interface SpatialData {
  position: SpatialPosition | null;
  rotation: SpatialRotation | null;
  dimensions: SpatialDimensions | null;
}
