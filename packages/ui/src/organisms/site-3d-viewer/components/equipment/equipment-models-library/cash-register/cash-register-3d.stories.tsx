import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EquipmentType } from '@staamina/types';
import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from '@staamina/ui/error-boundary';

import { EquipmentInfoPanel } from '../../../ui/equipment-info-panel';
import { Equipment3DData } from '../../../../types/equipment-3d.types';

import CashRegister3D from './cash-register-3d';
import { Floor } from '../../../../types/floor.types';

const isChrome = () =>
  typeof navigator !== 'undefined' &&
  /Chrome\//.test(navigator.userAgent) &&
  !/Edg|Firefox|OPR/.test(navigator.userAgent);

const CANVAS_MOUNT_DELAY_MS = isChrome() ? 400 : 0;

const isGpuDisabledError = (message?: string) =>
  message &&
  (/GL_RENDERER.*Disabled|GL_VENDOR.*Disabled|Sandboxed|BindToCurrentSequence/i.test(
    message
  ) ||
    /WebGL context could not be created/i.test(message));

const webGLFallbackMessage = (
  <div className="flex h-full min-w-0 w-full items-center justify-center overflow-auto bg-gray-100 p-8">
    <div className="min-w-80 max-w-md shrink-0 rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
      <p className="font-semibold">3D viewer could not load</p>
      <p className="mt-2 text-sm">
        WebGL context is unavailable. Common causes: GPU disabled, hardware
        acceleration off, or sandboxed environment (e.g. Chrome on Linux).
      </p>
      <ul className="mt-2 list-inside list-disc text-xs opacity-90">
        <li>
          <strong>Chrome:</strong> Enable &quot;Use hardware acceleration when
          available&quot; in chrome://settings/system
        </li>
        <li>
          Check chrome://gpu — WebGL should be &quot;Hardware accelerated&quot;
        </li>
        <li>Use &quot;Open canvas in new tab&quot; in the Storybook toolbar</li>
        <li>Try Firefox (often works when Chrome GPU is disabled)</li>
      </ul>
    </div>
  </div>
);

const WebGLFallback = ({
  error,
  resetError,
}: {
  error?: Error;
  resetError: () => void;
}) => {
  const message = error?.message ?? '';
  const showGpuTips = isGpuDisabledError(message);

  return (
    <div className="flex h-full min-w-0 w-full items-center justify-center overflow-auto bg-gray-100 p-8">
      <div className="min-w-80 max-w-md shrink-0 rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-800">
        <p className="font-semibold">3D viewer could not load</p>
        {showGpuTips ? (
          <>
            <p className="mt-2 text-sm">
              WebGL/GPU is disabled or unavailable in this environment (e.g.
              &quot;GL_RENDERER = Disabled&quot;, sandboxed Chrome).
            </p>
            <ul className="mt-2 list-inside list-disc text-xs opacity-90">
              <li>
                Enable hardware acceleration: chrome://settings/system →
                &quot;Use hardware acceleration when available&quot;
              </li>
              <li>Check chrome://gpu and ensure WebGL is enabled</li>
              <li>
                Try Firefox or &quot;Open canvas in new tab&quot; in Storybook
              </li>
            </ul>
          </>
        ) : (
          <p className="mt-2 text-sm">
            WebGL context is unavailable. Try opening the story in a new tab,
            enabling hardware acceleration, or using Firefox.
          </p>
        )}
        {error && (
          <p className="mt-2 truncate text-xs opacity-70" title={message}>
            {message}
          </p>
        )}
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
};

const getCanvasProps = () => ({
  fallback: webGLFallbackMessage,
  gl: {
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'default' as const,
    antialias: false,
    ...(isChrome() ? { alpha: false } : {}),
  },
});

const meta: Meta<typeof CashRegister3D> = {
  title: 'Organisms/Site3DViewer/EquipmentModels/CashRegister3D',
  component: CashRegister3D,
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
type Story = StoryObj<typeof CashRegister3D>;

const mockFloor: Floor = {
  id: 'floor-1',
  number: 0,
  height: 3.0,
  siteBuildingId: 'building-1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockEquipment: Equipment3DData = {
  id: 'eq-1',
  name: 'Cash Register Premium',
  type: EquipmentType.CASH_REGISTER,
  siteId: 'site-1',
  floorId: 'floor-1',
  floor: mockFloor,
  positionX: 0.5,
  positionY: 0.4,
  positionZ: 0.3,
  rotationX: 0,
  rotationY: 0,
  rotationZ: 0,
  width: 0.5,
  height: 0.4,
  depth: 0.3,
};

const InteractiveScene = () => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState<Equipment3DData | null>(null);
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let timeoutId: number | undefined;
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        if (CANVAS_MOUNT_DELAY_MS <= 0) {
          setCanvasReady(true);
          return;
        }
        timeoutId = window.setTimeout(() => {
          if (!cancelled) setCanvasReady(true);
        }, CANVAS_MOUNT_DELAY_MS);
      });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#1a1a1a',
        position: 'relative',
      }}
    >
      {!canvasReady ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.6)',
            fontSize: 14,
          }}
        >
          Loading…
        </div>
      ) : (
        <Canvas {...getCanvasProps()}>
          <PerspectiveCamera makeDefault position={[3, 3, 3]} fov={50} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <OrbitControls enablePan enableZoom enableRotate />
          <gridHelper args={[10, 10]} />
          <axesHelper args={[2]} />
          <CashRegister3D
            equipment={mockEquipment}
            floors={[mockFloor]}
            isHighlighted={hovered}
            isSelected={selected?.id === mockEquipment.id}
            onClick={() => setSelected(mockEquipment)}
            onHover={(isHovered) => setHovered(isHovered)}
          />
        </Canvas>
      )}
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
          Hover: {mockEquipment.name}
        </div>
      )}
    </div>
  );
};

export const Interactive: Story = {
  render: () => <InteractiveScene />,
};

const SceneWrapper = ({ children }: { children: React.ReactNode }) => (
  <div style={{ width: '100vw', height: '100vh', background: '#1a1a1a' }}>
    <Canvas {...getCanvasProps()}>
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
  render: () => (
    <SceneWrapper>
      <CashRegister3D
        equipment={mockEquipment}
        floors={[mockFloor]}
        isHighlighted={false}
        isSelected={false}
      />
    </SceneWrapper>
  ),
};

export const Highlighted: Story = {
  render: () => (
    <SceneWrapper>
      <CashRegister3D
        equipment={mockEquipment}
        floors={[mockFloor]}
        isHighlighted={true}
        isSelected={false}
      />
    </SceneWrapper>
  ),
};
