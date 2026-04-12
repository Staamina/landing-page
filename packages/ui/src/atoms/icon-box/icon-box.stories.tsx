import type { Meta, StoryObj } from '@storybook/react';
import { MapPin, Wrench, Tag, AlertTriangle, Sparkles } from 'lucide-react';
import { IconBox } from './icon-box';

const meta: Meta<typeof IconBox> = {
  title: 'Atoms/IconBox',
  component: IconBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconBox>;

export const Default: Story = {
  args: {
    size: 'md',
    children: <MapPin />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconBox size="sm">
        <MapPin />
      </IconBox>
      <IconBox size="md">
        <Wrench />
      </IconBox>
      <IconBox size="lg">
        <Tag />
      </IconBox>
    </div>
  ),
};

export const WithDifferentIcons: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconBox size="md">
        <MapPin />
      </IconBox>
      <IconBox size="md">
        <Wrench />
      </IconBox>
      <IconBox size="md">
        <Tag />
      </IconBox>
      <IconBox size="md">
        <AlertTriangle />
      </IconBox>
      <IconBox size="md">
        <Sparkles />
      </IconBox>
    </div>
  ),
};
