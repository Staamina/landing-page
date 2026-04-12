import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton } from './link-button';

const meta: Meta<typeof LinkButton> = {
  title: 'Atoms/LinkButton',
  component: LinkButton,
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
    external: {
      control: 'boolean',
      description: 'Open link in new tab with security attributes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'Link Button',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    intent: 'primary',
    appearance: 'solid',
    children: 'Primary Link',
  },
};

export const Secondary: Story = {
  args: {
    href: '#',
    intent: 'secondary',
    appearance: 'outline',
    children: 'Secondary Link',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com',
    external: true,
    intent: 'primary',
    appearance: 'solid',
    children: 'External Link',
  },
};

export const Large: Story = {
  args: {
    href: '#',
    size: 'lg',
    intent: 'primary',
    appearance: 'solid',
    children: 'Large Link Button',
  },
};

export const WithIcon: Story = {
  render: () => (
    <LinkButton
      href="#"
      intent="primary"
      appearance="solid"
      size="lg"
      className="flex items-center gap-2"
    >
      Contact Us
      <span>→</span>
    </LinkButton>
  ),
};
