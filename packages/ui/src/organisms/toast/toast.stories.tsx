import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';

import { ToastProvider, useToast } from './toast-provider';
import type { ShowToastParams } from './toast.types';

const ToastTrigger = ({
  type,
  title,
  message,
  duration,
  label,
}: ShowToastParams & { label: string }) => {
  const { onShowToast } = useToast();
  return (
    <Button
      onClick={() => onShowToast({ type, title, message, duration })}
      intent="neutral"
      appearance="outline"
    >
      {label}
    </Button>
  );
};

const meta: Meta<typeof ToastProvider> = {
  title: 'Organisms/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="relative flex min-h-[500px] items-start justify-center p-12">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <ToastTrigger
        type="success"
        title="Saved successfully"
        message="Your changes have been saved."
        label="Show success toast"
      />
      <ToastTrigger
        type="error"
        title="An error occurred"
        message="Could not save changes. Please try again."
        label="Show error toast"
      />
      <ToastTrigger
        type="warning"
        title="Warning"
        message="This action may have unintended consequences."
        label="Show warning toast"
      />
      <ToastTrigger
        type="info"
        title="Information"
        message="Your session will expire in 5 minutes."
        label="Show info toast"
      />
      <ToastTrigger
        type="success"
        message="Operation completed (no title)."
        label="Show toast without title"
      />
      <ToastTrigger
        type="info"
        title="Short duration"
        message="This toast disappears in 1.5 seconds."
        duration={1500}
        label="Show short-lived toast"
      />
    </div>
  ),
};
