import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@staamina/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is where you can put any content.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const Simple: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Simple card with just content</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Header</CardTitle>
        <CardDescription>This card has a header section</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Content area</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>Content area</p>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
        <Button intent="secondary" appearance="outline">
          Cancel
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Complete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>
          This is a complete card example with all sections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This card demonstrates all available sections:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Card Header</li>
            <li>Card Title</li>
            <li>Card Description</li>
            <li>Card Content</li>
            <li>Card Footer</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button intent="secondary" appearance="outline">
          Cancel
        </Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  ),
};

export const HeaderChecked: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader checked>
        <CardTitle>Section complete</CardTitle>
        <CardDescription>
          This header shows a green check when the step is done
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Use <code>checked=true</code> on CardHeader to show completion state.
        </p>
      </CardContent>
    </Card>
  ),
};

export const HeaderIncomplete: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader checked={false}>
        <CardTitle>Section incomplete</CardTitle>
        <CardDescription>
          This header shows a gray circle when the step is not done
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Use <code>checked=false</code> on CardHeader to show incomplete state.
        </p>
      </CardContent>
    </Card>
  ),
};
