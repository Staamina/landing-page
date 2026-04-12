import type { Meta, StoryObj } from '@storybook/react';

import { Loader } from './loader';

const meta: Meta<typeof Loader> = {
  title: 'Atoms/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  render: () => (
    <div className="w-64 h-64 border border-border-default rounded-lg">
      <Loader />
    </div>
  ),
};

export const FullScreen: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div className="w-full h-screen">
      <Loader />
    </div>
  ),
};

export const SmallContainer: Story = {
  render: () => (
    <div className="w-32 h-32 border border-border-default rounded-lg">
      <Loader />
    </div>
  ),
};

export const MediumContainer: Story = {
  render: () => (
    <div className="w-96 h-96 border border-border-default rounded-lg">
      <Loader />
    </div>
  ),
};

export const WithCustomBackground: Story = {
  render: () => (
    <div className="w-64 h-64 border border-border-default rounded-lg bg-subtle">
      <Loader />
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="card w-96 h-64">
      <Loader />
    </div>
  ),
};
