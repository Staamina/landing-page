import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';
import { ConfirmModal } from './confirm-modal';

const meta: Meta<typeof ConfirmModal> = {
  title: 'Organisms/ConfirmModal',
  component: ConfirmModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmModal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Confirm</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Confirm action"
          body="Are you sure you want to proceed?"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

const longCompanyName =
  'Test Company 1770360304549-29-16396-cbwayxf2vlk-wem40amj9mj';

export const LongBodyText: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Change plan (long name)</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Change plan"
          body={`Change the plan for "${longCompanyName}" from Demo to Standard?`}
          confirmLabel="Change plan"
          cancelLabel="Cancel"
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (loading)</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Processing"
          body="Please wait..."
          confirmLabel="Confirm"
          isLoading
          onConfirm={() => setOpen(false)}
        />
      </>
    );
  },
};
