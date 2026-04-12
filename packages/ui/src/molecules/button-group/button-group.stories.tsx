import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';
import { ButtonGroup, ButtonWithDropdown } from './button-group';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button intent="neutral" appearance="solid">
        Save changes
      </Button>
      <Button intent="neutral" appearance="solid">
        Cancel
      </Button>
    </ButtonGroup>
  ),
};

export const WithDropdown: Story = {
  render: () => (
    <ButtonWithDropdown
      intent="neutral"
      appearance="solid"
      dropdownItems={[
        {
          label: 'Save and schedule',
          onClick: () => console.log('Save and schedule'),
        },
        {
          label: 'Save and publish',
          onClick: () => console.log('Save and publish'),
        },
        {
          label: 'Export PDF',
          onClick: () => console.log('Export PDF'),
        },
      ]}
    >
      Save changes
    </ButtonWithDropdown>
  ),
};

export const MultipleButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button intent="primary" appearance="solid">
        Primary
      </Button>
      <Button intent="secondary" appearance="solid">
        Secondary
      </Button>
      <Button intent="success" appearance="solid">
        Success
      </Button>
    </ButtonGroup>
  ),
};

export const MixedButtons: Story = {
  render: () => (
    <ButtonGroup>
      <Button intent="neutral" appearance="solid">
        Save
      </Button>
      <ButtonWithDropdown
        intent="neutral"
        appearance="solid"
        dropdownItems={[
          {
            label: 'Save and schedule',
            onClick: () => console.log('Save and schedule'),
          },
          {
            label: 'Save and publish',
            onClick: () => console.log('Save and publish'),
          },
        ]}
      >
        More options
      </ButtonWithDropdown>
    </ButtonGroup>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <Button size="sm" intent="neutral" appearance="solid">
          Small
        </Button>
        <Button size="sm" intent="neutral" appearance="solid">
          Small
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="default" intent="neutral" appearance="solid">
          Default
        </Button>
        <Button size="default" intent="neutral" appearance="solid">
          Default
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button size="lg" intent="neutral" appearance="solid">
          Large
        </Button>
        <Button size="lg" intent="neutral" appearance="solid">
          Large
        </Button>
      </ButtonGroup>
    </div>
  ),
};

export const DifferentIntents: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ButtonGroup>
        <ButtonWithDropdown
          intent="primary"
          appearance="solid"
          dropdownItems={[
            { label: 'Option 1', onClick: () => {} },
            { label: 'Option 2', onClick: () => {} },
          ]}
        >
          Primary
        </ButtonWithDropdown>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonWithDropdown
          intent="success"
          appearance="solid"
          dropdownItems={[
            { label: 'Option 1', onClick: () => {} },
            { label: 'Option 2', onClick: () => {} },
          ]}
        >
          Success
        </ButtonWithDropdown>
      </ButtonGroup>
      <ButtonGroup>
        <ButtonWithDropdown
          intent="danger"
          appearance="solid"
          dropdownItems={[
            { label: 'Option 1', onClick: () => {} },
            { label: 'Option 2', onClick: () => {} },
          ]}
        >
          Danger
        </ButtonWithDropdown>
      </ButtonGroup>
    </div>
  ),
};
