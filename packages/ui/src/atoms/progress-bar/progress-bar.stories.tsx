import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Percentage value between 0 and 100',
    },
    variant: {
      control: 'select',
      options: ['brand', 'success', 'warning', 'error'],
      description: 'Visual variant',
    },
    height: {
      control: 'text',
      description: 'Tailwind height class (e.g. h-1.5, h-2, h-3)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 60,
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Brand: Story = {
  args: {
    value: 45,
    variant: 'brand',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Success: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Warning: Story = {
  args: {
    value: 70,
    variant: 'warning',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    value: 25,
    variant: 'error',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Empty: Story = {
  args: {
    value: 0,
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const Full: Story = {
  args: {
    value: 100,
    variant: 'success',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const TallerHeight: Story = {
  args: {
    value: 55,
    height: 'h-3',
  },
  render: (args) => (
    <div className="w-64">
      <ProgressBar {...args} />
    </div>
  ),
};

export const AllVariants: Story = {
  args: {
    value: 60,
  },
  render: () => (
    <div className="flex w-64 flex-col gap-4">
      <div>
        <p className="mb-1 text-sm text-text-secondary">Brand (default)</p>
        <ProgressBar value={60} variant="brand" />
      </div>
      <div>
        <p className="mb-1 text-sm text-text-secondary">Success</p>
        <ProgressBar value={100} variant="success" />
      </div>
      <div>
        <p className="mb-1 text-sm text-text-secondary">Warning</p>
        <ProgressBar value={70} variant="warning" />
      </div>
      <div>
        <p className="mb-1 text-sm text-text-secondary">Error</p>
        <ProgressBar value={25} variant="error" />
      </div>
    </div>
  ),
};
