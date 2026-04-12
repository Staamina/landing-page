import type { Meta, StoryObj } from '@storybook/react';

import { ProgressIndicator } from './progress-indicator';

const incidentSteps = [
  { id: 'description', label: 'Describe the problem' },
  { id: 'zone', label: 'Zone' },
  { id: 'equipment', label: 'Equipment' },
  { id: 'issue', label: 'Issue' },
  { id: 'additional', label: 'Additional information' },
];

const threeSteps = [
  { id: 'step1', label: 'Step 1' },
  { id: 'step2', label: 'Step 2' },
  { id: 'step3', label: 'Step 3' },
];

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Atoms/ProgressIndicator',
  component: ProgressIndicator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    steps: {
      control: false,
      description: 'List of steps (id, label)',
    },
    progression: {
      control: false,
      description: 'stepCompleted[] and percentage (0-100)',
    },
    checkpointBasedFill: {
      control: 'boolean',
      description:
        'When true, bar fills only up to completed checkpoints (0, 20, 40…%).',
    },
    variant: {
      control: 'select',
      options: ['full', 'compact', 'minimal', 'responsive'],
      description:
        'Display variant: full (bar + labels), compact (bar only), minimal (badge only), responsive (auto-switch)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressIndicator>;

export const Default: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 40,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const ZeroPercent: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [false, false, false, false, false],
      percentage: 0,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const FortyPercent: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 40,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const HundredPercent: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, true, true, true],
      percentage: 100,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const FiveStepsIncidentForm: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, true, false, false],
      percentage: 60,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator
        {...args}
        ariaLabel="Incident form: 3 of 5 blocks completed"
      />
    </div>
  ),
};

export const ThreeSteps: Story = {
  args: {
    steps: threeSteps,
    progression: {
      stepCompleted: [true, false, false],
      percentage: 33,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const ThreeStepsComplete: Story = {
  args: {
    steps: threeSteps,
    progression: {
      stepCompleted: [true, true, true],
      percentage: 100,
    },
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const CheckpointBasedFillDisabled: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 35,
    },
    checkpointBasedFill: false,
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const VariantCompact: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 40,
    },
    variant: 'compact',
  },
  render: (args) => (
    <div className="w-full max-w-[200px]">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const VariantFull: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, true, false, false],
      percentage: 60,
    },
    variant: 'full',
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const VariantResponsive: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 40,
    },
    variant: 'responsive',
  },
  render: (args) => (
    <div className="w-full max-w-lg">
      <p className="text-sm text-text-tertiary mb-2">
        Resize the window to see compact (mobile) vs full (desktop) mode.
      </p>
      <ProgressIndicator {...args} />
    </div>
  ),
};

export const VariantMinimal: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, false, false, false],
      percentage: 40,
    },
    variant: 'minimal',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <ProgressIndicator {...args} />
      <span className="text-sm text-text-tertiary">
        Minimal badge for tight spaces
      </span>
    </div>
  ),
};

export const VariantMinimalComplete: Story = {
  args: {
    steps: incidentSteps,
    progression: {
      stepCompleted: [true, true, true, true, true],
      percentage: 100,
    },
    variant: 'minimal',
  },
  render: (args) => (
    <div className="flex items-center gap-4">
      <ProgressIndicator {...args} />
      <span className="text-sm text-text-tertiary">Complete state</span>
    </div>
  ),
};
