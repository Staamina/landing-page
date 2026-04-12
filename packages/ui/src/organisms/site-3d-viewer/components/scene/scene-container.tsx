import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { ReactNode, Suspense } from 'react';

interface SceneContainerProps {
  children: ReactNode;
  cameraPosition?: [number, number, number];
  enableControls?: boolean;
  /** Set to false to skip loading Environment preset (avoids CDN/HDR fetch in Storybook or when offline) */
  enableEnvironment?: boolean;
}

export const SceneContainer = ({
  children,
  cameraPosition = [10, 10, 10],
  enableControls = true,
  enableEnvironment = true,
}: SceneContainerProps) => {
  return (
    <Canvas
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {enableEnvironment && (
        <Suspense fallback={null}>
          <Environment preset="city" />
        </Suspense>
      )}
      {enableControls && <OrbitControls enablePan enableZoom enableRotate />}
      {children}
    </Canvas>
  );
};
