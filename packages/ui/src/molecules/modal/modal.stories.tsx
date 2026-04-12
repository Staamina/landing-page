import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';
import {
  Modal,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from './modal';

const meta: Meta<typeof Modal> = {
  title: 'Molecules/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>
              This is a modal description. You can add any content here.
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p>Modal content goes here.</p>
          </div>
          <ModalFooter>
            <Button
              intent="secondary"
              appearance="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
        <Modal open={open} onOpenChange={setOpen} size="sm">
          <ModalHeader>
            <ModalTitle>Small Modal</ModalTitle>
            <ModalDescription>This is a small modal</ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p>Content for small modal</p>
          </div>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <Modal open={open} onOpenChange={setOpen} size="lg">
          <ModalHeader>
            <ModalTitle>Large Modal</ModalTitle>
            <ModalDescription>
              This is a large modal with more space
            </ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p>
              This modal has more space for content. You can add forms, tables,
              or any other content here.
            </p>
          </div>
          <ModalFooter>
            <Button
              intent="secondary"
              appearance="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const ExtraLarge: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Extra Large Modal</Button>
        <Modal open={open} onOpenChange={setOpen} size="2xl">
          <ModalHeader>
            <ModalTitle>Extra Large Modal</ModalTitle>
            <ModalDescription>This is an extra large modal</ModalDescription>
          </ModalHeader>
          <div className="py-4">
            <p>This modal provides maximum space for complex content.</p>
          </div>
          <ModalFooter>
            <Button
              intent="secondary"
              appearance="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

const longName =
  'Company 1770360304549-29-16396-cbwayxf2vlk-wem40amj9mj-extended';

export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>
          Open modal with long content
        </Button>
        <Modal
          open={open}
          onOpenChange={setOpen}
          size="sm"
          className="flex max-h-[90vh] flex-col"
        >
          <ModalHeader>
            <ModalTitle>Change plan</ModalTitle>
          </ModalHeader>
          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
            <p className="text-sm text-text-secondary">
              Change the plan for &quot;{longName}&quot; from Demo to Standard?
            </p>
          </div>
          <ModalFooter>
            <Button
              size="sm"
              intent="secondary"
              appearance="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Change plan
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
