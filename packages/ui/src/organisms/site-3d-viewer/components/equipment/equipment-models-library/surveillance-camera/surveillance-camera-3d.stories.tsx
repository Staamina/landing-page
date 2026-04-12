import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EquipmentType } from '@staamina/types';
import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from '@staamina/ui/error-boundary';

import { EquipmentInfoPanel } from '../../../ui/equipment-info-panel';
import { Equipment3DData } from '../../../../types/equipment-3d.types';

import SurveillanceCamera3d from './surveillance-camera-3d';
import { Floor } from '../../../../types/floor.types';

const WebGLFallback = ({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) => (
  <div className="flex h-full min-w-0 w-full items-center justify-center overflow-auto bg-gray-100 p-8">
    <div className="min-w-80 max-w-md shrink-0 rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
      <p className="font-semibold">3D viewer could not load</p>
      <p className="mt-2 text-sm">
        WebGL context is unavailable (e.g. GPU limit, headless environment, or
        Storybook iframe). The SurveillanceCamera3D component requires a working
        WebGL context.
      </p>
      {error && <p className="mt-2 text-xs opacity-80">{error.message}</p>}
      <button
        type="button"
        onClick={resetError}
        className="mt-4 rounded bg-amber-200 px-3 py-1.5 text-sm font-medium hover:bg-amber-300"
      >
        Retry
      </button>
    </div>
  </div>
);

const meta: Meta<typeof SurveillanceCamera3d> = {
  title: 'Organisms/Site3DViewer/EquipmentModels/SurveillanceCamera3D',
  component: SurveillanceCamera3d,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ErrorBoundary fallback={WebGLFallback}>
        <Story />
      </ErrorBoundary>
    ),
  ],
};

export default meta;

interface StoryArgs {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}

type Story = StoryObj<StoryArgs>;

const mockFloor: Floor = {
  id: 'floor-1',
  number: 0,
  height: 3.0,
  siteBuildingId: 'building-1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const createMockEquipment = ({
  positionX,
  positionY,
  positionZ,
  rotationX,
  rotationY,
  rotationZ,
  depth,
  height,
  width,
  scale = 1,
}: {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}): Equipment3DData => ({
  siteId: 'site-1',
  floorId: 'floor-1',
  floor: mockFloor,
  id: 'eq-simple-32',
  name: 'Caméra de Sécurité 1',
  type: EquipmentType.SECURITY_CAMERA,
  positionX,
  positionY,
  positionZ,
  rotationX,
  rotationY,
  rotationZ,
  width,
  height,
  depth,
  scale,
});

const InteractiveScene = ({
  positionX = 0,
  positionY = 0,
  positionZ = 0,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  width = 1,
  height = 1,
  depth = 1,
  scale = 1,
}: {
  positionX?: number;
  positionY?: number;
  positionZ?: number;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  width?: number;
  height?: number;
  depth?: number;
  scale?: number;
}) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Equipment3DData | null>(null);

  const equipment = createMockEquipment({
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    width,
    height,
    depth,
    scale,
  });

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#1a1a1a',
        position: 'relative',
      }}
    >
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <OrbitControls enablePan enableZoom enableRotate />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[2]} />
        <SurveillanceCamera3d
          equipment={equipment}
          floors={[mockFloor]}
          isHighlighted={hovered}
          isSelected={selected?.id === equipment.id}
          onClick={() => setSelected(equipment)}
          onHover={(isHovered) => setHovered(isHovered)}
        />
      </Canvas>
      {selected && (
        <EquipmentInfoPanel
          equipment={selected}
          onClose={() => setSelected(null)}
        />
      )}
      {hovered && !selected && (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '4px',
            fontSize: '14px',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          Hover: {equipment.name}
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  args: {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    width: 1,
    height: 1,
    depth: 1,
    scale: 1,
  },
  argTypes: {
    positionX: {
      control: { type: 'number', step: 0.1 },
      description: 'Position X',
    },
    positionY: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Y',
    },
    positionZ: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Z',
    },
    rotationX: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation X (degrees)',
    },
    rotationY: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Y (degrees)',
    },
    rotationZ: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Z (degrees)',
    },
    width: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension width',
    },
    height: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension height',
    },
    depth: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension depth',
    },
    scale: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Scale coefficient',
    },
  },
  render: (args) => <InteractiveScene {...args} />,
};

const SceneWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
    <Canvas>
      <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="city" />
      <OrbitControls enablePan enableZoom enableRotate />
      <gridHelper args={[10, 10]} />
      <axesHelper args={[2]} />
      {children}
    </Canvas>
  </div>
);

export const Default: Story = {
  args: {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
    width: 1,
    height: 1,
    depth: 1,
    scale: 1,
  },
  argTypes: {
    positionX: {
      control: { type: 'number', step: 0.1 },
      description: 'Position X',
    },
    positionY: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Y',
    },
    positionZ: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Z',
    },
    rotationX: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation X (degrees)',
    },
    rotationY: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Y (degrees)',
    },
    rotationZ: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Z (degrees)',
    },
    width: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension width',
    },
    height: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension height',
    },
    depth: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension depth',
    },
    scale: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Scale coefficient',
    },
  },
  render: ({
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    width,
    height,
    depth,
    scale,
  }) => {
    const equipment = createMockEquipment({
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      width,
      height,
      depth,
      scale,
    });

    return (
      <SceneWrapper>
        <SurveillanceCamera3d
          equipment={equipment}
          floors={[mockFloor]}
          isHighlighted={false}
          isSelected={false}
        />
      </SceneWrapper>
    );
  },
};

export const Highlighted: Story = {
  args: {
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 180,
    rotationY: 0,
    rotationZ: 0,
    width: 1,
    height: 1,
    depth: 1,
    scale: 1,
  },
  argTypes: {
    positionX: {
      control: { type: 'number', step: 0.1 },
      description: 'Position X',
    },
    positionY: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Y',
    },
    positionZ: {
      control: { type: 'number', step: 0.1 },
      description: 'Position Z',
    },
    rotationX: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation X (degrees)',
    },
    rotationY: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Y (degrees)',
    },
    rotationZ: {
      control: { type: 'number', step: 1, min: 0, max: 360 },
      description: 'Rotation Z (degrees)',
    },
    width: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension width',
    },
    height: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension height',
    },
    depth: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Dimension depth',
    },
    scale: {
      control: { type: 'number', step: 0.1, min: 0.1, max: 10 },
      description: 'Scale coefficient',
    },
  },
  render: ({
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    width,
    height,
    depth,
    scale,
  }) => {
    const equipment = createMockEquipment({
      positionX,
      positionY,
      positionZ,
      rotationX,
      rotationY,
      rotationZ,
      width,
      height,
      depth,
      scale,
    });

    return (
      <SceneWrapper>
        <SurveillanceCamera3d
          equipment={equipment}
          floors={[mockFloor]}
          isHighlighted={true}
          isSelected={false}
        />
      </SceneWrapper>
    );
  },
};
