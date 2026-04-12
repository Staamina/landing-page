import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Switch } from './switch';

const meta: Meta<typeof Switch> = {
  title: 'Atoms/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => <Switch />,
};

export const Checked: Story = {
  render: () => <Switch defaultChecked />,
};

export const Disabled: Story = {
  render: () => <Switch disabled />,
};

export const DisabledChecked: Story = {
  render: () => <Switch disabled defaultChecked />,
};

export const Small: Story = {
  render: () => <Switch size="sm" defaultChecked />,
};

export const Medium: Story = {
  render: () => <Switch size="md" defaultChecked />,
};

export const Large: Story = {
  render: () => <Switch size="lg" defaultChecked />,
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="toggle" />
      <label
        htmlFor="toggle"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Enable feature
      </label>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="flex items-center space-x-2">
        <Switch
          id="interactive"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <label htmlFor="interactive" className="text-sm">
          State: {checked ? 'On' : 'Off'}
        </label>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="w-12 text-xs text-neutral-500">sm</span>
        <Switch size="sm" />
        <Switch size="sm" defaultChecked />
        <Switch size="sm" disabled />
        <Switch size="sm" disabled defaultChecked />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12 text-xs text-neutral-500">md</span>
        <Switch size="md" />
        <Switch size="md" defaultChecked />
        <Switch size="md" disabled />
        <Switch size="md" disabled defaultChecked />
      </div>
      <div className="flex items-center gap-3">
        <span className="w-12 text-xs text-neutral-500">lg</span>
        <Switch size="lg" />
        <Switch size="lg" defaultChecked />
        <Switch size="lg" disabled />
        <Switch size="lg" disabled defaultChecked />
      </div>
    </div>
  ),
};
