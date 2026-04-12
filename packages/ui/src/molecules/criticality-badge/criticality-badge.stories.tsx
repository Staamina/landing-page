import type { Meta, StoryObj } from '@storybook/react';
import { CriticalityBadge } from './criticality-badge';

const meta: Meta<typeof CriticalityBadge> = {
  title: 'Molecules/CriticalityBadge',
  component: CriticalityBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    criticality: {
      control: 'select',
      options: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CriticalityBadge>;

export const Critical: Story = {
  args: {
    criticality: 'CRITICAL',
  },
};

export const High: Story = {
  args: {
    criticality: 'HIGH',
  },
};

export const Medium: Story = {
  args: {
    criticality: 'MEDIUM',
  },
};

export const Low: Story = {
  args: {
    criticality: 'LOW',
  },
};

export const Small: Story = {
  args: {
    criticality: 'CRITICAL',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    criticality: 'HIGH',
    size: 'lg',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Small:</span>
        <CriticalityBadge criticality="CRITICAL" size="sm" />
        <CriticalityBadge criticality="HIGH" size="sm" />
        <CriticalityBadge criticality="MEDIUM" size="sm" />
        <CriticalityBadge criticality="LOW" size="sm" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Medium:</span>
        <CriticalityBadge criticality="CRITICAL" size="md" />
        <CriticalityBadge criticality="HIGH" size="md" />
        <CriticalityBadge criticality="MEDIUM" size="md" />
        <CriticalityBadge criticality="LOW" size="md" />
      </div>
      <div className="flex items-center gap-2">
        <span className="w-16 text-sm text-text-tertiary">Large:</span>
        <CriticalityBadge criticality="CRITICAL" size="lg" />
        <CriticalityBadge criticality="HIGH" size="lg" />
        <CriticalityBadge criticality="MEDIUM" size="lg" />
        <CriticalityBadge criticality="LOW" size="lg" />
      </div>
    </div>
  ),
};
