import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'success',
        'danger',
        'alert',
        'neutral',
      ],
    },
    appearance: {
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    intent: 'primary',
    appearance: 'solid',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    intent: 'secondary',
    appearance: 'solid',
    children: 'Secondary Button',
  },
};

export const Success: Story = {
  args: {
    intent: 'success',
    appearance: 'solid',
    children: 'Success Button',
  },
};

export const Danger: Story = {
  args: {
    intent: 'danger',
    appearance: 'solid',
    children: 'Danger Button',
  },
};

export const Outline: Story = {
  args: {
    intent: 'primary',
    appearance: 'outline',
    children: 'Outline Button',
  },
};

export const Ghost: Story = {
  args: {
    intent: 'primary',
    appearance: 'ghost',
    children: 'Ghost Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <Button intent="primary" appearance="solid">
          Primary Solid
        </Button>
        <Button intent="primary" appearance="outline">
          Primary Outline
        </Button>
        <Button intent="primary" appearance="ghost">
          Primary Ghost
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button intent="secondary" appearance="solid">
          Secondary Solid
        </Button>
        <Button intent="secondary" appearance="outline">
          Secondary Outline
        </Button>
        <Button intent="secondary" appearance="ghost">
          Secondary Ghost
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button intent="success" appearance="solid">
          Success Solid
        </Button>
        <Button intent="success" appearance="outline">
          Success Outline
        </Button>
        <Button intent="success" appearance="ghost">
          Success Ghost
        </Button>
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button intent="danger" appearance="solid">
          Danger Solid
        </Button>
        <Button intent="danger" appearance="outline">
          Danger Outline
        </Button>
        <Button intent="danger" appearance="ghost">
          Danger Ghost
        </Button>
      </div>
    </div>
  ),
};
