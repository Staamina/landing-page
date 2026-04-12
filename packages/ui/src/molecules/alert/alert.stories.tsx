import type { Meta, StoryObj } from '@storybook/react';

import { Alert, AlertDescription, AlertTitle } from './alert';

const meta: Meta<typeof Alert> = {
  title: 'Molecules/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Visual variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>Information</AlertTitle>
        <AlertDescription>
          This is a default informational alert message.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>
          Your session will expire in 5 minutes.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>
          The incident has been resolved successfully.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This equipment has not been maintained in over 6 months.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to assign technician. Please try again.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const TitleOnly: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertTitle>No description provided</AlertTitle>
      </Alert>
    </div>
  ),
};

export const DescriptionOnly: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => (
    <div className="w-80">
      <Alert {...args}>
        <AlertDescription>
          A lightweight alert with only a description.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Alert variant="info">
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Informational message.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Operation completed.</AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Proceed with caution.</AlertDescription>
      </Alert>
      <Alert variant="error">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    </div>
  ),
};
