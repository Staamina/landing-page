import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'Atoms/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral',
        'blue',
        'purple',
        'yellow',
        'green',
        'emerald',
        'red',
        'orange',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    asChild: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutral',
  },
};

export const Blue: Story = {
  args: {
    variant: 'blue',
    children: 'Blue',
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    children: 'Purple',
  },
};

export const Yellow: Story = {
  args: {
    variant: 'yellow',
    children: 'Yellow',
  },
};

export const Green: Story = {
  args: {
    variant: 'green',
    children: 'Green',
  },
};

export const Red: Story = {
  args: {
    variant: 'red',
    children: 'Red',
  },
};

export const Orange: Story = {
  args: {
    variant: 'orange',
    children: 'Orange',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Badge size="sm" variant="blue">
        Small
      </Badge>
      <Badge size="md" variant="blue">
        Medium
      </Badge>
      <Badge size="lg" variant="blue">
        Large
      </Badge>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="purple">Purple</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="emerald">Emerald</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="orange">Orange</Badge>
    </div>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Badge asChild variant="blue" size="md">
      <a href="#badge-link">Badge as link</a>
    </Badge>
  ),
};
