import type { Meta, StoryObj } from '@storybook/react';

import { Form } from './form';
import { FormGroup } from '@staamina/ui/form-group';
import { Input } from '@staamina/ui/input';

const meta: Meta<typeof Form> = {
  title: 'Atoms/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </>
    ),
  },
};

export const HomogeneousSpacing: Story = {
  render: () => (
    <form onSubmit={(e) => e.preventDefault()} className="w-[400px]">
      <Form>
        <FormGroup label="First field">
          <Input type="text" placeholder="FormGroup 1" />
        </FormGroup>
        <div className="rounded-lg border border-border-default bg-subtle px-3 py-2 text-sm text-text-secondary">
          Custom block (not a FormGroup) — same gap as above and below
        </div>
        <FormGroup label="Second field">
          <Input type="text" placeholder="FormGroup 2" />
        </FormGroup>
      </Form>
    </form>
  ),
};
