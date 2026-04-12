import type { Meta, StoryObj } from '@storybook/react';

import { ErrorBoundary } from '@staamina/ui/error-boundary';
import { Site3DViewer } from './site-3d-viewer';
import {
  mockFloors,
  mockEquipment,
  simpleStoreFloors,
  simpleStoreEquipment,
} from './site-3d-viewer.mocks';

const ViewerFallback = ({
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
        WebGL or environment loading may be unavailable (e.g. in this Storybook
        context). enableEnvironment=false is set in stories to avoid CDN fetch.
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

const meta: Meta<typeof Site3DViewer> = {
  title: 'Organisms/Site3DViewer',
  component: Site3DViewer,
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: ['floors', 'equipments'] },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ErrorBoundary fallback={ViewerFallback}>
        <Story />
      </ErrorBoundary>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Site3DViewer>;

export const Default: Story = {
  args: {
    buildingWidth: 20,
    buildingLength: 20,
    showControls: true,
    enableSearch: true,
    enableEnvironment: false,
  },
  render: (args) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Site3DViewer {...args} floors={mockFloors} equipments={mockEquipment} />
    </div>
  ),
};

export const WithoutControls: Story = {
  args: {
    buildingWidth: 20,
    buildingLength: 20,
    showControls: false,
    enableSearch: false,
    enableEnvironment: false,
  },
  render: (args) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Site3DViewer {...args} floors={mockFloors} equipments={mockEquipment} />
    </div>
  ),
};

export const SimpleStore: Story = {
  args: {
    buildingWidth: 20,
    buildingLength: 20,
    showControls: true,
    enableSearch: true,
    initialFloorId: 'floor-simple-1',
    enableEnvironment: false,
  },
  render: (args) => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Site3DViewer
        {...args}
        floors={simpleStoreFloors}
        equipments={simpleStoreEquipment}
      />
    </div>
  ),
};
